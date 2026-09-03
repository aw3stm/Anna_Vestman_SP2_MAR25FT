import { createListing } from '../api/listings';

export function renderCreateListing(): string {
  return `
    <main class="flex-1 bg-white text-text">
      <section class="mx-auto max-w-3xl px-6 py-10 md:px-8 md:py-14">

        <div class="mb-8">
          <h1 class="text-3xl font-bold md:text-4xl">
            Create listing
          </h1>

          <p class="mt-2 text-base text-text/70">
            Create a new listing and let the bidding begin.
          </p>
        </div>

        <form id="create-listing-form" class="space-y-6">

          <!-- Title -->
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
              class="bidora-input"
            />
          </div>

          <!-- Description -->
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
              class="bidora-input resize-y"
            ></textarea>
          </div>

          <!-- Category -->
          <div>
            <label for="listing-category" class="bidora-label">
              Category
            </label>

            <select
              id="listing-category"
              name="category"
              required
              class="bidora-input"
            >
              <option value="">Select a category</option>
              <option value="Fashion">Fashion</option>
              <option value="Electronics">Electronics</option>
              <option value="Home & Living">Home & Living</option>
              <option value="Collectibles">Collectibles</option>
            </select>
          </div>

          <!-- Deadline -->
          <div>
            <label for="listing-deadline" class="bidora-label">
              Deadline
            </label>

            <input
              type="datetime-local"
              id="listing-deadline"
              name="deadline"
              required
              class="bidora-input"
            />
          </div>

          <!-- Images -->
          <div>
            <label class="bidora-label">
              Images
            </label>

            <div id="image-fields" class="space-y-4">

              <!-- First image -->
              <div class="image-field rounded-xl border border-gray-200 p-4">

                <label
                  for="listing-image-0"
                  class="text-sm font-medium text-text"
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
                  class="mt-4 block text-sm font-medium text-text"
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

            </div>

            <button
              type="button"
              id="add-image-btn"
              class="mt-4 cursor-pointer text-sm font-semibold text-orange-accent hover:underline"
            >
              + Add another image
            </button>
          </div>

          <!-- Messages -->
          <p
            id="create-listing-error"
            class="hidden text-sm text-delete-btn"
            aria-live="polite"
          ></p>

          <p
            id="create-listing-success"
            class="hidden text-sm text-green-700"
            aria-live="polite"
          ></p>

          <!-- Submit -->
          <button
            type="submit"
            id="create-listing-btn"
            class="bidora-button w-full px-6 py-3"
          >
            Create listing
          </button>

        </form>
      </section>
    </main>
  `;
}

export function initCreateListing(): void {
  const form =
    document.querySelector<HTMLFormElement>('#create-listing-form');

  const titleInput =
    document.querySelector<HTMLInputElement>('#listing-title');

  const descriptionInput =
    document.querySelector<HTMLTextAreaElement>(
      '#listing-description',
    );

  const categoryInput =
    document.querySelector<HTMLSelectElement>('#listing-category');

  const deadlineInput =
    document.querySelector<HTMLInputElement>('#listing-deadline');

  const imageFields =
    document.querySelector<HTMLDivElement>('#image-fields');

  const addImageButton =
    document.querySelector<HTMLButtonElement>('#add-image-btn');

  const errorMessage =
    document.querySelector<HTMLParagraphElement>(
      '#create-listing-error',
    );

  const successMessage =
    document.querySelector<HTMLParagraphElement>(
      '#create-listing-success',
    );

  const submitButton =
    document.querySelector<HTMLButtonElement>(
      '#create-listing-btn',
    );

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

  let imageCount = 1;

  // Add another image
  addImageButton.addEventListener('click', () => {
    const index = imageCount;

    const imageField = document.createElement('div');

    imageField.className =
      'image-field rounded-xl border border-gray-200 p-4';

    imageField.innerHTML = `
      <label
        for="listing-image-${index}"
        class="text-sm font-medium text-text"
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
        class="mt-4 block text-sm font-medium text-text"
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

      <button
        type="button"
        class="remove-image mt-3 cursor-pointer text-sm text-delete-btn hover:underline"
      >
        Remove image
      </button>
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
    submitButton.textContent = 'Creating...';

    const imageInputs =
      document.querySelectorAll<HTMLInputElement>(
        'input[name="image"]',
      );

    const altInputs =
      document.querySelectorAll<HTMLInputElement>(
        'input[name="imageAlt"]',
      );

    const media = Array.from(imageInputs).map((input, index) => ({
      url: input.value.trim(),
      alt: altInputs[index]?.value.trim() ?? '',
    }));

    try {
      const listing = await createListing({
        title: titleInput.value.trim(),
        description: descriptionInput.value.trim(),
        endsAt: new Date(deadlineInput.value).toISOString(),
        media,
        tags: [categoryInput.value],
      });

      successMessage.textContent =
        'Listing created successfully!';

      successMessage.classList.remove('hidden');

      window.location.hash = `#/listing?id=${listing.id}`;
    } catch (error) {
      console.error(error);

      errorMessage.textContent =
        error instanceof Error
          ? error.message
          : 'Could not create listing. Please try again.';

      errorMessage.classList.remove('hidden');

      submitButton.disabled = false;
      submitButton.textContent = 'Create listing';
    }
  });
}