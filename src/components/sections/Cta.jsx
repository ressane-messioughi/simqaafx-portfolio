import PropTypes from 'prop-types';
import Button from '../ui/Button';
import Icon from '../ui/Icons';
import { site } from '../../data/settings';

/**
 * Bandeau d'appel à l'action, en bas de page.
 *
 * Si aucun lien n'est fourni dans les données, on retombe sur l'URL Discord
 * définie dans settings.js — c'est le canal de contact réel.
 */
function Cta({ properties }) {
  const { title, text, button } = properties;

  const href = button?.link ?? site.discordUrl;

  return (
    <section id="contact" className="scroll-mt-24 py-8 lg:py-12">
      <div className="flex flex-col items-start gap-6 rounded-2xl border border-white/[0.06] bg-surface px-5 py-6 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex items-start gap-4 md:items-center">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-accent text-white">
            <Icon name="chat" className="size-5" />
          </span>

          <div>
            <h2 className="text-lg font-bold md:text-xl">{title}</h2>
            <p className="mt-1 max-w-lg text-sm leading-relaxed text-muted">{text}</p>
          </div>
        </div>

        <Button href={href} variant="primary" icon="arrow" newTab className="shrink-0">
          {button?.text ?? 'Discutons-en'}
        </Button>
      </div>
    </section>
  );
}

Cta.propTypes = {
  properties: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string,
    button: PropTypes.shape({
      text: PropTypes.string,
      link: PropTypes.string,
    }),
  }).isRequired,
};

export default Cta;
