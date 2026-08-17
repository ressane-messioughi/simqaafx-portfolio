import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { navbar, site } from '../../data/settings';

/**
 * Barre de navigation — transposition de components/navbar.njk.
 *
 * Deux simplifications par rapport à l'original :
 *
 * 1. Le lien actif. Le thème testait `templateName` avec une longue cascade
 *    de {% if %}. React Router fournit <NavLink>, qui sait tout seul s'il
 *    pointe vers la page courante et expose un booléen `isActive`.
 *
 * 2. Le menu mobile. Alpine calculait la hauteur du menu en JavaScript
 *    (`$refs.menu.scrollHeight`) pour l'animer. On se contente d'afficher ou
 *    de masquer : moins de code, et le comportement au clavier reste correct.
 */
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const linkClasses = (shape, isActive) => {
    const base = 'px-4 py-2 whitespace-nowrap text-base font-medium';

    if (shape === 'button') {
      return `${base} text-t-primary border ${
        isActive
          ? 'bg-accent-700 border-accent-800 hover:bg-accent-800'
          : 'bg-accent-500 border-accent-600 hover:bg-accent-600'
      }`;
    }

    return `${base} ${isActive ? 'text-t-primary' : 'text-t-primary/80 hover:text-t-primary'}`;
  };

  const renderLink = (link) => {
    const isExternal = link.link.startsWith('http');

    if (isExternal) {
      return (
        <a
          key={link.text}
          href={link.link}
          target={link.newTab ? '_blank' : undefined}
          rel={link.newTab ? 'noopener noreferrer' : undefined}
          className={linkClasses(link.shape, false)}
          onClick={() => setIsOpen(false)}
        >
          {link.text}
        </a>
      );
    }

    return (
      <NavLink
        key={link.text}
        to={link.link}
        // `end` évite que "/" reste actif sur toutes les autres pages.
        end={link.link === '/'}
        className={({ isActive }) => linkClasses(link.shape, isActive)}
        onClick={() => setIsOpen(false)}
      >
        {link.text}
      </NavLink>
    );
  };

  return (
    <nav className="bg-card/75 border border-white/5" aria-label="Navigation principale">
      <div className="flex items-center justify-between flex-wrap w-full">
        <div className="flex items-center p-4 lg:p-6">
          <Link to="/" className="flex items-center justify-center gap-4 lg:justify-start">
            {navbar.showLogo && (
              <img src={site.logoUrl} alt={site.name} className="max-h-10" width="40" height="40" />
            )}
            {navbar.showSiteName && (
              <span className="text-t-primary text-xl lg:text-2xl font-bold">{site.name}</span>
            )}
          </Link>
        </div>

        <div className="flex items-center gap-4 mr-4 lg:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="menu-principal"
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="inline-flex items-center justify-center size-10 bg-card border border-white/5 text-t-primary/75 transition-all ease-in-out duration-150 hover:bg-accent-500/10 hover:text-accent-500 cursor-pointer"
          >
            <svg
              className="size-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M1 1l15 12M16 1L1 13' : 'M1 1h15M1 7h15M1 13h15'}
              />
            </svg>
          </button>
        </div>

        <div
          id="menu-principal"
          key={location.pathname}
          className={`w-full lg:w-auto lg:block ${isOpen ? 'block' : 'hidden'}`}
        >
          <div className="flex flex-col gap-2 p-2 lg:flex-row lg:items-center lg:gap-4 lg:p-6">
            {navbar.links.map(renderLink)}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
