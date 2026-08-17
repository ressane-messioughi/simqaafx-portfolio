import SectionRenderer from '../components/SectionRenderer';
import { videosSections } from '../data/pages';
import { usePageTitle } from '../hooks/usePageTitle';

/** Page listant l'intégralité des formats courts. */
function VideosPage() {
  usePageTitle('Vidéos courtes', 'Tous les formats courts : TikTok RP et réalisations hors jeu.');

  return <SectionRenderer sections={videosSections} />;
}

export default VideosPage;
