import { useId, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import SectionTitle from '../ui/SectionTitle';

/**
 * Un item de la FAQ (accordéon).
 *
 * ATTENTION, c'est le point clé de la migration : dans le thème d'origine,
 * chaque item portait son propre `x-data="{ isOpen: false }"` Alpine.
 *
 * On reproduit ça en faisant de l'item un COMPOSANT à part entière. Chaque
 * appel de <FaqItem /> crée sa propre instance de useState : les items sont
 * indépendants, ouvrir le premier n'ouvre pas les autres.
 *
 * L'erreur classique serait de mettre un seul état dans le composant parent :
 * tous les items s'ouvriraient et se fermeraient ensemble.
 */
function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  // useRef donne accès à l'élément du DOM sans provoquer de re-rendu.
  // On en a besoin pour lire scrollHeight, la hauteur réelle du contenu :
  // c'est indispensable pour animer l'ouverture (on ne peut pas animer
  // une transition vers `height: auto` en CSS).
  const contentRef = useRef(null);

  // useId génère un identifiant unique et stable, nécessaire pour relier
  // le bouton à son panneau (aria-controls) côté accessibilité.
  const panelId = useId();

  return (
    <div className="bg-card/75 border border-white/5 text-t-primary relative p-4 md:p-6">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full flex justify-between items-center gap-4 cursor-pointer"
      >
        <h3 className="text-left text-base font-semibold md:text-lg">{question}</h3>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
          className={`shrink-0 text-accent-500 size-6 transition-transform ease-in-out duration-150 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      <div
        id={panelId}
        ref={contentRef}
        style={{ maxHeight: isOpen ? `${contentRef.current?.scrollHeight ?? 0}px` : '0px' }}
        className="overflow-hidden transition-all ease-in-out duration-150"
      >
        <p className="pt-2 text-sm text-t-primary/80 md:text-base">{answer}</p>
      </div>
    </div>
  );
}

FaqItem.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};

/** Section FAQ — transposition de components/faq.njk. */
function Faq({ properties }) {
  const { title, items = [], constrained = false, isPageTitle = false } = properties;

  if (items.length === 0) return null;

  return (
    <section className="py-6 lg:py-8">
      {title && <SectionTitle as={isPageTitle ? 'h1' : 'h2'}>{title}</SectionTitle>}

      <div className={constrained ? 'max-w-3xl mx-auto' : ''}>
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <FaqItem key={item.question} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}

Faq.propTypes = {
  properties: PropTypes.shape({
    title: PropTypes.string,
    constrained: PropTypes.bool,
    isPageTitle: PropTypes.bool,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.string.isRequired,
        answer: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};

export default Faq;
