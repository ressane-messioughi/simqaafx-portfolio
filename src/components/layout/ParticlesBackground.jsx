import { useEffect, useRef } from 'react';
import { theme } from '../../data/settings';

const PARTICLE_COUNT = 50;
const LINK_DISTANCE = 150;
const SPEED = 0.4;

/**
 * Fond animé en particules reliées.
 *
 * Remplace la librairie particles.js (~30 Ko) chargée par CDN dans le thème
 * d'origine. Le besoin réel tient en 80 lignes : autant les écrire et
 * supprimer une dépendance externe.
 *
 * Trois points importants ici :
 *
 * 1. useRef pour le <canvas>. On a besoin de l'élément réel du DOM pour
 *    dessiner. useRef donne cet accès sans déclencher de re-rendu.
 *
 * 2. L'animation ne passe PAS par useState. Redessiner 60 fois par seconde
 *    via setState provoquerait 60 rendus React par seconde et bloquerait la
 *    page. On dessine directement dans le canvas, hors du cycle de React.
 *
 * 3. Le nettoyage. On annule la boucle d'animation ET on retire l'écouteur
 *    de redimensionnement quand le composant disparaît. Sans ça, la boucle
 *    continue indéfiniment en arrière-plan.
 */
function ParticlesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Respecte le réglage système « réduire les animations ».
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // On lit la couleur d'accentuation appliquée par <ThemeStyles />,
    // au format "101 113 255".
    const accent =
      getComputedStyle(document.documentElement).getPropertyValue('--cl-accent').trim() ||
      '101 113 255';

    let particles = [];
    let animationId = null;

    /** Adapte le canvas à la taille de la fenêtre et à la densité de l'écran. */
    const resize = () => {
      // devicePixelRatio : sur un écran Retina, 1 pixel CSS = 2 pixels réels.
      // Sans cette correction, le rendu serait flou.
      const ratio = window.devicePixelRatio || 1;

      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    /** Positionne les particules aléatoirement. */
    const createParticles = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
        radius: Math.random() * 2 + 1,
      }));
    };

    /** Une image de l'animation. */
    const draw = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Les traits entre particules proches.
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.hypot(dx, dy);

          if (distance < LINK_DISTANCE) {
            // Plus les particules sont proches, plus le trait est opaque.
            const opacity = (1 - distance / LINK_DISTANCE) * 0.4;

            context.strokeStyle = `rgba(${accent.replaceAll(' ', ',')}, ${opacity})`;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(particles[i].x, particles[i].y);
            context.lineTo(particles[j].x, particles[j].y);
            context.stroke();
          }
        }
      }

      // Les particules elles-mêmes.
      context.fillStyle = `rgba(${accent.replaceAll(' ', ',')}, 0.5)`;

      particles.forEach((particle) => {
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();

        particle.x += particle.vx;
        particle.y += particle.vy;

        // Sortie d'écran : la particule réapparaît de l'autre côté.
        if (particle.x < 0) particle.x = window.innerWidth;
        if (particle.x > window.innerWidth) particle.x = 0;
        if (particle.y < 0) particle.y = window.innerHeight;
        if (particle.y > window.innerHeight) particle.y = 0;
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    createParticles();
    draw();

    window.addEventListener('resize', resize);

    // Fonction de nettoyage : indispensable.
    return () => {
      window.removeEventListener('resize', resize);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  if (!theme.particles) return null;

  return (
    <canvas
      ref={canvasRef}
      // aria-hidden : purement décoratif, à ignorer par les lecteurs d'écran.
      aria-hidden="true"
      className="fixed inset-0 -z-10 size-full pointer-events-none"
    />
  );
}

export default ParticlesBackground;
