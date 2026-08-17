import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import FaqPage from './pages/FaqPage';
import FeedbackPage from './pages/FeedbackPage';
import LegalPage from './pages/LegalPage';
import NotFoundPage from './pages/NotFoundPage';

/**
 * Plan de routage de l'application (leçon 20 — React Router).
 *
 * La route parente ne porte pas de `path` : elle sert uniquement à appliquer
 * le gabarit commun. Toutes les routes imbriquées s'affichent dans le
 * <Outlet /> de Layout, ce qui garantit que l'en-tête, le pied de page et
 * l'unique <main> sont partagés par toutes les pages.
 *
 * La route `path="*"` doit rester en DERNIER : elle capture tout ce qui n'a
 * pas été reconnu avant, et afficherait la 404 partout si elle était placée
 * en premier.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/avis" element={<FeedbackPage />} />
          <Route path="/mentions-legales" element={<LegalPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
