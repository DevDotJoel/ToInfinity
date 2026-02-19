import { useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

interface VenueImageUploadProps {
  imagePreview: string | null;
  onImageSelect: (file: File) => void;
  onImageRemove: () => void;
  error?: string;
}

export const VenueImageUpload = ({
  imagePreview,
  onImageSelect,
  onImageRemove,
  error,
}: VenueImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onImageSelect(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Box>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        hidden
        onChange={handleImageUpload}
      />

      {imagePreview ? (
        <Grid container spacing={1.5}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Box
              sx={{
                position: "relative",
                borderRadius: 2.5,
                overflow: "hidden",
                aspectRatio: "4/3",
                border: "2px solid",
                borderColor: error ? "error.main" : "secondary.main",
              }}
            >
              <Box
                component="img"
                src={imagePreview}
                alt="Venue main photo"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <Chip
                label="Cover"
                size="small"
                sx={{
                  position: "absolute",
                  top: 6,
                  left: 6,
                  bgcolor: "secondary.main",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.68rem",
                  height: 22,
                }}
              />
              <IconButton
                size="small"
                onClick={onImageRemove}
                sx={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  bgcolor: "rgba(0,0,0,0.55)",
                  color: "#fff",
                  width: 26,
                  height: 26,
                  "&:hover": { bgcolor: "rgba(200,50,50,0.85)" },
                }}
              >
                <DeleteIcon sx={{ fontSize: 15 }} />
              </IconButton>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Box
              onClick={() => fileInputRef.current?.click()}
              sx={{
                aspectRatio: "4/3",
                borderRadius: 2.5,
                border: "2px dashed rgba(61,47,37,0.15)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s",
                "&:hover": {
                  borderColor: "secondary.main",
                  bgcolor: "rgba(196,114,78,0.03)",
                },
              }}
            >
              <AddPhotoAlternateIcon
                sx={{ color: "text.secondary", fontSize: 28, mb: 0.5 }}
              />
              <Typography sx={{ fontSize: "0.75rem", color: "text.secondary" }}>
                Change photo
              </Typography>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Box
          onClick={() => fileInputRef.current?.click()}
          sx={{
            border: "2px dashed",
            borderColor: error ? "error.main" : "rgba(61,47,37,0.15)",
            borderRadius: 3,
            py: { xs: 4, md: 5 },
            px: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            transition: "all 0.2s",
            "&:hover": {
              borderColor: "secondary.main",
              bgcolor: "rgba(196,114,78,0.03)",
            },
          }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              bgcolor: "rgba(196,114,78,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 1.5,
            }}
          >
            <CloudUploadIcon sx={{ color: "secondary.main", fontSize: 28 }} />
          </Box>
          <Typography sx={{ fontWeight: 600, color: "primary.main", mb: 0.3 }}>
            Click to upload a photo
          </Typography>
          <Typography sx={{ fontSize: "0.82rem", color: "text.secondary" }}>
            JPG, PNG or WebP up to 10MB. This will be your cover image.
          </Typography>
        </Box>
      )}

      {error && (
        <Typography sx={{ fontSize: "0.75rem", color: "error.main", mt: 1 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};
