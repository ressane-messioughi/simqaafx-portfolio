import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Remplace le snippet `buttons.njk`.
 *
 * Deux styles, repris du thème : 'regular' (fond plein) et 'outline' (contour).
 *
 * Subtilité importante : un lien interne et un lien externe ne s'écrivent pas
 * pareil en React. Un lien interne doit utiliser <Link> de React Router pour
 * éviter de recharger toute l'application ; un lien externe reste un <a>
 * classique. On détecte le cas avec le préfixe "http".
 */
function ThemeButtons({ buttons = [] }) {
  if (buttons.length === 0) return null;

  const styles = {
    regular: 'text-t-primary bg-accent-500 border-accent-600 hover:bg-accent-600',
    outline: 'text-accent-500 border-accent-500 hover:bg-accent-500/10',
  };

  return (
    <>
      {buttons.map((button) => {
        const className = `inline-flex items-center gap-4 border px-6 py-2 text-sm font-semibold transition-colors ease-in-out duration-150 ${
          styles[button.style] ?? styles.regular
        }`;

        const content = (
          <>
            {button.text}
            {button.icon && <i className={`${button.icon} fa-fw`} aria-hidden="true" />}
          </>
        );

        const isExternal = button.link?.startsWith('http');

        if (isExternal) {
          return (
            <a
              key={button.text}
              href={button.link}
              className={className}
              target={button.newTab ? '_blank' : undefined}
              // Sécurité : sans noreferrer, la page ouverte peut manipuler
              // la nôtre via window.opener (attaque "tabnabbing").
              rel={button.newTab ? 'noopener noreferrer' : undefined}
            >
              {content}
            </a>
          );
        }

        return (
          <Link key={button.text} to={button.link ?? '/'} className={className}>
            {content}
          </Link>
        );
      })}
    </>
  );
}

ThemeButtons.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      link: PropTypes.string,
      icon: PropTypes.string,
      style: PropTypes.oneOf(['regular', 'outline']),
      newTab: PropTypes.bool,
    })
  ),
};

export default ThemeButtons;
