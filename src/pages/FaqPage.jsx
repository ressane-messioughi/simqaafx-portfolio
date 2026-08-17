import SectionRenderer from '../components/SectionRenderer';
import { faqSections } from '../data/pages';
import { usePageTitle } from '../hooks/usePageTitle';

function FaqPage() {
  usePageTitle('FAQ', 'Les réponses aux questions les plus fréquentes sur les commandes.');

  return <SectionRenderer sections={faqSections} />;
}

export default FaqPage;
