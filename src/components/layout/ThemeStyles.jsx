import { useEffect } from 'react';
import { theme } from '../../data/settings';
import { hexToRgb } from '../../utils/colors';

/**
 * Applique la charte graphique définie dans src/data/settings.js.
 *
 * Le thème d'origine injectait ces variables CSS côté serveur, dans un
 * <style> du <head> (voir layouts/master.njk). Sans serveur, c'est React qui
 * s'en charge : on écrit les variables sur l'élément racine du document.
 *
 * Ce composant n'affiche RIEN (il retourne null). C'est un usage tout à fait
 * légitime : un composant peut n'exister que pour son effet de bord.
 *
 * Résultat : changer accentColor dans settings.js recolore tout le site,
 * sans toucher à une seule classe Tailwind.
 */
function ThemeStyles() {
  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty('--cl-accent', hexToRgb(theme.accentColor));
    root.style.setProperty('--cl-background', hexToRgb(theme.backgroundColor));
    root.style.setProperty('--cl-card', hexToRgb(theme.cardColor));
    root.style.setProperty('--cl-t-primary', hexToRgb(theme.textPrimaryColor));
    root.style.setProperty('--cl-t-accent', hexToRgb(theme.textAccentColor));
    root.style.setProperty('--font-theme', `'${theme.font}', sans-serif`);
  }, []); // [] : les réglages sont statiques, on n'exécute l'effet qu'une fois.

  return null;
}

export default ThemeStyles;
