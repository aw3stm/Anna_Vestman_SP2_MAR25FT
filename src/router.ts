import { renderHome } from './pages/home';
import { renderLogin } from './pages/login';
import { renderRegister } from './pages/register';

export async function renderPage(): Promise<string> {
  const path = window.location.hash.replace('#/', '').split('?')[0];

  switch (path) {
    case '':
      return await renderHome();

    case 'login':
      return renderLogin();

    case 'register':
      return renderRegister();

    default:
      return await renderHome();
  }
}
