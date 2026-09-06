import { getCurrentProfile } from '../api/auth';
import { deleteListing } from '../api/listings';
import { updateProfile } from '../api/profile';
import { myBids, myListings } from '../api/profile';
import type { ProfileBid } from '../api/profile';
import type { listing } from '../components/productCard';
import { renderProfileProdCard } from '../components/profileProdCard';

let listings: listing[] = [];
let bids: ProfileBid[] = [];
let listingToDelete: string | null = null;

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
      class="profile-tab px-3 pb-2 text-base font-semibold">
      My listings
    </button>

    <button
      type="button"
      id="my-bids-tab"
      class="profile-tab px-3 pb-2 text-base">
      My bids
    </button>
  </div>

  <div id="profile-listings" class="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
    ${listings
      .slice(0, 4)
      .map((listing) => renderProfileProdCard(listing, true))
      .join('')}
  </div>
    </section>
  </section>

  <div
  id="delete-listing-modal"
  class="fixed inset-0 z-50 hidden items-center justify-center bg-black/80 px-6"
>
  <div
    class="relative w-full max-w-sm rounded-2xl bg-white px-8 py-7 text-center shadow-xl"
  >
    <button
      type="button"
      id="close-delete-listing"
      aria-label="Close delete listing"
      class="absolute right-3 top-2 flex h-9 w-9 cursor-pointer items-center justify-center text-2xl text-gray-600"
    >
      ×
    </button>

    <div
      class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FAD9D0]"
    >
      <span class="material-symbols-outlined text-orange-accent">
        delete_outline
      </span>
    </div>

    <h2 class="mt-5 text-xl font-semibold">
      Delete this listing?
    </h2>

    <p class="mt-5 text-sm leading-6 text-text">
      Are you sure you want to delete this listing?<br />
      This action cannot be undone.
    </p>

    <p
      id="delete-listing-error"
      class="mt-4 hidden text-sm text-delete-btn"
      aria-live="polite"
    ></p>

    <div class="mt-7 flex gap-4">
      <button
        type="button"
        id="cancel-delete-listing"
        class="h-10 flex-1 cursor-pointer rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-50"
      >
        Cancel
      </button>

      <button
        type="button"
        id="confirm-delete-listing"
        class="h-10 flex-1 cursor-pointer rounded-md bg-orange-accent text-sm font-medium text-white hover:bg-hover-btn"
      >
        <span class="material-symbols-outlined mr-1 align-middle text-lg">
          delete_outline
        </span>
        Delete listing
      </button>
    </div>
  </div>
</div>

  <div id="edit-profile-modal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/40 px-6">
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
      .map((listing) => renderProfileProdCard(listing, true))
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

    const deleteButton = target.closest<HTMLButtonElement>('.delete-listing-button');

    if (deleteButton) {
      const listingId = deleteButton.dataset.deleteId;

      if (listingId) {
        openDeleteModal(listingId);
      }

      return;
    }

    const editButton = target.closest<HTMLButtonElement>('.edit-listing-button');

    if (editButton) {
      const listingId = editButton.dataset.editId;

      if (listingId) {
        window.location.hash = `#/edit-listing?id=${listingId}`;
      }

      return;
    }

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

  const deleteListingModal = document.querySelector<HTMLDivElement>('#delete-listing-modal');

  const closeDeleteListing = document.querySelector<HTMLButtonElement>('#close-delete-listing');

  const cancelDeleteListing = document.querySelector<HTMLButtonElement>('#cancel-delete-listing');

  const confirmDeleteListing = document.querySelector<HTMLButtonElement>('#confirm-delete-listing');

  const deleteListingError = document.querySelector<HTMLParagraphElement>('#delete-listing-error');

  const openDeleteModal = (listingId: string) => {
    if (!deleteListingModal) {
      return;
    }

    listingToDelete = listingId;

    deleteListingError?.classList.add('hidden');

    deleteListingModal.classList.remove('hidden');
    deleteListingModal.classList.add('flex');
  };

  const closeDeleteModal = () => {
    if (!deleteListingModal) {
      return;
    }

    listingToDelete = null;

    deleteListingModal.classList.add('hidden');
    deleteListingModal.classList.remove('flex');
  };

  closeDeleteListing?.addEventListener('click', closeDeleteModal);
  cancelDeleteListing?.addEventListener('click', closeDeleteModal);

  confirmDeleteListing?.addEventListener('click', async () => {
    if (!listingToDelete || !confirmDeleteListing) {
      return;
    }

    deleteListingError?.classList.add('hidden');

    confirmDeleteListing.disabled = true;
    confirmDeleteListing.textContent = 'Deleting...';

    try {
      await deleteListing(listingToDelete);

      listings = listings.filter((listing) => listing.id !== listingToDelete);

      const card = document.querySelector<HTMLElement>(`[data-id="${listingToDelete}"]`);

      card?.remove();

      closeDeleteModal();
    } catch (error) {
      console.error(error);

      if (deleteListingError) {
        deleteListingError.textContent =
          error instanceof Error ? error.message : 'Could not delete this listing.';

        deleteListingError.classList.remove('hidden');
      }

      confirmDeleteListing.disabled = false;
      confirmDeleteListing.innerHTML = `
      <span class="material-symbols-outlined mr-1 align-middle text-lg">
        delete_outline
      </span>
      Delete listing
    `;
    }
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
