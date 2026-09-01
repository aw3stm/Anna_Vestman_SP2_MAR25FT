import { placeBid } from '../api/listings';
import type { listing } from '../components/productCard';

function getCurrentBid(product: listing): number {
  if (!product.bids?.length) {
    return 0;
  }
  return Math.max(...product.bids.map((bid) => bid.amount));
}

function formatTimeLeft(endsAt: string): string {
  const end = new Date(endsAt).getTime();
  const now = Date.now();
  const difference = end - now;

  if (difference <= 0) {
    return 'Auction ended';
  }
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  if (days > 0) {
    return `${days}d ${hours}h left`;
  }
  if (hours > 0) {
    return `${hours}h ${minutes}m left`;
  }
  return `${minutes}m left`;
}

export function renderListingDetails(product: listing): string {
  const images = product.media ?? [];
  const image = product.media?.[0]?.url ?? '';
  const altImage = product.media?.[0]?.alt || product.title;
  const category = product.tags?.[0] ?? 'Other';
  const currentBid = getCurrentBid(product);
  const timeLeft = formatTimeLeft(product.endsAt);

  return `
    <main class="flex-1 bg-white text-text">
    <section>
    <div class="mx-auto max-w-6xl px-6 py-8 sm:px-8 md:py-12 bg-white">
    
    <button type="button"
    id="listing-back"
    class="mb-6 flex cursor-pointer items-center gap-1 text-sm text-orange-accent hover:underline">
    <span class="material-symbols-outlined">
    arrow_back
    </span>
    <span class="cursor-pointer">Back</span>
    </button>
    
    <div class="grid gap-10 md:grid-cols-[1.5fr_0.85fr]">
    <div>
    <div class="relative flex h-80 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-md px-8 py-8 sm:h-96 md:px-16 md:py-12 md:h-110">
    <img id="main-product-image" src="${image}" alt="${altImage}" class="max-h-full max-w-full object-contain rounded-2xl">
    

    <button type="button"
    aria-label="Add ${product.title} to favorites"
    class="absolute right-4 top-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white shadow-md">
    <span class="material-symbols-outlined">favorite
    </span>
    </button>
    </div>

    ${
      images.length > 1
        ? `
        <div class="mt-4 flex w-full justify-start md:justify-center gap-3 overflow-x-auto">
        ${images
          .map(
            (item, index) => `
            <button type="button"
            class="listing-thumbnail h-24 w-24 md:h-28 md:w-28 shrink-0 overflow-hidden rounded-lg border-2 ${index === 0 ? 'border-orange-accent' : 'border-transparent'}
            bg-white"
            data-image="${item.url}"
            data-alt="${item.alt || product.title}">
            <img src="${item.url}" alt="${item.alt || `${product.title} image ${index + 1} `}" class="h-full w-full object-cover"/>
            </button>
             `,
          )
          .join('')}
        </div>
         `
        : ''
    }
    </div>


    <div class="mt-8 md:mt-4">
    <p class="text-sm text-text/70">
    ${category}</p>
    
    <h1 class="mt-1 text-2xl font-bold md:text-4xl">
    ${product.title}</h1>
    
    ${
      product.seller
        ? `
        <div class="mt-6">
        <p class="text-sm text-text/60">Seller</p>
        
        <div class="mt-2 flex items-center gap-3">
        ${
          product.seller.avatar?.url
            ? `
        <img src="${product.seller.avatar.url}" alt="${product.seller.avatar.alt || product.seller.name}" class="h-10 w-10 rounded-full object-cover" />
        `
            : `
        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-styling">
        <span class="material-symbols-outlined">person</span>
        </div>
        `
        }
        <span class="font-medium">${product.seller.name}</span>
        </div>
        </div>
        `
        : ''
    }

    <p class="mt-4 mb-6 text-base leading-6 md:text-lg">
    ${product.description}
    </p>

    <div class="rounded-xl border border-gray-200 px-4 py-3 mb-2">
    <p class="text-sm text-text/60">Ends in</p>
    
    <p class="mt-1 text-lg font-semibold">${timeLeft}</p>
    </div>

    <div class="rounded-xl border border-gray-200 px-4 py-3">
    <p class="text-sm text-text/60">Current bid</p>
    <p class="mt-1 text-lg font-semibold">${currentBid} credits
    </p>
    </div>
    </div>

    <div class="mt-6 md:mt-5">
    <h2 class="text-lg font-semibold">Bid history</h2>
    ${
      product.bids?.length
        ? `
    <div class="mt-3 divide-y divide-gray-100 rounded-xl border border-gray-200">
    ${[...product.bids]
      .sort((a, b) => b.amount - a.amount)
      .map(
        (bid) => `
        <div class="flex items-center justify-between px-4 py-3">
        <span class="text-sm">${bid.bidder.name}</span>
        <span class="text-sm font-semibold">${bid.amount} credits</span></div>
        `,
      )
      .join('')}
    </div>
    `
        : `
    <p class="mt-3 text-sm text-text/60">No bids yet.</p>`
    }
    </div>
    </div>

    <div class="mt-8">
    <h2 class="text-lg font-semibold">Place your bid</h2>
    <form id="bid-form" class="mt-3">
    <label for="bid-amount" class="sr-only">Bid amount</label>

    <div class="relative">
    <input type="number"
    id="bid-amount"
    name="bidAmount"
    min="${currentBid + 1}"
    placeholder="Enter your bid" required
    class="h-12 w-full rounded-lg border border-gray-300 px-4 pr-20 outline-none focus:border-orange-accent">
    <span class="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-text/60">credits
    </span>
    </div>

    <button type="submit"
    id="place-bid-btn"
    class="bidora-button mt-3 w-full py-3">Place bid</button>
    <p id="bid-msg"
    class="mt-3 hidden text-sm"
    aria-live="polite"></p>
    </form>
    </div>
    </section>
    </main>
    `;
}

export function initListingDetails(productId: string): void {
  const mainImage = document.querySelector<HTMLImageElement>('#main-product-image');
  const thumbnails = document.querySelectorAll<HTMLButtonElement>('.listing-thumbnail');

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener('click', () => {
      const imgUrl = thumbnail.dataset.image;
      const alt = thumbnail.dataset.alt;

      if (!mainImage || !imgUrl) {
        return;
      }
      mainImage.src = imgUrl;
      mainImage.alt = alt ?? '';

      thumbnails.forEach((item) => {
        item.classList.remove('border-orange-accent');
        item.classList.add('border-transparent');
      });
      thumbnail.classList.remove('border-transparent');
      thumbnail.classList.add('border-orange-accent');
    });
  });
  const bidForm = document.querySelector<HTMLFormElement>('#bid-form');
  const bidInput = document.querySelector<HTMLInputElement>('#bid-amount');
  const bidMessage = document.querySelector<HTMLParagraphElement>('#bid-msg');

  bidForm?.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!bidInput || !bidMessage) {
      return;
    }

    const amount = Number(bidInput.value);

    if (!amount || amount <= 0) {
      bidMessage.textContent = 'Please enter a valid bid.';
      bidMessage.classList.remove('hidden');
      return;
    }
    try {
      const updateListing = await placeBid(productId, amount);
      console.log('Bid placed', updateListing);

      bidMessage.textContent = 'Bid placed successfully!';
      bidMessage.classList.remove('hidden');
      bidInput.value = '';
    } catch (error) {
      console.error(error);
      bidMessage.textContent = 'Could not place bid. Please try again.';
      bidMessage.classList.remove('hidden');
    }
  });
  const backBtn = document.querySelector<HTMLButtonElement>('#listing-back');
  backBtn?.addEventListener('click', () => {
    window.location.hash = '#/';
  });
}
