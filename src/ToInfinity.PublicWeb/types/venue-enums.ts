// Venue Type Enum
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
  [VenueType.Estate]: 'Estate',
  [VenueType.Hotel]: 'Hotel',
  [VenueType.Restaurant]: 'Restaurant',
  [VenueType.BanquetHall]: 'Banquet Hall',
  [VenueType.Palace]: 'Palace',
  [VenueType.Beach]: 'Beach',
  [VenueType.Rooftop]: 'Rooftop',
  [VenueType.UniqueSpace]: 'Unique Space',
};

export const AllVenueTypes = Object.values(VenueType).filter(
  (v) => typeof v === 'number'
) as number[];

// Venue Style Enum (Bitwise Flags)
export const VenueStyle = {
  Rustic: 1 << 0, // 1
  Garden: 1 << 1, // 2
  Vineyard: 1 << 2, // 4
  Modern: 1 << 3, // 8
  Historic: 1 << 4, // 16
  Industrial: 1 << 5, // 32
  Bohemian: 1 << 6, // 64
  Countryside: 1 << 7, // 128
  Seaside: 1 << 8, // 256
  Mountain: 1 << 9, // 512
  Urban: 1 << 10, // 1024
  Romantic: 1 << 11, // 2048
  Poolside: 1 << 12, // 4096
} as const;

export type VenueStyle = (typeof VenueStyle)[keyof typeof VenueStyle];

export const VenueStyleLabels: Record<number, string> = {
  [VenueStyle.Rustic]: 'Rustic',
  [VenueStyle.Garden]: 'Garden',
  [VenueStyle.Vineyard]: 'Vineyard',
  [VenueStyle.Modern]: 'Modern',
  [VenueStyle.Historic]: 'Historic',
  [VenueStyle.Industrial]: 'Industrial',
  [VenueStyle.Bohemian]: 'Bohemian',
  [VenueStyle.Countryside]: 'Countryside',
  [VenueStyle.Seaside]: 'Seaside',
  [VenueStyle.Mountain]: 'Mountain',
  [VenueStyle.Urban]: 'Urban',
  [VenueStyle.Romantic]: 'Romantic',
  [VenueStyle.Poolside]: 'Poolside',
};

export const AllVenueStyles = Object.values(VenueStyle).filter(
  (v) => typeof v === 'number'
) as number[];

// Venue Amenity Enum (Bitwise Flags)
export const VenueAmenity = {
  Parking: 1 << 0, // 1
  DanceFloor: 1 << 1, // 2
  CivilCeremonySpace: 1 << 2, // 4
  CateringKitchen: 1 << 3, // 8
  ExclusiveUse: 1 << 4, // 16
  Pool: 1 << 5, // 32
  Accommodation: 1 << 6, // 64
  Garden: 1 << 7, // 128
  AirConditioning: 1 << 8, // 256
  DisabledAccess: 1 << 9, // 512
  SoundSystem: 1 << 10, // 1024
  Lighting: 1 << 11, // 2048
} as const;

export type VenueAmenity = (typeof VenueAmenity)[keyof typeof VenueAmenity];

export const VenueAmenityLabels: Record<number, string> = {
  [VenueAmenity.Parking]: 'Parking',
  [VenueAmenity.DanceFloor]: 'Dance Floor',
  [VenueAmenity.CivilCeremonySpace]: 'Civil Ceremony Space',
  [VenueAmenity.CateringKitchen]: 'Catering Kitchen',
  [VenueAmenity.ExclusiveUse]: 'Exclusive Use',
  [VenueAmenity.Pool]: 'Pool',
  [VenueAmenity.Accommodation]: 'Accommodation',
  [VenueAmenity.Garden]: 'Garden',
  [VenueAmenity.AirConditioning]: 'Air Conditioning',
  [VenueAmenity.DisabledAccess]: 'Disabled Access',
  [VenueAmenity.SoundSystem]: 'Sound System',
  [VenueAmenity.Lighting]: 'Lighting',
};

export const AllVenueAmenities = Object.values(VenueAmenity).filter(
  (v) => typeof v === 'number'
) as number[];

// Bitwise Flag Utilities
export const hasFlag = (flags: number, flag: number): boolean =>
  (flags & flag) !== 0;

export const toggleFlag = (flags: number, flag: number): number => flags ^ flag;

export const combineFlags = (flags: number[]): number =>
  flags.reduce((acc, f) => acc | f, 0);

export const extractFlags = (combined: number, allFlags: number[]): number[] =>
  allFlags.filter((f) => hasFlag(combined, f));
