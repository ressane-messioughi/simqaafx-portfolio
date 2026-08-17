import SectionRenderer from '../components/SectionRenderer';
import { projectsSections } from '../data/pages';
import { usePageTitle } from '../hooks/usePageTitle';

/** Page listant l'intégralité des réalisations longues. */
function ProjectsPage() {
  usePageTitle('Projets', 'Tous les trailers, teasers et cinématiques réalisés.');

  return <SectionRenderer sections={projectsSections} />;
}

export default ProjectsPage;
