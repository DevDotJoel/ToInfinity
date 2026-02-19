using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Infrastructure.Persistence.SeedData;

public static class PortugalSeedData
{
    private static readonly DateTime SeedDate = new(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc);

    // Country
    public static readonly CountryId PortugalId = CountryId.Create(1);

    // District IDs
    public static readonly DistrictId AveiroId = DistrictId.Create(1);
    public static readonly DistrictId BejaId = DistrictId.Create(2);
    public static readonly DistrictId BragaId = DistrictId.Create(3);
    public static readonly DistrictId BragancaId = DistrictId.Create(4);
    public static readonly DistrictId CasteloBrancoId = DistrictId.Create(5);
    public static readonly DistrictId CoimbraId = DistrictId.Create(6);
    public static readonly DistrictId EvoraId = DistrictId.Create(7);
    public static readonly DistrictId FaroId = DistrictId.Create(8);
    public static readonly DistrictId GuardaId = DistrictId.Create(9);
    public static readonly DistrictId LeiriaId = DistrictId.Create(10);
    public static readonly DistrictId LisboaId = DistrictId.Create(11);
    public static readonly DistrictId PortalegreId = DistrictId.Create(12);
    public static readonly DistrictId PortoId = DistrictId.Create(13);
    public static readonly DistrictId SantaremId = DistrictId.Create(14);
    public static readonly DistrictId SetubalId = DistrictId.Create(15);
    public static readonly DistrictId VianaDoCasteloId = DistrictId.Create(16);
    public static readonly DistrictId VilaRealId = DistrictId.Create(17);
    public static readonly DistrictId ViseuId = DistrictId.Create(18);
    public static readonly DistrictId MadeiraId = DistrictId.Create(19);
    public static readonly DistrictId AcoresId = DistrictId.Create(20);

    public static object[] GetCountries() => new object[]
    {
        new { Id = PortugalId, Name = "Portugal", Code = "PT", CreatedAt = SeedDate, UpdatedAt = SeedDate }
    };

    public static object[] GetDistricts() => new object[]
    {
        new { Id = AveiroId, Name = "Distrito de Aveiro", CountryId = PortugalId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = BejaId, Name = "Distrito de Beja", CountryId = PortugalId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = BragaId, Name = "Distrito de Braga", CountryId = PortugalId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = BragancaId, Name = "Distrito de Bragança", CountryId = PortugalId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = CasteloBrancoId, Name = "Distrito de Castelo Branco", CountryId = PortugalId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = CoimbraId, Name = "Distrito de Coimbra", CountryId = PortugalId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = EvoraId, Name = "Distrito de Évora", CountryId = PortugalId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = FaroId, Name = "Distrito de Faro", CountryId = PortugalId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = GuardaId, Name = "Distrito da Guarda", CountryId = PortugalId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = LeiriaId, Name = "Distrito de Leiria", CountryId = PortugalId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = LisboaId, Name = "Distrito de Lisboa", CountryId = PortugalId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = PortalegreId, Name = "Distrito de Portalegre", CountryId = PortugalId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = PortoId, Name = "Distrito do Porto", CountryId = PortugalId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = SantaremId, Name = "Distrito de Santarém", CountryId = PortugalId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = SetubalId, Name = "Distrito de Setúbal", CountryId = PortugalId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = VianaDoCasteloId, Name = "Distrito de Viana do Castelo", CountryId = PortugalId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = VilaRealId, Name = "Distrito de Vila Real", CountryId = PortugalId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = ViseuId, Name = "Distrito de Viseu", CountryId = PortugalId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MadeiraId, Name = "Região Autónoma da Madeira", CountryId = PortugalId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = AcoresId, Name = "Região Autónoma dos Açores", CountryId = PortugalId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
    };

    public static object[] GetMunicipalities() => new object[]
    {
        // Distrito de Aveiro
        new { Id = MunicipalityId.Create(1), Name = "Águeda", DistrictId = AveiroId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(2), Name = "Albergaria-a-Velha", DistrictId = AveiroId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(3), Name = "Anadia", DistrictId = AveiroId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(4), Name = "Arouca", DistrictId = AveiroId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(5), Name = "Aveiro", DistrictId = AveiroId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(6), Name = "Castelo de Paiva", DistrictId = AveiroId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(7), Name = "Espinho", DistrictId = AveiroId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(8), Name = "Estarreja", DistrictId = AveiroId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(9), Name = "Ílhavo", DistrictId = AveiroId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(10), Name = "Mealhada", DistrictId = AveiroId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(11), Name = "Murtosa", DistrictId = AveiroId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(12), Name = "Oliveira de Azeméis", DistrictId = AveiroId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(13), Name = "Oliveira do Bairro", DistrictId = AveiroId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(14), Name = "Ovar", DistrictId = AveiroId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(15), Name = "Santa Maria da Feira", DistrictId = AveiroId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(16), Name = "São João da Madeira", DistrictId = AveiroId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(17), Name = "Sever do Vouga", DistrictId = AveiroId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(18), Name = "Vagos", DistrictId = AveiroId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(19), Name = "Vale de Cambra", DistrictId = AveiroId, CreatedAt = SeedDate, UpdatedAt = SeedDate },

        // Distrito de Beja
        new { Id = MunicipalityId.Create(20), Name = "Aljustrel", DistrictId = BejaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(21), Name = "Almodôvar", DistrictId = BejaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(22), Name = "Alvito", DistrictId = BejaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(23), Name = "Barrancos", DistrictId = BejaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(24), Name = "Beja", DistrictId = BejaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(25), Name = "Castro Verde", DistrictId = BejaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(26), Name = "Cuba", DistrictId = BejaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(27), Name = "Ferreira do Alentejo", DistrictId = BejaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(28), Name = "Mértola", DistrictId = BejaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(29), Name = "Moura", DistrictId = BejaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(30), Name = "Odemira", DistrictId = BejaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(31), Name = "Ourique", DistrictId = BejaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(32), Name = "Serpa", DistrictId = BejaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(33), Name = "Vidigueira", DistrictId = BejaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },

        // Distrito de Braga
        new { Id = MunicipalityId.Create(34), Name = "Amares", DistrictId = BragaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(35), Name = "Barcelos", DistrictId = BragaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(36), Name = "Braga", DistrictId = BragaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(37), Name = "Cabeceiras de Basto", DistrictId = BragaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(38), Name = "Celorico de Basto", DistrictId = BragaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(39), Name = "Esposende", DistrictId = BragaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(40), Name = "Fafe", DistrictId = BragaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(41), Name = "Guimarães", DistrictId = BragaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(42), Name = "Póvoa de Lanhoso", DistrictId = BragaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(43), Name = "Terras de Bouro", DistrictId = BragaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(44), Name = "Vieira do Minho", DistrictId = BragaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(45), Name = "Vila Nova de Famalicão", DistrictId = BragaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(46), Name = "Vila Verde", DistrictId = BragaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(47), Name = "Vizela", DistrictId = BragaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },

        // Distrito de Bragança
        new { Id = MunicipalityId.Create(48), Name = "Alfândega da Fé", DistrictId = BragancaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(49), Name = "Bragança", DistrictId = BragancaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(50), Name = "Carrazeda de Ansiães", DistrictId = BragancaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(51), Name = "Freixo de Espada à Cinta", DistrictId = BragancaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(52), Name = "Macedo de Cavaleiros", DistrictId = BragancaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(53), Name = "Miranda do Douro", DistrictId = BragancaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(54), Name = "Mirandela", DistrictId = BragancaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(55), Name = "Mogadouro", DistrictId = BragancaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(56), Name = "Torre de Moncorvo", DistrictId = BragancaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(57), Name = "Vila Flor", DistrictId = BragancaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(58), Name = "Vimioso", DistrictId = BragancaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(59), Name = "Vinhais", DistrictId = BragancaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },

        // Distrito de Castelo Branco
        new { Id = MunicipalityId.Create(60), Name = "Belmonte", DistrictId = CasteloBrancoId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(61), Name = "Castelo Branco", DistrictId = CasteloBrancoId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(62), Name = "Covilhã", DistrictId = CasteloBrancoId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(63), Name = "Fundão", DistrictId = CasteloBrancoId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(64), Name = "Idanha-a-Nova", DistrictId = CasteloBrancoId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(65), Name = "Oleiros", DistrictId = CasteloBrancoId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(66), Name = "Penamacor", DistrictId = CasteloBrancoId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(67), Name = "Proença-a-Nova", DistrictId = CasteloBrancoId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(68), Name = "Sertã", DistrictId = CasteloBrancoId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(69), Name = "Vila de Rei", DistrictId = CasteloBrancoId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(70), Name = "Vila Velha de Ródão", DistrictId = CasteloBrancoId, CreatedAt = SeedDate, UpdatedAt = SeedDate },

        // Distrito de Coimbra
        new { Id = MunicipalityId.Create(71), Name = "Arganil", DistrictId = CoimbraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(72), Name = "Cantanhede", DistrictId = CoimbraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(73), Name = "Coimbra", DistrictId = CoimbraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(74), Name = "Condeixa-a-Nova", DistrictId = CoimbraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(75), Name = "Figueira da Foz", DistrictId = CoimbraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(76), Name = "Góis", DistrictId = CoimbraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(77), Name = "Lousã", DistrictId = CoimbraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(78), Name = "Mira", DistrictId = CoimbraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(79), Name = "Miranda do Corvo", DistrictId = CoimbraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(80), Name = "Montemor-o-Velho", DistrictId = CoimbraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(81), Name = "Oliveira do Hospital", DistrictId = CoimbraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(82), Name = "Pampilhosa da Serra", DistrictId = CoimbraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(83), Name = "Penacova", DistrictId = CoimbraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(84), Name = "Penela", DistrictId = CoimbraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(85), Name = "Soure", DistrictId = CoimbraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(86), Name = "Tábua", DistrictId = CoimbraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(87), Name = "Vila Nova de Poiares", DistrictId = CoimbraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },

        // Distrito de Évora
        new { Id = MunicipalityId.Create(88), Name = "Alandroal", DistrictId = EvoraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(89), Name = "Arraiolos", DistrictId = EvoraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(90), Name = "Borba", DistrictId = EvoraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(91), Name = "Estremoz", DistrictId = EvoraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(92), Name = "Évora", DistrictId = EvoraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(93), Name = "Montemor-o-Novo", DistrictId = EvoraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(94), Name = "Mora", DistrictId = EvoraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(95), Name = "Mourão", DistrictId = EvoraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(96), Name = "Portel", DistrictId = EvoraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(97), Name = "Redondo", DistrictId = EvoraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(98), Name = "Reguengos de Monsaraz", DistrictId = EvoraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(99), Name = "Vendas Novas", DistrictId = EvoraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(100), Name = "Viana do Alentejo", DistrictId = EvoraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(101), Name = "Vila Viçosa", DistrictId = EvoraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },

        // Distrito de Faro
        new { Id = MunicipalityId.Create(102), Name = "Albufeira", DistrictId = FaroId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(103), Name = "Alcoutim", DistrictId = FaroId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(104), Name = "Aljezur", DistrictId = FaroId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(105), Name = "Castro Marim", DistrictId = FaroId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(106), Name = "Faro", DistrictId = FaroId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(107), Name = "Lagoa", DistrictId = FaroId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(108), Name = "Lagos", DistrictId = FaroId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(109), Name = "Loulé", DistrictId = FaroId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(110), Name = "Monchique", DistrictId = FaroId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(111), Name = "Olhão", DistrictId = FaroId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(112), Name = "Portimão", DistrictId = FaroId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(113), Name = "São Brás de Alportel", DistrictId = FaroId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(114), Name = "Silves", DistrictId = FaroId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(115), Name = "Tavira", DistrictId = FaroId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(116), Name = "Vila do Bispo", DistrictId = FaroId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(117), Name = "Vila Real de Santo António", DistrictId = FaroId, CreatedAt = SeedDate, UpdatedAt = SeedDate },

        // Distrito da Guarda
        new { Id = MunicipalityId.Create(118), Name = "Aguiar da Beira", DistrictId = GuardaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(119), Name = "Almeida", DistrictId = GuardaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(120), Name = "Celorico da Beira", DistrictId = GuardaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(121), Name = "Figueira de Castelo Rodrigo", DistrictId = GuardaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(122), Name = "Fornos de Algodres", DistrictId = GuardaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(123), Name = "Gouveia", DistrictId = GuardaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(124), Name = "Guarda", DistrictId = GuardaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(125), Name = "Manteigas", DistrictId = GuardaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(126), Name = "Mêda", DistrictId = GuardaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(127), Name = "Pinhel", DistrictId = GuardaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(128), Name = "Sabugal", DistrictId = GuardaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(129), Name = "Seia", DistrictId = GuardaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(130), Name = "Trancoso", DistrictId = GuardaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(131), Name = "Vila Nova de Foz Côa", DistrictId = GuardaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },

        // Distrito de Leiria
        new { Id = MunicipalityId.Create(132), Name = "Alvaiázere", DistrictId = LeiriaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(133), Name = "Ansião", DistrictId = LeiriaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(134), Name = "Batalha", DistrictId = LeiriaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(135), Name = "Bombarral", DistrictId = LeiriaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(136), Name = "Caldas da Rainha", DistrictId = LeiriaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(137), Name = "Castanheira de Pera", DistrictId = LeiriaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(138), Name = "Figueiró dos Vinhos", DistrictId = LeiriaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(139), Name = "Leiria", DistrictId = LeiriaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(140), Name = "Marinha Grande", DistrictId = LeiriaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(141), Name = "Nazaré", DistrictId = LeiriaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(142), Name = "Óbidos", DistrictId = LeiriaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(143), Name = "Pedrógão Grande", DistrictId = LeiriaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(144), Name = "Peniche", DistrictId = LeiriaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(145), Name = "Pombal", DistrictId = LeiriaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(146), Name = "Porto de Mós", DistrictId = LeiriaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },

        // Distrito de Lisboa
        new { Id = MunicipalityId.Create(147), Name = "Alenquer", DistrictId = LisboaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(148), Name = "Amadora", DistrictId = LisboaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(149), Name = "Arruda dos Vinhos", DistrictId = LisboaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(150), Name = "Azambuja", DistrictId = LisboaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(151), Name = "Cadaval", DistrictId = LisboaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(152), Name = "Cascais", DistrictId = LisboaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(153), Name = "Lisboa", DistrictId = LisboaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(154), Name = "Loures", DistrictId = LisboaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(155), Name = "Lourinhã", DistrictId = LisboaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(156), Name = "Mafra", DistrictId = LisboaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(157), Name = "Odivelas", DistrictId = LisboaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(158), Name = "Oeiras", DistrictId = LisboaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(159), Name = "Sintra", DistrictId = LisboaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(160), Name = "Sobral de Monte Agraço", DistrictId = LisboaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(161), Name = "Torres Vedras", DistrictId = LisboaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(162), Name = "Vila Franca de Xira", DistrictId = LisboaId, CreatedAt = SeedDate, UpdatedAt = SeedDate },

        // Distrito de Portalegre
        new { Id = MunicipalityId.Create(163), Name = "Alter do Chão", DistrictId = PortalegreId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(164), Name = "Arronches", DistrictId = PortalegreId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(165), Name = "Avis", DistrictId = PortalegreId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(166), Name = "Campo Maior", DistrictId = PortalegreId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(167), Name = "Castelo de Vide", DistrictId = PortalegreId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(168), Name = "Crato", DistrictId = PortalegreId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(169), Name = "Elvas", DistrictId = PortalegreId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(170), Name = "Fronteira", DistrictId = PortalegreId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(171), Name = "Gavião", DistrictId = PortalegreId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(172), Name = "Marvão", DistrictId = PortalegreId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(173), Name = "Monforte", DistrictId = PortalegreId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(174), Name = "Nisa", DistrictId = PortalegreId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(175), Name = "Ponte de Sor", DistrictId = PortalegreId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(176), Name = "Portalegre", DistrictId = PortalegreId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(177), Name = "Sousel", DistrictId = PortalegreId, CreatedAt = SeedDate, UpdatedAt = SeedDate },

        // Distrito do Porto
        new { Id = MunicipalityId.Create(178), Name = "Amarante", DistrictId = PortoId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(179), Name = "Baião", DistrictId = PortoId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(180), Name = "Felgueiras", DistrictId = PortoId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(181), Name = "Gondomar", DistrictId = PortoId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(182), Name = "Lousada", DistrictId = PortoId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(183), Name = "Maia", DistrictId = PortoId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(184), Name = "Marco de Canaveses", DistrictId = PortoId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(185), Name = "Matosinhos", DistrictId = PortoId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(186), Name = "Paços de Ferreira", DistrictId = PortoId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(187), Name = "Paredes", DistrictId = PortoId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(188), Name = "Penafiel", DistrictId = PortoId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(189), Name = "Porto", DistrictId = PortoId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(190), Name = "Póvoa de Varzim", DistrictId = PortoId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(191), Name = "Santo Tirso", DistrictId = PortoId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(192), Name = "Valongo", DistrictId = PortoId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(193), Name = "Vila do Conde", DistrictId = PortoId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(194), Name = "Vila Nova de Gaia", DistrictId = PortoId, CreatedAt = SeedDate, UpdatedAt = SeedDate },

        // Distrito de Santarém
        new { Id = MunicipalityId.Create(195), Name = "Abrantes", DistrictId = SantaremId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(196), Name = "Alcanena", DistrictId = SantaremId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(197), Name = "Almeirim", DistrictId = SantaremId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(198), Name = "Alpiarça", DistrictId = SantaremId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(199), Name = "Benavente", DistrictId = SantaremId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(200), Name = "Cartaxo", DistrictId = SantaremId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(201), Name = "Chamusca", DistrictId = SantaremId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(202), Name = "Constância", DistrictId = SantaremId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(203), Name = "Coruche", DistrictId = SantaremId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(204), Name = "Entroncamento", DistrictId = SantaremId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(205), Name = "Ferreira do Zêzere", DistrictId = SantaremId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(206), Name = "Golegã", DistrictId = SantaremId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(207), Name = "Mação", DistrictId = SantaremId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(208), Name = "Ourém", DistrictId = SantaremId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(209), Name = "Rio Maior", DistrictId = SantaremId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(210), Name = "Salvaterra de Magos", DistrictId = SantaremId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(211), Name = "Santarém", DistrictId = SantaremId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(212), Name = "Sardoal", DistrictId = SantaremId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(213), Name = "Tomar", DistrictId = SantaremId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(214), Name = "Torres Novas", DistrictId = SantaremId, CreatedAt = SeedDate, UpdatedAt = SeedDate },

        // Distrito de Setúbal
        new { Id = MunicipalityId.Create(215), Name = "Alcácer do Sal", DistrictId = SetubalId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(216), Name = "Alcochete", DistrictId = SetubalId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(217), Name = "Almada", DistrictId = SetubalId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(218), Name = "Barreiro", DistrictId = SetubalId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(219), Name = "Grândola", DistrictId = SetubalId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(220), Name = "Moita", DistrictId = SetubalId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(221), Name = "Montijo", DistrictId = SetubalId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(222), Name = "Palmela", DistrictId = SetubalId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(223), Name = "Santiago do Cacém", DistrictId = SetubalId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(224), Name = "Seixal", DistrictId = SetubalId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(225), Name = "Sesimbra", DistrictId = SetubalId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(226), Name = "Setúbal", DistrictId = SetubalId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(227), Name = "Sines", DistrictId = SetubalId, CreatedAt = SeedDate, UpdatedAt = SeedDate },

        // Distrito de Viana do Castelo
        new { Id = MunicipalityId.Create(228), Name = "Arcos de Valdevez", DistrictId = VianaDoCasteloId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(229), Name = "Caminha", DistrictId = VianaDoCasteloId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(230), Name = "Melgaço", DistrictId = VianaDoCasteloId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(231), Name = "Monção", DistrictId = VianaDoCasteloId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(232), Name = "Paredes de Coura", DistrictId = VianaDoCasteloId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(233), Name = "Ponte da Barca", DistrictId = VianaDoCasteloId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(234), Name = "Ponte de Lima", DistrictId = VianaDoCasteloId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(235), Name = "Valença", DistrictId = VianaDoCasteloId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(236), Name = "Viana do Castelo", DistrictId = VianaDoCasteloId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(237), Name = "Vila Nova de Cerveira", DistrictId = VianaDoCasteloId, CreatedAt = SeedDate, UpdatedAt = SeedDate },

        // Distrito de Vila Real
        new { Id = MunicipalityId.Create(238), Name = "Alijó", DistrictId = VilaRealId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(239), Name = "Boticas", DistrictId = VilaRealId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(240), Name = "Chaves", DistrictId = VilaRealId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(241), Name = "Mesão Frio", DistrictId = VilaRealId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(242), Name = "Mondim de Basto", DistrictId = VilaRealId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(243), Name = "Montalegre", DistrictId = VilaRealId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(244), Name = "Murça", DistrictId = VilaRealId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(245), Name = "Peso da Régua", DistrictId = VilaRealId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(246), Name = "Ribeira de Pena", DistrictId = VilaRealId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(247), Name = "Sabrosa", DistrictId = VilaRealId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(248), Name = "Santa Marta de Penaguião", DistrictId = VilaRealId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(249), Name = "Valpaços", DistrictId = VilaRealId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(250), Name = "Vila Pouca de Aguiar", DistrictId = VilaRealId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(251), Name = "Vila Real", DistrictId = VilaRealId, CreatedAt = SeedDate, UpdatedAt = SeedDate },

        // Distrito de Viseu
        new { Id = MunicipalityId.Create(252), Name = "Armamar", DistrictId = ViseuId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(253), Name = "Carregal do Sal", DistrictId = ViseuId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(254), Name = "Castro Daire", DistrictId = ViseuId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(255), Name = "Cinfães", DistrictId = ViseuId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(256), Name = "Lamego", DistrictId = ViseuId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(257), Name = "Mangualde", DistrictId = ViseuId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(258), Name = "Moimenta da Beira", DistrictId = ViseuId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(259), Name = "Mortágua", DistrictId = ViseuId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(260), Name = "Nelas", DistrictId = ViseuId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(261), Name = "Oliveira de Frades", DistrictId = ViseuId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(262), Name = "Penalva do Castelo", DistrictId = ViseuId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(263), Name = "Penedono", DistrictId = ViseuId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(264), Name = "Resende", DistrictId = ViseuId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(265), Name = "Santa Comba Dão", DistrictId = ViseuId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(266), Name = "São João da Pesqueira", DistrictId = ViseuId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(267), Name = "São Pedro do Sul", DistrictId = ViseuId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(268), Name = "Sátão", DistrictId = ViseuId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(269), Name = "Sernancelhe", DistrictId = ViseuId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(270), Name = "Tondela", DistrictId = ViseuId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(271), Name = "Vila Nova de Paiva", DistrictId = ViseuId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(272), Name = "Viseu", DistrictId = ViseuId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(273), Name = "Vouzela", DistrictId = ViseuId, CreatedAt = SeedDate, UpdatedAt = SeedDate },

        // Região Autónoma da Madeira
        new { Id = MunicipalityId.Create(274), Name = "Calheta", DistrictId = MadeiraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(275), Name = "Câmara de Lobos", DistrictId = MadeiraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(276), Name = "Funchal", DistrictId = MadeiraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(277), Name = "Machico", DistrictId = MadeiraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(278), Name = "Ponta do Sol", DistrictId = MadeiraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(279), Name = "Porto Moniz", DistrictId = MadeiraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(280), Name = "Porto Santo", DistrictId = MadeiraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(281), Name = "Ribeira Brava", DistrictId = MadeiraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(282), Name = "Santa Cruz", DistrictId = MadeiraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(283), Name = "Santana", DistrictId = MadeiraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(284), Name = "São Vicente", DistrictId = MadeiraId, CreatedAt = SeedDate, UpdatedAt = SeedDate },

        // Região Autónoma dos Açores
        new { Id = MunicipalityId.Create(285), Name = "Lajes das Flores", DistrictId = AcoresId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(286), Name = "Lajes do Pico", DistrictId = AcoresId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(287), Name = "Madalena", DistrictId = AcoresId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(288), Name = "Nordeste", DistrictId = AcoresId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(289), Name = "Ponta Delgada", DistrictId = AcoresId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(290), Name = "Povoação", DistrictId = AcoresId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(291), Name = "Ribeira Grande", DistrictId = AcoresId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(292), Name = "Santa Cruz da Graciosa", DistrictId = AcoresId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(293), Name = "Santa Cruz das Flores", DistrictId = AcoresId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(294), Name = "São Roque do Pico", DistrictId = AcoresId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(295), Name = "Velas", DistrictId = AcoresId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(296), Name = "Vila do Corvo", DistrictId = AcoresId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(297), Name = "Vila do Porto", DistrictId = AcoresId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
        new { Id = MunicipalityId.Create(298), Name = "Vila Franca do Campo", DistrictId = AcoresId, CreatedAt = SeedDate, UpdatedAt = SeedDate },
    };
}
