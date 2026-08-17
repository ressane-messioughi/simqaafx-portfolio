# SimQaaFX — Site vitrine

Portfolio de trailers FiveM et de vidéos RP.
Migration du thème Nunjucks `theme-122212` vers **React 19 + Vite + Tailwind CSS v4**.

---

## Démarrer

### Sans npm — voir le site

Le dossier `dist/` contient le site déjà compilé : du HTML, du CSS et du JavaScript
statiques. Aucun outil de développement n'est nécessaire pour l'afficher.

```bash
cd dist
python3 -m http.server 8000
# ou : php -S localhost:8000
```

Puis ouvrir <http://localhost:8000>.

> **Pourquoi un serveur, et pas un double-clic sur `index.html` ?**
> En `file://`, le navigateur bloque le chargement des modules JavaScript par
> sécurité (politique CORS). Python et PHP sont préinstallés sur macOS : aucune
> installation à prévoir.

> **Limite connue :** en accédant directement à une URL interne comme
> `/faq`, le serveur statique renverra une erreur 404, car le fichier
> `dist/faq.html` n'existe pas — c'est React qui gère les routes côté
> navigateur. La navigation depuis la page d'accueil fonctionne normalement.
> La configuration Nginx plus bas règle ce point en production.

### Avec npm — développer

```bash
npm install     # une seule fois
npm run dev     # http://localhost:5173, rechargement à chaud
```

| Commande          | Rôle                                          |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Serveur de développement                      |
| `npm run build`   | Génère le dossier `dist/` pour la production   |
| `npm run preview` | Prévisualise le `dist/` généré                |
| `npm run lint`    | Vérifie la qualité du code (ESLint)           |

---

## Déployer sur un VPS

```bash
npm run build
scp -r dist/* user@mon-vps:/var/www/simqaafx/
```

Configuration Nginx :

```nginx
server {
    listen 80;
    server_name simqaafx.fr;
    root /var/www/simqaafx;
    index index.html;

    # ESSENTIEL pour une application React à page unique :
    # toute URL inconnue doit renvoyer index.html, sinon /faq répond 404.
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## Architecture

```
src/
├── data/                 ← LE CONTENU DU SITE (à modifier en priorité)
│   ├── settings.js         couleurs, menu, pied de page, annonces
│   └── pages.js            sections de chaque page, vidéos, FAQ, avis
├── components/
│   ├── SectionRenderer.jsx registre type → composant
│   ├── layout/             gabarit commun (en-tête, pied de page, thème)
│   ├── sections/           blocs de page réutilisables
│   └── ui/                 petits éléments (titre, boutons, vidéo)
├── pages/                  une page = une route
├── hooks/                  logique réutilisable (titre de l'onglet)
└── utils/                  fonctions pures (dates, couleurs, YouTube)
```

### Le principe à retenir

Le thème d'origine décrivait ses pages dans un fichier `settings.json`, et le
serveur assemblait les composants listés dans `components_order`. **Ce
fonctionnement est conservé.**

Une page est un simple tableau de sections :

```js
export const homeSections = [
  { id: 'hero', type: 'hero', properties: { title: '…' } },
  { id: 'videos-rp', type: 'video-gallery', properties: { videos: […] } },
];
```

`SectionRenderer` lit ce tableau et affiche le composant correspondant à chaque
`type`. Conséquence pratique : **réordonner ou ajouter une section ne demande
de modifier aucun composant**, uniquement `src/data/pages.js`.

### Ajouter un type de section

1. Créer le composant dans `src/components/sections/`.
2. L'ajouter au registre `SECTION_COMPONENTS` de `SectionRenderer.jsx`.
3. L'utiliser depuis `src/data/pages.js`.

Types disponibles : `hero`, `text-block`, `text-media-block`, `video-gallery`,
`image-gallery`, `features`, `stats`, `faq`, `feedbacks`.

---

## Correspondance avec le thème Nunjucks

| Thème d'origine                     | Équivalent React                            |
| ----------------------------------- | ------------------------------------------- |
| `{{ variable }}`                    | `{variable}`                                |
| `{% if %}`                          | `{condition && …}`                          |
| `{% for %}`                         | `.map()`                                    |
| `{% render_component %}`            | `SectionRenderer.jsx`                       |
| `{% render_snippet %}`              | import d'un composant                       |
| `{{ templateContent }}`             | `<Outlet />` (React Router)                 |
| `layouts/master.njk`                | `components/layout/Layout.jsx`              |
| Alpine `x-data` / `x-show`          | `useState`                                  |
| Alpine `x-init`                     | `useEffect`                                 |
| Filtre `ytEmbedVideoId`             | `utils/youtube.js`                          |
| Filtre `hex_to_rgb`                 | `utils/colors.js`                           |
| Filtre `formatDate`                 | `utils/format.js`                           |
| `snippets/meta-tags.njk`            | `hooks/usePageTitle.js`                     |
| `particles.js` (CDN)                | `layout/ParticlesBackground.jsx`            |
| `lite-youtube-embed` (CDN)          | `ui/YouTubeEmbed.jsx`                       |

### Ce qui a été retiré

Tout le module boutique, qui dépendait du serveur de la plateforme et n'a plus
d'objet sur un site vitrine : catalogue produits, panier, paiement, commandes,
factures, comptes clients, page de statut des produits, sélecteur de devise.

### Ce qui a été amélioré

- **Un seul `<main>` par page**, déclaré dans `Layout.jsx` (l'original en avait
  plusieurs selon les pages). Vérifié automatiquement.
- **Un seul `<h1>` par page**, contre plusieurs auparavant : chaque titre de
  section utilisait `<h1>`, ce qui casse la hiérarchie pour les lecteurs
  d'écran et le référencement.
- **Chargement des vidéos différé** : les 30 vidéos affichaient auparavant
  autant d'iframes YouTube (~20 Mo). Seule la miniature est chargée, l'iframe
  n'apparaît qu'au clic (~450 Ko au chargement).
- **Deux dépendances externes supprimées** (`particles.js`, `lite-youtube-embed`).
- **`text-image-block` et `text-video-block` fusionnés** en un seul composant
  (ils étaient identiques à 95 %).
- **Lien d'évitement, `aria-label`, `aria-expanded`, focus visible** ajoutés.
- **`prefers-reduced-motion` respecté** (animations désactivées si l'utilisateur
  l'a demandé au niveau système).

---

## À compléter avant mise en ligne

- [ ] **`src/pages/LegalPage.jsx`** — les mentions légales contiennent des
      champs entre crochets à remplir. C'est une **obligation légale** en France
      (loi LCEN, article 6-III) pour tout site accessible au public.
- [ ] **`src/data/pages.js`** — les avis de la page « Avis » sont des exemples
      fictifs, à remplacer par de vrais retours clients ou à supprimer.
      Publier de faux avis constitue une pratique commerciale trompeuse.
- [ ] **`src/data/pages.js`** — les réponses de la FAQ (délais, tarifs) sont des
      propositions à valider.
- [ ] **`public/logo.svg`** et **`public/favicon.svg`** — logos provisoires, à
      remplacer par les vrais fichiers.

---

## Stack

React 19 · React Router 7 · Vite 7 · Tailwind CSS 4 · ESLint 9
