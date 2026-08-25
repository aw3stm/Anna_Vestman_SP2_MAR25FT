import './style.css';
import { initNavbar, renderNavbar } from './components/navbar';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('App element not found');
}

app.innerHTML = `
${renderNavbar({
  isLoggedIn: true,
  credits: 2342,
  avatar: '../src/assets/Avatar.svg',
})}
  <main class="min-h-screen  text-text-clr flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-5xl font-bold">
        Bid. Discover. Win.
      </h1>

      <p class="mt-4 text-xl">
        Find something worth bidding on.
      </p>

      <button
        class="bidora-button px-24 py-4 hover:bg-hover-btn mt-4 text-base tracking-wide md:text-lg"
      >
        Search
      </button>
    </div>
  </main>
`;

initNavbar();
