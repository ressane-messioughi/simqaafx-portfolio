/**
 * Remplace les filtres Nunjucks `formatDate` et `renderString`.
 */

/**
 * Formate une date au format français.
 *
 * @param {string} isoDate - Date ISO, ex. "2026-06-14".
 * @returns {string} Ex. "14 juin 2026".
 */
export function formatDate(isoDate) {
  if (!isoDate) return '';

  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) return '';

  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/**
 * Découpe un texte pour mettre en évidence un fragment.
 *
 * Le thème d'origine écrivait du HTML directement dans le JSON de config
 * (`Bienvenu sur <span class="text-accent-500">SimQaaFX</span> !`). En React,
 * afficher ce HTML imposerait `dangerouslySetInnerHTML`, qui ouvre une faille
 * XSS si le contenu vient un jour d'ailleurs que d'un fichier local.
 *
 * On préfère donc décrire l'intention (« mets CE mot en avant ») et laisser
 * React construire les éléments : le texte reste échappé automatiquement.
 *
 * @param {string} text - Le texte complet.
 * @param {string} [accent] - Le fragment à mettre en avant.
 * @returns {{before: string, highlighted: string, after: string}}
 */
export function splitOnAccent(text, accent) {
  if (!text) return { before: '', highlighted: '', after: '' };
  if (!accent) return { before: text, highlighted: '', after: '' };

  const index = text.indexOf(accent);

  if (index === -1) return { before: text, highlighted: '', after: '' };

  return {
    before: text.slice(0, index),
    highlighted: accent,
    after: text.slice(index + accent.length),
  };
}
