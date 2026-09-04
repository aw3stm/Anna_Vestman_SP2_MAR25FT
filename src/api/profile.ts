import type { listing } from '../components/productCard';
import { getApiKey, getProfile, getToken } from './auth';

const API_URL = 'https://v2.api.noroff.dev';

interface ListingResponse {
  data: listing[];
}

export interface ProfileBid {
  id: string;
  amount: number;
  bidder: {
    name: string;
    email: string;
  };
  created: string;
  listing?: listing;
}

interface BidResponse {
  data: ProfileBid[];
}

export async function myListings(): Promise<listing[]> {
  const token = getToken();
  const apiKey = getApiKey();
  const profile = getProfile();

  if (!token || !apiKey || !profile) {
    throw new Error('Authentication information is missing');
  }
  const response = await fetch(
    `${API_URL}/auction/profiles/${encodeURIComponent(profile.name)}/listings`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Noroff-API-Key': apiKey,
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch listings');
  }

  const data: ListingResponse = await response.json();
  return data.data;
}

export async function myBids(): Promise<ProfileBid[]> {
  const token = getToken();
  const apiKey = getApiKey();
  const profile = getProfile();

  if (!token || !apiKey || !profile) {
    throw new Error('Authentication information is missing');
  }
  const response = await fetch(
    `${API_URL}/auction/profiles/${encodeURIComponent(profile.name)}/bids?_listings=true`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Noroff-API-Key': apiKey,
      },
    },
  );
  if (!response.ok) {
    throw new Error('Failed to fetch your bids');
  }
  const data: BidResponse = await response.json();
  const bidsWithListings = await Promise.all(
    data.data.map(async (bid) => {
      if (!bid.listing?.id) {
        return bid;
      }

      const listingResponse = await fetch(
        `${API_URL}/auction/listings/${bid.listing.id}?_bids=true`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'X-Noroff-API-Key': apiKey,
          },
        },
      );

      if (!listingResponse.ok) {
        return bid;
      }

      const listingData: { data: listing } = await listingResponse.json();

      return {
        ...bid,
        listing: listingData.data,
      };
    }),
  );

  return bidsWithListings;
}

export interface UpdateProfileData {
  bio?: string;
  avatar?: {
    url: string;
    alt?: string;
  };
  banner?: {
    url: string;
    alt?: string;
  };
}

interface UpdateProfileResponse {
  data: {
    name: string;
    email: string;
    bio?: string;
    credits: number;
    avatar?: {
      url: string;
      alt?: string;
    };
    banner?: {
      url: string;
      alt?: string;
    };
    _count?: {
      listings?: number;
      wins?: number;
    };
  };
}
export async function updateProfile(
  profileData: UpdateProfileData,
): Promise<UpdateProfileResponse['data']> {
  const token = getToken();
  const apiKey = getApiKey();
  const profile = getProfile();

  if (!token || !apiKey || !profile) {
    throw new Error('Authentication information is missing');
  }

  const response = await fetch(`${API_URL}/auction/profiles/${encodeURIComponent(profile.name)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'X-Noroff-API-Key': apiKey,
    },
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.errors?.[0]?.message || 'Failed to update profile');
  }

  const data: { data: UpdateProfileResponse['data'] } = await response.json();

  return data.data;
}
