import PropTypes from 'prop-types';
import Icon from '../ui/Icons';

/**
 * Barre de chiffres clés.
 *
 * Une seule carte contenant 4 colonnes séparées par un filet vertical.
 * Le filet est posé avec `divide-x`, qui applique une bordure à tous les
 * enfants sauf le premier — plus robuste que d'ajouter une bordure au
 * dernier et de devoir la retirer.
 *
 * `md:divide-x` : sur mobile les colonnes s'empilent, un filet vertical
 * n'aurait alors aucun sens.
 */
function StatsBar({ properties }) {
  const { stats = [] } = properties;

  if (stats.length === 0) return null;

  return (
    <section className="py-12 lg:py-16">
      <div className="rounded-2xl border border-white/[0.06] bg-surface/80 px-4 py-5 md:px-6">
        <dl className="grid grid-cols-2 gap-y-6 md:grid-cols-4 md:gap-y-0 md:divide-x md:divide-white/[0.06]">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center justify-center gap-3.5 px-2">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet/15 text-violet">
                <Icon name={stat.icon} className="size-5" />
              </span>

              <div>
                {/* <dd> avant <dt> : la valeur est mise en avant visuellement,
                    mais le couple reste sémantiquement correct. */}
                {stat.value && (
                  <dd className="text-xl font-bold leading-tight">{stat.value}</dd>
                )}
                <dt className="text-xs text-muted">{stat.label}</dt>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

StatsBar.propTypes = {
  properties: PropTypes.shape({
    stats: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string.isRequired,
        value: PropTypes.string,
        label: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};

export default StatsBar;
