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
