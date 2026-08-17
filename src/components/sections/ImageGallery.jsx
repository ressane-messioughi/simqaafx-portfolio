import PropTypes from 'prop-types';
import SectionTitle from '../ui/SectionTitle';

/** Galerie d'images — transposition de components/image-gallery.njk. */
function ImageGallery({ properties }) {
  const { title, itemsPerRow = 3, aspectRatio = 'Default', images = [] } = properties;

  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  const aspectClasses = {
    Default: '',
    '1/1': 'aspect-square',
    '4/3': 'aspect-[4/3]',
    '16/9': 'aspect-video',
  };

  if (images.length === 0) return null;

  return (
    <section className="py-6 lg:py-8">
      {title && <SectionTitle>{title}</SectionTitle>}

      <div className={`grid gap-4 ${gridClasses[itemsPerRow] ?? gridClasses[3]}`}>
        {images.map((image) => (
          <div key={image.src} className={aspectClasses[aspectRatio] ?? ''}>
            <img
              src={image.src}
              // alt vide + role="presentation" si l'image est purement
              // décorative ; sinon on affiche le texte alternatif fourni.
              alt={image.alt ?? ''}
              loading="lazy"
              className="object-scale-down w-full h-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

ImageGallery.propTypes = {
  properties: PropTypes.shape({
    title: PropTypes.string,
    itemsPerRow: PropTypes.oneOf([1, 2, 3, 4]),
    aspectRatio: PropTypes.oneOf(['Default', '1/1', '4/3', '16/9']),
    images: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string.isRequired,
        alt: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default ImageGallery;
