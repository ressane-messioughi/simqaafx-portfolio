import SectionTitle from '../components/ui/SectionTitle';
import { usePageTitle } from '../hooks/usePageTitle';
import { site } from '../data/settings';

/**
 * Mentions légales — remplace components/terms-page.njk.
 *
 * Le thème d'origine affichait ici du HTML saisi dans l'admin de la
 * plateforme, via `{{ shop.terms | safe }}`. Sans back-office, le contenu est
 * écrit directement en JSX : c'est plus sûr (pas de HTML brut injecté) et
 * il n'y a de toute façon qu'une personne pour le modifier.
 *
 * ⚠️ À COMPLÉTER : les mentions légales sont une obligation pour tout site
 * accessible au public en France (loi LCEN, art. 6-III). Les champs entre
 * crochets doivent être remplis avec tes informations réelles avant mise en
 * ligne. Je ne peux pas les inventer à ta place.
 */
function LegalPage() {
  usePageTitle('Mentions légales', `Mentions légales du site ${site.name}.`);

  return (
    <section className="py-6 lg:py-8">
      <SectionTitle as="h1">Mentions légales</SectionTitle>

      <div className="max-w-3xl mx-auto">
        <div className="bg-card/75 border border-white/5 text-t-primary/80 text-sm p-4 md:text-base md:p-6">
          <div className="prose-theme">
            <h2>Éditeur du site</h2>
            <p>
              Ce site est édité par <strong>[Nom et prénom ou raison sociale]</strong>.
              <br />
              Statut : [auto-entrepreneur / société / particulier]
              <br />
              Adresse : [adresse postale]
              <br />
              Contact : [adresse e-mail]
              <br />
              Numéro SIRET : [le cas échéant]
            </p>

            <h2>Directeur de la publication</h2>
            <p>[Nom et prénom du directeur de la publication]</p>

            <h2>Hébergement</h2>
            <p>
              Le site est hébergé par <strong>[nom de l’hébergeur]</strong>.
              <br />
              Adresse : [adresse de l’hébergeur]
              <br />
              Téléphone : [téléphone de l’hébergeur]
            </p>

            <h2>Propriété intellectuelle</h2>
            <p>
              L’ensemble des contenus présents sur ce site (montages vidéo, textes, éléments
              graphiques) est la propriété de {site.name}, sauf mention contraire. Toute
              reproduction ou réutilisation sans autorisation écrite préalable est interdite.
            </p>

            <h2>Contenus hébergés par des tiers</h2>
            <p>
              Les vidéos présentées sont hébergées par YouTube. Leur lecture n’est déclenchée
              qu’après un clic de votre part : aucune donnée n’est transmise à YouTube tant que
              vous ne lancez pas une vidéo. La lecture s’effectue ensuite via le domaine
              youtube-nocookie.com, qui limite le dépôt de traceurs publicitaires.
            </p>

            <h2>Données personnelles</h2>
            <p>
              Ce site ne collecte aucune donnée personnelle et ne dépose aucun cookie de mesure
              d’audience ou de publicité. Aucun formulaire n’y est présent : les échanges se font
              via Discord, dont la politique de confidentialité s’applique alors.
            </p>

            <h2>Contact</h2>
            <p>
              Pour toute question relative au site ou à une commande, le contact se fait sur le
              serveur Discord indiqué sur la page d’accueil.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LegalPage;
