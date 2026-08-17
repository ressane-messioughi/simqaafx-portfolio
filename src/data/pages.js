/**
 * Contenu des pages.
 *
 * Chaque page est décrite par un tableau de sections : une section = un type
 * + ses propriétés, et l'ordre du tableau est l'ordre d'affichage. Réordonner
 * une page ne demande de modifier aucun composant.
 *
 * Les types disponibles sont listés dans src/components/SectionRenderer.jsx
 * Les vidéos elles-mêmes vivent dans src/data/videos.js
 */

import { projects, shorts } from './videos';

/** Page d'accueil. */
export const homeSections = [
  {
    id: 'hero',
    type: 'hero',
    properties: {
      eyebrow: 'MON PORTFOLIO',
      title: 'Bienvenue sur',
      titleGradient: 'SimOaaFX !',
      text: 'Créateur de contenus RP & éditeur vidéo. Découvrez mes réalisations à travers divers projets immersifs et créatifs.',
      image: '/img/hero.png',
      buttons: [
        { text: 'Voir mes projets', link: '#projets', style: 'primary' },
        { text: 'Me contacter', link: '#contact', style: 'secondary' },
      ],
    },
  },
  {
    id: 'stats',
    type: 'stats',
    properties: {
      stats: [
        // Chiffre calculé, pas saisi à la main : il reste juste
        // quand on ajoute une vidéo au catalogue.
        {
          icon: 'video',
          value: `+${projects.length + shorts.length}`,
          label: 'Vidéos réalisées',
        },
        { icon: 'calendar', value: '3+', label: "Années d'expérience" },
        { icon: 'users', value: '100%', label: 'Passion' },
        { icon: 'rocket', value: null, label: 'Projets uniques' },
      ],
    },
  },
  {
    id: 'projets',
    type: 'project-grid',
    properties: {
      title: 'Projets Récents',
      subtitle: 'Une sélection de mes dernières réalisations',
      action: { text: 'Voir tous les projets', link: '/projets' },
      // On n'affiche que les 9 premiers ici ; la page /projets montre tout.
      projects: projects.slice(0, 9),
    },
  },
  {
    id: 'videos',
    type: 'short-grid',
    properties: {
      title: 'Vidéos Courtes',
      subtitle: 'Quelques extraits et formats courts',
      action: { text: 'Voir toutes les vidéos', link: '/videos' },
      shorts: shorts.slice(0, 3),
    },
  },
  {
    id: 'contact',
    type: 'cta',
    properties: {
      title: 'Vous avez un projet en tête ?',
      text: 'Je suis disponible pour collaborer sur vos projets RP, montages vidéo, teasers, présentations et plus encore.',
      button: { text: 'Discutons-en', link: null },
    },
  },
];

/** Page « Tous les projets ». */
export const projectsSections = [
  {
    id: 'tous-projets',
    type: 'project-grid',
    properties: {
      title: 'Tous les projets',
      subtitle: `${projects.length} réalisations : trailers, teasers et cinématiques`,
      isPageTitle: true,
      projects,
    },
  },
];

/** Page « Toutes les vidéos courtes ». */
export const videosSections = [
  {
    id: 'toutes-videos',
    type: 'short-grid',
    properties: {
      title: 'Toutes les vidéos courtes',
      subtitle: `${shorts.length} formats courts : TikTok RP et réalisations hors jeu`,
      isPageTitle: true,
      showCaptions: true,
      shorts,
    },
  },
];
