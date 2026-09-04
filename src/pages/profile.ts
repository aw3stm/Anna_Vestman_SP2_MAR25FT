import { getCurrentProfile } from '../api/auth';
import { updateProfile } from '../api/profile';
import { myBids, myListings } from '../api/profile';
import type { ProfileBid } from '../api/profile';
import type { listing } from '../components/productCard';
import { renderProfileProdCard } from '../components/profileProdCard';

let listings: listing[] = [];
let bids: ProfileBid[] = [];

export async function renderProfile(): Promise<string> {
  const profile = await getCurrentProfile();
  [listings, bids] = await Promise.all([myListings(), myBids()]);

  const avatar = profile.avatar?.url ?? '';
  const banner = profile.banner?.url ?? '';

  return `
    <main class="flex-1 bg-white text-text">
      <section class="mx-auto max-w-6xl px-6 py-8 md:px-8 md:py-12">

        <!-- Banner -->
        <div class="relative h-48 overflow-hidden rounded-2xl bg-gray-200 md:h-64">
          ${
            banner
              ? `<img
                  src="${banner}"
                  alt="${profile.banner?.alt ?? `${profile.name}'s banner`}"
                  class="h-full w-full object-cover"
                />`
              : ''
          }

        </div>

        <!-- Profile info -->
        <div class="relative -mt-12 rounded-2xl px-6 pb-6 pt-16 shadow-sm">

          <!-- Avatar -->
          <div class="absolute -top-8 left-6">
            ${
              avatar
                ? `<img
                    src="${avatar}"
                    alt="${profile.avatar?.alt ?? profile.name}"
                    class="h-24 w-24 rounded-full border-2 border-white object-cover"
                  />`
                : `<div class="h-24 w-24 rounded-full border-4 border-white bg-gray-200"></div>`
            }
          </div>

          <div class="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

            <div>
              <h1 class="text-2xl font-bold">
                ${profile.name}
              </h1>

              <div class="mt-1 flex items-center gap-1 text-sm text-text/60">
                <span class="material-symbols-outlined text-base text-orange-accent">
                  star
                </span>
                <span>5</span>
                <span>·</span>
                <span>Member since 2026</span>
              </div>
            </div>

            <button
              type="button"
              id="edit-profile-button"
              class="bidora-button px-6 py-3 hover:bg-hover-btn"
            >
              Edit profile
            </button>
          </div>

          <!-- Stats -->
          <div class="mt-8 grid grid-cols-3 border-t border-gray-200 pt-6 text-center">
            <div>
              <p class="text-2xl font-bold">
                ${profile._count?.listings ?? 0}
              </p>
              <p class="mt-1 text-sm text-text/60">
                Listings
              </p>
            </div>

            <div class="border-x border-gray-200">
              <p class="text-2xl font-bold">
                ${bids.length}
              </p>
              <p class="mt-1 text-sm text-text/60">
                Bids placed
              </p>
            </div>

            <div>
              <p class="text-2xl font-bold">
                ${profile._count?.wins ?? 0}
              </p>
              <p class="mt-1 text-sm text-text/60">
                Items won
              </p>
            </div>
          </div>
        </div>

        <!-- About -->
        <section class="mt-8 max-w-xl rounded-2xl bg-styling p-6 shadow-md">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold">
              About me
            </h2>
          </div>

          <p class="whitespace-pre-line mt text-sm md:text-base leading-relaxed text-text/70">
            ${profile.bio || 'No bio added yet.'}
          </p>
        </section>

       <section class="mt-8">
  <div class="flex border-b border-gray-200">
    <button
      type="button"
      id="my-listings-tab"
      class="profile-tab px-3 pb-2 text-base font-semibold"
    >
      My listings
    </button>

    <button
      type="button"
      id="my-bids-tab"
      class="profile-tab px-3 pb-2 text-base"
    >
      My bids
    </button>
  </div>

  <div id="profile-listings" class="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
    ${listings
      .slice(0, 4)
      .map((listing) => renderProfileProdCard(listing))
      .join('')}
  </div>
</section>

      </section>

      <div
  id="edit-profile-modal"
  class="fixed inset-0 z-50 hidden items-center justify-center bg-black/40 px-6"
>
  <div class="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-bold">Edit profile</h2>

      <button
        type="button"
        id="close-edit-profile"
        aria-label="Close edit profile"
        class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100"
      >
        <span class="material-symbols-outlined">
          close
        </span>
      </button>
    </div>

    <form id="edit-profile-form" class="mt-6 space-y-5">

      <div>
        <label for="profile-bio" class="bidora-label">
          Bio
        </label>

        <textarea
          id="profile-bio"
          name="bio"
          rows="4"
          maxlength="160"
          placeholder="Tell others a little about yourself"
          class="bidora-input resize-y"
        >${profile.bio ?? ''}</textarea>
      </div>

      <div>
        <label for="profile-avatar" class="bidora-label">
          Avatar URL
        </label>

        <input
          type="url"
          id="profile-avatar"
          name="avatar"
          value="${profile.avatar?.url ?? ''}"
          placeholder="https://example.com/avatar.jpg"
          class="bidora-input"
        />
      </div>

      <div>
        <label for="profile-banner" class="bidora-label">
          Banner URL
        </label>

        <input
          type="url"
          id="profile-banner"
          name="banner"
          value="${profile.banner?.url ?? ''}"
          placeholder="https://example.com/banner.jpg"
          class="bidora-input"
        />
      </div>

      <p
        id="edit-profile-error"
        class="hidden text-sm text-delete-btn"
        aria-live="polite"
      ></p>

      <p
        id="edit-profile-success"
        class="hidden text-sm text-green-700"
        aria-live="polite"
      ></p>

      <div class="flex justify-end gap-3 pt-2">
        <button
          type="button"
          id="cancel-edit-profile"
          class="rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          id="save-profile-btn"
          class="bidora-button px-6 py-3 hover:bg-hover-btn"
        >
          Save changes
        </button>
      </div>
    </form>
  </div>
</div>
    </main>
  `;
}

export function initProfile(): void {
  const listingsTab = document.querySelector<HTMLButtonElement>('#my-listings-tab');
  const bidsTab = document.querySelector<HTMLButtonElement>('#my-bids-tab');
  const listingsContainer = document.querySelector<HTMLDivElement>('#profile-listings');

  if (!listingsTab || !bidsTab || !listingsContainer) {
    return;
  }

  const setActiveTab = (activeTab: HTMLButtonElement) => {
    listingsTab.classList.remove('font-semibold', 'border-b-2', 'border-text');

    bidsTab.classList.remove('font-semibold', 'border-b-2', 'border-text');

    activeTab.classList.add('font-semibold', 'border-b-2', 'border-text');
  };

  setActiveTab(listingsTab);

  listingsTab.addEventListener('click', () => {
    listingsContainer.innerHTML = listings
      .slice(0, 4)
      .map((listing) => renderProfileProdCard(listing))
      .join('');

    setActiveTab(listingsTab);
  });

  bidsTab.addEventListener('click', () => {
    const bidListings = bids
      .map((bid) => bid.listing)
      .filter((listing): listing is NonNullable<typeof listing> => !!listing);

    listingsContainer.innerHTML = bidListings
      .slice(0, 4)
      .map((listing) => renderProfileProdCard(listing))
      .join('');

    setActiveTab(bidsTab);
  });

  const profileCards = document.querySelector<HTMLDivElement>('#profile-listings');

  profileCards?.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target.closest('button')) {
      return;
    }

    const card = target.closest<HTMLElement>('[data-id]');

    if (!card) {
      return;
    }

    const listingId = card.dataset.id;

    if (!listingId) {
      return;
    }

    window.location.hash = `#/listing?id=${listingId}`;
  });

  const editProfileButton = document.querySelector<HTMLButtonElement>('#edit-profile-button');

  const editProfileModal = document.querySelector<HTMLDivElement>('#edit-profile-modal');

  const closeEditProfile = document.querySelector<HTMLButtonElement>('#close-edit-profile');

  const cancelEditProfile = document.querySelector<HTMLButtonElement>('#cancel-edit-profile');

  const editProfileForm = document.querySelector<HTMLFormElement>('#edit-profile-form');

  const bioInput = document.querySelector<HTMLTextAreaElement>('#profile-bio');

  const avatarInput = document.querySelector<HTMLInputElement>('#profile-avatar');

  const bannerInput = document.querySelector<HTMLInputElement>('#profile-banner');

  const errorMessage = document.querySelector<HTMLParagraphElement>('#edit-profile-error');

  const successMessage = document.querySelector<HTMLParagraphElement>('#edit-profile-success');

  const saveButton = document.querySelector<HTMLButtonElement>('#save-profile-btn');

  if (
    !editProfileButton ||
    !editProfileModal ||
    !closeEditProfile ||
    !cancelEditProfile ||
    !editProfileForm ||
    !bioInput ||
    !avatarInput ||
    !bannerInput ||
    !errorMessage ||
    !successMessage ||
    !saveButton
  ) {
    return;
  }

  editProfileButton.addEventListener('click', () => {
    editProfileModal.classList.remove('hidden');
    editProfileModal.classList.add('flex');
  });

  const closeModal = () => {
    editProfileModal.classList.add('hidden');
    editProfileModal.classList.remove('flex');
  };

  closeEditProfile.addEventListener('click', closeModal);
  cancelEditProfile.addEventListener('click', closeModal);

  editProfileForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    errorMessage.classList.add('hidden');
    successMessage.classList.add('hidden');

    saveButton.disabled = true;
    saveButton.textContent = 'Saving...';

    try {
      const updatedProfile = await updateProfile({
        bio: bioInput.value.trim(),
        avatar: avatarInput.value.trim()
          ? {
              url: avatarInput.value.trim(),
              alt: 'Profile avatar',
            }
          : undefined,
        banner: bannerInput.value.trim()
          ? {
              url: bannerInput.value.trim(),
              alt: 'Profile banner',
            }
          : undefined,
      });

      localStorage.setItem('profile', JSON.stringify(updatedProfile));

      successMessage.textContent = 'Profile updated successfully!';
      successMessage.classList.remove('hidden');

      setTimeout(() => {
        window.location.reload();
      }, 700);
    } catch (error) {
      errorMessage.textContent =
        error instanceof Error ? error.message : 'Could not update your profile.';

      errorMessage.classList.remove('hidden');

      saveButton.disabled = false;
      saveButton.textContent = 'Save changes';
    }
  });
}
