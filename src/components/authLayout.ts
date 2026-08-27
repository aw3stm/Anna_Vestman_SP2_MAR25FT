import bidoraLogo from '../assets/Bidora logo with circle.svg';
import desktopLoginImg from '../assets/login_signup_images/desktop_login_img.jpg';
import glassesImg from '../assets/login_signup_images/glasses.png';
import headphonesImg from '../assets/login_signup_images/headphones.png';
import bagImg from '../assets/login_signup_images/login_bag.png';
import { renderFooter } from './footer';

interface authLayoutProps {
  formContent: string;
  topLink: string;
}

export function renderAuthLayout({ formContent, topLink }: authLayoutProps): string {
  return `
  <main class="hidden md:block bg-white">

 <section class="mx-auto flex max-w-7xl items-stretch">

    <div class="relative min-h-150 w-1/2 overflow-hidden">
      <img
        src="${desktopLoginImg}"
        alt=""
        class="absolute inset-0 h-full w-full object-cover"
      />

      <a href="/" class="absolute left-10 top-8 z-10">
        <img src="${bidoraLogo}" alt="Bidora" class="w-28" />
      </a>

      <h1 class="absolute left-10 top-20 text-4xl font-bold leading-tight text-text">
        Bid.
        <span class="block">Discover.</span>
        <span class="block text-orange-accent">Win.</span>
      </h1>
    </div>

    <div class="flex w-1/2 flex-col bg-white">

      <div class="flex justify-end px-10 py-8 text-sm">
        ${topLink}
      </div>

      <div class="flex flex-1 items-center justify-center px-10 py-8">
        ${formContent}
      </div>

    </div>

  </section>

  ${renderFooter()}

</main>


    <! ===== Mobile ====== >

    <main class="flex min-h-screen flex-col bg-styling md:hidden">
    <div class="relative flex min-h-screen flex-col overflow-hidden">

    <div class="absolute bidora-glow-orange -right-40 -top-20 h-95.5 w-95.5"></div>
    <div class="absolute bidora-glow-green -left-20 top-32 h-62.5 w-62.5"></div>


    <! ==== Glasses ==== >
    <div class="absolute z-10 left-[32%] top-[18%] rotate-45">
        <span class="absolute h-1.25 w-1.25 rotate-180 bg-orange-accent/70"></span>
        <span class="absolute left-1.75 h-1.25 w-1.25 rotate-180 bg-orange-accent/70"></span>
        <span class="absolute top-1.75 h-1.25 w-1.25 rotate-180 bg-orange-accent/70"></span>
    </div>

    <! ==== Headphones ====>
     <div class="absolute z-10 right-[40%] top-[25%] rotate-300">
        <span class="absolute h-1.25 w-1.25 rotate-180 bg-orange-accent/70"></span>
        <span class="absolute left-1.75 h-1.25 w-1.25 rotate-180 bg-orange-accent/70"></span>
        <span class="absolute top-1.75 h-1.25 w-1.25 rotate-180 bg-orange-accent/70"></span>
    </div>
    
    <! ==== Bag ==== >
     <div class="absolute z-10 right-[45%] top-[13%] rotate-120">
        <span class="absolute h-1.25 w-1.25 rotate-180 bg-orange-accent/70"></span>
        <span class="absolute left-1.75 h-1.25 w-1.25 rotate-180 bg-orange-accent/70"></span>
        <span class="absolute top-1.75 h-1.25 w-1.25 rotate-180 bg-orange-accent/70"></span>
    </div>
     

    <div class="relative z-10 px-8 pt-8">
    <a href="/">
    <img src="${bidoraLogo}" alt="Bidora" class="w-24" />
    </a>
    </div>

    <div class="relative z-10 h-50">
    <img src="${glassesImg}" alt="" class="absolute left-[24%] top-8 h-24 w-24 object-contain" />
    <img src="${headphonesImg}" alt="" class="absolute left-1/2 top-20 h-40 w-40 -translate-x-1/2 object-contain" />
    <img src="${bagImg}" alt="" class="absolute right-[26%] top-2 h-24 w-24 object-contain" />
    </div>

    <div class="relative z-10 px-6 text-right text-sm">
    ${topLink}
    </div>

    <div class="relative z-10 flex flex-1 items-start justify-center px-6 py-4">
    ${formContent}
    </div>
    </div>
    </main>
    </div>    
    `;
}
