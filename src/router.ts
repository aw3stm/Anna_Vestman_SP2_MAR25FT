import { renderHome } from './pages/home';
import { renderLogin } from './pages/login';

export function renderPage(): string {
  const path = window.location.hash.replace('#/', '').split('?')[0];

  switch (path) {
    case '':
      return renderHome();

    case 'login':
      return renderLogin();

    default:
      return renderHome();
  }
}
