using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ToInfinity.Domain.Entities;
using ToInfinity.Domain.Enums;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Infrastructure.Persistence.Configurations;

public class WeddingVenueConfiguration : IEntityTypeConfiguration<WeddingVenue>
{
    public void Configure(EntityTypeBuilder<WeddingVenue> builder)
    {
        ConfigureWeddingVenuesTable(builder);
        ConfigureWeddingGalleryImagesTable(builder);
    }

    private void ConfigureWeddingVenuesTable(EntityTypeBuilder<WeddingVenue> builder)
    {
        builder.ToTable("WeddingVenues");

        builder.HasKey(v => v.Id);

        builder.Property(v => v.Id)
            .HasConversion(
                id => id.Value,
                value => VenueId.Create(value))
            .ValueGeneratedNever();

        builder.Property(v => v.UserId)
            .HasConversion(
                id => id.Value,
                value => UserId.Create(value))
            .IsRequired();

        builder.Property(v => v.Name)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(v => v.Description)
            .IsRequired()
            .HasMaxLength(2000);

        builder.Property(v => v.VenueType)
            .IsRequired()
            .HasConversion<int>();

        builder.Property(v => v.Street)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(v => v.PostalCode)
            .IsRequired()
            .HasMaxLength(20);

        builder.Property(v => v.MunicipalityId)
            .HasConversion(
                id => id.Value,
                value => MunicipalityId.Create(value))
            .IsRequired();

        builder.HasOne<Municipality>()
            .WithMany()
            .HasForeignKey(v => v.MunicipalityId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Property(v => v.MinCapacity)
            .IsRequired();

        builder.Property(v => v.MaxCapacity)
            .IsRequired();

        builder.Property(v => v.PricePerPerson)
            .IsRequired()
            .HasColumnType("decimal(18,2)");

        builder.Property(v => v.RentalPrice)
            .HasColumnType("decimal(18,2)");

        builder.Property(v => v.MainImageUrl)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(v => v.Styles)
            .HasConversion<int>()
            .HasDefaultValue(VenueStyles.None);

        builder.Property(v => v.Amenities)
            .HasConversion<int>()
            .HasDefaultValue(VenueAmenities.None);

        builder.Property(v => v.SpacesDescription)
            .HasMaxLength(5000);

        builder.Property(v => v.ServicesDescription)
            .HasMaxLength(5000);

        builder.Property(v => v.GastronomyDescription)
            .HasMaxLength(5000);

        builder.Property(v => v.LocationDescription)
            .HasMaxLength(5000);

        builder.Property(v => v.Latitude);

        builder.Property(v => v.Longitude);

        builder.Property(v => v.Phone)
            .HasMaxLength(20);

        builder.Property(v => v.Email)
            .HasMaxLength(200);

        builder.Property(v => v.Website)
            .HasMaxLength(500);

        builder.Property(v => v.ClosingTime);

        builder.Property(v => v.CreatedAt)
            .IsRequired();

        builder.Property(v => v.UpdatedAt)
            .IsRequired();
    }

    private void ConfigureWeddingGalleryImagesTable(EntityTypeBuilder<WeddingVenue> builder)
    {
        builder.OwnsMany(v => v.Gallery, gb =>
        {
            gb.ToTable("WeddingGalleryImages");

            gb.HasKey("Id", "WeddingVenueId");

            gb.Property(g => g.Id)
                .HasConversion(
                    id => id.Value,
                    value => GalleryImageId.Create(value))
                .ValueGeneratedNever();

            gb.Property(g => g.Url)
                .IsRequired()
                .HasMaxLength(500);

            gb.Property(g => g.Order)
                .IsRequired();

            gb.Property(g => g.CreatedAt)
                .IsRequired();

            gb.Property(g => g.UpdatedAt)
                .IsRequired();

            gb.WithOwner().HasForeignKey("WeddingVenueId");
        });

        builder.Metadata.FindNavigation(nameof(WeddingVenue.Gallery))!
            .SetPropertyAccessMode(PropertyAccessMode.Field);
    }
}
