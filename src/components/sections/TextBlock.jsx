import PropTypes from 'prop-types';
import SectionTitle from '../ui/SectionTitle';
import ThemeButtons from '../ui/ThemeButtons';

/** Bloc de texte — transposition de components/text-block.njk. */
function TextBlock({ properties }) {
  const {
    title,
    text,
    buttons = [],
    showBackground = false,
    titleAlignment = 'left',
    contentAlignment = 'left',
  } = properties;

  const contentAlignClasses = {
    left: 'text-left',
    center: 'mx-auto text-center',
    right: 'ml-auto mr-0 text-right',
  };

  const buttonAlignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  const backgroundClass = showBackground
    ? 'bg-card/75 border border-white/5 text-t-primary p-4 md:p-6'
    : '';

  return (
    <section className="py-6 lg:py-8">
      <div className={backgroundClass}>
        {title && !showBackground && <SectionTitle alignment={titleAlignment}>{title}</SectionTitle>}

        {title && showBackground && (
          <div className={`mb-4 flex ${titleAlignment === 'center' ? 'justify-center' : ''}`}>
            <h2 className="inline text-t-primary text-2xl font-bold pl-2 border-l-4 border-l-accent-500">
              {title}
            </h2>
          </div>
        )}

        <div className={contentAlignClasses[contentAlignment]}>
          <p className="text-base text-t-primary/50">{text}</p>

          {buttons.length > 0 && (
            <div
              className={`flex flex-wrap items-center gap-4 mt-4 ${buttonAlignClasses[contentAlignment]}`}
            >
              <ThemeButtons buttons={buttons} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

TextBlock.propTypes = {
  properties: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
    buttons: PropTypes.array,
    showBackground: PropTypes.bool,
    titleAlignment: PropTypes.oneOf(['left', 'center', 'right']),
    contentAlignment: PropTypes.oneOf(['left', 'center', 'right']),
  }).isRequired,
};

export default TextBlock;
