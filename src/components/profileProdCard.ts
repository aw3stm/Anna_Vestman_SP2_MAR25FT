import type { listing } from './productCard';

function getCurrentBid(listing: listing): number {
  if (!listing.bids || listing.bids.length === 0) {
    return 0;
  }
  return Math.max(...listing.bids.map((bid) => bid.amount));
}

function getRemainingTime(endsAt: string): string {
  const difference = new Date(endsAt).getTime() - Date.now();

  if (difference <= 0) {
    return 'Ended';
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

  if (days > 0) {
    return `${days}d ${hours}h left`;
  }

  const minutes = Math.floor((difference / (1000 * 60)) % 60);

  return `${hours}h ${minutes}m left`;
}

export function renderProfileProdCard(listing: listing): string {
  const image = listing.media?.[0]?.url ?? '';
  const altImg = listing.media?.[0]?.alt || listing.title;
  const currentBid = getCurrentBid(listing);
  const bids = listing.bids?.length ?? listing._count?.bids ?? 0;
  const timeRemaining = getRemainingTime(listing.endsAt);

  return `
    <article class="profile-product-card cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md"
    data-id="${listing.id}">
    <div class="relative h-32 bg-styling">
     <span class="absolute left-3 top-3 z-10 rounded-lg bg-primary-green px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
    Active
    </span>

    <button
    type="button"
    aria-label="Add ${listing.title} to favorites"
    class="absolute right-3 top-3 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white">
    <span class="material-symbols-outlined text-2xl">
    favorite
    </span>
    </button>

    <img src="${image}" 
    alt="${altImg}"
    class="h-full w-full object-contain">
    </div>

    <div class="px-3 py-3">
    <h3 class="line-clamp-2 text-base font-bold leading-tight">
    ${listing.title}</h3>

    <p class="mt-2 text-base">
    ${currentBid} credits
    </p>

    <div class="mt-4 flex items-center justify-between gap-2 text-sm">
    <span>${bids} bids
    </span>
    
    <span class="text-shadow-orange-accent">
    ${timeRemaining}
    </span>
    </div>
    </div>
    </article>
    `;
}
