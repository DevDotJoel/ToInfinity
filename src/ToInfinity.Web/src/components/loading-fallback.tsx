import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

interface LoadingFallbackProps {
  minHeight?: string;
}

export function LoadingFallback({ minHeight = "60vh" }: LoadingFallbackProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight,
      }}
    >
      <CircularProgress />
    </Box>
  );
}
