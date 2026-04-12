import { jsPDF } from "jspdf";
import { TRAINING_PROGRAMS } from "../data/trainingPrograms.js";
import { SERVICES_CATALOG } from "../data/servicesCatalog.js";
import { COMPANY_CONTACT } from "../data/companyContact.js";
import { publicAsset } from "./publicAsset.js";
import {
  splitCostForBoldSegments,
  splitScheduleForBoldSegments,
} from "./trainingCostBold.js";

const navy = [26, 26, 75];
const accent = [229, 57, 53];
const gray = [55, 65, 81];
const muted = [107, 114, 128];

function formatPdfDate(iso) {
  try {
    return new Date(`${iso}T12:00:00`).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

async function fetchLogoDataUrl() {
  try {
    const url = publicAsset(COMPANY_CONTACT.logoFile);
    const res = await fetch(url);
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result);
      r.onerror = reject;
      r.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

/**
 * Builds and downloads a PDF brochure with logo, contact details, training tracks, and services.
 */
export async function downloadLiberiaLibraBrochurePdf() {
  const logoDataUrl = await fetchLogoDataUrl();

  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const margin = 16;
  let y = margin;

  const pageH = () => doc.internal.pageSize.getHeight();
  const pageW = () => doc.internal.pageSize.getWidth();
  const textW = () => pageW() - 2 * margin;

  function freshPage() {
    doc.addPage();
    y = margin;
  }

  function needSpace(mm) {
    if (y + mm > pageH() - margin) freshPage();
  }

  function setStyle(size, color, style = "normal") {
    doc.setFont("helvetica", style);
    doc.setFontSize(size);
    doc.setTextColor(color[0], color[1], color[2]);
  }

  function printParagraph(text, size, color, lineHeight, style = "normal") {
    setStyle(size, color, style);
    const lines = doc.splitTextToSize(String(text), textW());
    for (const line of lines) {
      needSpace(lineHeight);
      doc.text(line, margin, y);
      y += lineHeight;
    }
  }

  /** One paragraph with inline bold segments when the full line fits on one row. */
  function printRichInlineBlock(block, splitFn) {
    const parts = splitFn(block);
    if (!parts.some((p) => p.bold)) {
      printParagraph(block, 9, gray, 4.5);
      return;
    }
    const lh = 4.5;
    const fs = 9;
    doc.setFontSize(fs);
    doc.setTextColor(gray[0], gray[1], gray[2]);
    let totalW = 0;
    for (const part of parts) {
      doc.setFont("helvetica", part.bold ? "bold" : "normal");
      totalW += doc.getTextWidth(part.text);
    }
    if (totalW > textW()) {
      printParagraph(block, 9, gray, 4.5);
      return;
    }
    needSpace(lh);
    let x = margin;
    for (const part of parts) {
      if (!part.text) continue;
      doc.setFont("helvetica", part.bold ? "bold" : "normal");
      doc.text(part.text, x, y);
      x += doc.getTextWidth(part.text);
    }
    y += lh;
  }

  function printBullets(lines, size = 9, color = gray, indent = 2) {
    for (const raw of lines) {
      setStyle(size, color, "normal");
      const wrapped = doc.splitTextToSize(`• ${raw}`, textW() - indent);
      for (const wline of wrapped) {
        needSpace(4.2);
        doc.text(wline, margin + indent, y);
        y += 4.2;
      }
    }
  }

  function printContactSection(title) {
    needSpace(8);
    setStyle(10, accent, "bold");
    doc.text(title, margin, y);
    y += 5.5;
    setStyle(9, gray, "normal");
    const addr = `${COMPANY_CONTACT.addressLine1}, ${COMPANY_CONTACT.addressLine2}`;
    const contactLines = [
      `Address: ${addr}`,
      `Email: ${COMPANY_CONTACT.email}`,
      `Phone: ${COMPANY_CONTACT.phoneDisplay}`,
    ];
    const origin =
      typeof globalThis !== "undefined" && globalThis.location?.origin
        ? globalThis.location.origin
        : "";
    if (origin) contactLines.push(`Website: ${origin}`);
    for (const line of contactLines) {
      const wrapped = doc.splitTextToSize(line, textW());
      for (const w of wrapped) {
        needSpace(4.3);
        doc.text(w, margin, y);
        y += 4.3;
      }
    }
    y += 2;
  }

  // —— Cover: logo + contact + title ——
  if (logoDataUrl) {
    const imgW = 58;
    const imgH = imgW * (120 / 380);
    needSpace(imgH + 4);
    try {
      doc.addImage(logoDataUrl, "PNG", margin, y, imgW, imgH);
      y += imgH + 5;
    } catch {
      printParagraph(COMPANY_CONTACT.legalName, 16, navy, 7, "bold");
    }
  } else {
    printParagraph(COMPANY_CONTACT.legalName, 16, navy, 7, "bold");
  }

  setStyle(8.5, muted, "normal");
  const tagWrapped = doc.splitTextToSize(COMPANY_CONTACT.tagline, textW());
  for (const line of tagWrapped) {
    needSpace(4);
    doc.text(line, margin, y);
    y += 4;
  }
  y += 3;

  printContactSection("Office & contact");

  printParagraph("Training programs & services brochure", 12, accent, 6.5, "bold");
  printParagraph(
    "This brochure summarizes our training tracks and consulting services. For current fees, cohort dates, and tailored proposals, reach us using the contact details above.",
    10,
    gray,
    5
  );
  y += 2;

  printParagraph("Part 1 — Training tracks", 14, navy, 7, "bold");

  for (const p of TRAINING_PROGRAMS) {
    needSpace(14);
    printParagraph(p.title, 12, navy, 6, "bold");
    printParagraph(p.summary, 9, gray, 4.5);
    printParagraph("Curriculum", 10, accent, 5.5, "bold");
    for (const line of p.curriculum) {
      if (line.endsWith(":")) {
        needSpace(5);
        printParagraph(line, 9.5, navy, 4.8, "bold");
      } else {
        printBullets([line]);
      }
    }
    printParagraph("Cost", 10, accent, 5.5, "bold");
    for (const block of p.cost
      .split(/\n+/)
      .map((s) => s.trim())
      .filter(Boolean)) {
      printRichInlineBlock(block, splitCostForBoldSegments);
    }
    printParagraph("Duration and Schedule", 10, accent, 5.5, "bold");
    if (p.durationBlock) {
      printParagraph(p.durationBlock.headline, 10, navy, 5.5, "bold");
      printRichInlineBlock(p.durationBlock.summary, splitScheduleForBoldSegments);
    } else {
      if (p.schedule) {
        printRichInlineBlock(p.schedule, splitScheduleForBoldSegments);
      }
      printBullets(p.keyDates.map((kd) => `${kd.label}: ${formatPdfDate(kd.date)}`));
    }
    y += 4;
  }

  printParagraph("Part 2 — Services", 14, navy, 7, "bold");

  for (const s of SERVICES_CATALOG) {
    needSpace(12);
    printParagraph(s.title, 11, navy, 5.5, "bold");
    printParagraph(s.summary, 9, gray, 4.5);
    printBullets(s.activities);
    y += 3;
  }

  printContactSection("Get in touch");

  needSpace(10);
  setStyle(8, muted, "normal");
  const origin =
    typeof globalThis !== "undefined" && globalThis.location?.origin
      ? globalThis.location.origin
      : "";
  const footer = origin
    ? `${origin} · ${new Date().toLocaleDateString()}`
    : new Date().toLocaleDateString();
  doc.text(footer, margin, pageH() - 10);

  doc.save("Liberia-Libra-Programs-and-Services.pdf");
}
