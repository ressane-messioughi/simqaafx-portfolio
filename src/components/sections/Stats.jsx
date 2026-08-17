import PropTypes from 'prop-types';
import SectionTitle from '../ui/SectionTitle';

/**
 * Chiffres clés — transposition de components/stats.njk.
 *
 * Dans le thème d'origine, les quatre chiffres étaient FIGÉS dans le HTML
 * (produits vendus, clients, avis, note moyenne) et alimentés par la
 * plateforme. Comme le site n'est plus une boutique, on rend la section
 * générique : elle affiche la liste de statistiques qu'on lui passe.
 *
 * Elle n'est utilisée par aucune page pour l'instant : ajoute simplement une
 * section { type: 'stats' } dans src/data/pages.js pour l'activer.
 */
function Stats({ properties }) {
  const { title, stats = [] } = properties;

  if (stats.length === 0) return null;

  // Intl.NumberFormat avec notation "compact" : 1200 devient "1,2 k".
  // C'est l'équivalent natif du helper `formatCompact` de la plateforme.
  const formatValue = (value) =>
    typeof value === 'number'
      ? new Intl.NumberFormat('fr-FR', { notation: 'compact', maximumFractionDigits: 1 }).format(
          value
        )
      : value;

  return (
    <section className="py-6 lg:py-8">
      {title && <SectionTitle>{title}</SectionTitle>}

      <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center border-b-2 border-white/5 py-4 lg:py-6">
            <p className="mb-1 text-3xl text-accent-500 font-bold uppercase md:mb-1.5 md:text-4xl lg:text-5xl lg:mb-2">
              {formatValue(stat.value)}
            </p>
            <p className="text-sm font-normal uppercase text-t-primary/80 md:text-base">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

Stats.propTypes = {
  properties: PropTypes.shape({
    title: PropTypes.string,
    stats: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      })
    ),
  }).isRequired,
};

export default Stats;
