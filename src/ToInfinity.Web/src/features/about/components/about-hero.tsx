import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import aboutHeroImg from "../../../assets/about-hero.jpg";

const AboutHero = () => {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: { xs: 360, md: 480 },
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src={aboutHeroImg}
        alt="Couple in a Portuguese vineyard at golden hour"
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(42,31,24,0.85) 0%, rgba(42,31,24,0.3) 50%, transparent 100%)",
        }}
      />
      <Container
        maxWidth="lg"
        sx={{ position: "relative", zIndex: 1, pb: { xs: 5, md: 7 } }}
      >
        <Typography
          variant="h2"
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            color: "#fff",
            fontSize: { xs: "2rem", md: "3rem" },
            maxWidth: 640,
            lineHeight: 1.2,
            mb: 1.5,
          }}
        >
          Your love story deserves the perfect setting
        </Typography>
        <Typography
          sx={{
            color: "rgba(255,255,255,0.85)",
            fontSize: { xs: "1rem", md: "1.15rem" },
            maxWidth: 520,
            lineHeight: 1.6,
          }}
        >
          We connect couples across Portugal with handpicked wedding venues and
          catering services, making the journey from "yes" to "I do" effortless
          and joyful.
        </Typography>
      </Container>
    </Box>
  );
};

export default AboutHero;
