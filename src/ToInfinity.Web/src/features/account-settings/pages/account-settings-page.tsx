import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  AccountProfile,
  AccountSecurity,
  AccountSubscription,
  AccountDangerZone,
} from "../components";
import { useAuth } from "../../../features/auth";
import type {
  EditProfileSchema,
  ChangePasswordSchema,
} from "../schemas/account.schemas";

const AccountSettingsPage = () => {
  const { user } = useAuth();
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const handleProfileSave = async (data: EditProfileSchema) => {
    try {
      // TODO: Call API to update profile
      console.log("Updating profile:", data);
      setSnackbar({
        open: true,
        message: "Profile updated successfully.",
        severity: "success",
      });
    } catch {
      setSnackbar({
        open: true,
        message: "Failed to update profile.",
        severity: "error",
      });
    }
  };

  const handlePasswordChange = async (data: ChangePasswordSchema) => {
    try {
      // TODO: Call API to change password
      console.log("Changing password:", data);
      setSnackbar({
        open: true,
        message: "Password changed successfully.",
        severity: "success",
      });
    } catch {
      setSnackbar({
        open: true,
        message: "Failed to change password.",
        severity: "error",
      });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // TODO: Call API to delete account
      console.log("Deleting account");
      setSnackbar({
        open: true,
        message: "Account deleted successfully.",
        severity: "success",
      });
      // TODO: Redirect to home page after deletion
    } catch {
      setSnackbar({
        open: true,
        message: "Failed to delete account.",
        severity: "error",
      });
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Header */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "primary.contrastText",
          py: { xs: 4, md: 5 },
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            sx={{
              fontFamily: "var(--font-serif), Georgia, serif",
              fontWeight: 700,
              fontSize: { xs: "1.5rem", md: "1.85rem" },
            }}
          >
            Account Settings
          </Typography>
          <Typography
            sx={{
              mt: 0.5,
              opacity: 0.75,
              fontSize: "0.95rem",
            }}
          >
            Manage your profile and subscription
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 3, md: 5 } }}>
        {/* Profile Card */}
        <AccountProfile user={user} onSave={handleProfileSave} />

        {/* Security Card */}
        <AccountSecurity onChangePassword={handlePasswordChange} />

        {/* Subscription Card */}
        <AccountSubscription user={user} />

        {/* Danger Zone */}
        <AccountDangerZone onDeleteAccount={handleDeleteAccount} />
      </Container>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          sx={{
            borderRadius: 2,
            fontWeight: 500,
            ...(snackbar.severity === "success" && {
              bgcolor: "rgba(46,125,50,0.1)",
              color: "#2e7d32",
            }),
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AccountSettingsPage;
