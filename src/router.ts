import { renderHome } from './pages/home';
import { renderLogin } from './pages/login';

export function renderPage(): string {
  const base = import.meta.env.BASE_URL;
  const path = window.location.pathname.replace(base, '');

  switch (path) {
    case '':
    case '/':
      return renderHome();

    case 'login':
    case '/login':
      return renderLogin();

    default:
      return renderHome();
  }
}
