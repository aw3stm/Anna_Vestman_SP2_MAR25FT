import { registerUser } from '../api/auth';
import { renderAuthLayout } from '../components/authLayout';

export function renderRegister(): string {
  return renderAuthLayout({
    topLink: `
      <span class="text-base text-text">
        Already have an account?
        <a href="#/login" class="text-orange-accent hover:underline">
          Sign in
        </a>
      </span>
    `,

    formContent: `
      <section class="w-full max-w-md rounded-2xl bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.12)]">

        <h2 class="text-2xl font-bold text-text">
          Let's sign up and discover
          <span class="block">
            something worth
            <span class="relative inline-block">
              bidding on.
              <svg
                class="absolute -bottom-1 left-1/3 h-2 w-20 -translate-x-1/2 text-orange-accent"
                viewBox="0 0 80 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.50006 8.62275C17.5172 -2.58736 76.8471 16.1587 72.6529 0.500142"
                  stroke="currentColor"
                  stroke-linecap="round"
                />
              </svg>
            </span>
          </span>
        </h2>

        <form id="register-form" class="mt-8 space-y-5">

          <div>
            <label for="username" class="bidora-label">
              Username
            </label>

            <input
              type="text"
              id="username"
              name="username"
              autocomplete="username"
              required
              class="bidora-input"
            />
          </div>

          <div>
            <label for="email" class="bidora-label">
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              autocomplete="email"
              required
              class="bidora-input"
            />
          </div>

          <div>
            <label for="password" class="bidora-label">
              Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              autocomplete="new-password"
              required
              class="bidora-input"
            />
          </div>

          <div>
            <label for="confirm-password" class="bidora-label">
              Confirm password
            </label>

            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              autocomplete="new-password"
              required
              class="bidora-input"
            />
          </div>

        

        <button type="submit" class="bidora-button w-3xs mx-auto block px-6 py-3 hover:bg-hover-btn">
        Create account
        </button>
          

          <p
            id="register-error"
            class="hidden text-center text-sm text-delete-btn"
          ></p>

        </form>
      </section>
    `,
  });
}

export function initRegister(): void {
  const form = document.querySelector<HTMLFormElement>('#register-form');
  const usernameInput = document.querySelector<HTMLInputElement>('#username');
  const emailInput = document.querySelector<HTMLInputElement>('#email');
  const passwordInput = document.querySelector<HTMLInputElement>('#password');
  const confirmPasswordInput = document.querySelector<HTMLInputElement>('#confirm-password');
  const errorMsg = document.querySelector<HTMLParagraphElement>('#register-error');

  if (
    !form ||
    !usernameInput ||
    !emailInput ||
    !passwordInput ||
    !confirmPasswordInput ||
    !errorMsg
  ) {
    return;
  }
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    errorMsg.classList.add('hidden');

    if (password !== confirmPassword) {
      errorMsg.textContent = 'Password do not match.';
      errorMsg.classList.remove('hidden');
      return;
    }
    try {
      await registerUser(username, email, password);
      window.location.hash = '#/login';
    } catch (error) {
      errorMsg.textContent =
        error instanceof Error ? error.message : 'Registration failed. Please try again.';
      errorMsg.classList.remove('hidden');
    }
  });
}
