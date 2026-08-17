import { Link } from 'react-router-dom';
import { footer, site } from '../../data/settings';

/** Icônes des réseaux sociaux, reprises telles quelles de components/footer.njk. */
const SOCIAL_ICONS = {
  discord: {
    label: 'Discord',
    hoverClass: 'hover:text-[#5865f2]',
    path: 'M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.1.1 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.1 16.1 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02M8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12m6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12',
  },
  youtube: {
    label: 'YouTube',
    hoverClass: 'hover:text-[#ff0000]',
    path: 'm10 15l5.19-3L10 9zm11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73',
  },
  instagram: {
    label: 'Instagram',
    hoverClass: 'hover:text-[#de2662]',
    path: 'M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3',
  },
  tiktok: {
    label: 'TikTok',
    hoverClass: 'hover:text-[#f62755]',
    path: 'M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48',
  },
  telegram: {
    label: 'Telegram',
    hoverClass: 'hover:text-[#239cd7]',
    path: 'M14.993 1.582a.5.5 0 0 0-.661-.553l-14 5a.5.5 0 0 0-.056.918l4 2a.5.5 0 0 0 .501-.031l3.32-2.214L6.11 9.188a.5.5 0 0 0 .113.728l6 4a.5.5 0 0 0 .77-.334z',
  },
};

/** Pied de page — transposition de components/footer.njk. */
function Footer() {
  // Object.entries + filter : on ne garde que les réseaux réellement
  // renseignés dans settings.js. L'original enchaînait cinq {% if %}.
  const activeSocials = Object.entries(site.socials).filter(
    ([network, url]) => url && SOCIAL_ICONS[network]
  );

  const showTopRow = footer.showLogo || footer.showSiteName || footer.showSocials;

  return (
    <footer className="mt-6 bg-card/90 border border-white/5 lg:mt-8">
      <div className="max-w-[85rem] mx-auto text-t-primary">
        {showTopRow && (
          <div className="flex flex-wrap items-center justify-between gap-4 border-b px-4 py-4 border-white/5">
            <Link to="/" className="flex items-center gap-2 md:gap-4">
              {footer.showLogo && (
                <img
                  src={site.logoUrl}
                  alt={site.name}
                  className="max-h-10"
                  width="40"
                  height="40"
                />
              )}
              {footer.showSiteName && (
                <span className="text-t-primary font-semibold text-lg md:text-xl">{site.name}</span>
              )}
            </Link>

            {footer.showSocials && activeSocials.length > 0 && (
              <div className="flex gap-3">
                {activeSocials.map(([network, url]) => {
                  const icon = SOCIAL_ICONS[network];

                  return (
                    <a
                      key={network}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={icon.label}
                      className={`size-8 flex items-center justify-center rounded-full text-t-primary/80 ${icon.hoverClass}`}
                    >
                      <svg
                        className="size-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path fill="currentColor" d={icon.path} />
                      </svg>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col flex-wrap gap-4 px-4 py-4 bg-card/25 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-t-primary/80">{footer.copyright}</p>

          {footer.links.length > 0 && (
            <div className="flex gap-3">
              {footer.links.map((link) => (
                <Link
                  key={link.text}
                  to={link.link}
                  className="text-xs text-t-primary/80 hover:text-t-primary"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
