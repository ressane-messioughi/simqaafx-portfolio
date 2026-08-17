import PropTypes from 'prop-types';

import Hero from './sections/Hero';
import StatsBar from './sections/StatsBar';
import ProjectGrid from './sections/ProjectGrid';
import ShortGrid from './sections/ShortGrid';
import Cta from './sections/Cta';

/**
 * Registre de sections : associe un type (chaîne de caractères) au composant
 * React correspondant.
 *
 * Pour ajouter un type : créer le composant, ajouter une ligne ici, puis
 * l'utiliser depuis src/data/pages.js.
 */
const SECTION_COMPONENTS = {
  hero: Hero,
  stats: StatsBar,
  'project-grid': ProjectGrid,
  'short-grid': ShortGrid,
  cta: Cta,
};

/** Affiche une liste de sections décrites sous forme de données. */
function SectionRenderer({ sections }) {
  return (
    <>
      {sections.map((section) => {
        const Component = SECTION_COMPONENTS[section.type];

        // Type inconnu (faute de frappe dans pages.js) : on ne fait pas
        // planter la page, on prévient en développement seulement.
        if (!Component) {
          if (import.meta.env.DEV) {
            console.warn(
              `[SectionRenderer] Type de section inconnu : "${section.type}". ` +
                `Types disponibles : ${Object.keys(SECTION_COMPONENTS).join(', ')}.`
            );
          }
          return null;
        }

        return <Component key={section.id} properties={section.properties} />;
      })}
    </>
  );
}

SectionRenderer.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      properties: PropTypes.object.isRequired,
    })
  ).isRequired,
};

export default SectionRenderer;
