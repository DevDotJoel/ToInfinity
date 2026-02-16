import { Typography, Box, Button, Paper } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, textAlign: "center", maxWidth: 500 }}>
        <ErrorOutline sx={{ fontSize: 100, color: "error.main", mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Oops! The page you're looking for doesn't exist.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate("/")}
        >
          Go Home
        </Button>
      </Paper>
    </Box>
  );
};

export default NotFoundPage;
