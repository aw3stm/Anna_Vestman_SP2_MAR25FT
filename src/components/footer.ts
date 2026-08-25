import bidoraLogo from '../assets/Bidora logo with circle.svg';
import instaIcon from '../assets/social_icons/instagram.svg';
import pintIcon from '../assets/social_icons/pinterest.svg';
import fbIcon from '../assets/social_icons/facebook.svg';
import arrowDown from '../assets/arrow_down.svg';
import visaIcon from '../assets/payment_icons/visa.svg';
import masterIcon from '../assets/payment_icons/mastercard.svg';
import appleIcon from '../assets/payment_icons/applepay.svg';
import googleIcon from '../assets/payment_icons/google pay.svg';

export function renderFooter(): string {
  return `
    <footer class="bg-styling text-text">

      <!-- ==================== DESKTOP ==================== -->
      <div class="hidden md:block">
        <div class="mx-auto max-w-7xl px-12 py-12">

          <div class="grid grid-cols-[minmax(0,1.6fr)_repeat(4,minmax(0,1fr))_minmax(0,1.5fr)] gap-4">

            <!-- Brand -->
            <div class="w-fit">
              <img
                src="${bidoraLogo}"
                alt="Bidora"
                class="w-32"
              />

              <p class="mt-3 text-lg">
                The modern marketplace.
              </p>

              <p class="mt-1 text-lg">
                Bid. Discover.
                <span class="text-orange-accent">Win.</span>
              </p>

              <!-- Social icons -->
              <div class="mt-3 flex gap-3 pl-6">
                <img
                  src="${instaIcon}"
                  alt="Instagram"
                  class="h-6 w-6"
                />

                <img
                  src="${fbIcon}"
                  alt="Facebook"
                  class="h-6 w-6"
                />

                <img
                  src="${pintIcon}"
                  alt="Pinterest"
                  class="h-6 w-6"
                />
              </div>
            </div>

            <!-- Marketplace -->
            <div>
              <h3 class="font-bold">
                Marketplace
              </h3>

              <ul class="mt-3 space-y-1.5">
                <li>All categories</li>
                <li>New arrivals</li>
                <li>Trending auctions</li>
                <li>Ending soon</li>
              </ul>
            </div>

            <!-- How it works -->
            <div>
              <h3 class="font-bold">
                How it works
              </h3>

              <ul class="mt-3 space-y-1.5">
                <li>How bidding works</li>
                <li>Payments</li>
                <li>Safety tips</li>
                <li>Help center</li>
              </ul>
            </div>

            <!-- About Bidora -->
            <div>
              <h3 class="font-bold">
                About Bidora
              </h3>

              <ul class="mt-3 space-y-1.5">
                <li>About us</li>
                <li>Contact</li>
                <li>Socials</li>
                <li>Careers</li>
              </ul>
            </div>

            <!-- Legal -->
            <div>
              <h3 class="font-bold">
                Legal
              </h3>

              <ul class="mt-3 space-y-1.5">
                <li>Terms of service</li>
                <li>Privacy Policy</li>
                <li>Cookie Policy</li>
                <li>Refund Policy</li>
              </ul>
            </div>

            <!-- Newsletter -->
            <div class="min-w-0 text-center">
              <div>
                <h3 class="font-bold">
                  Stay in the loop
                </h3>

                <p class="mt-1">
                  Get the latest deals
                  and new drops.
                </p>

                <div class="mt-2 flex flex-col">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    class="bidora-input min-w-0 text-sm"
                  />

                  <button
                    type="button"
                    class="bidora-button mt-2 px-2 py-2 hover:bg-hover-btn"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>


      <!-- ==================== MOBILE ==================== -->
      <div class="md:hidden">        
        <div class="px-10 py-10">
          <div class="divide-y divide-gray-300">

            <div>
            <button
              type="button"
              class="links-btn flex w-full items-center justify-between py-5 text-left text-lg font-bold"
            >
              Marketplace
              <img
                src="${arrowDown}"
                alt=""
                class="links-arrow h-5 w-5"
              />
            </button>

            <div class="links-content hidden pb-5">
            <ul class="space-y-2 text-base font-normal">
            <li>All categories</li>
            <li>New arrivals</li>
            <li>Trending auctions</li>
            <li>Ending soon</li>
            </ul>
            </div>
            </div>

            <div>
            <button
              type="button"
              class="links-btn flex w-full items-center justify-between py-5 text-left text-lg font-bold"
            >
              How it works
              <img
                src="${arrowDown}"
                alt=""
                class="links-arrow h-5 w-5"
              />
            </button>

            <div class="links-content hidden pb-5">
            <ul class="space-y-2 text-base font-normal">
            <li>How to bid</li>
            <li>Payments</li>
            <li>Help center</li>
            </ul>
            </div>
            </div>

            <div>
            <button
              type="button"
              class="links-btn flex w-full items-center justify-between py-5 text-left text-lg font-bold"
            >
              About Bidora
              <img
                src="${arrowDown}"
                alt=""
                class="links-arrow h-5 w-5"
              />
            </button>

            <div class="links-content hidden pb-5">
            <ul class="space-y-2 text-base font-normal">
            <li>About us</li>
            <li>Contact</li>
            <li>Socials</li>
            <li>Careers</li>
            </ul>
            </div>
            </div>

            <div>
            <button
              type="button"
              class="links-btn flex w-full items-center justify-between py-5 text-left text-lg font-bold"
            >
              Legal
              <img
                src="${arrowDown}"
                alt=""
                class="links-arrow h-5 w-5"
              />
            </button>

            <div class="links-content hidden pb-5">
            <ul class="space-y-2 text-base font-normal">
            <li>Terms of service</li>
            <li>Privacy Policy</li>
            <li>Cookie Policy</li>
            <li>Refund Policy</li>
            </ul>
            </div>
            </div>   
            </div>
        </div>

       
        <div class="flex items-center justify-center gap-6 pb-6">
          <img
            src="${visaIcon}"
            alt="Visa"
            class="h-12 w-12"
          />

          <img
            src="${masterIcon}"
            alt="Mastercard"
            class="h-12 w-12"
          />

          <img
            src="${appleIcon}"
            alt="Apple Pay"
            class="h-12 w-12"
          />

          <img
            src="${googleIcon}"
            alt="Google Pay"
            class="h-12 w-12"
          />
        </div>


        <div class="px-10 pb-8 text-center">

          <h3 class="font-bold">
            Stay in the loop
          </h3>

          <div class="mt-2 flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              class="bidora-input max-w-56 rounded-r-none text-sm"
            />

            <button
              type="button"
              class="bidora-button rounded-l-none px-3 text-sm"
            >
              Subscribe
            </button>
          </div>

        </div>
      


      <!-- ==================== COPYRIGHT ==================== -->
      <div class="bg-primary-green py-6">
        <div class="mx-auto flex max-w-7xl items-center px-10 md:px-12">
          <p class="text-sm text-white mt-2">
            © 2026 Bidora. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  `;
}

export function initFooter(): void {
  const linksButtons = document.querySelectorAll<HTMLButtonElement>('.links-btn');

  linksButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling as HTMLDivElement | null;
      const arrow = button.querySelector<HTMLImageElement>('.links-arrow');

      if (!content) {
        return;
      }
      const isOpen = !content.classList.contains('hidden');

      content.classList.toggle('hidden', isOpen);
      button.setAttribute('aria-expanded', String(!isOpen));

      if (arrow) {
        arrow.classList.toggle('rotate-180', !isOpen);
      }
    });
  });
}
