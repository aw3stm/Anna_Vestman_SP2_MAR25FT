import { getListings } from '../api/listings';
import retroJacket from '../assets/Retro_Jacket.png';
import { renderProductCard } from '../components/productCard';
import type { listing } from '../components/productCard';

let products: listing[] = [];

export async function renderHome(): Promise<string> {
  products = await getListings();
  return `
    <main class="flex-1 bg-white text-text">
    <section class="bg-white">
    <div class="mx-auto max-w-6xl px-6 py-8 md:px-8">
    <div class="mx-auto max-w-xl">
    <div class="relative">
    
    <input type="search"
    id="search-input"
    placeholder="Search auctions..."
    class="h-12 w-full rounded-full bg-styling px-5 pr-12 text-base outline-none placeholder:italic">
      <span class="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-text">
      search
      </span>
      </div>
     </div>

        <!-- Popular categories -->
        <section id="categories-section">
          <div class="mt-8">
            <h2 class="text-xl font-medium md:text-2xl">
              Popular categories
            </h2>

            <div class="mt-6 grid grid-cols-4 gap-2 border-b border-gray-200 pb-6">

              <button type="button"
              class="category-button group flex flex-col items-center gap-2 text-center cursor-pointer "
              data-category="Fashion">
              <span class="flex h-16 w-16 items-center justify-center rounded-full group-hover:bg-orange-accent/10 transition-all duration-100">
                <span class="material-symbols-outlined text-4xl text-orange-accent">
                  checkroom
                </span>
                </span>
                <span class="text-sm md:text-base">
                  Fashion
                </span>
              </button>

              <button type="button"
              class="category-button group flex flex-col items-center gap-2 text-center cursor-pointer"
              data-category="Electronics">
              <span class="flex h-16 w-16 items-center justify-center rounded-full group-hover:bg-orange-accent/10 transition-all duration-100">
                <span class="material-symbols-outlined text-4xl text-orange-accent"> 
                devices
                </span>
                </span>
                <span class="text-sm md:text-base">
                  Electronics
                </span>
              </button>

              <button type="button"
              class="category-button group flex flex-col items-center gap-2 text-center cursor-pointer"
              data-category="Home & Living">
              <span class="flex h-16 w-16 items-center justify-center rounded-full group-hover:bg-orange-accent/10 transition-all duration-100">
                <span class="material-symbols-outlined text-4xl text-orange-accent">
                  home
                </span>
                </span>
                <span class="text-sm md:text-base">
                  Home & Living
                </span>
              </button>

              <button
              type="button" 
              class="category-button group flex flex-col items-center gap-2 text-center cursor-pointer"
              data-category="Collectibles">
              <span class="flex h-16 w-16 items-center justify-center rounded-full group-hover:bg-orange-accent/10 transition-all duration-100">
                <span class="material-symbols-outlined text-4xl text-orange-accent">
                  star
                </span>
                </span>
                <span class="text-sm md:text-base">
                  Collectibles
                </span>
              </button>
            </div>
          </div>
        </div>
    </section>

<! ====== Hero ======= >
<section id="hero-section" class="bg-styling">
  <div
    class="mx-auto flex max-w-5xl flex-col px-6 py-10 sm:px-8 md:py-14"
  >

    <!-- Text + jacket -->
    <div
      class="flex flex-col md:flex-row md:items-center md:justify-center md:gap-4"
    >

      <!-- Text -->
      <div class="max-w-md">
        <h1 class="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
          Bid. Discover. Win.
        </h1>

        <p class="mt-4 text-lg leading-6 sm:text-xl sm:leading-7 md:text-2xl">
          Find something worth bidding on.
        </p>
      </div>

      <!-- Jacket -->
      <div
        class="relative mt-8 flex shrink-0 items-center justify-center md:mt-0"
      >
        <span
          class="bidora-badge absolute right-30 -top-4 z-10 uppercase shadow-md md:-right-2"
        >
          Just in
        </span>

        <img
          src="${retroJacket}"
          alt="Vintage leather jacket"
          class="h-40 w-40 object-contain md:h-60 md:w-60"
        />
      </div>

    </div>

    <!-- Button -->
    <div class="mt-6 flex justify-center">
      <button
        class="bidora-button px-12 py-4 text-base hover:bg-hover-btn md:px-16"
      >
        View products
      </button>
    </div>

  </div>
</section>

<section class="bg-white">
  <div class="mx-auto max-w-6xl px-6 py-10 md:px-8">
    <div id="back-home" class="mb-4 hidden">
    <button type="button"
    id="back-home-btn"
    class="flex items-center gap-1 text-sm text-orange-accent">
    <span class="material-symbols-outlined">
    arrow_back</span>
    <p class="hover:underline cursor-pointer text-base">Back</p>
    </button>
    </div>

    <h2 id="results-title"
    class="text-xl font-semibold md:text-2xl">
      Trending
    </h2>

    <div
    id="product-grid" 
    class="mt-6 grid gap-6 md:grid-cols-3">
     ${products.map(renderProductCard).join('')}
    </div>
    </div> 
    </section>
  </main>
  `;
}

export function initHomeSearch(): void {
  const searchInput = document.querySelector<HTMLInputElement>('#search-input');
  const productGrid = document.querySelector<HTMLDivElement>('#product-grid');
  const resultsTitle = document.querySelector<HTMLHeadingElement>('#results-title');
  const categoriesSection = document.querySelector<HTMLElement>('#categories-section');
  const heroSection = document.querySelector<HTMLElement>('#hero-section');
  const categoryButtons = document.querySelectorAll<HTMLButtonElement>('.category-button');
  const backHome = document.querySelector<HTMLElement>('#back-home');
  const backHomeBtn = document.querySelector<HTMLButtonElement>('#back-home-btn');

  if (!searchInput || !productGrid || !resultsTitle) {
    return;
  }

  let selectedCategory = '';

  const categoryMap: Record<string, string[]> = {
    Fashion: ['fashion', 'clothing', 'apparel', 'luxury', 'shoes'],
    Electronics: ['electronics', 'music', 'laptop', 'tv'],
    'Home & Living': ['home', 'living', 'furniture', 'home & living', 'flowers', 'bathroom'],
    Collectibles: ['collectibles', 'collectible', 'vintage', 'collection', 'designers', 'art'],
  };

  function updateResults(): void {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const filteredProducts = products.filter((product) => {
      const title = product.title?.toLowerCase() ?? '';
      const description = product.description?.toLowerCase() ?? '';
      const tags = product.tags?.join(' ').toLowerCase() ?? '';

      const matchesSearch =
        !searchTerm ||
        title.includes(searchTerm) ||
        description.includes(searchTerm) ||
        tags.includes(searchTerm);

      const categoryTags = categoryMap[selectedCategory] ?? [];

      const matchesCategory =
        !selectedCategory || product.tags?.some((tag) => categoryTags.includes(tag.toLowerCase()));
      return matchesSearch && matchesCategory;
    });

    const isFiltering = searchTerm.length > 0 || selectedCategory.length > 0;
    backHome?.classList.toggle('hidden', !isFiltering);
    resultsTitle.textContent = isFiltering ? 'Search results' : 'Trending';
    categoriesSection?.classList.toggle('hidden', isFiltering);
    heroSection?.classList.toggle('hidden', isFiltering);

    if (filteredProducts.length === 0) {
      productGrid.innerHTML = `<p class="col-span-full py-10 text-center text-lg">No items found.
    </p>
    `;
      return;
    }
    productGrid.innerHTML = filteredProducts.map(renderProductCard).join('');
  }

  searchInput.addEventListener('input', updateResults);

  categoryButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.dataset.category ?? '';

      if (selectedCategory === category) {
        selectedCategory = '';
      } else {
        selectedCategory = category;
      }
      updateResults();
    });
  });
  backHomeBtn?.addEventListener('click', () => {
    searchInput.value = '';
    selectedCategory = '';
    updateResults();
  });
}
