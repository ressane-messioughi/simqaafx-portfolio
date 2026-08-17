import { useState } from 'react';
import PropTypes from 'prop-types';
import { getYouTubeId, getYouTubeThumbnail } from '../../utils/youtube';

/**
 * Intégration YouTube « en façade », qui remplace la librairie
 * lite-youtube-embed du thème d'origine.
 *
 * LE PROBLÈME : la page d'accueil affiche 30 vidéos. Un <iframe> YouTube pèse
 * environ 700 Ko et exécute ses propres scripts. 30 iframes chargés d'emblée,
 * c'est plus de 20 Mo téléchargés et une page qui rame — sur mobile, c'est
 * rédhibitoire.
 *
 * LA SOLUTION : n'afficher au départ qu'une simple image (la miniature, ~15 Ko)
 * avec un bouton lecture. L'iframe n'est créé qu'au clic de l'utilisateur.
 * On passe ainsi de ~20 Mo à ~450 Ko au chargement initial.
 *
 * C'est l'état local (useState) qui pilote la bascule : `isPlaying` vaut false,
 * on montre l'image ; il passe à true, React remplace l'image par l'iframe.
 */
function YouTubeEmbed({ url, title = 'Vidéo YouTube' }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const videoId = getYouTubeId(url);

  // URL invalide : on affiche un bloc neutre plutôt que de casser la page.
  if (!videoId) {
    return (
      <div className="flex size-full items-center justify-center bg-card/75 border border-white/5 text-t-primary/50 text-sm">
        Vidéo indisponible
      </div>
    );
  }

  if (isPlaying) {
    return (
      <iframe
        className="size-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsPlaying(true)}
      // aria-label : sans lui, un lecteur d'écran annoncerait juste "bouton".
      aria-label={`Lire la vidéo : ${title}`}
      className="group relative size-full overflow-hidden bg-card/75 border border-white/5 cursor-pointer"
    >
      <img
        src={getYouTubeThumbnail(videoId)}
        alt=""
        // loading="lazy" : le navigateur ne télécharge la miniature que
        // lorsqu'elle approche de la zone visible.
        loading="lazy"
        className="size-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
      />

      <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors duration-150 group-hover:bg-black/10">
        <span className="flex items-center justify-center w-16 h-11 bg-black/70 transition-colors duration-150 group-hover:bg-accent-500">
          <svg className="size-6 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}

YouTubeEmbed.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default YouTubeEmbed;
