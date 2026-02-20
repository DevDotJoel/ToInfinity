import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import MapIcon from "@mui/icons-material/Map";

interface VenueSectionsProps {
  spacesDescription: string | null;
  servicesDescription: string | null;
  gastronomyDescription: string | null;
  locationDescription: string | null;
}

interface Section {
  key: string;
  title: string;
  icon: React.ReactNode;
  content: string;
}

export const VenueSections = ({
  spacesDescription,
  servicesDescription,
  gastronomyDescription,
  locationDescription,
}: VenueSectionsProps) => {
  const sections: Section[] = [
    spacesDescription
      ? {
          key: "spaces",
          title: "Spaces & Capacity",
          icon: (
            <MeetingRoomIcon sx={{ fontSize: 20, color: "secondary.main" }} />
          ),
          content: spacesDescription,
        }
      : null,
    servicesDescription
      ? {
          key: "services",
          title: "Services Offered",
          icon: (
            <MiscellaneousServicesIcon
              sx={{ fontSize: 20, color: "secondary.main" }}
            />
          ),
          content: servicesDescription,
        }
      : null,
    gastronomyDescription
      ? {
          key: "gastronomy",
          title: "Gastronomy",
          icon: (
            <RestaurantIcon sx={{ fontSize: 20, color: "secondary.main" }} />
          ),
          content: gastronomyDescription,
        }
      : null,
    locationDescription
      ? {
          key: "location",
          title: "About the Location",
          icon: <MapIcon sx={{ fontSize: 20, color: "secondary.main" }} />,
          content: locationDescription,
        }
      : null,
  ].filter(Boolean) as Section[];

  if (sections.length === 0) return null;

  return (
    <Box sx={{ mb: 5 }}>
      <Typography
        variant="h5"
        sx={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          color: "primary.main",
          fontSize: { xs: "1.15rem", md: "1.3rem" },
          mb: 2.5,
        }}
      >
        More Details
      </Typography>
      {sections.map((section) => (
        <Accordion
          key={section.key}
          defaultExpanded={sections.length <= 2}
          elevation={0}
          disableGutters
          sx={{
            border: "1px solid rgba(61,47,37,0.08)",
            borderRadius: "12px !important",
            mb: 1.5,
            "&::before": { display: "none" },
            overflow: "hidden",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              px: 2.5,
              "& .MuiAccordionSummary-content": { my: 1.5 },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: 1.5,
                  bgcolor: "rgba(196,114,78,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {section.icon}
              </Box>
              <Typography
                sx={{
                  fontWeight: 600,
                  color: "primary.main",
                  fontSize: "0.95rem",
                }}
              >
                {section.title}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 2.5, pt: 0, pb: 2.5 }}>
            <Typography
              sx={{
                color: "text.secondary",
                lineHeight: 1.8,
                fontSize: "0.92rem",
                whiteSpace: "pre-line",
              }}
            >
              {section.content}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};
