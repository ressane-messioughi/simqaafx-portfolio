import PropTypes from 'prop-types';
import ThemeButtons from '../ui/ThemeButtons';
import { splitOnAccent } from '../../utils/format';

/**
 * Bannière principale — transposition de components/hero.njk.
 *
 * Le thème d'origine construisait ses classes avec des `{% set %}` et des
 * dictionnaires Nunjucks. En React, ces dictionnaires deviennent de simples
 * objets JavaScript : le principe est identique, la syntaxe est juste
 * celle du langage.
 */
function Hero({ properties }) {
  const {
    title,
    titleAccent,
    subtitle,
    alignment = 'center',
    height = 'short',
    textWidth = 'medium',
    buttons = [],
  } = properties;

  const heightClasses = {
    short: '',
    medium: 'min-h-[60vh]',
    tall: 'min-h-[calc(100vh-112px)]',
  };

  const layoutClasses = {
    left: 'flex-col md:flex-row md:justify-between',
    center: 'flex-col',
    right: 'flex-col md:flex-row-reverse md:justify-between',
  };

  const widthClasses = {
    small: 'max-w-md',
    medium: 'max-w-xl',
    large: 'max-w-3xl',
    full: '',
  };

  const textAlignClasses = {
    left: 'text-left',
    center: 'mx-auto text-center',
    right: 'text-right',
  };

  const buttonAlignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  const { before, highlighted, after } = splitOnAccent(title, titleAccent);

  return (
    <section className="relative flex justify-center items-center py-24">
      <div
        className={`container relative flex gap-12 items-center px-4 ${heightClasses[height]} ${layoutClasses[alignment]}`}
      >
        <div
          className={`flex flex-col gap-4 ${widthClasses[textWidth]} ${textAlignClasses[alignment]}`}
        >
          {title && (
            // Un seul <h1> par page : c'est celui-ci. Toutes les autres
            // sections utilisent <h2> via SectionTitle.
            <h1 className="text-3xl font-bold text-t-primary mb-3 md:text-4xl lg:text-5xl">
              {before}
              {highlighted && <span className="text-accent-500">{highlighted}</span>}
              {after}
            </h1>
          )}

          {subtitle && (
            <p className="text-base text-t-primary/75 mb-3 md:text-lg">{subtitle}</p>
          )}

          {buttons.length > 0 && (
            <div
              className={`flex flex-wrap items-center gap-4 mt-3 ${buttonAlignClasses[alignment]}`}
            >
              <ThemeButtons buttons={buttons} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

Hero.propTypes = {
  properties: PropTypes.shape({
    title: PropTypes.string,
    titleAccent: PropTypes.string,
    subtitle: PropTypes.string,
    alignment: PropTypes.oneOf(['left', 'center', 'right']),
    height: PropTypes.oneOf(['short', 'medium', 'tall']),
    textWidth: PropTypes.oneOf(['small', 'medium', 'large', 'full']),
    buttons: PropTypes.array,
  }).isRequired,
};

export default Hero;
