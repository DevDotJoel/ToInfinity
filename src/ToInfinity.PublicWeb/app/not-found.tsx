import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "next/link";
import PublicLayout from "@/components/layout/public-layout";

export default function NotFound() {
  return (
    <PublicLayout>
      <Container maxWidth="sm">
        <Box
          sx={{
            py: 12,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              color: "primary.main",
              mb: 2,
            }}
          >
            404
          </Typography>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            Page Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </Typography>
          <Link href="/home" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="secondary" size="large">
              Go Home
            </Button>
          </Link>
        </Box>
      </Container>
    </PublicLayout>
  );
}
