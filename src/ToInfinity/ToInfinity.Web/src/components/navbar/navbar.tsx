import { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Venues", href: "/venues" },
  { label: "Catering", href: "/catering" },
];

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "rgba(253, 252, 251, 0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid",
          borderColor: "rgba(61, 47, 37, 0.08)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 } }}>
            <RouterLink
              to="/"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <FavoriteIcon sx={{ color: "secondary.main", fontSize: 24 }} />
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700,
                  color: "primary.main",
                  fontSize: { xs: "1.1rem", md: "1.25rem" },
                  letterSpacing: "-0.01em",
                }}
              >
                TooInfinity
              </Typography>
            </RouterLink>

            <Box sx={{ flexGrow: 1 }} />

            {!isMobile ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {navLinks.map((link) => (
                  <Button
                    key={link.href}
                    component={RouterLink}
                    to={link.href}
                    sx={{
                      color:
                        location.pathname === link.href
                          ? "secondary.main"
                          : "text.primary",
                      fontWeight: location.pathname === link.href ? 700 : 400,
                      fontSize: "0.95rem",
                      px: 2,
                      borderRadius: 2,
                      position: "relative",
                      "&::after":
                        location.pathname === link.href
                          ? {
                              content: '""',
                              position: "absolute",
                              bottom: 6,
                              left: "50%",
                              transform: "translateX(-50%)",
                              width: 20,
                              height: 2,
                              backgroundColor: "secondary.main",
                              borderRadius: 1,
                            }
                          : {},
                      "&:hover": {
                        backgroundColor: "rgba(196, 114, 78, 0.06)",
                        color: "secondary.main",
                      },
                    }}
                  >
                    {link.label}
                  </Button>
                ))}
                <Button
                  variant="contained"
                  component={RouterLink}
                  to="/venues"
                  sx={{
                    ml: 2,
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    "&:hover": { bgcolor: "primary.light" },
                  }}
                >
                  Book Now
                </Button>
              </Box>
            ) : (
              <IconButton
                onClick={() => setDrawerOpen(true)}
                sx={{ color: "primary.main" }}
                aria-label="Open navigation menu"
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            bgcolor: "background.paper",
            pt: 2,
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", px: 2, mb: 1 }}>
          <IconButton
            onClick={() => setDrawerOpen(false)}
            aria-label="Close navigation menu"
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {navLinks.map((link) => (
            <ListItem key={link.href} disablePadding>
              <ListItemButton
                component={RouterLink}
                to={link.href}
                onClick={() => setDrawerOpen(false)}
                selected={location.pathname === link.href}
                sx={{
                  px: 3,
                  py: 1.5,
                  "&.Mui-selected": {
                    bgcolor: "rgba(196, 114, 78, 0.08)",
                    color: "secondary.main",
                    fontWeight: 700,
                  },
                }}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{
                    fontWeight: location.pathname === link.href ? 700 : 400,
                    fontSize: "1.05rem",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ px: 3, mt: 2 }}>
          <Button
            variant="contained"
            fullWidth
            component={RouterLink}
            to="/venues"
            onClick={() => setDrawerOpen(false)}
            sx={{
              bgcolor: "primary.main",
              color: "primary.contrastText",
              "&:hover": { bgcolor: "primary.light" },
            }}
          >
            Book Now
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
