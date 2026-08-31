import './style.css';

import { initNavbar, renderNavbar } from './components/navbar';
import { initFooter, renderFooter } from './components/footer';
import { renderPage } from './router';
import { initHomeCards, initHomeSearch } from './pages/home';
import { initListingDetails } from './pages/listingDetails';

async function renderApp() {
  const app = document.querySelector<HTMLDivElement>('#app');

  if (!app) {
    throw new Error('App element not found');
  }

  const path = window.location.hash.replace('#/', '').split('?')[0];

  const isAuthPage = path === 'login' || path === 'register';

  const page = await renderPage();

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

      ${page}

      ${isAuthPage ? '' : renderFooter()}

    </div>
  `;

  if (!isAuthPage) {
    initNavbar();
    initFooter();

    if (path === '') {
      initHomeSearch();
      initHomeCards();
    }

    if (path === 'listing') {
      initListingDetails();
    }
  }
}

renderApp();

window.addEventListener('hashchange', renderApp);
