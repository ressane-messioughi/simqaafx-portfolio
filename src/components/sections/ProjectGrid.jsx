import { useState } from 'react';
import PropTypes from 'prop-types';
import SectionHeader from '../ui/SectionHeader';
import Icon, { PlayIcon } from '../ui/Icons';
import { getYouTubeId } from '../../utils/youtube';

/**
 * Carte d'un projet : miniature 16/9 surmontée d'un bouton lecture, puis un
 * bloc d'informations (badge, titre, sous-titre, flèche).
 *
 * Le chargement de la vidéo est différé, comme pour la galerie : tant que
 * l'utilisateur n'a pas cliqué, on n'affiche qu'une image. Une iframe YouTube
 * pèse ~700 Ko ; avec 9 cartes, les charger d'emblée coûterait plus de 6 Mo
 * pour un contenu que la plupart des visiteurs ne regarderont pas.
 *
 * Tant que `videoUrl` est vide, la carte reste une simple vignette : pas de
 * bouton lecture trompeur qui ne mènerait nulle part.
 */
function ProjectCard({ project }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const videoId = project.url ? getYouTubeId(project.url) : null;

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/[0.06] bg-surface transition-colors duration-200 hover:border-white/[0.12]">
      <div className="relative aspect-video overflow-hidden bg-black/40">
        {isPlaying && videoId ? (
          <iframe
            className="size-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
            title={project.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src={project.thumbnail}
              alt={project.title}
              loading="lazy"
              className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />

            {videoId && (
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                aria-label={`Lire la vidéo : ${project.title}`}
                className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/20 transition-colors duration-200 hover:bg-black/10"
              >
                <span className="flex size-11 items-center justify-center rounded-full bg-white/90 text-black backdrop-blur transition-transform duration-200 group-hover:scale-110">
                  <PlayIcon className="ml-0.5 size-5" />
                </span>
              </button>
            )}
          </>
        )}
      </div>

      <div className="p-4">
        {project.badge && (
          <span className="inline-block rounded-md bg-violet/15 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-violet">
            {project.badge}
          </span>
        )}

        <div className="mt-3 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold">{project.title}</h3>
            <p className="mt-0.5 truncate text-xs text-muted">{project.kind}</p>
          </div>

          <span
            className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-violet/15 text-violet transition-colors duration-200 group-hover:bg-violet/25"
            aria-hidden="true"
          >
            <Icon name="arrow" className="size-4" />
          </span>
        </div>
      </div>
    </article>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    kind: PropTypes.string,
    badge: PropTypes.string,
    thumbnail: PropTypes.string.isRequired,
    url: PropTypes.string,
  }).isRequired,
};

/** Grille de projets — 1 colonne sur mobile, 2 sur tablette, 3 sur ordinateur. */
function ProjectGrid({ properties }) {
  const { title, subtitle, action, projects = [], isPageTitle = false } = properties;

  if (projects.length === 0) return null;

  return (
    <section id="projets" className="scroll-mt-24 py-8 lg:py-12">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        action={action}
        as={isPageTitle ? 'h1' : 'h2'}
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

ProjectGrid.propTypes = {
  properties: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    action: PropTypes.object,
    isPageTitle: PropTypes.bool,
    projects: PropTypes.array,
  }).isRequired,
};

export default ProjectGrid;
