import type { listing } from '../components/productCard';
import { getApiKey, getToken } from './auth';

const API_URL = 'https://v2.api.noroff.dev';

interface ListingResponse {
  data: listing[];
  meta: {
    isFirstPage: boolean;
    isLastPage: boolean;
    currentPage: number;
    previousPage: number | null;
    pageCount: number;
    totalCount: number;
  };
}

export type ListingSort = 'newest' | 'oldest' | 'ending-soon' | 'ending-last';

export async function getListings(sortBy: ListingSort = 'newest'): Promise<listing[]> {
  let sort = 'created';
  let sortOrder = 'desc';

  if (sortBy === 'oldest') {
    sort = 'created';
    sortOrder = 'asc';
  }

  if (sortBy === 'ending-soon') {
    sort = 'endsAt';
    sortOrder = 'asc';
  }

  if (sortBy === 'ending-last') {
    sort = 'endsAt';
    sortOrder = 'desc';
  }

  const response = await fetch(
    `${API_URL}/auction/listings?_bids=true&_active=true&sort=${sort}&sortOrder=${sortOrder}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch listings');
  }

  const data: ListingResponse = await response.json();

  return data.data;
}

export async function getListingById(id: string): Promise<listing> {
  const response = await fetch(`${API_URL}/auction/listings/${id}?_seller=true&_bids=true`);
  if (!response.ok) {
    throw new Error('Failed to fetch listing');
  }
  const data: { data: listing } = await response.json();
  return data.data;
}

export async function placeBid(id: string, amount: number): Promise<listing> {
  const token = getToken();
  const apiKey = getApiKey();

  if (!token || !apiKey) {
    throw new Error('Authentication information is missing');
  }

  const response = await fetch(`${API_URL}/auction/listings/${id}/bids`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'X-Noroff-API-Key': apiKey,
    },
    body: JSON.stringify({
      amount,
    }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    console.error('Place bid error', errorData);

    throw new Error(errorData.errors?.[0]?.message || 'Failed to place bid');
  }
  const data: { data: listing } = await response.json();
  return data.data;
}

export interface CreateListingData {
  title: string;
  description: string;
  endsAt: string;
  media?: {
    url: string;
    alt: string;
  }[];
  tags?: string[];
}

export async function createListing(listing: CreateListingData): Promise<listing> {
  const token = getToken();
  const apiKey = getApiKey();

  if (!token || !apiKey) {
    throw new Error('Authentication information is missing');
  }
  const response = await fetch(`${API_URL}/auction/listings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'X-Noroff-API-Key': apiKey,
    },
    body: JSON.stringify(listing),
  });
  if (!response.ok) {
    const errorData = await response.json();
    console.error('Create listing error', errorData);

    throw new Error(errorData.errors?.[0]?.message || 'Failed to create listing');
  }
  const data: { data: listing } = await response.json();
  return data.data;
}

export async function updateListing(
  id: string,
  listing: Partial<CreateListingData>,
): Promise<listing> {
  const token = getToken();
  const apiKey = getApiKey();

  if (!token || !apiKey) {
    throw new Error('Authentication information is missing');
  }

  const response = await fetch(`${API_URL}/auction/listings/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'X-Noroff-API-Key': apiKey,
    },
    body: JSON.stringify(listing),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Update listing error', errorData);

    throw new Error(errorData.errors?.[0]?.message || 'Failed to update listing');
  }

  const data: { data: listing } = await response.json();
  return data.data;
}

export async function deleteListing(id: string): Promise<void> {
  const token = getToken();
  const apiKey = getApiKey();

  if (!token || !apiKey) {
    throw new Error('Authentication information is missing');
  }

  const response = await fetch(`${API_URL}/auction/listings/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Noroff-API-Key': apiKey,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Delete listing error', errorData);

    throw new Error(errorData.errors?.[0]?.message || 'Failed to delete listing');
  }
}
