import './style.css';

import { initNavbar, renderNavbar } from './components/navbar';
import { initFooter, renderFooter } from './components/footer';
import { renderPage } from './router';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('App element not found');
}

const path = window.location.pathname.replace(import.meta.env.BASE_URL, '');

const isAuthPage = path === 'login' || path === 'register';

app.innerHTML = `
  ${isAuthPage
    ? ''
    : renderNavbar({
        isLoggedIn: true,
        credits: 2342,
        avatar: './src/assets/Avatar.svg',
      })}

  ${renderPage()}

  ${isAuthPage ? '' : renderFooter()}
`;

if (!isAuthPage) {
  initNavbar();
  initFooter();
}