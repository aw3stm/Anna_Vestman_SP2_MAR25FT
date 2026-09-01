import creditIcon from '../assets/money-icon.svg';
import logoutIcon from '../assets/logout_icon.svg';
import avatarIcon from '../assets/Avatar.svg';
import bidoraLogo from '../assets/Bidora logo with circle.svg';
import hamburgerMenu from '../assets/hamburger_menu.svg';
import { logout } from '../api/auth';

function getDeskLinkClass(path: string): string {
  const currentPath = window.location.hash.replace('#/', '').split('?')[0];

  return currentPath === path
    ? 'text-gray-600 border-b-2 border-[#E8754F] pb-1'
    : 'text-gray-600';
}

function getMobLinkClass(path: string): string {
  const currentPath = window.location.hash.replace('#/', '').split('?')[0];

  return currentPath === path
    ? 'text-[#E8754F] border-l-4 border-[#E8754F] pl-3'
    : 'text-gray-600';
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
            class="text-xl font-semibold ${getDeskLinkClass('')}"
          >
            Listings
          </a>

          ${
            isLoggedIn
              ? `
                <a
                  href="#/create-listing"
                  class="text-xl font-semibold ${getDeskLinkClass('create-listing')}"
                >
                  Create Listing
                </a>
              `
              : ''
          }

          <a
            href="#/how-it-works"
            class="text-xl font-semibold ${getDeskLinkClass('how-it-works')}"
          >
            How it works
          </a>

          ${
            !isLoggedIn
              ? `
                <a
                  href="#/login"
                  class="text-xl font-semibold ${getDeskLinkClass('login')}"
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
              <div class="flex items-center gap-2">

                <img
                  src="${creditIcon}"
                  alt=""
                />

                <span class="text-gray-600 md:text-lg">
                  ${credits.toLocaleString()} credits
                </span>

                <a
                  href="#/profile"
                  aria-label="Profile"
                >
                  <img
                    src="${avatar}"
                    alt="Profile"
                    class="h-10 w-10 rounded-full object-cover"
                  />
                </a>

                <button
                  type="button"
                  id="logout-btn"
                  aria-label="Log out"
                  class="ml-2 cursor-pointer"
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

export function initNavbar(): void {
  const menuBtn = document.querySelector<HTMLButtonElement>('#menu-btn');
  const mobileMenu = document.querySelector<HTMLDivElement>('#mobile-menu');
  const logoutBtn = document.querySelector<HTMLButtonElement>('#logout-btn');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');

      const isOpen = !mobileMenu.classList.contains('hidden');

      menuBtn.setAttribute(
        'aria-label',
        isOpen ? 'Close menu' : 'Open menu',
      );
    });
  }

  logoutBtn?.addEventListener('click', () => {
    logout();
  });
}