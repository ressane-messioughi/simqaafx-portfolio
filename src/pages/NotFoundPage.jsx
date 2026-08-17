import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';

/**
 * Page 404.
 *
 * Le thème d'origine n'en avait pas : la plateforme s'en chargeait. Dans une
 * SPA, c'est à nous de gérer les URLs inconnues, sinon l'utilisateur se
 * retrouve devant une page blanche. C'est la route `path="*"` dans App.jsx.
 */
function NotFoundPage() {
  usePageTitle('Page introuvable');

  return (
    <section className="flex flex-col items-center justify-center text-center py-24 lg:py-32">
      <p className="text-6xl font-bold text-accent-500 md:text-8xl">404</p>

      <h1 className="mt-4 text-2xl font-bold text-t-primary md:text-3xl">Page introuvable</h1>

      <p className="mt-2 max-w-md text-base text-t-primary/60">
        La page que vous cherchez n’existe pas ou a été déplacée.
      </p>

      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-4 border border-accent-600 bg-accent-500 px-6 py-2 text-sm font-semibold text-t-primary transition-colors duration-150 ease-in-out hover:bg-accent-600"
      >
        Retour à l’accueil
      </Link>
    </section>
  );
}

export default NotFoundPage;
