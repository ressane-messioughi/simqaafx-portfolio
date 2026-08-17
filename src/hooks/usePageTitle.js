import { useEffect } from 'react';
import { site } from '../data/settings';

/**
 * Met à jour le titre de l'onglet et la méta-description de la page.
 *
 * Remplace le snippet `meta-tags.njk` du thème d'origine. Sur un site rendu
 * côté serveur, chaque page arrivait avec ses propres balises <head>. Ici,
 * l'application est une SPA : il n'y a qu'un seul document HTML, il faut donc
 * modifier le <head> à chaque changement de page.
 *
 * C'est un effet de bord (on touche au DOM en dehors de React) : c'est
 * exactement le rôle de useEffect.
 *
 * @param {string} title - Titre de la page, sans le nom du site.
 * @param {string} [description] - Méta-description de la page.
 */
export function usePageTitle(title, description) {
  useEffect(() => {
    document.title = title ? `${title} — ${site.name}` : site.name;

    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', description);
    }
  }, [title, description]);
}
