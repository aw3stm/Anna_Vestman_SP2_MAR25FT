const API_URL = 'https://v2.api.noroff.dev';

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

export function getApiKey(): string | null {
  return localStorage.getItem('apiKey');
}

interface RegisterResponse {
  data: {
    name: string;
    email: string;
  };
}

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

export function getToken(): string | null {
  return localStorage.getItem('token');
}

interface ProfileResponse {
  data: {
    name: string;
    email: string;
    credits: number;
    avatar?: {
      url: string;
      alt: string;
    };
    banner?: {
      url: string;
      alt: string;
    };
  };
}

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

export function getProfile(): { name: string; email: string } | null {
  const profile = localStorage.getItem('profile');
  if (!profile) {
    return null;
  }
  return JSON.parse(profile);
}

export function logout(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('profile');

  window.location.reload();
}
