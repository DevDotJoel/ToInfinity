import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import aboutTeamImg from "../../../assets/about-team.jpg";

const AboutStory = () => {
  return (
    <Box sx={{ bgcolor: "background.default", py: { xs: 7, md: 10 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 4, md: 8 },
            alignItems: "center",
          }}
        >
          <Box sx={{ flex: { xs: "1", md: "1 1 50%" } }}>
            <Typography
              variant="overline"
              sx={{
                color: "secondary.main",
                fontWeight: 700,
                letterSpacing: 2,
                fontSize: "0.8rem",
                mb: 1.5,
                display: "block",
              }}
            >
              Our Story
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                color: "text.primary",
                fontSize: { xs: "1.6rem", md: "2.1rem" },
                mb: 2.5,
                lineHeight: 1.3,
              }}
            >
              Born from a passion for celebrations and Portuguese culture
            </Typography>
            <Typography
              sx={{
                color: "text.secondary",
                lineHeight: 1.8,
                fontSize: "0.98rem",
                mb: 2,
              }}
            >
              ToInfinity started with a simple frustration: planning a wedding
              in Portugal meant endless phone calls, scattered information, and
              opaque pricing. We knew there had to be a better way.
            </Typography>
            <Typography
              sx={{
                color: "text.secondary",
                lineHeight: 1.8,
                fontSize: "0.98rem",
                mb: 2,
              }}
            >
              Founded in 2024, our small but dedicated team set out to build the
              most trusted wedding planning platform in Portugal. We personally
              visit every venue, meet every caterer, and verify every detail so
              you can browse with confidence.
            </Typography>
            <Typography
              sx={{
                color: "text.secondary",
                lineHeight: 1.8,
                fontSize: "0.98rem",
              }}
            >
              Today, we are proud to have helped thousands of couples find their
              perfect celebration setting -- from clifftop ceremonies in the
              Algarve to intimate vineyard dinners in the Douro Valley.
            </Typography>
          </Box>
          <Box sx={{ flex: { xs: "1", md: "1 1 50%" } }}>
            <Box
              component="img"
              src={aboutTeamImg}
              alt="The ToInfinity team at work"
              sx={{
                width: "100%",
                borderRadius: 3,
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                aspectRatio: "4/3",
                objectFit: "cover",
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutStory;
