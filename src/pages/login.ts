import { createApiKey, getApiKey, getCurrentProfile, loginUser } from '../api/auth';
import { renderAuthLayout } from '../components/authLayout';

export function renderLogin(): string {
  return renderAuthLayout({
    topLink: `
        <span class="text-base text-text">Don't have an account?
        <a href="#/register" class="text-orange-accent hover:underline">Sign up</a></span>
          `,
    formContent: `
          <section class="w-full max-w-md rounded-2xl bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
          <h2 class="text-2xl font-bold text-text">Welcome back</h2>
          <p class="mt-2 max-w-72 text-base leading-6 text-text">
        Sign in to your Bidora account and discover
        <span class="relative inline-block">
        something worth bidding on.
    <svg
      class="absolute -bottom-1 left-38 h-2 w-20 -translate-x-1/2 text-orange-accent"
      viewBox="0 0 80 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <svg xmlns="http://www.w3.org/2000/svg" width="74" height="10" viewBox="0 0 74 10" fill="none">
      <path d="M0.50006 8.62275C17.5172 -2.58736 76.8471 16.1587 72.6529 0.500142" 
      stroke="currentColor" 
      stroke-linecap="round"/>
    </svg>
    </svg>
  </span>
</p>

          <form id="login-form" class="mt-8 space-y-5">
          <div>
          <label for="email" class="bidora-label">Email</label>
          <input type="email" id="email" name="email" autocomplete="email" required class="bidora-input" />
          </div>

          
          <div>
          <label for="password" class="bidora-label">Password</label>
          <input type="password" id="password" name="password" autocomplete="current-password" required class="bidora-input" />
          </div>

          <div class="text-right">
          <a href="#" class="text-sm text-orange-accent hover:underline">Forgot password?</a></div>

          <button type="submit" class="bidora-button w-3xs mx-auto block px-6 py-3 hover:bg-hover-btn">Sign in</button>

          <p id="login-error" class="hidden text-center text-sm text-delete-btn"></p>
          </form>
          </section>`,
  });
}

export function initLogin(): void {
  const form = document.querySelector<HTMLFormElement>('#login-form');
  const emailInput = document.querySelector<HTMLInputElement>('#email');
  const passwordInput = document.querySelector<HTMLInputElement>('#password');
  const errorMessage = document.querySelector<HTMLParagraphElement>('#login-error');

  if (!form || !emailInput || !passwordInput || !errorMessage) {
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    errorMessage.classList.add('hidden');

    try {
      const user = await loginUser(email, password);

      localStorage.setItem('token', user.accessToken);

      localStorage.setItem(
        'profile',
        JSON.stringify({
          name: user.name,
          email: user.email,
        }),
      );

      if (!getApiKey()) {
        await createApiKey();
      }
      const profile = await getCurrentProfile();
      localStorage.setItem('profile', JSON.stringify(profile));
      window.location.hash = '#/';
    } catch (error) {
      errorMessage.textContent =
        error instanceof Error ? error.message : 'Login failed. Please try again.';

      errorMessage.classList.remove('hidden');
    }
  });
}
