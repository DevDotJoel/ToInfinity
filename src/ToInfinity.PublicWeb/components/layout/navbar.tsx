"use client";

import { usePathname } from "next/navigation";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "next/link";
import FavoriteIcon from "@mui/icons-material/Favorite";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

const navLinks = [
  { label: "Home", href: "/home" },
  { label: "Venues", href: "/venues" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: "rgba(253, 252, 251, 0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid",
        borderColor: "rgba(61, 47, 37, 0.08)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 } }}>
          <Link
            href="/"
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
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} style={{ textDecoration: "none" }}>
                <Button
                  sx={{
                    color:
                      pathname === link.href ? "secondary.main" : "text.primary",
                    fontWeight: pathname === link.href ? 700 : 400,
                    fontSize: "0.95rem",
                    px: 2,
                    borderRadius: 2,
                    textTransform: "none",
                  position: "relative",
                  "&::after":
                    pathname === link.href
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
                }}
              >
                {link.label}
              </Button>
              </Link>
            ))}
            <a href={`${APP_URL}/auth/signin`} style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  color: "text.primary",
                  fontWeight: 500,
                  textTransform: "none",
                  px: 2.5,
                  py: 0.75,
                  borderRadius: 2,
                  fontSize: "0.9rem",
                  border: "1px solid",
                  borderColor: "rgba(61, 47, 37, 0.15)",
                  ml: 1,
                  "&:hover": {
                    borderColor: "secondary.main",
                    color: "secondary.main",
                    backgroundColor: "rgba(196, 114, 78, 0.04)",
                  },
                }}
              >
                Sign In
              </Button>
            </a>
            <a href={`${APP_URL}/auth/signup`} style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
              sx={{
                bgcolor: "secondary.main",
                color: "#fff",
                fontWeight: 600,
                textTransform: "none",
                px: 2.5,
                py: 0.75,
                borderRadius: 2,
                fontSize: "0.9rem",
                "&:hover": {
                  bgcolor: "secondary.dark",
                },
              }}
              >
                Get Started
              </Button>
            </a>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
