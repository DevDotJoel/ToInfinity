export interface Venue {
  id: string;
  userId: string;
  name: string;
  description: string;
  street: string;
  postalCode: string;
  municipalityId: string;
  capacity: number;
  pricePerPerson: number;
  mainImageUrl: string;
}

export interface SearchVenuesParams {
  searchTerm?: string;
  countryId?: number;
  districtId?: number;
  municipalityId?: number;
  sortBy?: string;
  page?: number;
  size?: number;
}
