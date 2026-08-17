import { useState } from 'react';
import PropTypes from 'prop-types';
import SectionHeader from '../ui/SectionHeader';
import { PlayIcon } from '../ui/Icons';
import { getYouTubeId } from '../../utils/youtube';

/**
 * Carte de format court : miniature, bouton lecture centré, et — en option —
 * une légende sous l'image.
 *
 * La légende est masquée sur l'accueil pour rester fidèle à la maquette, mais
 * affichée sur la page listant toutes les vidéos, où quatorze vignettes sans
 * titre seraient illisibles. Même composant, comportement piloté par une prop.
 *
 * Quand la légende est masquée, le titre reste fourni aux lecteurs d'écran
 * par l'`aria-label` du bouton de lecture : l'information n'est jamais perdue.
 */
function ShortCard({ short, showCaption }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const videoId = short.url ? getYouTubeId(short.url) : null;

  return (
    <article className="group">
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/[0.06] bg-black/40">
        {isPlaying && videoId ? (
          <iframe
            className="size-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
            title={short.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src={short.thumbnail}
              alt={short.title}
              loading="lazy"
              className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />

            {videoId && (
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                aria-label={`Lire la vidéo : ${short.title} — ${short.kind}`}
                className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/20 transition-colors duration-200 hover:bg-black/10"
              >
                <span className="flex size-11 items-center justify-center rounded-full bg-white/90 text-black transition-transform duration-200 group-hover:scale-110">
                  <PlayIcon className="ml-0.5 size-5" />
                </span>
              </button>
            )}

            {short.badge && (
              <span className="absolute left-2 top-2 rounded-md bg-black/70 px-1.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-white">
                {short.badge}
              </span>
            )}
          </>
        )}
      </div>

      {showCaption && (
        <div className="mt-3 px-0.5">
          <h3 className="truncate text-sm font-semibold">{short.title}</h3>
          <p className="mt-0.5 truncate text-xs text-muted">{short.kind}</p>
        </div>
      )}
    </article>
  );
}

ShortCard.propTypes = {
  short: PropTypes.shape({
    title: PropTypes.string.isRequired,
    kind: PropTypes.string,
    badge: PropTypes.string,
    thumbnail: PropTypes.string.isRequired,
    url: PropTypes.string,
  }).isRequired,
  showCaption: PropTypes.bool,
};

/** Section « Vidéos Courtes ». */
function ShortGrid({ properties }) {
  const {
    title,
    subtitle,
    action,
    shorts = [],
    isPageTitle = false,
    showCaptions = false,
  } = properties;

  if (shorts.length === 0) return null;

  return (
    <section id="videos" className="scroll-mt-24 py-8 lg:py-12">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        action={action}
        as={isPageTitle ? 'h1' : 'h2'}
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shorts.map((short) => (
          <ShortCard key={short.id} short={short} showCaption={showCaptions} />
        ))}
      </div>
    </section>
  );
}

ShortGrid.propTypes = {
  properties: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    action: PropTypes.object,
    isPageTitle: PropTypes.bool,
    showCaptions: PropTypes.bool,
    shorts: PropTypes.array,
  }).isRequired,
};

export default ShortGrid;
