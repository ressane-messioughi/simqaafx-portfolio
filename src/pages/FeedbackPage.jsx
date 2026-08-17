import SectionRenderer from '../components/SectionRenderer';
import { feedbackSections } from '../data/pages';
import { usePageTitle } from '../hooks/usePageTitle';

function FeedbackPage() {
  usePageTitle('Avis', 'Les retours des clients sur les trailers et vidéos réalisés.');

  return <SectionRenderer sections={feedbackSections} />;
}

export default FeedbackPage;
