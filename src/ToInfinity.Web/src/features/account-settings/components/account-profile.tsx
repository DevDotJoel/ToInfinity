import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import EditIcon from "@mui/icons-material/Edit";
import type { User } from "../../../features/auth/types";
import { editProfileSchema } from "../schemas/account.schemas";
import type { EditProfileSchema } from "../schemas/account.schemas";

interface AccountProfileProps {
  user: User;
  onSave: (data: EditProfileSchema) => Promise<void>;
}

const AccountProfile = ({ user, onSave }: AccountProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phone: user?.firstName ? "" : "",
    },
  });

  const initials =
    (user?.firstName?.charAt(0) || "?") + (user?.lastName?.charAt(0) || "?");

  const onSubmit = async (data: EditProfileSchema) => {
    setIsSaving(true);
    try {
      await onSave(data);
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset();
  };

  return (
    <Card
      sx={{
        p: 0,
        mb: 3,
        border: "1px solid",
        borderColor: "rgba(61,47,37,0.08)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        overflow: "visible",
      }}
    >
      {/* Profile Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: { xs: "flex-start", sm: "center" },
          flexDirection: { xs: "column", sm: "row" },
          gap: 2.5,
          p: { xs: 2.5, md: 3.5 },
          bgcolor: "rgba(247,243,240,0.5)",
          borderBottom: "1px solid",
          borderColor: "rgba(61,47,37,0.06)",
        }}
      >
        <Avatar
          sx={{
            width: 64,
            height: 64,
            bgcolor: "primary.main",
            fontSize: "1.3rem",
            fontWeight: 700,
            border: "3px solid",
            borderColor: "rgba(196,114,78,0.2)",
          }}
        >
          {initials}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              fontWeight: 700,
              color: "primary.main",
              fontSize: "1.15rem",
              lineHeight: 1.3,
            }}
          >
            {user?.firstName} {user?.lastName}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", fontSize: "0.88rem" }}
          >
            {user?.email}
          </Typography>
        </Box>
        {!isEditing && (
          <Button
            startIcon={<EditIcon sx={{ fontSize: 18 }} />}
            onClick={() => setIsEditing(true)}
            sx={{
              color: "secondary.main",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.88rem",
              "&:hover": { bgcolor: "rgba(196,114,78,0.06)" },
            }}
          >
            Edit Profile
          </Button>
        )}
      </Box>

      {/* Profile Fields */}
      <Box sx={{ p: { xs: 2.5, md: 3.5 } }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2.5,
            }}
          >
            <TextField
              label="First Name"
              {...register("firstName")}
              disabled={!isEditing}
              size="small"
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon
                        sx={{ fontSize: 18, color: "text.secondary" }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: 2 },
                "& .Mui-disabled": {
                  bgcolor: "rgba(247,243,240,0.5)",
                },
              }}
            />
            <TextField
              label="Last Name"
              {...register("lastName")}
              disabled={!isEditing}
              size="small"
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon
                        sx={{ fontSize: 18, color: "text.secondary" }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: 2 },
                "& .Mui-disabled": {
                  bgcolor: "rgba(247,243,240,0.5)",
                },
              }}
            />
            <TextField
              label="Email"
              value={user?.email || ""}
              disabled
              size="small"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon
                        sx={{ fontSize: 18, color: "text.secondary" }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
              helperText="Email cannot be changed"
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: 2 },
                "& .Mui-disabled": {
                  bgcolor: "rgba(247,243,240,0.5)",
                },
              }}
            />
            <TextField
              label="Phone"
              {...register("phone")}
              disabled={!isEditing}
              size="small"
              error={!!errors.phone}
              helperText={errors.phone?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon
                        sx={{ fontSize: 18, color: "text.secondary" }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: 2 },
                "& .Mui-disabled": {
                  bgcolor: "rgba(247,243,240,0.5)",
                },
              }}
            />
          </Box>

          {isEditing && (
            <Box
              sx={{
                display: "flex",
                gap: 1.5,
                mt: 3,
                justifyContent: "flex-end",
              }}
            >
              <Button
                type="button"
                onClick={handleCancel}
                sx={{
                  color: "text.secondary",
                  textTransform: "none",
                  fontWeight: 500,
                  "&:hover": { bgcolor: "rgba(61,47,37,0.04)" },
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isSaving}
                startIcon={
                  isSaving ? (
                    <CircularProgress size={16} sx={{ color: "#fff" }} />
                  ) : undefined
                }
                sx={{
                  bgcolor: "secondary.main",
                  color: "#fff",
                  textTransform: "none",
                  fontWeight: 600,
                  px: 3,
                  "&:hover": { bgcolor: "secondary.dark" },
                  "&:disabled": {
                    bgcolor: "rgba(196,114,78,0.5)",
                    color: "#fff",
                  },
                }}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </Box>
          )}
        </form>
      </Box>
    </Card>
  );
};

export default AccountProfile;
