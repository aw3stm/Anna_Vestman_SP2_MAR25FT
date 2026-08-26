export function renderHome(): string {
    return `
      <main class="flex min-h-0 flex-1 items-center justify-center bg-white text-text">
    <div class="text-center">
      <h1 class="text-2xl md:text-5xl font-bold">
        Bid. Discover. Win.
      </h1>

      <p class="mt-4 text-xl">
        Find something worth bidding on.
      </p>

      <button
        class="bidora-button px-24 py-4 hover:bg-hover-btn my-6 text-base tracking-wide md:text-lg"
      >
        Search
      </button>
    </div>
  </main>
  `;
}