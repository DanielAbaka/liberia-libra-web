import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { AboutPage } from "./pages/AboutPage.jsx";
import { ServicesPage } from "./pages/ServicesPage.jsx";
import { TrainingPage } from "./pages/TrainingPage.jsx";
import { PortfolioPage } from "./pages/PortfolioPage.jsx";
import { BlogPage } from "./pages/BlogPage.jsx";
import { GalleryPage } from "./pages/GalleryPage.jsx";
import { ContactPage } from "./pages/ContactPage.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="training" element={<TrainingPage />} />
        <Route path="portfolio" element={<PortfolioPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
