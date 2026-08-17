import SectionRenderer from '../components/SectionRenderer';
import { homeSections } from '../data/pages';
import { usePageTitle } from '../hooks/usePageTitle';
import { site } from '../data/settings';

/**
 * Page d'accueil.
 *
 * Noter à quel point elle est courte : toute la page est décrite par des
 * données (homeSections), et SectionRenderer se charge de l'affichage.
 * Pour réordonner les sections, on ne touche pas à ce fichier — on modifie
 * l'ordre du tableau dans src/data/pages.js.
 *
 * Aucun <main> ici : il est déclaré une seule fois dans Layout.jsx.
 */
function HomePage() {
  usePageTitle(null, site.description);

  return <SectionRenderer sections={homeSections} />;
}

export default HomePage;
