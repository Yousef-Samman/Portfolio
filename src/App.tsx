import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PROJECTS_SHOWCASE_LIVE } from './config/projectsShowcase';
import { ContactPage } from './pages/ContactPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route
          path="/projects/:slug"
          element={
            PROJECTS_SHOWCASE_LIVE ? (
              <ProjectDetailPage />
            ) : (
              <Navigate to="/projects" replace />
            )
          }
        />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
