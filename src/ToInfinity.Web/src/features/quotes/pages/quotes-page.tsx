import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { QuoteList } from "../components";

const QuotesPage = () => {
  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        {/* Page title */}
        <Typography
          variant="h4"
          sx={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontWeight: 700,
            color: "primary.main",
            fontSize: { xs: "1.3rem", md: "1.6rem" },
            mb: 3,
          }}
        >
          My Quotes
        </Typography>

        {/* Quotes list */}
        <QuoteList />
      </Container>
    </Box>
  );
};

export default QuotesPage;
