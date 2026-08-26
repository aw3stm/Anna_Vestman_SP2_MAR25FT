import { renderHome } from './pages/home';

export function renderPage(): string {
  const path = window.location.pathname;

  switch (path) {
    case '/':
      return renderHome();

    default:
      return renderHome();
  }
}
