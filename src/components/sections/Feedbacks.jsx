import { useState } from 'react';
import PropTypes from 'prop-types';
import SectionTitle from '../ui/SectionTitle';
import { formatDate } from '../../utils/format';
import { site } from '../../data/settings';

/** Étoiles de notation — transposition de la boucle `range()` de feedback-card.njk. */
function Rating({ value }) {
  // Array.from({ length: 5 }) crée un tableau de 5 cases à parcourir :
  // c'est l'équivalent de `{% for i in range(0, 5) %}` en Nunjucks.
  return (
    <div className="flex gap-1" role="img" aria-label={`Note : ${value} sur 5`}>
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={index < value ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
          className={`size-5 ${index < value ? 'text-accent-500' : 'text-t-primary/40'}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
          />
        </svg>
      ))}
    </div>
  );
}

Rating.propTypes = { value: PropTypes.number.isRequired };

/** Carte d'avis — transposition de snippets/feedback-card.njk. */
function FeedbackCard({ feedback }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setIsExpanded(!isExpanded)}
      aria-expanded={isExpanded}
      className="h-full text-left bg-card/75 border border-white/5 text-t-primary cursor-pointer"
    >
      <div className="flex-1 p-4">
        <div className="flex justify-between items-end gap-2 mb-2">
          <Rating value={feedback.rating} />
          <span className="text-xs text-t-primary/80 shrink-0">{formatDate(feedback.date)}</span>
        </div>

        <p className="text-sm text-t-primary/60 mb-1">{feedback.author}</p>

        <p className={`text-sm text-t-primary/90 break-words ${isExpanded ? '' : 'line-clamp-2'}`}>
          {feedback.message}
        </p>

        {feedback.reply && (
          <div className="mt-4 bg-white/5 p-4">
            <p
              className={`pl-2 text-sm text-t-primary/70 border-l-2 border-accent-500 break-words ${
                isExpanded ? '' : 'line-clamp-2'
              }`}
            >
              {feedback.reply}
            </p>
            <p className="text-xs text-right text-t-primary/60 mt-2">
              Réponse de <span className="text-accent-500">{site.name}</span> le{' '}
              {formatDate(feedback.repliedAt)}
            </p>
          </div>
        )}
      </div>
    </button>
  );
}

FeedbackCard.propTypes = {
  feedback: PropTypes.shape({
    author: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    date: PropTypes.string,
    message: PropTypes.string.isRequired,
    reply: PropTypes.string,
    repliedAt: PropTypes.string,
  }).isRequired,
};

/**
 * Section Avis — transposition de components/feedbacks.njk.
 *
 * Le thème d'origine déléguait le tri au serveur (rechargement de page avec
 * des paramètres d'URL). Sans backend, on trie ici, côté client : c'est plus
 * rapide (aucun aller-retour réseau) et ça tient en trois lignes.
 */
function Feedbacks({ properties }) {
  const { title, feedbacks = [], isPageTitle = false } = properties;
  const [sortBy, setSortBy] = useState('date_desc');

  const heading = title && <SectionTitle as={isPageTitle ? 'h1' : 'h2'}>{title}</SectionTitle>;

  if (feedbacks.length === 0) {
    return (
      <section className="py-6 lg:py-8">
        {heading}
        <p className="text-t-primary/50">Aucun avis pour le moment.</p>
      </section>
    );
  }

  const sorters = {
    date_desc: (a, b) => new Date(b.date) - new Date(a.date),
    date_asc: (a, b) => new Date(a.date) - new Date(b.date),
    rating_desc: (a, b) => b.rating - a.rating,
    rating_asc: (a, b) => a.rating - b.rating,
  };

  // On copie le tableau avec [...] : `.sort()` modifie le tableau d'origine,
  // or il ne faut jamais muter des données reçues en props.
  const sorted = [...feedbacks].sort(sorters[sortBy]);

  return (
    <section className="py-6 lg:py-8">
      {heading}

      <div className="flex my-4 md:my-6 md:justify-end">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
          <label htmlFor="sort-feedbacks" className="text-sm text-t-primary/80">
            Trier les avis par
          </label>
          <select
            id="sort-feedbacks"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="min-w-56 bg-card border border-white/5 text-t-primary text-sm px-3 py-2"
          >
            <option value="date_desc">Plus récents</option>
            <option value="date_asc">Plus anciens</option>
            <option value="rating_desc">Mieux notés</option>
            <option value="rating_asc">Moins bien notés</option>
          </select>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {sorted.map((feedback) => (
          <FeedbackCard key={feedback.id} feedback={feedback} />
        ))}
      </div>
    </section>
  );
}

Feedbacks.propTypes = {
  properties: PropTypes.shape({
    title: PropTypes.string,
    isPageTitle: PropTypes.bool,
    feedbacks: PropTypes.array,
  }).isRequired,
};

export default Feedbacks;
