import { getToken } from './api/auth';
import { getListingById } from './api/listings';
import { renderHome } from './pages/home';
import { renderLogin } from './pages/login';
import { renderRegister } from './pages/register';
import { renderListingDetails } from './pages/listingDetails';
import { renderCreateListing } from './pages/createListing';

export async function renderPage(): Promise<string> {
  const hash = window.location.hash.replace('#/', '');

  const [path, queryString] = hash.split('?');
  const params = new URLSearchParams(queryString);
  const listingId = params.get('id');

  switch (path) {
    case '':
      return await renderHome();

    case 'login':
      return renderLogin();

    case 'register':
      return renderRegister();

    case 'create-listing':
      if (!getToken()) {
        window.location.hash = '#/login';
        return '';
      }
      return renderCreateListing();

    case 'listing': {
      if (!listingId) {
        return await renderHome();
      }
      const product = await getListingById(listingId);
      return renderListingDetails(product);
    }
    default:
      return await renderHome();
  }
}
