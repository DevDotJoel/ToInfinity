import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";

const footerLinks = {
  Explore: [
    { label: "Venues", href: "/venues" },
    { label: "Catering", href: "/catering" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/" },
    { label: "Careers", href: "/" },
  ],
  Support: [
    { label: "Help Center", href: "/" },
    { label: "Terms of Service", href: "/" },
    { label: "Privacy Policy", href: "/" },
  ],
};

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "primary.contrastText",
        pt: { xs: 6, md: 8 },
        pb: 4,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "2fr repeat(3, 1fr)",
            },
            gap: 4,
          }}
        >
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <FavoriteIcon sx={{ color: "secondary.main", fontSize: 22 }} />
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700,
                  color: "primary.contrastText",
                }}
              >
                TooInfinity
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: "rgba(247, 243, 240, 0.7)",
                maxWidth: 300,
                lineHeight: 1.6,
              }}
            >
              Your trusted partner in creating unforgettable wedding
              celebrations. Discover perfect venues and exceptional catering for
              your special day.
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
              <IconButton
                aria-label="Instagram"
                size="small"
                sx={{
                  color: "rgba(247, 243, 240, 0.7)",
                  "&:hover": { color: "secondary.main" },
                }}
              >
                <InstagramIcon fontSize="small" />
              </IconButton>
              <IconButton
                aria-label="Facebook"
                size="small"
                sx={{
                  color: "rgba(247, 243, 240, 0.7)",
                  "&:hover": { color: "secondary.main" },
                }}
              >
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton
                aria-label="X"
                size="small"
                sx={{
                  color: "rgba(247, 243, 240, 0.7)",
                  "&:hover": { color: "secondary.main" },
                }}
              >
                <XIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
          {Object.entries(footerLinks).map(([title, links]) => (
            <Box key={title}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: "secondary.main",
                  mb: 2,
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                }}
              >
                {title}
              </Typography>
              {links.map((link) => (
                <Typography key={link.label} variant="body2" sx={{ mb: 1 }}>
                  <RouterLink
                    to={link.href}
                    style={{
                      color: "rgba(247, 243, 240, 0.7)",
                      textDecoration: "none",
                    }}
                  >
                    {link.label}
                  </RouterLink>
                </Typography>
              ))}
            </Box>
          ))}
        </Box>
        <Divider sx={{ borderColor: "rgba(247, 243, 240, 0.12)", my: 4 }} />
        <Typography
          variant="body2"
          sx={{ color: "rgba(247, 243, 240, 0.5)", textAlign: "center" }}
        >
          © 2026 TooInfinity. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
