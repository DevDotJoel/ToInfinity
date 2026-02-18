export const venueTypes = [
  'All',
  'Ballroom',
  'Barn',
  'Beach',
  'Garden',
  'Hotel',
  'Restaurant',
];

export const venues = [
  {
    id: '1',
    name: 'The Grand Ballroom Estate',
    type: 'Ballroom',
    location: 'Beverly Hills, CA',
    rating: 4.9,
    reviewCount: 128,
    capacity: 350,
    price: 15000,
    image: '',
    description: 'An elegant ballroom featuring crystal chandeliers, marble floors, and floor-to-ceiling windows with stunning city views. Perfect for luxurious wedding celebrations.',
  },
  {
    id: '2',
    name: 'Rustic Barn Retreat',
    type: 'Barn',
    location: 'Napa Valley, CA',
    rating: 4.8,
    reviewCount: 95,
    capacity: 200,
    price: 8500,
    image: '',
    description: 'A charming rustic barn surrounded by vineyards, offering an authentic countryside experience with modern amenities and breathtaking sunset views.',
  },
  {
    id: '3',
    name: 'Oceanview Beach Club',
    type: 'Beach',
    location: 'Malibu, CA',
    rating: 4.9,
    reviewCount: 156,
    capacity: 250,
    price: 20000,
    image: '',
    description: 'Experience the magic of a beachfront celebration with pristine white sands, crystal-clear waters, and spectacular Pacific Ocean sunsets.',
  },
];

export const catering = [
  {
    id: '1',
    name: 'Elegance Fine Dining',
    rating: 4.9,
    reviewCount: 203,
    specialties: ['Truffle Risotto', 'Pan-seared Sea Bass'],
    minGuests: 50,
    pricePerHead: 150,
    image: '',
  },
  {
    id: '2',
    name: 'Harvest Table Catering',
    rating: 4.8,
    reviewCount: 167,
    specialties: ['Seasonal Salads', 'Herb-roasted Chicken'],
    minGuests: 30,
    pricePerHead: 95,
    image: '',
  },
  {
    id: '3',
    name: 'Sugar Bloom Desserts',
    rating: 4.9,
    reviewCount: 241,
    specialties: ['Custom Wedding Cakes', 'Macaron Towers'],
    minGuests: 20,
    pricePerHead: 45,
    image: '',
  },
];

export const mockUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
};

export interface QuoteRequest {
  id: string;
  serviceType: "venue" | "catering";
  serviceName: string;
  serviceImage: string;
  location: string;
  status: "pending" | "replied" | "accepted" | "declined";
  eventMonth: string;
  eventYear: number;
  guestRange: string;
  priceLabel: string;
  submittedAt: string;
  repliedAt?: string;
}

export const mockQuoteRequests: QuoteRequest[] = [
  {
    id: '1',
    serviceType: 'venue',
    serviceName: 'The Grand Ballroom Estate',
    serviceImage: 'https://images.unsplash.com/photo-1519167758481-83f29da8c3a7?w=400',
    location: 'Beverly Hills, CA',
    status: 'replied',
    eventMonth: 'June',
    eventYear: 2026,
    guestRange: '300-350',
    priceLabel: '$15,000 - $18,000',
    submittedAt: '2026-02-10T10:00:00Z',
    repliedAt: '2026-02-11T14:30:00Z',
  },
  {
    id: '2',
    serviceType: 'venue',
    serviceName: 'Rustic Barn Retreat',
    serviceImage: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400',
    location: 'Napa Valley, CA',
    status: 'replied',
    eventMonth: 'September',
    eventYear: 2026,
    guestRange: '150-200',
    priceLabel: '$8,500 - $10,000',
    submittedAt: '2026-02-12T09:15:00Z',
    repliedAt: '2026-02-13T11:00:00Z',
  },
  {
    id: '3',
    serviceType: 'venue',
    serviceName: 'Oceanview Beach Club',
    serviceImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    location: 'Malibu, CA',
    status: 'pending',
    eventMonth: 'July',
    eventYear: 2026,
    guestRange: '200-250',
    priceLabel: '$20,000+',
    submittedAt: '2026-02-14T16:45:00Z',
  },
  {
    id: '4',
    serviceType: 'catering',
    serviceName: 'Elegance Fine Dining',
    serviceImage: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400',
    location: 'Los Angeles, CA',
    status: 'accepted',
    eventMonth: 'August',
    eventYear: 2026,
    guestRange: '100-120',
    priceLabel: '$150/person',
    submittedAt: '2026-02-08T13:20:00Z',
    repliedAt: '2026-02-09T10:15:00Z',
  },
  {
    id: '5',
    serviceType: 'catering',
    serviceName: 'Harvest Table Catering',
    serviceImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
    location: 'San Francisco, CA',
    status: 'declined',
    eventMonth: 'May',
    eventYear: 2026,
    guestRange: '80-100',
    priceLabel: '$95/person',
    submittedAt: '2026-02-05T11:30:00Z',
    repliedAt: '2026-02-06T09:00:00Z',
  },
];
