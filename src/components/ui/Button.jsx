import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from './Icons';

/**
 * Bouton du design system.
 *
 * Trois variantes relevées sur la maquette :
 *   primary   — dégradé indigo→bleu, plein
 *   secondary — fond sombre, bordure discrète
 *   ghost     — pilule sombre bordée, avec une flèche (« Voir tous les projets »)
 *
 * Le composant choisit tout seul la bonne balise selon la destination :
 * une ancre (#projets) et un lien externe restent des <a>, une route interne
 * devient un <Link> React Router — sans quoi le clic rechargerait toute
 * l'application. Sans destination du tout, c'est un vrai <button>.
 */
const VARIANTS = {
  primary:
    'bg-gradient-accent text-white border border-white/10 hover:brightness-110 shadow-lg shadow-indigo/20',
  secondary: 'bg-white/5 text-white border border-white/10 hover:bg-white/10',
  ghost: 'bg-surface text-white/90 border border-white/10 hover:bg-white/5',
};

function Button({ children, href, variant = 'primary', icon, newTab = false, className = '' }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer';

  const classes = `${base} ${VARIANTS[variant]} ${className}`;

  const content = (
    <>
      {children}
      {icon && <Icon name={icon} className="size-4" />}
    </>
  );

  if (!href) {
    return (
      <button type="button" className={classes}>
        {content}
      </button>
    );
  }

  const isAnchorOrExternal = href.startsWith('#') || href.startsWith('http');

  if (isAnchorOrExternal) {
    return (
      <a
        href={href}
        className={classes}
        target={newTab ? '_blank' : undefined}
        // noreferrer : empêche la page ouverte de manipuler la nôtre
        // via window.opener (attaque dite « tabnabbing »).
        rel={newTab ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <Link to={href} className={classes}>
      {content}
    </Link>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
  icon: PropTypes.string,
  newTab: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
