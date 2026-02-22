"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export default function VenueCta() {
  return (
    <Paper
      sx={{
        p: 4,
        bgcolor: "secondary.main",
        color: "white",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        sx={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 600,
        }}
      >
        Ready to Book This Venue?
      </Typography>
      <Typography variant="body1" paragraph>
        Sign in or create an account to get in touch with the venue owner and
        request a quote.
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <a href={`${APP_URL}/auth/signin`} style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "white",
              color: "secondary.main",
              "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
            }}
            size="large"
          >
            Sign In
          </Button>
        </a>
        <a href={`${APP_URL}/auth/register`} style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            sx={{
              borderColor: "white",
              color: "white",
              "&:hover": { borderColor: "rgba(255,255,255,0.7)" },
            }}
            size="large"
          >
            Get Started
          </Button>
        </a>
      </Box>
    </Paper>
  );
}
