import { Link } from 'react-router-dom';
import { footer, site } from '../../data/settings';
import Icon from '../ui/Icons';

const SOCIAL_LABELS = {
  youtube: 'YouTube',
  twitter: 'Twitter',
  instagram: 'Instagram',
  mail: 'E-mail',
};

/**
 * Pied de page : une colonne de marque + les colonnes de liens, puis une
 * barre de bas de page.
 *
 * Les réseaux sociaux dont l'URL vaut null sont filtrés : mieux vaut ne rien
 * afficher qu'une icône qui ne mène nulle part.
 */
function Footer() {
  // Style commun aux icônes, qu'elles soient cliquables ou non.
  const socialClasses =
    'flex size-9 items-center justify-center rounded-lg border border-white/[0.08] bg-surface text-muted transition-colors duration-150';

  return (
    <footer className="mt-12 border-t border-white/[0.06]">
      <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <img
                src={site.logoUrl}
                alt=""
                className="size-8 object-contain"
                width="32"
                height="32"
              />
              <span className="text-base font-semibold">{site.name}</span>
            </div>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{footer.description}</p>

            <ul className="mt-6 flex gap-2.5">
              {footer.socials.map((social) => (
                <li key={social.network}>
                  {social.url ? (
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={SOCIAL_LABELS[social.network]}
                      className={`${socialClasses} hover:border-white/20 hover:text-white`}
                    >
                      <Icon name={social.network} className="size-4" />
                    </a>
                  ) : (
                    // URL pas encore renseignée : on garde la présence
                    // visuelle de la maquette, mais sans lien mort. Un
                    // <a href="#"> serait un piège au clavier et pour les
                    // lecteurs d'écran.
                    <span
                      className={`${socialClasses} opacity-60`}
                      title={`${SOCIAL_LABELS[social.network]} — lien à renseigner`}
                    >
                      <Icon name={social.network} className="size-4" />
                      <span className="sr-only">
                        {SOCIAL_LABELS[social.network]} (lien non renseigné)
                      </span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {footer.columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-sm font-semibold">{column.title}</h2>

              <ul className="mt-4 flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.text}>
                    {link.link ? (
                      <a
                        href={link.link}
                        className="text-sm text-muted transition-colors duration-150 hover:text-white"
                      >
                        {link.text}
                      </a>
                    ) : (
                      // Pas de lien : c'est une simple mention (les outils
                      // utilisés). Un <a href="#"> serait trompeur au clavier.
                      <span className="text-sm text-muted">{link.text}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col-reverse items-start justify-between gap-4 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <p className="text-xs text-muted">{footer.copyright}</p>
            <Link
              to="/mentions-legales"
              className="text-xs text-muted underline-offset-2 transition-colors hover:text-white hover:underline"
            >
              Mentions légales
            </Link>
          </div>

          <p className="flex items-center gap-1.5 text-xs text-muted">
            {footer.signature}
            <span className="text-violet" aria-hidden="true">
              ♥
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
