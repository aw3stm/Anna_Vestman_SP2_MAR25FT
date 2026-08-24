import './style.css';
import { renderNavbar } from './components/navbar';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('App element not found');
}

app.innerHTML = `
${renderNavbar()}
  <main class="min-h-screen bg-gray-900 text-white flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-5xl font-bold text-purple-500">
        BIDORA
      </h1>

      <p class="mt-4 text-xl text-gray-300">
        Bid. Discover. Win.
      </p>

      <button
        class="mt-8 rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700"
      >
        Make a bid
      </button>
    </div>
  </main>
`;
