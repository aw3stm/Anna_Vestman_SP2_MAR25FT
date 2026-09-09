import { createListing, updateListing } from '../api/listings';

import type { listing } from '../components/productCard';

export function renderCreateListing(existingListing?: listing): string {
  const isEditMode = !!existingListing;

  const deadlineValue = existingListing
    ? new Date(existingListing.endsAt).toISOString().slice(0, 16)
    : '';

  const images = existingListing?.media ?? [];

  return `
    <main class="relative flex-1 overflow-hidden bg-styling text-text">
      <div
        class="bidora-glow-orange pointer-events-none absolute -left-32 top-20 h-72 w-72"
      ></div>

      <div
        class="bidora-glow-green pointer-events-none absolute -right-32 bottom-20 h-80 w-80"
      ></div>

      <section class="relative z-10 mx-auto max-w-5xl px-6 py-10 md:px-8 md:py-14">
        <div class="mb-8 md:mb-10">
          <div class="flex items-start justify-between gap-6">

            <div>
              <p
                class="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-accent"
              >
                ${isEditMode ? 'Keep the bidding going' : 'Start the bidding'}
              </p>

              <h1 class="text-3xl font-bold leading-tight md:text-5xl">
                ${isEditMode ? 'Edit listing' : 'Create listing'}
              </h1>

              <h2 class="mt-3 max-w-xl text-base leading-6 text-text/70 md:text-lg">
                ${
                  isEditMode
                    ? 'Update your listing and keep it looking its best.'
                    : "Turn something you love into someone else's next find."
                }
              </h2>
            </div>

            <div
              class="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-accent text-white shadow-md sm:flex"
            >
              <span class="material-symbols-outlined text-3xl">
                ${isEditMode ? 'edit' : 'add'}
              </span>
            </div>
          </div>
        </div>

        <div
          class="rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.10)] md:p-10"
        >

          <form id="create-listing-form" class="space-y-7">

            <div>
              <label for="listing-title" class="bidora-label">
                Title
              </label>

              <input
                type="text"
                id="listing-title"
                name="title"
                required
                maxlength="100"
                placeholder="Enter a title"
                value="${existingListing?.title ?? ''}"
                class="bidora-input"
              />

            </div>
          
            <div>
              <label for="listing-description" class="bidora-label">
                Description
              </label>

              <textarea
                id="listing-description"
                name="description"
                required
                rows="6"
                placeholder="Describe your item"
                class="bidora-input resize-none"
              >${existingListing?.description?.trim() ?? ''}</textarea>

            </div>


            <div class="grid gap-7 md:grid-cols-2">


              <div>
                <label for="listing-category" class="bidora-label">
                  Category
                </label>

                <div class="relative">

                  <select
                    id="listing-category"
                    name="category"
                    required
                    class="bidora-input w-full cursor-pointer appearance-none pr-10"
                  >

                    <option value="">
                      Select a category
                    </option>

                    <option
                      value="Fashion"
                      ${existingListing?.tags?.[0] === 'Fashion' ? 'selected' : ''}
                    >
                      Fashion
                    </option>

                    <option
                      value="Electronics"
                      ${existingListing?.tags?.[0] === 'Electronics' ? 'selected' : ''}
                    >
                      Electronics
                    </option>

                    <option
                      value="Home & Living"
                      ${existingListing?.tags?.[0] === 'Home & Living' ? 'selected' : ''}
                    >
                      Home & Living
                    </option>

                    <option
                      value="Collectibles"
                      ${existingListing?.tags?.[0] === 'Collectibles' ? 'selected' : ''}
                    >
                      Collectibles
                    </option>

                  </select>

                  <span
                    class="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xl text-text/60"
                  >
                    expand_more
                  </span>

                </div>

              </div>

              <div>

                <label for="listing-deadline" class="bidora-label">
                  Deadline
                </label>

                <input
                  type="datetime-local"
                  id="listing-deadline"
                  name="deadline"
                  required
                  value="${deadlineValue}"
                  class="bidora-input"
                />

              </div>
            </div>

            <div>

              <div class="mb-3 flex items-center justify-between gap-4">

                <span class="bidora-label mb-0">
                  Images
                </span>

                <span class="text-xs text-text/50">
                  Add at least one image
                </span>

              </div>

              <div id="image-fields" class="space-y-4">

                ${
                  images.length > 0
                    ? images
                        .map(
                          (image, index) => `
                            <div
                              class="image-field rounded-2xl border border-gray-200 bg-styling/40 p-5"
                            >

                              <div class="flex items-center justify-between gap-4">

                                <p class="text-sm font-semibold">
                                  Image ${index + 1}
                                </p>

                                ${
                                  index > 0
                                    ? `
                                      <button
                                        type="button"
                                        class="remove-image cursor-pointer text-sm font-medium text-delete-btn hover:underline"
                                      >
                                        Remove
                                      </button>
                                    `
                                    : ''
                                }

                              </div>

                              <label
                                for="listing-image-${index}"
                                class="mt-4 block text-sm font-medium text-text"
                              >
                                Image URL
                              </label>

                              <input
                                type="url"
                                id="listing-image-${index}"
                                name="image"
                                required
                                value="${image.url}"
                                placeholder="https://example.com/image.jpg"
                                class="bidora-input mt-2"
                              />

                              <label
                                for="listing-image-alt-${index}"
                                class="mt-5 block text-sm font-medium text-text"
                              >
                                Image description
                              </label>

                              <input
                                type="text"
                                id="listing-image-alt-${index}"
                                name="imageAlt"
                                required
                                value="${image.alt ?? ''}"
                                placeholder="Describe the image"
                                class="bidora-input mt-2"
                              />

                            </div>
                          `,
                        )
                        .join('')
                    : `
                      <div
                        class="image-field rounded-2xl border border-gray-200 bg-styling/40 p-5"
                      >

                        <p class="text-sm font-semibold">
                          Image 1
                        </p>

                        <label
                          for="listing-image-0"
                          class="mt-4 block text-sm font-medium text-text"
                        >
                          Image URL
                        </label>

                        <input
                          type="url"
                          id="listing-image-0"
                          name="image"
                          required
                          placeholder="https://example.com/image.jpg"
                          class="bidora-input mt-2"
                        />

                        <label
                          for="listing-image-alt-0"
                          class="mt-5 block text-sm font-medium text-text"
                        >
                          Image description
                        </label>

                        <input
                          type="text"
                          id="listing-image-alt-0"
                          name="imageAlt"
                          required
                          placeholder="Describe the image"
                          class="bidora-input mt-2"
                        />

                      </div>
                    `
                }

              </div>

              <button
                type="button"
                id="add-image-btn"
                class="mt-4 flex cursor-pointer items-center gap-1 text-sm font-semibold text-orange-accent"
              >
                <span class="material-symbols-outlined text-lg">
                  add
                </span>

                <span class="hover:underline">Add another image</span>
              </button>

            </div>

            <!-- Messages -->

            <p
              id="create-listing-error"
              class="hidden rounded-lg bg-red-50 px-4 py-3 text-sm text-delete-btn"
              aria-live="polite"
            ></p>

            <p
              id="create-listing-success"
              class="hidden rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700"
              aria-live="polite"
            ></p>

            <!-- Submit -->

            <div class="border-t border-gray-100 pt-7">

              <button
                type="submit"
                id="create-listing-btn"
                class="bidora-button mx-auto block w-full px-6 py-3.5 text-base hover:bg-hover-btn sm:w-3xs"
              >
                ${isEditMode ? 'Save changes' : 'Create listing'}
              </button>

            </div>

          </form>

        </div>

      </section>

    </main>
  `;
}

export function initCreateListing(): void {
  const hash = window.location.hash.replace('#/', '');
  const [path, queryString] = hash.split('?');
  const params = new URLSearchParams(queryString);

  const listingId = params.get('id');
  const isEditMode = path === 'edit-listing';

  const form = document.querySelector<HTMLFormElement>('#create-listing-form');

  const titleInput = document.querySelector<HTMLInputElement>('#listing-title');

  const descriptionInput = document.querySelector<HTMLTextAreaElement>('#listing-description');

  const categoryInput = document.querySelector<HTMLSelectElement>('#listing-category');

  const deadlineInput = document.querySelector<HTMLInputElement>('#listing-deadline');

  const imageFields = document.querySelector<HTMLDivElement>('#image-fields');

  const addImageButton = document.querySelector<HTMLButtonElement>('#add-image-btn');

  const errorMessage = document.querySelector<HTMLParagraphElement>('#create-listing-error');

  const successMessage = document.querySelector<HTMLParagraphElement>('#create-listing-success');

  const submitButton = document.querySelector<HTMLButtonElement>('#create-listing-btn');

  if (
    !form ||
    !titleInput ||
    !descriptionInput ||
    !categoryInput ||
    !deadlineInput ||
    !imageFields ||
    !addImageButton ||
    !errorMessage ||
    !successMessage ||
    !submitButton
  ) {
    return;
  }

  let imageCount = imageFields.querySelectorAll('.image-field').length;

  addImageButton.addEventListener('click', () => {
    const index = imageCount;

    const imageField = document.createElement('div');

    imageField.className = 'image-field rounded-2xl border border-gray-200 bg-styling/40 p-5';

    imageField.innerHTML = `
      <div class="flex items-center justify-between gap-4">

        <p class="text-sm font-semibold">
          Image ${index + 1}
        </p>

        <button
          type="button"
          class="remove-image cursor-pointer text-sm font-medium text-delete-btn hover:underline"
        >
          Remove
        </button>

      </div>

      <label
        for="listing-image-${index}"
        class="mt-4 block text-sm font-medium text-text"
      >
        Image URL
      </label>

      <input
        type="url"
        id="listing-image-${index}"
        name="image"
        required
        placeholder="https://example.com/image.jpg"
        class="bidora-input mt-2"
      />

      <label
        for="listing-image-alt-${index}"
        class="mt-5 block text-sm font-medium text-text"
      >
        Image description
      </label>

      <input
        type="text"
        id="listing-image-alt-${index}"
        name="imageAlt"
        required
        placeholder="Describe the image"
        class="bidora-input mt-2"
      />
    `;

    imageFields.appendChild(imageField);
    imageCount++;
  });

  // Remove image

  imageFields.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;

    if (!target.classList.contains('remove-image')) {
      return;
    }

    const imageField = target.closest('.image-field');

    imageField?.remove();
  });

  // Submit form

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    errorMessage.classList.add('hidden');
    successMessage.classList.add('hidden');

    submitButton.disabled = true;
    submitButton.textContent = isEditMode ? 'Saving...' : 'Creating...';

    const imageInputs = document.querySelectorAll<HTMLInputElement>('input[name="image"]');

    const altInputs = document.querySelectorAll<HTMLInputElement>('input[name="imageAlt"]');

    const media = Array.from(imageInputs).map((input, index) => ({
      url: input.value.trim(),
      alt: altInputs[index]?.value.trim() ?? '',
    }));

    try {
      const listingData = {
        title: titleInput.value.trim(),
        description: descriptionInput.value.trim(),
        endsAt: new Date(deadlineInput.value).toISOString(),
        media,
        tags: [categoryInput.value],
      };

      let savedListing: listing;

      if (isEditMode) {
        if (!listingId) {
          throw new Error('Listing ID is missing');
        }

        savedListing = await updateListing(listingId, listingData);
      } else {
        savedListing = await createListing(listingData);
      }

      successMessage.textContent = isEditMode
        ? 'Listing updated successfully!'
        : 'Listing created successfully!';

      successMessage.classList.remove('hidden');

      if (isEditMode) {
        window.location.hash = '#/profile';
      } else {
        window.location.hash = `#/listing?id=${savedListing.id}`;
      }
    } catch (error) {
      console.error(error);

      errorMessage.textContent =
        error instanceof Error ? error.message : 'Could not save listing. Please try again.';

      errorMessage.classList.remove('hidden');

      submitButton.disabled = false;
      submitButton.textContent = isEditMode ? 'Save changes' : 'Create listing';
    }
  });
}
