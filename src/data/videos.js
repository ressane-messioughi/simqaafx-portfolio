/**
 * Catalogue des vidéos — DONNÉES RÉELLES.
 *
 * Chaque entrée correspond à une vidéo réellement publiée sur la chaîne :
 * l'identifiant `id` est l'identifiant YouTube, et la miniature a été
 * téléchargée depuis YouTube dans public/img/videos/.
 *
 * Les titres YouTube bruts (« Trailer - NoMercy V3 [GTA RP] ») sont ici
 * séparés en deux champs : `title` = le projet, `kind` = le format. C'est ce
 * découpage qui alimente le titre et le sous-titre des cartes.
 *
 * Pour ajouter une vidéo : ajouter une entrée ici, puis déposer sa miniature
 * dans public/img/videos/<id>.jpg
 */

/** Construit les champs dérivés pour éviter de répéter les chemins. */
const build = (video) => ({
  ...video,
  url: `https://www.youtube.com/watch?v=${video.id}`,
  thumbnail: `/img/videos/${video.id}.jpg`,
});

/**
 * Réalisations longues : trailers, teasers, cinématiques.
 * Ce sont les pièces maîtresses du portfolio.
 */
export const projects = [
  { id: 'jpvAmbf5_I4', title: 'NoMercy V3', kind: 'Trailer', badge: 'RP' },
  { id: 'hnU6qi2rAmg', title: 'Midnight', kind: 'Trailer', badge: 'RP' },
  { id: 'XV1YyIr6OSY', title: 'FlashStar WL — Légal', kind: 'Trailer', badge: 'RP' },
  { id: '-oikxukbAFg', title: 'FlashStar WL — Illégal', kind: 'Trailer', badge: 'RP' },
  { id: '3AayvjK5F60', title: 'NoMercy V2', kind: 'Trailer', badge: 'RP' },
  { id: 'ggDtAd6uuPA', title: 'Chronos Project RP', kind: 'Teaser', badge: 'RP' },
  { id: 'hvWYICZB0_g', title: 'Beavers', kind: 'Trailer', badge: 'RP' },
  { id: 'qJODreU2TNI', title: 'FrancePVP V2', kind: 'Trailer', badge: 'RP' },
  { id: 'sBAPwD27fPg', title: 'Opération Revenge', kind: 'Trailer', badge: 'RP' },
  { id: 'r9jgcNlknK8', title: 'Opération Revenge', kind: 'Teaser', badge: 'RP' },
  {
    id: 'guMAmSR-l-A',
    title: 'Déclaration de guerre NYC × Miami',
    kind: 'NoMercy',
    badge: 'RP',
  },
  { id: 'exaVB2MwI1Y', title: 'Famille Smith — Diamond City', kind: 'Montage', badge: 'RP' },
  {
    id: '65UHE85noJU',
    title: 'Island Survivor',
    kind: 'Cinématique de fin',
    badge: 'RP',
  },
  {
    id: '_cwErGPrB-k',
    title: 'Island Survivor',
    kind: 'Weazel Studio',
    badge: 'RP',
  },
  { id: 'XgjS0WrLjUs', title: 'John Sur Mars', kind: 'Teaser — Weazel Studio', badge: 'RP' },
  { id: 'VepqCGC9vYg', title: 'JT Weazel News #3', kind: 'Journal télévisé', badge: 'RP' },
].map(build);

/** Formats courts : TikTok RP et réalisations hors jeu. */
export const shorts = [
  { id: 'AC4_KuyZHrk', title: 'Last Frontière', kind: 'TikTok', badge: 'Short' },
  { id: '8_RmcBggOrA', title: 'Last Frontière', kind: 'TikTok', badge: 'Short' },
  { id: 'r4N6YxE3tII', title: 'Last Frontière', kind: 'TikTok', badge: 'Short' },
  { id: 'LoF4wlkN7xc', title: 'Last Frontière', kind: 'TikTok', badge: 'Short' },
  { id: '5HRRLRIyk5c', title: 'Evermount', kind: 'TikTok', badge: 'Short' },
  { id: 'LVziW7BSk5g', title: 'Evermount', kind: 'TikTok', badge: 'Short' },
  { id: 'KtD7uC4LCn4', title: 'Rivermount County', kind: 'TikTok', badge: 'Short' },
  { id: 'F7aAlx-V5vM', title: 'Rivermount County', kind: 'TikTok', badge: 'Short' },
  { id: '_4etmxTMoBo', title: 'Codex', kind: 'TikTok', badge: 'Short' },
  { id: 'lvHnUF1yNPU', title: 'Ashmore Country', kind: 'TikTok', badge: 'Short' },
  { id: 'nDQ79xt7XhU', title: 'Ruthless', kind: 'TikTok', badge: 'Short' },
  { id: 'adQ_8OE9hAU', title: 'Loyaltiz', kind: 'Motion design', badge: 'IRL' },
  { id: '4VXq8a0ef30', title: 'Albayt Agency — Annonce 624', kind: 'Immobilier', badge: 'IRL' },
  { id: 'rBYJ0JDj4zg', title: 'VPictures', kind: 'After Effects', badge: 'IRL' },
].map(build);
