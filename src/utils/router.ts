import { renderHome } from '../pages/home';
import { renderLogin } from '../pages/login';
import { renderRegister } from '../pages/register';

export function renderPage(): string {
  const path = window.location.pathname;

  switch (path) {
    case '/login':
      return renderLogin();

    case '/register':
      return renderRegister();

    default:
      return renderHome();
  }
}
