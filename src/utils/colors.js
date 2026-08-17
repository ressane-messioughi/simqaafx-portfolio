/**
 * Remplace le filtre Nunjucks `hex_to_rgb` du thème d'origine.
 *
 * Pourquoi convertir ? Tailwind a besoin des composantes séparées « R G B »
 * pour pouvoir appliquer une opacité (bg-card/75). Avec un code hexadécimal
 * brut, `bg-card/75` serait sans effet.
 *
 * @param {string} hex - Couleur au format #rgb ou #rrggbb.
 * @returns {string} Les composantes séparées par des espaces, ex. "101 113 255".
 */
export function hexToRgb(hex) {
  if (typeof hex !== 'string') return '0 0 0';

  let value = hex.replace('#', '').trim();

  // Forme courte (#fff) : on double chaque caractère -> ffffff
  if (value.length === 3) {
    value = value
      .split('')
      .map((char) => char + char)
      .join('');
  }

  if (value.length !== 6) return '0 0 0';

  const number = parseInt(value, 16);

  if (Number.isNaN(number)) return '0 0 0';

  const r = (number >> 16) & 255;
  const g = (number >> 8) & 255;
  const b = number & 255;

  return `${r} ${g} ${b}`;
}
