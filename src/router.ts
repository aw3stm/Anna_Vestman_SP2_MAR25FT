import { getToken } from './api/auth';
import { getListingById } from './api/listings';
import { renderHome } from './pages/home';
import { renderLogin } from './pages/login';
import { renderRegister } from './pages/register';
import { renderListingDetails } from './pages/listingDetails';
import { renderCreateListing } from './pages/createListing';
import { renderProfile } from './pages/profile';
import { renderFavorites } from './pages/favorites';
import { renderHowItWorks } from './pages/howItWorks';

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

    case 'edit-listing': {
      if (!getToken()) {
        window.location.hash = '#/login';
        return '';
      }

      if (!listingId) {
        window.location.hash = '#/profile';
        return '';
      }

      const listing = await getListingById(listingId);
      return renderCreateListing(listing);
    }

    case 'favorites':
      return renderFavorites();

    case 'how-it-works':
      return renderHowItWorks();

    case 'profile':
      if (!getToken()) {
        window.location.hash = '#/login';
        return '';
      }
      return renderProfile();

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
