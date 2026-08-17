import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Gabarit commun à toutes les pages.
 *
 * ── UN SEUL <main> ───────────────────────────────────────────────────────
 * Un document HTML ne doit contenir qu'un seul <main>, qui délimite le
 * contenu principal hors en-tête et pied de page. Il est donc déclaré ici,
 * une fois pour toutes, et les pages ne fournissent que leur contenu.
 *
 * <Outlet /> est l'emplacement où React Router injecte la page courante.
 */
function Layout() {
  const { pathname } = useLocation();

  // Dans une application à page unique, changer de route ne remet pas le
  // défilement en haut : on arriverait au milieu de la nouvelle page.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Lien d'évitement : premier élément atteignable au clavier, il permet
          de sauter la navigation. Invisible tant qu'il n'a pas le focus.
          C'est un critère RGAA. */}
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-gradient-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
      >
        Aller au contenu principal
      </a>

      <Navbar />

      <main id="contenu" className="mx-auto w-full max-w-6xl flex-1 px-5 lg:px-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
