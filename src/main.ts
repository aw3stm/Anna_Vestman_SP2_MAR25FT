import './style.css';

import { initNavbar, renderNavbar } from './components/navbar';
import { initFooter, renderFooter } from './components/footer';
import { renderPage } from './router';
import { initHomeCards, initHomeSearch } from './pages/home';
import { initListingDetails } from './pages/listingDetails';
import { initRegister } from './pages/register';
import { initLogin } from './pages/login';
import { getCurrentProfile, getToken } from './api/auth';

async function renderApp() {
  const app = document.querySelector<HTMLDivElement>('#app');

  if (!app) {
    throw new Error('App element not found');
  }

  const hash = window.location.hash.replace('#/', '');
  const [path, queryString] = hash.split('?');

  const params = new URLSearchParams(queryString);
  const listingId = params.get('id');

  const isAuthPage = path === 'login' || path === 'register';
  const isLoggedIn = !!getToken();

  let profile = null;
  if (isLoggedIn) {
    try {
      profile = await getCurrentProfile();
    } catch (error) {
      console.error('Could not load profile', error);
    }
  }

  const page = await renderPage();

  app.innerHTML = `
    <div class="flex min-h-screen flex-col">

      ${
        isAuthPage
          ? ''
          : renderNavbar({
              isLoggedIn,
              credits: profile?.credits ?? 0,
              avatar: profile?.avatar?.url,
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
      initListingDetails(listingId ?? '');
    }
  }
  if (path === 'register') {
    initRegister();
  }
  if (path === 'login') {
    initLogin();
  }
}

renderApp();

window.addEventListener('hashchange', renderApp);
