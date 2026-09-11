const API_URL = 'https://v2.api.noroff.dev';

/**
 * Creates an API key for the currently authenticated user.
 *
 * @returns A promise containing the newly created API key.
 * @throws {Error} If the user is not logged in or the API key cannot be created.
 */

export async function createApiKey(): Promise<string> {
  const token = getToken();

  if (!token) {
    throw new Error('User is not logged in');
  }
  const response = await fetch(`${API_URL}/auth/create-api-key`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'Bidora',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create API key');
  }
  const data = await response.json();
  localStorage.setItem('apiKey', data.data.key);
  return data.data.key;
}

/**
 * Retrieves the API key stored for the current user.
 *
 * @returns The stored API key, or null if no API key is available.
 */

export function getApiKey(): string | null {
  return localStorage.getItem('apiKey');
}

interface RegisterResponse {
  data: {
    name: string;
    email: string;
  };
}

/**
 * Registers a new user through the Noroff API.
 *
 * @param name - The user's username.
 * @param email - The user's email address.
 * @param password - The user's password.
 * @returns A promise containing the registered user's name and email.
 * @throws {Error} If registration fails.
 */

export async function registerUser(
  name: string,
  email: string,
  password: string,
): Promise<RegisterResponse['data']> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errors?.[0]?.message || 'Registration failed');
  }
  const data: RegisterResponse = await response.json();
  return data.data;
}

interface LoginResponse {
  data: {
    accessToken: string;
    name: string;
    email: string;
  };
}

/**
 * Authenticates a user through the Noroff API.
 *
 * @param email - The user's email address.
 * @param password - The user's password.
 * @returns A promise containing the user's access token, name and email.
 * @throws {Error} If the login credentials are invalid or the request fails.
 */
export async function loginUser(email: string, password: string): Promise<LoginResponse['data']> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errors?.[0]?.message || 'Invalid email or password.');
  }
  const data: LoginResponse = await response.json();
  return data.data;
}

/**
 * Retrieves the authentication token stored for the current user.
 *
 * @returns The stored access token, or null if the user is not authenticated.
 */
export function getToken(): string | null {
  return localStorage.getItem('token');
}

export interface ProfileResponse {
  data: {
    name: string;
    email: string;
    credits: number;
    bio?: string;
    avatar?: {
      url: string;
      alt: string;
    };
    banner?: {
      url: string;
      alt: string;
    };
    _count?: {
      listings?: number;
      wins?: number;
    };
  };
}

/**
 * Fetches the currently authenticated user's profile from the Noroff API.
 *
 * @returns A promise containing the current user's profile data.
 * @throws {Error} If required authentication information is missing or the profile cannot be fetched.
 */
export async function getCurrentProfile(): Promise<ProfileResponse['data']> {
  const token = getToken();
  const apiKey = getApiKey();
  const profile = getProfile();

  if (!token || !apiKey || !profile) {
    throw new Error('Authentication information is missing');
  }

  const response = await fetch(`${API_URL}/auction/profiles/${encodeURIComponent(profile.name)}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Noroff-API-Key': apiKey,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }
  const data: ProfileResponse = await response.json();
  return data.data;
}

export interface StoredProfile {
  name: string;
  email: string;
  credits?: number;
  bio?: string;
  avatar?: {
    url: string;
    alt: string;
  };
  banner?: {
    url: string;
    alt: string;
  };
  _count?: {
    listings?: number;
    wins?: number;
  };
}

/**
 * Retrieves the currently stored user profile from local storage.
 *
 * @returns The stored profile, or null if no profile is available.
 */
export function getProfile(): StoredProfile | null {
  const profile = localStorage.getItem('profile');
  if (!profile) {
    return null;
  }
  return JSON.parse(profile);
}

/**
 * Logs out the current user by removing authentication data from local storage.
 */
export function logout(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('profile');
  localStorage.removeItem('apiKey');

  window.location.reload();
}
