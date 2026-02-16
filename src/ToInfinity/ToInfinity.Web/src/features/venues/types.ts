export interface Venue {
  id: string;
  name: string;
  description: string;
  location: string;
  capacity: number;
  pricePerDay: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateVenueRequest {
  name: string;
  description: string;
  location: string;
  capacity: number;
  pricePerDay: number;
  imageUrl?: string;
}

export interface UpdateVenueRequest {
  name?: string;
  description?: string;
  location?: string;
  capacity?: number;
  pricePerDay?: number;
  imageUrl?: string;
}
