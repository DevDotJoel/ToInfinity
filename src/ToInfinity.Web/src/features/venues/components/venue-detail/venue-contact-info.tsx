import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface VenueContactInfoProps {
  phone: string | null;
  email: string | null;
  website: string | null;
  closingTime: string | null;
}

interface ContactItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

export const VenueContactInfo = ({
  phone,
  email,
  website,
  closingTime,
}: VenueContactInfoProps) => {
  const items: ContactItem[] = [
    phone
      ? {
          icon: <PhoneIcon sx={{ fontSize: 20, color: "secondary.main" }} />,
          label: "Phone",
          value: phone,
          href: `tel:${phone}`,
        }
      : null,
    email
      ? {
          icon: <EmailIcon sx={{ fontSize: 20, color: "secondary.main" }} />,
          label: "Email",
          value: email,
          href: `mailto:${email}`,
        }
      : null,
    website
      ? {
          icon: <LanguageIcon sx={{ fontSize: 20, color: "secondary.main" }} />,
          label: "Website",
          value: website.replace(/^https?:\/\//, ""),
          href: website.startsWith("http") ? website : `https://${website}`,
        }
      : null,
    closingTime
      ? {
          icon: (
            <AccessTimeIcon sx={{ fontSize: 20, color: "secondary.main" }} />
          ),
          label: "Closing Time",
          value: closingTime,
        }
      : null,
  ].filter(Boolean) as ContactItem[];

  if (items.length === 0) return null;

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
        Contact Information
      </Typography>
      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid key={item.label} size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 2,
                border: "1px solid rgba(61,47,37,0.08)",
                height: "100%",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 2,
                    bgcolor: "rgba(196,114,78,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "text.secondary",
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                    }}
                  >
                    {item.label}
                  </Typography>
                  {item.href ? (
                    <Typography
                      component="a"
                      href={item.href}
                      target={item.label === "Website" ? "_blank" : undefined}
                      rel={
                        item.label === "Website"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      sx={{
                        color: "secondary.main",
                        fontSize: "0.92rem",
                        fontWeight: 500,
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                        display: "block",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.value}
                    </Typography>
                  ) : (
                    <Typography
                      sx={{
                        color: "primary.main",
                        fontSize: "0.92rem",
                        fontWeight: 500,
                      }}
                    >
                      {item.value}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
