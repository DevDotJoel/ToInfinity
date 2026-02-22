export interface Venue {
  id: string;
  userId: string;
  name: string;
  description: string;
  venueType: number;
  street: string;
  postalCode: string;
  municipalityId: number;
  minCapacity: number;
  maxCapacity: number;
  pricePerPerson: number;
  rentalPrice: number | null;
  mainImageUrl: string;
  styles: number;
  amenities: number;
  spacesDescription: string | null;
  servicesDescription: string | null;
  gastronomyDescription: string | null;
  locationDescription: string | null;
  latitude: number | null;
  longitude: number | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  closingTime: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SearchVenuesParams {
  searchTerm?: string;
  countryId?: number;
  districtId?: number;
  municipalityId?: number;
  venueType?: number;
  styles?: number;
  amenities?: number;
  minCapacity?: number;
  maxCapacity?: number;
  sortBy?: string;
  page?: number;
  size?: number;
}

export interface SearchVenuesResponse {
  items: Venue[];
  totalCount: number;
}
