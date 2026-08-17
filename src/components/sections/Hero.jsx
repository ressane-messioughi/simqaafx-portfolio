import PropTypes from 'prop-types';
import Button from '../ui/Button';
import { site } from '../../data/settings';

/**
 * Bannière d'accueil.
 *
 * Mise en page en deux colonnes qui se replie en une seule sur mobile
 * (`grid-cols-1 lg:grid-cols-2`). Sur petit écran, le visuel passe AVANT le
 * texte dans l'ordre visuel via `order-first lg:order-last` — l'ordre du DOM,
 * lui, garde le texte en premier, ce qui est le bon ordre de lecture pour un
 * lecteur d'écran.
 */
function Hero({ properties }) {
  const { eyebrow, title, titleGradient, text, image, buttons = [] } = properties;

  return (
    <section id="a-propos" className="relative scroll-mt-24 pt-10 lg:pt-16">
      <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-8">
        <div>
          {eyebrow && (
            <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-muted">{eyebrow}</p>
          )}

          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
            {title}
            <br />
            <span className="text-gradient">{titleGradient}</span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-muted">{text}</p>

          {buttons.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {buttons.map((button) => (
                <Button
                  key={button.text}
                  href={button.link}
                  variant={button.style === 'primary' ? 'primary' : 'secondary'}
                >
                  {button.text}
                </Button>
              ))}
            </div>
          )}

          {site.available && (
            <p className="mt-8 flex items-center gap-2.5 text-xs text-muted">
              <span className="relative flex size-2">
                {/* Double cercle : le premier pulse, le second reste net. */}
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-online opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-online" />
              </span>
              {site.availableLabel}
            </p>
          )}
        </div>

        <div className="order-first lg:order-last">
          <img
            src={image}
            alt={`${site.name}, créateur de contenus RP et éditeur vidéo`}
            className="hero-media mx-auto w-full max-w-md object-contain lg:max-w-none"
            // La bannière est visible d'emblée : on demande au navigateur
            // de la charger en priorité plutôt que de la différer.
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}

Hero.propTypes = {
  properties: PropTypes.shape({
    eyebrow: PropTypes.string,
    title: PropTypes.string.isRequired,
    titleGradient: PropTypes.string,
    text: PropTypes.string,
    image: PropTypes.string,
    buttons: PropTypes.array,
  }).isRequired,
};

export default Hero;
