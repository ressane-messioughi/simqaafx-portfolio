import PropTypes from 'prop-types';
import Button from './Button';

/**
 * En-tête de section : pastille violette + titre, sous-titre, et un lien
 * d'action aligné à droite.
 *
 * Ce motif apparaît deux fois dans la maquette (« Projets Récents » et
 * « Vidéos Courtes »). Le factoriser garantit que les deux resteront
 * identiques si le style évolue.
 */
function SectionHeader({ title, subtitle, action, as = 'h2' }) {
  const Heading = as;

  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <div className="flex items-center gap-2.5">
          <span className="size-2 shrink-0 rounded-full bg-violet" aria-hidden="true" />
          <Heading className="text-2xl font-bold tracking-tight md:text-3xl">{title}</Heading>
        </div>
        {subtitle && <p className="mt-1.5 pl-[1.125rem] text-sm text-muted">{subtitle}</p>}
      </div>

      {action && (
        <Button href={action.link} variant="ghost" icon="arrow">
          {action.text}
        </Button>
      )}
    </div>
  );
}

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  as: PropTypes.oneOf(['h1', 'h2']),
  action: PropTypes.shape({
    text: PropTypes.string.isRequired,
    link: PropTypes.string,
  }),
};

export default SectionHeader;
