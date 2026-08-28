import './style.css';

import { initNavbar, renderNavbar } from './components/navbar';
import { initFooter, renderFooter } from './components/footer';
import { renderPage } from './router';

function renderApp() {
  const app = document.querySelector<HTMLDivElement>('#app');

  if (!app) {
    throw new Error('App element not found');
  }

  const path = window.location.hash.replace('#/', '').split('?')[0];

  const isAuthPage = path === 'login' || path === 'register';

  app.innerHTML = `
    <div class="flex min-h-screen flex-col">

      ${
        isAuthPage
          ? ''
          : renderNavbar({
              isLoggedIn: true,
              credits: 2342,
              avatar: './src/assets/Avatar.svg',
            })
      }

      ${renderPage()}

      ${isAuthPage ? '' : renderFooter()}

    </div>
  `;

  if (!isAuthPage) {
    initNavbar();
    initFooter();
  }
}

renderApp();

window.addEventListener('hashchange', renderApp);
