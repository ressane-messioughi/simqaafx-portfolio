import PropTypes from 'prop-types';

/**
 * Titre de section avec le trait d'accentuation sous le texte.
 *
 * Ce bloc était copié-collé à l'identique dans 6 fichiers .njk
 * (features, stats, faq, feedbacks, image-gallery, video-gallery).
 * Le factoriser en un seul composant est le premier bénéfice concret
 * du passage à React : une seule source de vérité pour ce style.
 */
function SectionTitle({ children, alignment = 'center', as = 'h2' }) {
  const wrapperAlignment = {
    left: 'justify-start text-left',
    center: 'justify-center text-center',
    right: 'justify-end text-right',
  };

  // Le niveau de titre est choisi par l'appelant, pas figé dans le composant.
  // Une page doit contenir exactement UN <h1> : sur les pages sans bannière,
  // c'est ce titre de section qui doit l'être. Les autres restent en <h2>.
  //
  // Astuce React : une variable qui contient un nom de balise doit commencer
  // par une MAJUSCULE pour que JSX la traite comme dynamique. Écrire <as>
  // produirait une balise HTML nommée « as », qui n'existe pas.
  const Heading = as;

  return (
    <div className={`flex items-center mb-4 md:mb-6 lg:mb-8 ${wrapperAlignment[alignment]}`}>
      <div className="inline-block">
        <Heading className="text-t-primary text-2xl font-bold md:text-3xl lg:text-4xl">
          {children}
        </Heading>
        <hr className="w-full border-accent-500 mt-1 md:border-2 md:mt-1.5 lg:mt-2 mx-auto" />
      </div>
    </div>
  );
}

SectionTitle.propTypes = {
  children: PropTypes.node.isRequired,
  alignment: PropTypes.oneOf(['left', 'center', 'right']),
  as: PropTypes.oneOf(['h1', 'h2']),
};

export default SectionTitle;
