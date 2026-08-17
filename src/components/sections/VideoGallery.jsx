import PropTypes from 'prop-types';
import SectionTitle from '../ui/SectionTitle';
import YouTubeEmbed from '../ui/YouTubeEmbed';

/**
 * Galerie de vidéos — transposition de components/video-gallery.njk.
 *
 * La boucle `{% for video in properties.videos %}` devient `.map()`.
 *
 * Noter la prop `key` : React en a besoin pour identifier chaque élément
 * d'une liste et ne re-rendre que ce qui change. On utilise le lien de la
 * vidéo, qui est unique et stable — l'index du tableau serait un mauvais
 * choix, car il change si on réordonne la liste.
 */
function VideoGallery({ properties }) {
  const { title, itemsPerRow = 3, videos = [] } = properties;

  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  const aspectClasses = {
    '16/9': 'aspect-video',
    '9/16': 'aspect-[9/16]',
  };

  if (videos.length === 0) return null;

  return (
    <section className="py-6 lg:py-8">
      {title && <SectionTitle>{title}</SectionTitle>}

      <div className={`grid gap-4 ${gridClasses[itemsPerRow] ?? gridClasses[3]}`}>
        {videos.map((video, index) => (
          <div
            key={video.link}
            className={`flex justify-center ${aspectClasses[video.aspectRatio] ?? 'aspect-video'}`}
          >
            <YouTubeEmbed url={video.link} title={`${title} — vidéo ${index + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
}

VideoGallery.propTypes = {
  properties: PropTypes.shape({
    title: PropTypes.string,
    itemsPerRow: PropTypes.oneOf([1, 2, 3, 4]),
    videos: PropTypes.arrayOf(
      PropTypes.shape({
        link: PropTypes.string.isRequired,
        aspectRatio: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default VideoGallery;
