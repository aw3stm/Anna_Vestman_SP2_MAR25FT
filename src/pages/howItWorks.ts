import image1 from '../assets/How_it_works/takePhoto.svg';
import image2 from '../assets/How_it_works/createListing.svg';
import image3 from '../assets/How_it_works/sendItem.svg';
import image4 from '../assets/How_it_works/getCredits.svg';
import image5 from '../assets/How_it_works/happyCustomer.svg';

const steps = [
  {
    number: '1',
    title: 'Take a picture',
    text: 'Snap a few photos of the item you want to sell',
    image: image1,
  },
  {
    number: '2',
    title: 'Create your listing',
    text: 'Add a title, description, images and category.',
    image: image2,
  },
  {
    number: '3',
    title: 'Send the item',
    text: 'Once the auction ends, ship the item to the winning bidder.',
    image: image3,
  },
  {
    number: '4',
    title: 'Get your credits',
    text: 'The winning bid is added to your Bidora balance.',
    image: image4,
  },
  {
    number: '5',
    title: 'Happy customer',
    text: 'The buyer enjoys their new item.',
    image: image5,
  },
];

export function renderHowItWorks(): string {
  return `
    <main class="flex-1 bg-styling text-text">
    <section class="relative mb-6 overflow-hidden px-6 py-6 md:px-12 md:py-20">
    <div class="absolute bidora-glow-orange -right-40 top-10 h-96 w-96"></div>
    <div class="absolute bidora-glow-green -left-40 top-96 h-96 w-96"></div>

    <div class="relative z-10 mx-auto max-w-6xl">
    <div class="mx-auto max-w-2xl text-center">
    <p class="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-orange-text md:text-lg">
    How it works</p>
    <h1 class="text-2xl font-bold leading-tight md:text-4xl">
    Buy. Sell. Discover.</h1>

    <p class="mx-auto mt-5 max-w-xl text-base leading-7 text-text/70 md:text-lg">
    Getting started with Bidora is simple. Follow these five steps and you're ready to buy and sell.</p>
    </div>

    <div class="mt-16 mb-6 grid gap-14 md:grid-cols-2 md:gap-x-12 md:gap-y-20 lg:grid-cols-3">
    
    ${steps
      .map(
        (step) => `
        <article class="flex flex-col items-center text-center cursor-pointer">
        <div class="relative flex h-60 w-full items-center justify-center md:h-72">
      <span
        class="peer absolute left-1/2 top-2 z-20 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-primary-green text-base font-bold text-white shadow-md">
        ${step.number}
        </span>

        ${
          step.number === '1' || step.number === '2' || step.number === '4'
            ? `
        <svg
        class="absolute left-full top-8 z-20 ml-2 hidden h-8 w-28 overflow-visible lg:block"
        viewBox="0 0 120 30"
        fill="none"
        aria-hidden="true">
        <path
            d="M-20 15 H100 M90 5 L100 15 L90 25"
            class="how-it-works-arrow">
        </svg>
            `
            : ''
        }      
        <img src="${step.image}" 
        alt=""
        class="h-48 w-48 md:h-52 md:w-52 object-contain">
        </div>
        <h2 class="mt-2 text-lg font-bold md:text-xl">
        ${step.title}
        </h2>

        <p class="mt-2 max-w-sm text-sm leading-6 text-text md:text-base">
        ${step.text}
        </p>
        </article>
        `,
      )
      .join('')}
    </div>
    </div>
   </section>
</main>
    `;
}
