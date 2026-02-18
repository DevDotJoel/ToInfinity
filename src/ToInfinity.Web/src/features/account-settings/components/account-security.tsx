import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import LockIcon from "@mui/icons-material/Lock";
import { changePasswordSchema } from "../schemas/account.schemas";
import type { ChangePasswordSchema } from "../schemas/account.schemas";

interface AccountSecurityProps {
  onChangePassword: (data: ChangePasswordSchema) => Promise<void>;
}

const AccountSecurity = ({ onChangePassword }: AccountSecurityProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordSchema) => {
    setIsLoading(true);
    try {
      await onChangePassword(data);
      setIsOpen(false);
      reset();
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    reset();
  };

  return (
    <>
      <Card
        sx={{
          p: { xs: 2.5, md: 3.5 },
          mb: 3,
          border: "1px solid",
          borderColor: "rgba(61,47,37,0.08)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontWeight: 700,
            color: "primary.main",
            fontSize: "1.1rem",
            mb: 2,
          }}
        >
          Security
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
            borderRadius: 2,
            bgcolor: "rgba(247,243,240,0.5)",
            border: "1px solid",
            borderColor: "rgba(61,47,37,0.06)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <LockIcon sx={{ color: "text.secondary", fontSize: 20 }} />
            <Box>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "0.92rem",
                  color: "text.primary",
                }}
              >
                Password
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", fontSize: "0.82rem" }}
              >
                Last changed 30 days ago
              </Typography>
            </Box>
          </Box>
          <Button
            onClick={() => setIsOpen(true)}
            sx={{
              color: "secondary.main",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.85rem",
              "&:hover": { bgcolor: "rgba(196,114,78,0.06)" },
            }}
          >
            Change
          </Button>
        </Box>
      </Card>

      {/* Change Password Dialog */}
      <Dialog
        open={isOpen}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 1,
          },
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontWeight: 700,
            fontSize: "1.15rem",
            color: "primary.main",
          }}
        >
          Change Password
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
            >
              <TextField
                label="Current Password"
                type="password"
                fullWidth
                size="small"
                {...register("currentPassword")}
                error={!!errors.currentPassword}
                helperText={errors.currentPassword?.message}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
              <TextField
                label="New Password"
                type="password"
                fullWidth
                size="small"
                {...register("newPassword")}
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
              <TextField
                label="Confirm New Password"
                type="password"
                fullWidth
                size="small"
                {...register("confirmPassword")}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
            <Button
              type="button"
              onClick={handleClose}
              sx={{
                color: "text.secondary",
                textTransform: "none",
                fontWeight: 500,
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              startIcon={
                isLoading ? (
                  <CircularProgress size={16} sx={{ color: "#fff" }} />
                ) : undefined
              }
              sx={{
                bgcolor: "secondary.main",
                color: "#fff",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": { bgcolor: "secondary.dark" },
                "&:disabled": {
                  bgcolor: "rgba(196,114,78,0.5)",
                  color: "#fff",
                },
              }}
            >
              {isLoading ? "Updating..." : "Update Password"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default AccountSecurity;
