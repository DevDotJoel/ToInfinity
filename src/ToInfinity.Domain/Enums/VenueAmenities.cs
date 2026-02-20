namespace ToInfinity.Domain.Enums;

[Flags]
public enum VenueAmenities
{
    None = 0,
    Parking = 1 << 0,
    DanceFloor = 1 << 1,
    CivilCeremonySpace = 1 << 2,
    CateringKitchen = 1 << 3,
    ExclusiveUse = 1 << 4,
    Pool = 1 << 5,
    Accommodation = 1 << 6,
    Garden = 1 << 7,
    AirConditioning = 1 << 8,
    DisabledAccess = 1 << 9,
    SoundSystem = 1 << 10,
    Lighting = 1 << 11
}
