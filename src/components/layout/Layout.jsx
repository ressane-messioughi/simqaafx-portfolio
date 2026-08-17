import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import ThemeStyles from './ThemeStyles';
import ParticlesBackground from './ParticlesBackground';
import Announcement from './Announcement';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Gabarit commun à toutes les pages — transposition de layouts/master.njk.
 *
 * ── LE POINT IMPORTANT : UN SEUL <main> ──────────────────────────────────
 *
 * La règle HTML est stricte : un document ne doit contenir qu'un seul <main>,
 * qui délimite le contenu principal, hors en-tête et pied de page. En avoir
 * plusieurs casse la navigation des lecteurs d'écran et c'est une erreur que
 * les validateurs signalent.
 *
 * Le <main> est donc déclaré ICI, une fois pour toutes. Les pages ne
 * fournissent que leur contenu et ne doivent JAMAIS déclarer leur propre
 * <main> — c'est exactement le piège à éviter.
 *
 * <Outlet /> est l'emplacement où React Router injecte la page courante.
 * C'est l'équivalent de `{{ templateContent | safe }}` en Nunjucks.
 */
function Layout() {
  const { pathname } = useLocation();

  // Sans ça, changer de page conserve la position de défilement : on
  // arriverait au milieu de la nouvelle page. Le navigateur le fait
  // naturellement sur un site classique, mais pas dans une SPA.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <ThemeStyles />
      <ParticlesBackground />

      {/* Lien d'évitement : premier élément focalisable de la page, il permet
          à un utilisateur au clavier de sauter le menu. Invisible tant qu'il
          n'a pas le focus. C'est un critère RGAA. */}
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-accent-500 focus:text-t-primary focus:px-4 focus:py-2"
      >
        Aller au contenu principal
      </a>

      <div className="relative">
        <Announcement />

        <div className="flex flex-col justify-between max-w-[85rem] min-h-screen mx-auto p-4 relative md:p-6 lg:p-8">
          <div>
            <Navbar />

            <main id="contenu">
              <Outlet />
            </main>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}

export default Layout;
