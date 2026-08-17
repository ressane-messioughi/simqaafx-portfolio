/**
 * Contenu des pages.
 *
 * Chaque page est un simple tableau de "sections". Une section = un type +
 * ses propriétés. C'est la transposition directe de `components_order` +
 * `components` du thème Nunjucks : l'ordre du tableau est l'ordre d'affichage.
 *
 * Pour ajouter une section à l'accueil : ajoute un objet dans le tableau.
 * Aucun composant à modifier. Les types disponibles sont listés dans
 * src/components/SectionRenderer.jsx
 */

/** Vidéos RP réalisées (27 vidéos). */
const videosRp = [
  'https://www.youtube.com/watch?v=jpvAmbf5_I4',
  'https://www.youtube.com/shorts/AC4_KuyZHrk',
  'https://www.youtube.com/shorts/8_RmcBggOrA',
  'https://www.youtube.com/watch?v=hnU6qi2rAmg',
  'https://www.youtube.com/shorts/r4N6YxE3tII',
  'https://youtu.be/ggDtAd6uuPA',
  'https://www.youtube.com/shorts/5HRRLRIyk5c',
  'https://www.youtube.com/shorts/LVziW7BSk5g',
  'https://www.youtube.com/shorts/KtD7uC4LCn4',
  'https://www.youtube.com/shorts/F7aAlx-V5vM',
  'https://www.youtube.com/shorts/_4etmxTMoBo',
  'https://youtube.com/shorts/lvHnUF1yNPU?si=SojBhSIlKYTvtmww',
  'https://www.youtube.com/shorts/LoF4wlkN7xc',
  'https://youtu.be/hvWYICZB0_g',
  'https://www.youtube.com/shorts/nDQ79xt7XhU',
  'https://youtu.be/guMAmSR-l-A?si=37Z5fgtw2Qcun1j_',
  'https://youtu.be/3AayvjK5F60?si=_Jzw9jPcdSg-gL9c',
  'https://youtu.be/XV1YyIr6OSY?si=X2Lg0L_M1D5Ek4jl',
  'https://www.youtube.com/watch?v=-oikxukbAFg',
  'https://www.youtube.com/watch?v=qJODreU2TNI',
  'https://www.youtube.com/watch?v=sBAPwD27fPg',
  'https://www.youtube.com/watch?v=r9jgcNlknK8',
  'https://www.youtube.com/watch?v=exaVB2MwI1Y',
  'https://www.youtube.com/watch?v=65UHE85noJU',
  'https://www.youtube.com/watch?v=VepqCGC9vYg',
  'https://www.youtube.com/watch?v=XgjS0WrLjUs',
  'https://www.youtube.com/watch?v=_cwErGPrB-k',
].map((link) => ({ link, aspectRatio: '16/9' }));

/** Vidéos IRL réalisées (3 vidéos). */
const videosIrl = [
  'https://youtu.be/adQ_8OE9hAU',
  'https://www.youtube.com/shorts/4VXq8a0ef30',
  'https://youtube.com/shorts/rBYJ0JDj4zg?feature=share',
].map((link) => ({ link, aspectRatio: '16/9' }));

/** Page d'accueil — même ordre de sections que le thème d'origine. */
export const homeSections = [
  {
    id: 'hero',
    type: 'hero',
    properties: {
      title: 'Bienvenue sur SimQaaFX !',
      // Ce fragment du titre sera mis en couleur d'accentuation.
      titleAccent: 'SimQaaFX',
      subtitle: 'Commande ton trailer FIVEM',
      alignment: 'center',
      height: 'short',
      textWidth: 'medium',
      buttons: [],
    },
  },
  {
    id: 'commandes',
    type: 'text-block',
    properties: {
      title: null,
      text: "Les commandes s'effectuent sur le Discord de VPictures :",
      showBackground: true,
      titleAlignment: 'center',
      contentAlignment: 'center',
      buttons: [
        {
          text: 'Discord VPictures',
          icon: 'fab fa-discord',
          link: 'https://discord.gg/469J9SJMVK',
          style: 'regular',
          newTab: true,
        },
      ],
    },
  },
  {
    id: 'videos-rp',
    type: 'video-gallery',
    properties: {
      title: 'Vidéos RP réalisées',
      itemsPerRow: 3,
      videos: videosRp,
    },
  },
  {
    id: 'videos-irl',
    type: 'video-gallery',
    properties: {
      title: 'Vidéos IRL réalisées',
      itemsPerRow: 2,
      videos: videosIrl,
    },
  },
  {
    id: 'staff',
    type: 'features',
    properties: {
      title: 'STAFF',
      centered: true,
      features: [
        {
          title: 'FONDATEUR',
          description: 'Qasss',
          icon: 'fas fa-crown',
        },
      ],
    },
  },
];

/** Page FAQ. */
export const faqSections = [
  {
    id: 'faq',
    type: 'faq',
    properties: {
      title: 'Questions fréquentes',
      constrained: true,
      isPageTitle: true,
      items: [
        {
          question: 'Comment passer commande ?',
          answer:
            'Tout se passe sur le Discord de VPictures. Rejoins le serveur, ouvre un ticket et décris ton projet : durée souhaitée, ambiance, serveur RP concerné.',
        },
        {
          question: 'Quels sont les délais de réalisation ?',
          answer:
            'Comptez en moyenne 3 à 7 jours pour un trailer, selon la charge en cours et la complexité du montage. Le délai exact est confirmé à la commande.',
        },
        {
          question: 'Quels types de vidéos réalisez-vous ?',
          answer:
            'Principalement des trailers FiveM et des vidéos RP, mais aussi des formats IRL. Les formats courts (Shorts) comme longs sont possibles.',
        },
        {
          question: 'Puis-je demander des modifications ?',
          answer:
            'Oui. Une phase de retours est prévue après la première version afin d’ajuster le montage, la musique ou le rythme.',
        },
        {
          question: 'Quels sont les tarifs ?',
          answer:
            'Les tarifs dépendent de la durée et du travail de montage demandé. Un devis est communiqué sur Discord avant tout démarrage.',
        },
      ],
    },
  },
];

/** Page Avis. */
export const feedbackSections = [
  {
    id: 'avis',
    type: 'feedbacks',
    properties: {
      title: 'Ils nous ont fait confiance',
      isPageTitle: true,
      feedbacks: [
        {
          id: 1,
          author: 'Lucas',
          rating: 5,
          date: '2026-06-14',
          message:
            'Trailer livré rapidement et exactement dans l’ambiance que je voulais pour mon serveur. Le montage est propre, rien à redire.',
          reply: 'Merci beaucoup Lucas, au plaisir de retravailler ensemble !',
          repliedAt: '2026-06-15',
        },
        {
          id: 2,
          author: 'Maya',
          rating: 5,
          date: '2026-05-28',
          message:
            'Très bon contact sur Discord, à l’écoute des retours. Le rendu final dépasse ce que j’imaginais.',
          reply: null,
          repliedAt: null,
        },
        {
          id: 3,
          author: 'Théo',
          rating: 4,
          date: '2026-05-02',
          message:
            'Bon rapport qualité-prix. Quelques allers-retours nécessaires sur la musique, mais le résultat est au rendez-vous.',
          reply: null,
          repliedAt: null,
        },
        {
          id: 4,
          author: 'Sofiane',
          rating: 5,
          date: '2026-04-19',
          message: 'Rapide, sérieux, et le short a très bien marché sur les réseaux. Je recommande.',
          reply: 'Content que ça ait bien tourné, merci pour ta confiance !',
          repliedAt: '2026-04-20',
        },
      ],
    },
  },
];
