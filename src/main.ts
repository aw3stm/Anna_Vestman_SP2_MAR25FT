import './style.css';
import { initNavbar, renderNavbar } from './components/navbar';
import { initFooter, renderFooter } from './components/footer';
import { renderPage } from './router';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('App element not found');
}

const path = window.location.pathname;

if (path === '/login') {
  // Login page has its own layout
  app.innerHTML = renderPage();
} else {
  // Regular pages
  app.innerHTML = `
    ${renderNavbar({
      isLoggedIn: true,
      credits: 2342,
      avatar: '../src/assets/Avatar.svg',
    })}

    ${renderPage()}

    ${renderFooter()}
  `;

  initNavbar();
  initFooter();
}
