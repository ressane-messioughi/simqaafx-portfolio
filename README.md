# SimQaaFX — Portfolio

Site vitrine d'un créateur de contenus RP et éditeur vidéo.
**React 19 + Vite + Tailwind CSS v4**, sans backend ni API.

Le projet est né de la migration d'un thème Nunjucks (`theme-122212`), conçu
pour une plateforme e-commerce propriétaire, vers un site autonome — puis d'une
refonte complète de l'interface d'après une maquette.

---

## Démarrer

### Sans npm — voir le site

`dist/` contient le site déjà compilé : HTML, CSS et JS statiques.

```bash
cd dist
python3 -m http.server 8000    # ou : php -S localhost:8000
```

> **Pourquoi un serveur et pas un double-clic sur `index.html` ?** En `file://`,
> le navigateur bloque le chargement des modules JavaScript (politique CORS).
> Python et PHP sont préinstallés sur macOS.

> **Limite :** accéder directement à `/projets` renverra une 404, car le fichier
> `dist/projets.html` n'existe pas — c'est React qui gère les routes côté
> navigateur. La navigation depuis l'accueil fonctionne. La configuration Nginx
> plus bas règle ce point en production.

### Avec npm — développer

```bash
npm install
npm run dev      # http://localhost:5173
```

| Commande          | Rôle                                    |
| ----------------- | --------------------------------------- |
| `npm run dev`     | Serveur de développement                |
| `npm run build`   | Génère `dist/` pour la production       |
| `npm run preview` | Prévisualise le `dist/` généré          |
| `npm run lint`    | Vérifie la qualité du code (ESLint)     |

---

## Déployer sur un VPS

```bash
npm run build
scp -r dist/* user@mon-vps:/var/www/simqaafx/
```

```nginx
server {
    listen 80;
    server_name simqaafx.fr;
    root /var/www/simqaafx;
    index index.html;

    # ESSENTIEL pour une application à page unique : toute URL inconnue
    # doit renvoyer index.html, sinon /projets répond 404.
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## Architecture

```
src/
├── data/                    ← LE CONTENU (à modifier en priorité)
│   ├── settings.js            marque, menu, pied de page
│   ├── videos.js              catalogue des 30 vidéos
│   └── pages.js               sections de chaque page
├── components/
│   ├── SectionRenderer.jsx    registre type → composant
│   ├── layout/                gabarit commun
│   ├── sections/              blocs de page
│   └── ui/                    éléments réutilisables
├── pages/                     une page = une route
├── hooks/                     logique réutilisable
└── utils/                     fonctions pures
```

### Le principe

Une page est un tableau de sections décrites par des **données** :

```js
export const homeSections = [
  { id: 'hero',    type: 'hero',         properties: { … } },
  { id: 'projets', type: 'project-grid', properties: { projects } },
];
```

`SectionRenderer` lit ce tableau et affiche le composant correspondant à chaque
`type`. **Réordonner ou ajouter une section ne demande de modifier aucun
composant** — uniquement `src/data/pages.js`.

Types disponibles : `hero`, `stats`, `project-grid`, `short-grid`, `cta`.

### Routes

| URL                 | Contenu                                     |
| ------------------- | ------------------------------------------- |
| `/`                 | Accueil (ancres `#a-propos`, `#projets`, `#videos`, `#contact`) |
| `/projets`          | Les 16 réalisations longues                 |
| `/videos`           | Les 14 formats courts                       |
| `/mentions-legales` | Mentions légales                            |
| `*`                 | Page 404                                    |

---

## Le design

La charte n'a pas été estimée à l'œil : chaque couleur a été **échantillonnée
pixel par pixel** dans la maquette de référence, puis déclarée une seule fois
dans `src/index.css`.

| Rôle          | Valeur    |
| ------------- | --------- |
| Fond de page  | `#060910` |
| Cartes        | `#0c1018` |
| Violet        | `#8b4fff` |
| Indigo        | `#6349fa` |
| Bleu          | `#4c82ff` |
| Texte atténué | `#929cb4` |

Le titre de la bannière et les boutons principaux utilisent le dégradé
violet → bleu (`.text-gradient` et `.bg-gradient-accent`).

---

## Choix techniques notables

- **Chargement des vidéos différé.** Une iframe YouTube pèse ~700 Ko ; les 30
  vidéos chargées d'emblée dépasseraient 20 Mo. Seule la miniature s'affiche,
  l'iframe n'est créée qu'au clic.
- **Miniatures auto-hébergées.** Elles sont téléchargées dans
  `public/img/videos/` plutôt que pointées sur `i.ytimg.com` : aucune requête
  n'est envoyée à Google avant que le visiteur ne lance une vidéo.
- **Lecture via `youtube-nocookie.com`**, qui limite les traceurs publicitaires.
- **Zéro dépendance CDN.** Font Awesome, particles.js et lite-youtube-embed ont
  été remplacés par du code local (`ui/Icons.jsx`).
- **Un seul `<main>` et un seul `<h1>` par page**, vérifiés automatiquement.
- **Accessibilité** : lien d'évitement, `aria-label` sur les boutons-icônes,
  `aria-expanded` sur les menus dépliants, focus visible, `prefers-reduced-motion`.

---

## À compléter avant mise en ligne

- [ ] **`src/pages/LegalPage.jsx`** — les champs entre crochets doivent être
      remplis. Les mentions légales sont une **obligation** en France
      (loi LCEN, art. 6-III).
- [ ] **`src/data/settings.js`** — les URL des réseaux sociaux valent `null` :
      les icônes s'affichent en grisé tant qu'elles ne sont pas renseignées.
- [ ] **`public/img/hero.png`** et **`public/img/logo.png`** — extraits de la
      maquette en résolution 1×, donc un peu doux sur écran retina. À remplacer
      par les fichiers sources.
- [ ] **Chiffres de la section statistiques** — « 3+ années » et « 100% passion »
      viennent de la maquette ; « +30 vidéos » est calculé automatiquement.
- [x] **Orthographe du nom** — c'est bien « SimQaaFX », avec un Q. La maquette
      de référence l'orthographiait « SimOaaFX » : c'était une coquille.
      Attention, le visuel `hero.png` en est extrait et porte encore la
      mauvaise graphie sur le sweat — il faudra le régénérer.

---

## Stack

React 19 · React Router 7 · Vite 7 · Tailwind CSS 4 · ESLint 9
