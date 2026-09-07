const FAVORITES_KEY = 'bidora-favorites';

export function getFavorites(): string[] {
  const favorites = localStorage.getItem(FAVORITES_KEY);

  if (!favorites) {
    return [];
  }

  return JSON.parse(favorites);
}

export function isFavorite(listingId: string): boolean {
  return getFavorites().includes(listingId);
}

export function addFavorite(listingId: string): void {
  const favorites = getFavorites();

  if (favorites.includes(listingId)) {
    return;
  }

  favorites.push(listingId);

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function removeFavorite(listingId: string): void {
  const favorites = getFavorites().filter((id) => id !== listingId);

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function toggleFavorite(listingId: string): boolean {
  if (isFavorite(listingId)) {
    removeFavorite(listingId);
    return false;
  }

  addFavorite(listingId);
  return true;
}
