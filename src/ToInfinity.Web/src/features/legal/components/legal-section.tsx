import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";

interface LegalSectionProps {
  title: string;
  children: ReactNode;
}

const LegalSection = ({ title, children }: LegalSectionProps) => {
  return (
    <Box sx={{ mb: 5 }}>
      <Typography
        variant="h5"
        sx={{
          fontFamily: '"Playfair Display", serif',
          fontWeight: 700,
          color: "primary.main",
          mb: 2,
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          "& p": {
            mb: 2,
            lineHeight: 1.7,
            color: "text.secondary",
          },
          "& ul, & ol": {
            pl: 3,
            mb: 2,
            "& li": {
              mb: 1,
              lineHeight: 1.7,
              color: "text.secondary",
            },
          },
          "& strong": {
            color: "text.primary",
            fontWeight: 600,
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default LegalSection;
