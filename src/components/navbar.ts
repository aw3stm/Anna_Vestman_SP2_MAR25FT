import creditIcon from '../assets/money-icon.svg';
import logoutIcon from '../assets/logout_icon.svg';
import avatarIcon from '../assets/Avatar.svg';
import bidoraLogo from '../assets/Bidora logo with circle.svg';
import hamburgerMenu from '../assets/hamburger_menu.svg';
import { logout } from '../api/auth';

function getDeskLinkClass(path: string): string {
  const currentPath = window.location.hash.replace('#/', '').split('?')[0];

  return currentPath === path ? 'text-gray-600 border-b-2 border-[#E8754F] pb-1' : 'text-gray-600';
}

function getMobLinkClass(path: string): string {
  const currentPath = window.location.hash.replace('#/', '').split('?')[0];

  return currentPath === path ? 'text-[#E8754F] border-l-4 border-[#E8754F] pl-3' : 'text-gray-600';
}

interface NavbarProps {
  isLoggedIn: boolean;
  credits?: number;
  avatar?: string;
}

export function renderNavbar({
  isLoggedIn,
  credits = 0,
  avatar = avatarIcon,
}: NavbarProps): string {
  return `
    <header class="relative bg-white">
      <nav class="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 md:px-12">

        <!-- Mobile menu button + logo -->
        <div class="flex items-center gap-4">
          <button
            type="button"
            id="menu-btn"
            aria-label="Open menu"
            class="cursor-pointer md:hidden"
          >
            <img src="${hamburgerMenu}" alt="" />
          </button>

          <a href="#/">
            <img
              src="${bidoraLogo}"
              alt="Bidora"
              class="w-20 md:w-28"
            />
          </a>
        </div>

        <!-- Desktop navbar -->
        <div class="hidden items-center gap-12 md:flex">

          <a
            href="#/"
            class="text-lg font-medium ${getDeskLinkClass('')}"
          >
            Listings
          </a>

          ${
            isLoggedIn
              ? `
                <a
                  href="#/create-listing"
                  class="text-lg font-medium ${getDeskLinkClass('create-listing')}"
                >
                  Create Listing
                </a>
              `
              : ''
          }

          <a
            href="#/how-it-works"
            class="text-lg font-medium ${getDeskLinkClass('how-it-works')}"
          >
            How it works
          </a>

          ${
            !isLoggedIn
              ? `
                <a
                  href="#/login"
                  class="text-lg font-medium ${getDeskLinkClass('login')}"
                >
                  Sign in
                </a>
              `
              : ''
          }
        </div>

        <!-- User section -->
        ${
          isLoggedIn
            ? `
              <div class="flex items-center gap-3">

              <a href="#/favorites"
              aria-label="Favorites"
              class="flex h-9 w-9 shrink-0 items-center justify-center">
              <span class="favorite-filled material-symbols-outlined text-2xl text-text transition-colors hover:text-orange-accent">
              favorite
              </span></a>

                <div class="flex items-center gap-1.5">
                <img
                  src="${creditIcon}"
                  alt=""
                  class="h-8 w-8 shrink-0"
                />

                <span id="navbar-credits" 
                class="text-sm text-text font-medium md:text-lg">
                <span class="md:hidden"> ${credits.toLocaleString()}</span>
                <span class="hidden md:inline"> ${credits.toLocaleString()} credits</span>
                </span>
                </div>
                
                <a
                  href="#/profile"
                  aria-label="Profile"
                  class="shrink-0"
                >
                  <img
                    src="${avatar}"
                    alt="Profile"
                    class="h-9 w-9 rounded-full object-cover md:h-10 md:w-10"
                  />
                </a>

                <button
                  type="button"
                  id="logout-btn"
                  aria-label="Log out"
                  class="ml-1 flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center"
                >
                  <img
                    src="${logoutIcon}"
                    class="h-6 w-6"
                    alt=""
                  />
                </button>

              </div>
            `
            : `
              <!-- Mobile sign in -->
              <a
                href="#/login"
                class="text-lg font-semibold text-gray-600 md:hidden"
              >
                Sign in
              </a>
            `
        }

      </nav>

      <!-- Mobile menu -->
      <div
        id="mobile-menu"
        class="absolute left-0 top-full z-50 hidden w-full bg-white px-6 py-6 shadow-md md:hidden"
      >
        <nav class="flex flex-col gap-6">

          <a
            href="#/"
            class="text-lg font-semibold ${getMobLinkClass('')}"
          >
            Listings
          </a>

          ${
            isLoggedIn
              ? `
                <a
                  href="#/create-listing"
                  class="text-lg font-semibold ${getMobLinkClass('create-listing')}"
                >
                  Create Listing
                </a>
              `
              : ''
          }

          <a
            href="#/how-it-works"
            class="text-lg font-semibold ${getMobLinkClass('how-it-works')}"
          >
            How it works
          </a>

          ${
            !isLoggedIn
              ? `
                <a
                  href="#/login"
                  class="text-lg font-semibold ${getMobLinkClass('login')}"
                >
                  Sign in
                </a>
              `
              : ''
          }

        </nav>
      </div>
    </header>
  `;
}
export function updateNavbarCredits(credits: number): void {
  const creditsElement = document.querySelector<HTMLSpanElement>('#navbar-credits');

  if (creditsElement) {
    creditsElement.textContent = `${credits.toLocaleString()} credits`;
  }
}

export function initNavbar(): void {
  const menuBtn = document.querySelector<HTMLButtonElement>('#menu-btn');
  const mobileMenu = document.querySelector<HTMLDivElement>('#mobile-menu');
  const logoutBtn = document.querySelector<HTMLButtonElement>('#logout-btn');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');

      const isOpen = !mobileMenu.classList.contains('hidden');

      menuBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });
  }

  logoutBtn?.addEventListener('click', () => {
    logout();
  });
}
