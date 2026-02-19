using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ToInfinity.Domain.Entities;
using ToInfinity.Domain.ValueObjects;
using ToInfinity.Infrastructure.Persistence.SeedData;

namespace ToInfinity.Infrastructure.Persistence.Configurations;

public class MunicipalityConfiguration : IEntityTypeConfiguration<Municipality>
{
    public void Configure(EntityTypeBuilder<Municipality> builder)
    {
        builder.ToTable("Municipalities");

        builder.HasKey(m => m.Id);

        builder.Property(m => m.Id)
            .HasConversion(
                id => id.Value,
                value => MunicipalityId.Create(value))
            .ValueGeneratedOnAdd();

        builder.Property(m => m.Name)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(m => m.DistrictId)
            .HasConversion(
                id => id.Value,
                value => DistrictId.Create(value))
            .IsRequired();

        builder.HasOne<District>()
            .WithMany()
            .HasForeignKey(m => m.DistrictId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Property(m => m.CreatedAt)
            .IsRequired();

        builder.Property(m => m.UpdatedAt)
            .IsRequired();

        builder.HasData(PortugalSeedData.GetMunicipalities());
    }
}
