import { getListingById } from '../api/listings';
import type { listing } from '../components/productCard';
import { getFavorites, toggleFavorite } from '../utils/favorites';
import { renderProductCard } from '../components/productCard';

export async function renderFavorites(): Promise<string> {
  const favoriteIds = getFavorites();

  if (favoriteIds.length === 0) {
    return `
      <main class="flex-1 bg-white text-text">
        <section class="mx-auto max-w-6xl px-6 py-10 md:px-8 md:py-14">

          <div class="mb-10">
            <p
              class="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-accent"
            >
              Saved for later
            </p>

            <h1 class="text-3xl font-bold md:text-5xl">
              Your favorites
            </h1>

            <p class="mt-3 max-w-xl text-base text-text/70 md:text-lg">
              Keep track of the listings you don't want to miss.
            </p>
          </div>

          <div
            class="flex min-h-72 flex-col items-center justify-center rounded-3xl bg-styling px-6 text-center"
          >
            <span class="material-symbols-outlined text-5xl text-orange-accent">
              favorite_border
            </span>

            <h2 class="mt-4 text-xl font-semibold">
              No favorites yet
            </h2>

            <p class="mt-2 max-w-md text-sm text-text/70">
              Tap the heart on a listing to save it here.
            </p>

            <a
              href="#/"
              class="bidora-button mt-6 px-6 py-3 hover:bg-hover-btn"
            >
              Browse listings
            </a>
          </div>

        </section>
      </main>
    `;
  }

  const listings = await Promise.all(
    favoriteIds.map(async (id): Promise<listing | null> => {
      try {
        return await getListingById(id);
      } catch (error) {
        console.error(`Could not load favorite listing ${id}`, error);
        return null;
      }
    }),
  );

  const favoriteListings = listings.filter((listing): listing is listing => listing !== null);

  return `
    <main class="flex-1 bg-white text-text">
      <section class="mx-auto max-w-6xl px-6 py-10 md:px-8 md:py-14">

        <div class="mb-10">
          <p
            class="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-accent"
          >
            Saved for later
          </p>

          <h1 class="text-3xl font-bold md:text-5xl">
            Your favorites
          </h1>

          <p class="mt-3 max-w-xl text-base text-text/70 md:text-lg">
            Keep track of the listings you don't want to miss.
          </p>
        </div>

        <div
          id="favorites-grid"
          class="grid gap-6 md:grid-cols-3"
        >
          ${favoriteListings.map(renderProductCard).join('')}
        </div>

      </section>
    </main>
  `;
}

export function initFavorites(): void {
  const favoritesGrid = document.querySelector<HTMLDivElement>('#favorites-grid');

  if (!favoritesGrid) {
    return;
  }

  favoritesGrid.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;

    const favoriteButton = target.closest<HTMLButtonElement>('.favorite-button');

    if (favoriteButton) {
      const listingId = favoriteButton.dataset.favoriteId;

      if (!listingId) {
        return;
      }

      toggleFavorite(listingId);

      const card = favoriteButton.closest<HTMLElement>('.product-card');

      card?.remove();

      if (favoritesGrid.children.length === 0) {
        favoritesGrid.innerHTML = `
          <div
            class="col-span-full flex min-h-72 flex-col items-center justify-center rounded-3xl bg-styling px-6 text-center"
          >
            <span class="material-symbols-outlined text-5xl text-orange-accent">
              favorite_border
            </span>

            <h2 class="mt-4 text-xl font-semibold">
              No favorites yet
            </h2>

            <p class="mt-2 max-w-md text-sm text-text/70">
              Tap the heart on a listing to save it here.
            </p>

            <a
              href="#/"
              class="bidora-button mt-6 px-6 py-3 hover:bg-hover-btn"
            >
              Browse listings
            </a>
          </div>
        `;
      }

      return;
    }

    const card = target.closest<HTMLElement>('.product-card');

    if (!card) {
      return;
    }

    const id = card.dataset.id;

    if (!id) {
      return;
    }

    window.location.hash = `#/listing?id=${id}`;
  });
}
