import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import './index.css';

/**
 * Point d'entrée de l'application.
 *
 * StrictMode n'a d'effet qu'en développement : il monte volontairement les
 * composants deux fois pour révéler les effets mal nettoyés (un setInterval
 * oublié, par exemple). Il disparaît du build de production.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
