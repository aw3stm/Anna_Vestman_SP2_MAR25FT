export function renderHome(): string {
  return `
    <main class="flex flex-1 items-center justify-center bg-white text-text">
      <div class="text-center">
        <h1 class="text-2xl font-bold md:text-5xl">
          Bid. Discover. Win.
        </h1>

        <p class="mt-4 text-xl">
          Find something worth bidding on.
        </p>

        <button
          class="bidora-button my-6 px-24 py-4 text-base tracking-wide hover:bg-hover-btn md:text-lg"
        >
          Search
        </button>
      </div>
    </main>
  `;
}