/**
 * Configuration globale du site.
 *
 * Équivalent du bloc "global" de settings.json dans le thème Nunjucks.
 * C'est LE fichier à modifier pour changer les couleurs, le menu, le pied de
 * page ou les annonces : aucun composant ne contient de valeur en dur.
 */

export const site = {
  name: 'SimQaaFX',
  description: 'Création de trailers FiveM et de vidéos RP sur mesure.',
  logoUrl: '/logo.svg',
  socials: {
    discord: 'https://discord.com/invite/469J9SJMVK',
    youtube: null,
    instagram: null,
    tiktok: null,
    telegram: null,
  },
};

/** Charte graphique — reprise à l'identique du thème d'origine. */
export const theme = {
  accentColor: '#6571ff',
  backgroundColor: '#06060c',
  cardColor: '#0b0b11',
  textPrimaryColor: '#ffffff',
  textAccentColor: '#ffffff',
  font: 'Play',
  /** Fond animé en particules (remplace particles.js). */
  particles: true,
};

/** Bandeau d'annonces défilantes, en haut de page. */
export const announcements = [
  { text: '💥 MP moi @qass2brice', link: null, newTab: false },
  { text: '⌛ Tu attends quoi pour avoir ton Trailer FIVEM ?', link: null, newTab: false },
  { text: '⭐ Prix imbattables', link: null, newTab: false },
];

/** Menu de navigation. `shape` vaut 'regular' ou 'button'. */
export const navbar = {
  showLogo: true,
  showSiteName: false,
  links: [
    { text: 'Accueil', link: '/', shape: 'regular' },
    { text: 'FAQ', link: '/faq', shape: 'regular' },
    { text: 'Avis', link: '/avis', shape: 'regular' },
    {
      text: 'Discord',
      link: 'https://discord.com/invite/469J9SJMVK',
      shape: 'button',
      newTab: true,
    },
  ],
};

/** Pied de page. */
export const footer = {
  showLogo: true,
  showSiteName: true,
  showSocials: true,
  copyright: `Copyright © ${site.name} ${new Date().getFullYear()}`,
  links: [{ text: 'Mentions légales', link: '/mentions-legales', newTab: false }],
};
