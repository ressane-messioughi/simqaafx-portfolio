import { useState } from 'react';
import { Link } from 'react-router-dom';
import { navbar, site } from '../../data/settings';
import Button from '../ui/Button';

/**
 * Barre de navigation fixée en haut de page.
 *
 * `sticky top-0` la maintient visible au défilement. `backdrop-blur` floute
 * le contenu qui passe dessous : sans lui, le fond semi-transparent laisserait
 * lire le texte au travers.
 *
 * Les liens sont des ancres (#projets) : ce sont des <a> classiques, que le
 * navigateur gère nativement. `scroll-smooth` sur <html> anime le défilement,
 * et chaque section porte un `scroll-mt-24` pour ne pas finir cachée sous
 * cette barre.
 */
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-nav/85 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 lg:px-8"
        aria-label="Navigation principale"
      >
        <Link to="/" className="flex items-center gap-2.5">
          <img src={site.logoUrl} alt="" className="size-8 object-contain" width="32" height="32" />
          <span className="sr-only">{site.name}</span>
        </Link>

        {/* Menu ordinateur */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            {navbar.links.map((link) => (
              <li key={link.text}>
                <a
                  href={link.link}
                  className="text-sm text-white/75 transition-colors duration-150 hover:text-white"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>

          <Button href={navbar.cta.link} variant="primary" className="!rounded-full !px-5 !py-2">
            {navbar.cta.text}
          </Button>
        </div>

        {/* Bouton hamburger, mobile uniquement */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="menu-mobile"
          aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          className="flex size-9 cursor-pointer items-center justify-center rounded-lg border border-white/10 text-white/80 transition-colors hover:bg-white/5 md:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
            className="size-4"
          >
            <path d={isOpen ? 'M5 5l14 14M19 5L5 19' : 'M3 6h18M3 12h18M3 18h18'} />
          </svg>
        </button>
      </nav>

      {/* Menu mobile déroulant */}
      {isOpen && (
        <div id="menu-mobile" className="border-t border-white/[0.06] px-5 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {navbar.links.map((link) => (
              <li key={link.text}>
                <a
                  href={link.link}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg px-2 py-2.5 text-sm text-white/75 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>

          <Button
            href={navbar.cta.link}
            variant="primary"
            className="mt-3 w-full !rounded-full"
          >
            {navbar.cta.text}
          </Button>
        </div>
      )}
    </header>
  );
}

export default Navbar;
