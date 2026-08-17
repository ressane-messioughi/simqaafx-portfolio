import PropTypes from 'prop-types';

import Hero from './sections/Hero';
import TextBlock from './sections/TextBlock';
import TextMediaBlock from './sections/TextMediaBlock';
import VideoGallery from './sections/VideoGallery';
import ImageGallery from './sections/ImageGallery';
import Features from './sections/Features';
import Stats from './sections/Stats';
import Faq from './sections/Faq';
import Feedbacks from './sections/Feedbacks';

/**
 * Le « registre » de sections : associe un type (une chaîne de caractères)
 * au composant React correspondant.
 *
 * C'est la traduction directe du tag Nunjucks `{% render_component %}`, qui
 * allait chercher components/<type>.njk sur le disque. Ici, l'objet joue le
 * rôle de l'annuaire.
 *
 * Pour ajouter un nouveau type de section : on crée le composant, on ajoute
 * une ligne ici, et il devient utilisable depuis src/data/pages.js.
 */
const SECTION_COMPONENTS = {
  hero: Hero,
  'text-block': TextBlock,
  'text-media-block': TextMediaBlock,
  'video-gallery': VideoGallery,
  'image-gallery': ImageGallery,
  features: Features,
  stats: Stats,
  faq: Faq,
  feedbacks: Feedbacks,
};

/**
 * Affiche une liste de sections décrites sous forme de données.
 *
 * Équivalent de la boucle du thème d'origine :
 *   {% for componentId in components_order %}
 *     {% render_component componentId %}
 *   {% endfor %}
 */
function SectionRenderer({ sections }) {
  return (
    <>
      {sections.map((section) => {
        const Component = SECTION_COMPONENTS[section.type];

        // Type inconnu (faute de frappe dans pages.js) : on ne fait pas
        // planter la page. On prévient dans la console en développement,
        // et on n'affiche rien en production.
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
