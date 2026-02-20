export const VenueType = {
  Estate: 0,
  Hotel: 1,
  Restaurant: 2,
  BanquetHall: 3,
  Palace: 4,
  Beach: 5,
  Rooftop: 6,
  UniqueSpace: 7,
} as const;

export type VenueType = (typeof VenueType)[keyof typeof VenueType];

export const VenueTypeLabels: Record<number, string> = {
  [VenueType.Estate]: "Estate",
  [VenueType.Hotel]: "Hotel",
  [VenueType.Restaurant]: "Restaurant",
  [VenueType.BanquetHall]: "Banquet Hall",
  [VenueType.Palace]: "Palace",
  [VenueType.Beach]: "Beach",
  [VenueType.Rooftop]: "Rooftop",
  [VenueType.UniqueSpace]: "Unique Space",
};

export const AllVenueTypes = Object.values(VenueType) as number[];

export const VenueStyle = {
  Rustic: 1 << 0,
  Garden: 1 << 1,
  Vineyard: 1 << 2,
  Modern: 1 << 3,
  Historic: 1 << 4,
  Industrial: 1 << 5,
  Bohemian: 1 << 6,
  Countryside: 1 << 7,
  Seaside: 1 << 8,
  Mountain: 1 << 9,
  Urban: 1 << 10,
  Romantic: 1 << 11,
  Poolside: 1 << 12,
} as const;

export type VenueStyle = (typeof VenueStyle)[keyof typeof VenueStyle];

export const VenueStyleLabels: Record<number, string> = {
  [VenueStyle.Rustic]: "Rustic",
  [VenueStyle.Garden]: "Garden",
  [VenueStyle.Vineyard]: "Vineyard",
  [VenueStyle.Modern]: "Modern",
  [VenueStyle.Historic]: "Historic",
  [VenueStyle.Industrial]: "Industrial",
  [VenueStyle.Bohemian]: "Bohemian",
  [VenueStyle.Countryside]: "Countryside",
  [VenueStyle.Seaside]: "Seaside",
  [VenueStyle.Mountain]: "Mountain",
  [VenueStyle.Urban]: "Urban",
  [VenueStyle.Romantic]: "Romantic",
  [VenueStyle.Poolside]: "Poolside",
};

export const AllVenueStyles = Object.values(VenueStyle) as number[];

export const VenueAmenity = {
  Parking: 1 << 0,
  DanceFloor: 1 << 1,
  CivilCeremonySpace: 1 << 2,
  CateringKitchen: 1 << 3,
  ExclusiveUse: 1 << 4,
  Pool: 1 << 5,
  Accommodation: 1 << 6,
  Garden: 1 << 7,
  AirConditioning: 1 << 8,
  DisabledAccess: 1 << 9,
  SoundSystem: 1 << 10,
  Lighting: 1 << 11,
} as const;

export type VenueAmenity = (typeof VenueAmenity)[keyof typeof VenueAmenity];

export const VenueAmenityLabels: Record<number, string> = {
  [VenueAmenity.Parking]: "Parking",
  [VenueAmenity.DanceFloor]: "Dance Floor",
  [VenueAmenity.CivilCeremonySpace]: "Civil Ceremony Space",
  [VenueAmenity.CateringKitchen]: "Catering Kitchen",
  [VenueAmenity.ExclusiveUse]: "Exclusive Use",
  [VenueAmenity.Pool]: "Pool",
  [VenueAmenity.Accommodation]: "Accommodation",
  [VenueAmenity.Garden]: "Garden",
  [VenueAmenity.AirConditioning]: "Air Conditioning",
  [VenueAmenity.DisabledAccess]: "Disabled Access",
  [VenueAmenity.SoundSystem]: "Sound System",
  [VenueAmenity.Lighting]: "Lighting",
};

export const AllVenueAmenities = Object.values(VenueAmenity) as number[];

/** Check if a flags value has a specific flag set */
export const hasFlag = (flags: number, flag: number): boolean =>
  (flags & flag) !== 0;

/** Toggle a flag in a flags value */
export const toggleFlag = (flags: number, flag: number): number =>
  flags ^ flag;

/** Combine an array of flags into a single value */
export const combineFlags = (flags: number[]): number =>
  flags.reduce((acc, f) => acc | f, 0);

/** Extract individual flags from a combined value */
export const extractFlags = (combined: number, allFlags: number[]): number[] =>
  allFlags.filter((f) => hasFlag(combined, f));

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
