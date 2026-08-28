export interface listingMedia {
  url: string;
  alt?: string;
}

export interface listingBid {
  amount: number;
  created: string;
}

export interface listing {
  id: string;
  title: string;
  description: string;
  tags: string[];
  media: listingMedia[];
  created: string;
  updated: string;
  endsAt: string;
  _count?: {
    bids?: number;
  };
  _bids?: listingBid[];
}

function getCurrentBid(listing: listing): number {
  if (!listing._bids || listing._bids.length === 0) {
    return 0;
  }
  return Math.max(...listing._bids.map((bid) => bid.amount));
}

function getRemainingTime(endsAt: string): string {
  const difference = new Date(endsAt).getTime() - Date.now();

  if (difference <= 0) {
    return 'Bidding ended';
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  return `${days}d ${hours.toString().padStart(2, '0')}h`;
}

function newListing(created: string): boolean {
  const oneWeek = 7 * 24 * 60 * 60 * 1000;
  return Date.now() - new Date(created).getTime() < oneWeek;
}

export function renderProductCard(listing: listing): string {
  const image = listing.media?.[0]?.url ?? '';
  const altImage = listing.media?.[0]?.alt || listing.title;

  const category = listing.tags?.[0] ?? 'Other';
  const currentBid = getCurrentBid(listing);
  const timeRemaining = getRemainingTime(listing.endsAt);
  const isNew = newListing(listing.created);

  return `
  <article class="bidora-card flex overflow-hidden p-0 md:flex-col">
  <div class="relative h-48 w-48 shrink-0 bg-styling md:h-72 md:w-full">
  ${
    isNew
      ? `<span class="absolute left-3 top-3 z-10 md:hidden bidora-badge-mobile">Just in</span>
    <span class="absolute left-4 top-4 z-10 hidden md:flex bidora-badge">Just in</span>`
      : ''
  } 

  <button type="button"
  aria-label="Add ${listing.title} to favorites"
  class="absolute right-4 top-4 z-10">
  <span class="material-symbols-outlined">
  favorite
  </span>
  </button>

  <img src="${image}" alt="${altImage}" class="h-full w-full object-contain p-4" />
  </div>


  <div class="flex flex-1 flex-col p-4 md:p-6">
  <h3 class="text-lg font-bold leading-tight md:text-2xl">${listing.title}</h3>
  <p class="mt-1 text-sm md:text-lg">
  ${category}</p>

  <div class="mt-6 flex items-end justify-between gap-4 md:mt-8">
  <div>
  <p class="text-sm md:text-lg">Current bid</p>
  <p class="text-base font-bold md:text-2xl">
  ${currentBid} 
  <span class="font-normal">credits</span>
  </p>
  </div>

  <div>
  <p class="text-sm md:text-lg">Ends in</p>
  <p class="flex items-center gap-1 font-semibold text-orange-accent md:text-2xl">
  <span class="material-symbols-outlined">schedule</span>
  ${timeRemaining}
  </p>
  </div>
  </div>

  <button type="button" class="bidora-button mt-4 w-full px-4 py-3 md:mt-6 md:text-xl hover:bg-hover-btn">Place a bid 
  <span class="material-symbols-outlined align-middle">arrow_forward</span>
  </button>
  </div>
  </article>
  `;
}
