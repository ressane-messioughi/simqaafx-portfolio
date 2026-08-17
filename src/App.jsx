import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import VideosPage from './pages/VideosPage';
import LegalPage from './pages/LegalPage';
import NotFoundPage from './pages/NotFoundPage';

/**
 * Plan de routage (leçon 20 — React Router).
 *
 * La route parente ne porte pas de `path` : elle sert uniquement à appliquer
 * le gabarit commun. Les routes imbriquées s'affichent dans son <Outlet />,
 * ce qui garantit un en-tête, un pied de page et un unique <main> partagés.
 *
 * La route `path="*"` doit rester en DERNIER : elle capture tout ce qui n'a
 * pas été reconnu avant.
 *
 * Le portfolio tient sur une seule page : la navigation principale se fait
 * par ancres (#projets, #videos, #contact), pas par changement de route.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projets" element={<ProjectsPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/mentions-legales" element={<LegalPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
