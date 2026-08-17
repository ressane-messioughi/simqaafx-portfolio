/**
 * Configuration globale du site.
 *
 * Un seul fichier à modifier pour changer la marque, le menu ou le pied de
 * page. Aucun composant ne contient de texte en dur.
 */

export const site = {
  name: 'SimOaaFX',
  tagline: 'Créateur de contenus RP & éditeur vidéo.',
  description:
    'Créateur de contenus RP et éditeur vidéo. Découvrez mes réalisations à travers divers projets immersifs et créatifs.',
  logoUrl: '/img/logo.png',
  discordUrl: 'https://discord.com/invite/469J9SJMVK',
  /** Disponibilité affichée sous la bannière. */
  available: true,
  availableLabel: 'Disponible pour de nouveaux projets',
};

/**
 * Menu principal.
 *
 * Les liens commençant par « # » sont des ancres : ils font défiler la page
 * d'accueil jusqu'à la section correspondante, sans changer d'URL.
 */
export const navbar = {
  links: [
    { text: 'À Propos', link: '#a-propos' },
    { text: 'Projets', link: '#projets' },
    { text: 'Contact', link: '#contact' },
  ],
  cta: { text: 'Contactez-moi', link: '#contact' },
};

export const footer = {
  description:
    'Créateur de contenus RP passionné. Montages, teasers, présentations & bien plus encore.',
  columns: [
    {
      title: 'Navigation',
      links: [
        { text: 'À Propos', link: '#a-propos' },
        { text: 'Projets', link: '#projets' },
        { text: 'Vidéos', link: '#videos' },
        { text: 'Contact', link: '#contact' },
      ],
    },
    {
      title: 'Outils',
      links: [
        { text: 'Premiere Pro', link: null },
        { text: 'After Effects', link: null },
        { text: 'Photoshop', link: null },
        { text: 'CapCut', link: null },
      ],
    },
  ],
  socials: [
    { network: 'youtube', url: null },
    { network: 'twitter', url: null },
    { network: 'instagram', url: null },
    { network: 'mail', url: null },
  ],
  copyright: `© ${new Date().getFullYear()} SimOaaFX. Tous droits réservés.`,
  signature: 'Fait avec passion',
};
