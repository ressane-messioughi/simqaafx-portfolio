import PropTypes from 'prop-types';
import SectionTitle from '../ui/SectionTitle';
import ThemeButtons from '../ui/ThemeButtons';
import YouTubeEmbed from '../ui/YouTubeEmbed';

/**
 * Bloc « texte + média », côte à côte.
 *
 * Le thème d'origine avait DEUX fichiers pour ça, text-image-block.njk et
 * text-video-block.njk, identiques à 95 % : seul le média final changeait.
 *
 * On les fusionne en un seul composant piloté par la prop `mediaType`.
 * C'est le principe DRY (Don't Repeat Yourself) : une correction de mise en
 * page se fait désormais à un seul endroit au lieu de deux.
 */
function TextMediaBlock({ properties }) {
  const {
    title,
    text,
    buttons = [],
    showBackground = false,
    titleAlignment = 'left',
    contentAlignment = 'left',
    mediaType = 'image',
    image,
    imageAlt = '',
    videoLink,
    aspectRatio = 'Default',
  } = properties;

  const layoutClasses = {
    left: 'flex-col lg:flex-row',
    center: 'flex-col items-center',
    right: 'flex-col lg:flex-row-reverse',
  };

  const textAlignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const buttonAlignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  const imageAspectClasses = {
    Default: 'lg:max-w-[50%]',
    '1/1': 'aspect-square lg:max-w-[50%]',
    '4/3': 'aspect-[4/3] lg:max-w-[50%]',
    '16/9': 'aspect-video lg:max-w-[50%]',
  };

  const videoWidthClasses = {
    left: 'w-full lg:max-w-[50%]',
    center: 'w-full max-w-[640px]',
    right: 'w-full lg:max-w-[50%]',
  };

  const backgroundClass = showBackground
    ? 'bg-card/75 border border-white/5 text-t-primary p-4 md:p-6'
    : '';

  return (
    <section className="py-6 lg:py-8">
      {title && !showBackground && <SectionTitle alignment={titleAlignment}>{title}</SectionTitle>}

      <div className={backgroundClass}>
        {title && showBackground && (
          <div className={`mb-4 flex ${titleAlignment === 'center' ? 'justify-center' : ''}`}>
            <h2 className="inline text-t-primary text-2xl font-bold pl-2 border-l-4 border-l-accent-500">
              {title}
            </h2>
          </div>
        )}

        <div className={`flex gap-8 ${layoutClasses[contentAlignment]}`}>
          <div className={`flex-1 flex flex-col gap-8 ${textAlignClasses[contentAlignment]}`}>
            <p className="text-base text-t-primary/50">{text}</p>

            {buttons.length > 0 && (
              <div
                className={`flex flex-wrap items-center gap-4 mt-4 ${buttonAlignClasses[contentAlignment]}`}
              >
                <ThemeButtons buttons={buttons} />
              </div>
            )}
          </div>

          {mediaType === 'video' && videoLink && (
            <div
              className={`flex justify-center aspect-video overflow-hidden ${videoWidthClasses[contentAlignment]}`}
            >
              <YouTubeEmbed url={videoLink} title={title ?? 'Vidéo'} />
            </div>
          )}

          {mediaType === 'image' && image && (
            <div className={`overflow-hidden ${imageAspectClasses[aspectRatio]}`}>
              <img
                src={image}
                alt={imageAlt}
                loading="lazy"
                className="size-full object-scale-down"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

TextMediaBlock.propTypes = {
  properties: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
    buttons: PropTypes.array,
    showBackground: PropTypes.bool,
    titleAlignment: PropTypes.oneOf(['left', 'center', 'right']),
    contentAlignment: PropTypes.oneOf(['left', 'center', 'right']),
    mediaType: PropTypes.oneOf(['image', 'video']),
    image: PropTypes.string,
    imageAlt: PropTypes.string,
    videoLink: PropTypes.string,
    aspectRatio: PropTypes.oneOf(['Default', '1/1', '4/3', '16/9']),
  }).isRequired,
};

export default TextMediaBlock;
