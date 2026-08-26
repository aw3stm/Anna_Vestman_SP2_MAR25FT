import './style.css';

import { initNavbar, renderNavbar } from './components/navbar';
import { initFooter, renderFooter } from './components/footer';
import { renderPage } from './router';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('App element not found');
}

app.innerHTML = `
${renderNavbar({
  isLoggedIn: true,
  credits: 2342,
})}
  ${renderPage()}
  ${renderFooter()}
`;

initNavbar();
initFooter();
