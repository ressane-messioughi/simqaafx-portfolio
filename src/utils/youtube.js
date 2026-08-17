/**
 * Remplace le filtre Nunjucks `ytEmbedVideoId` du thème d'origine.
 *
 * YouTube expose au moins quatre formes d'URL, et le portfolio les utilise
 * toutes. On les couvre avec une seule expression régulière :
 *
 *   https://www.youtube.com/watch?v=ID
 *   https://youtu.be/ID
 *   https://www.youtube.com/shorts/ID
 *   https://www.youtube.com/embed/ID
 *
 * Un identifiant YouTube fait toujours 11 caractères parmi [A-Za-z0-9_-],
 * ce qui permet d'ignorer proprement les paramètres qui suivent (?si=...).
 *
 * @param {string} url - L'URL complète de la vidéo.
 * @returns {string|null} L'identifiant, ou null si l'URL est invalide.
 */
export function getYouTubeId(url) {
  if (typeof url !== 'string') return null;

  const match = url.match(/(?:v=|youtu\.be\/|\/shorts\/|\/embed\/)([A-Za-z0-9_-]{11})/);

  return match ? match[1] : null;
}

/**
 * URL de la miniature d'une vidéo.
 *
 * On utilise `hqdefault` plutôt que `maxresdefault` : cette dernière n'existe
 * pas pour toutes les vidéos (notamment les Shorts) et renvoie alors une
 * image cassée.
 *
 * @param {string} videoId - L'identifiant YouTube.
 * @returns {string} L'URL de la miniature.
 */
export function getYouTubeThumbnail(videoId) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}
