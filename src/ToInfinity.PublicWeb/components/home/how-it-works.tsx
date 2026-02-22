import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import SearchIcon from "@mui/icons-material/Search";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CelebrationIcon from "@mui/icons-material/Celebration";

const steps = [
  {
    icon: SearchIcon,
    title: "Browse & Discover",
    description:
      "Explore our curated collection of stunning venues and exceptional catering services.",
  },
  {
    icon: CalendarMonthIcon,
    title: "Book Your Date",
    description:
      "Check availability and secure your perfect venue and catering for your special day.",
  },
  {
    icon: TaskAltIcon,
    title: "Plan Details",
    description:
      "Work with our partners to customize every aspect of your celebration.",
  },
  {
    icon: CelebrationIcon,
    title: "Celebrate",
    description:
      "Enjoy your wedding day knowing every detail has been perfectly arranged.",
  },
];

export default function HowItWorks() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
          <Typography
            variant="overline"
            sx={{
              color: "secondary.main",
              letterSpacing: "0.08em",
              fontSize: "0.75rem",
              fontWeight: 700,
            }}
          >
            Simple Process
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "2.8rem" },
              color: "primary.main",
              mt: 1,
              mb: 2,
            }}
          >
            How It Works
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              maxWidth: 560,
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            Four simple steps to plan your perfect wedding celebration
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: 3,
            pt: 3,
          }}
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card
                key={index}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  position: "relative",
                  bgcolor: "background.paper",
                  overflow: "visible",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      position: "absolute",
                      top: -20,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      bgcolor: "secondary.main",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      boxShadow: "0 4px 12px rgba(196, 114, 78, 0.3)",
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Box
                    sx={{
                      mt: 4,
                      mb: 2,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Icon
                      sx={{
                        fontSize: 48,
                        color: "primary.main",
                      }}
                    />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: '"Playfair Display", serif',
                      fontWeight: 600,
                      color: "primary.main",
                      mb: 1.5,
                      fontSize: "1.1rem",
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {step.description}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
