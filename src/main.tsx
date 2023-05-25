import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { createBrowserHistory } from 'history';

import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-sgfflcsbjmowd3mf.us.auth0.com"
      clientId="qdx5njVLbc3P97T0NYBLaEIUpdrgzyyV"
      onRedirectCallback={() => {
        const history = createBrowserHistory();
        history.push(window.location.pathname);
      }}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
