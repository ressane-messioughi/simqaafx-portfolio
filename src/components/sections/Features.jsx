import PropTypes from 'prop-types';
import SectionTitle from '../ui/SectionTitle';

/** Grille de cartes (staff, services…) — transposition de components/features.njk. */
function Features({ properties }) {
  const { title, features = [], centered = false } = properties;

  if (features.length === 0) return null;

  return (
    <section className="py-6 lg:py-8">
      {title && <SectionTitle>{title}</SectionTitle>}

      <div className={`flex flex-wrap gap-4 w-full ${centered ? 'justify-center' : ''}`}>
        {features.map((feature) => (
          <div
            key={feature.title}
            className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] 2xl:w-[calc(25%-1rem)]"
          >
            <div className="text-center bg-card/75 border border-white/5 p-4 lg:p-6">
              {feature.icon && (
                // aria-hidden : une icône décorative ne doit pas être lue
                // par un lecteur d'écran, le titre juste en dessous suffit.
                <i
                  className={`mb-2 text-accent-500 text-xl md:mb-3 md:text-2xl lg:mb-4 lg:text-3xl ${feature.icon}`}
                  aria-hidden="true"
                />
              )}
              <h3 className="mb-1 text-base text-t-primary font-semibold uppercase md:mb-1.5 lg:text-lg lg:mb-2">
                {feature.title}
              </h3>
              <p className="text-xs font-normal text-t-primary/80 lg:text-sm">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

Features.propTypes = {
  properties: PropTypes.shape({
    title: PropTypes.string,
    centered: PropTypes.bool,
    features: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        icon: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default Features;
