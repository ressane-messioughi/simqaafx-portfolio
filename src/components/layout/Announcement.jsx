import { useEffect, useState } from 'react';
import { announcements } from '../../data/settings';

/**
 * Bandeau d'annonces défilantes — transposition de components/announcement.njk.
 *
 * L'original utilisait `x-init="startInterval"` avec Alpine. En React, un
 * minuteur se met en place dans useEffect.
 *
 * LE POINT À RETENIR : le `return` à la fin de l'effet. C'est la fonction de
 * nettoyage, et elle est OBLIGATOIRE ici. Sans elle, le setInterval continue
 * de tourner après la disparition du composant : on accumule des minuteurs
 * fantômes qui font fuir la mémoire. C'est l'oubli le plus fréquent avec
 * useEffect, et un jury peut tout à fait poser la question.
 */
function Announcement() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Un seul message : inutile de lancer un minuteur.
    if (announcements.length <= 1) return;

    const interval = setInterval(() => {
      // Forme fonctionnelle de setState : on calcule le nouvel index à partir
      // du précédent. Plus sûr que `setActiveIndex(activeIndex + 1)`, qui
      // capturerait une valeur périmée dans la closure.
      setActiveIndex((previous) => (previous + 1) % announcements.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (announcements.length === 0) return null;

  const current = announcements[activeIndex];

  const content = (
    <span className="truncate">
      {current.text}
      {current.link && (
        <svg
          className="ml-2 size-4 inline-block align-[-0.125rem]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </span>
  );

  return (
    <div className="p-2 text-t-accent text-sm text-center bg-accent-500 border border-accent-600">
      {/* aria-live : prévient les lecteurs d'écran que ce contenu change
          tout seul, sans interrompre la lecture en cours. */}
      <div className="overflow-hidden h-5" aria-live="polite">
        {/* La clé change à chaque message : React remonte l'élément,
            ce qui relance l'animation de fondu. */}
        <p
          key={activeIndex}
          className="font-medium text-center animate-announcement-fade truncate"
        >
          {current.link ? (
            <a
              href={current.link}
              target={current.newTab ? '_blank' : undefined}
              rel={current.newTab ? 'noopener noreferrer' : undefined}
              className="truncate"
            >
              {content}
            </a>
          ) : (
            content
          )}
        </p>
      </div>
    </div>
  );
}

export default Announcement;
