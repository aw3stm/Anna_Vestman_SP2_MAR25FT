export interface listingMedia {
  url: string;
  alt?: string;
}

export interface listingBid {
  id: string;
  amount: number;
  bidder: {
    name: string;
  };
  created: string;
}

export interface listingSeller {
  name: string;
  email: string;
  bio?: string;
  avatar?: {
    url: string;
    alt?: string;
  };
  banner?: {
    url: string;
    alt?: string;
  };
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

  seller?: listingSeller;

  _count?: {
    bids?: number;
  };
  bids?: listingBid[];
}

function getCurrentBid(listing: listing): number {
  if (!listing.bids || listing.bids.length === 0) {
    return 0;
  }
  return Math.max(...listing.bids.map((bid) => bid.amount));
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
  <article class="product-card bidora-card flex overflow-hidden p-0 md:flex-col cursor-pointer"
  data-id="${listing.id}">
  <div class="relative h-48 w-48 shrink-0 overflow-hidden rounded-l-3xl bg-styling md:h-72 md:w-full md:rounded-l-3xl">
  ${
    isNew
      ? `<span class="absolute left-3 top-3 z-10 md:hidden bidora-badge-mobile">Just in</span>
    <span class="absolute left-4 top-4 z-10 hidden md:flex bidora-badge">Just in</span>`
      : ''
  } 

  <button type="button"
  aria-label="Add ${listing.title} to favorites"
  class="absolute right-4 top-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white shadow-md">
  <span class="material-symbols-outlined">
  favorite
  </span>
  </button>

  <img src="${image}" alt="${altImage}" class="h-full w-full object-contain p-4" />
  </div>


  <div class="flex flex-1 flex-col p-4 md:p-5">
  <h3 class="text-lg font-bold leading-tight md:text-xl">${listing.title}</h3>
  <p class="mt-1 text-sm md:text-base">
  ${category}</p>

  <div class="mt-6 flex items-end justify-between gap-4 md:mt-5">
  <div>
  <p class="text-sm md:text-base">Current bid</p>
  <p class="text-base font-bold md:text-xl">
  ${currentBid} 
  <span class="font-normal">credits</span>
  </p>
  </div>

  <div>
  <p class="text-sm md:text-base">Ends in</p>
 <p class="flex items-center gap-2 font-semibold text-orange-accent md:text-xl">
  <span class="material-symbols-outlined text-xl">schedule</span>
  <span class="relative top-0.5">${timeRemaining}</span>
</p>
  </div>
  </div>

  <button
  type="button"
  class="group mt-5 flex w-full items-center justify-center gap-2 py-2 text-lg font-semibold text-text transition-colors hover:text-orange-accent cursor-pointer"
>
  Place a bid
  <span class="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">
    arrow_forward
  </span>
</button>
  </div>
  </article>
  `;
}
