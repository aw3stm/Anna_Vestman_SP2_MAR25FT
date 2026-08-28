import type { listing } from '../components/productCard';

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

export async function getListings(): Promise<listing[]> {
  const response = await fetch(`${API_URL}/auction/listings?_bids=true&_active=true`);
  if (!response.ok) {
    throw new Error('Failed to fetch listings');
  }
  const data: ListingResponse = await response.json();
  return data.data;
}
