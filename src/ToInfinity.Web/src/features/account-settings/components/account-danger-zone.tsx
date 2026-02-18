import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

interface AccountDangerZoneProps {
  onDeleteAccount: () => Promise<void>;
}

const AccountDangerZone = ({ onDeleteAccount }: AccountDangerZoneProps) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDeleteAccount();
      setIsConfirmOpen(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          mt: 5,
          pt: 3,
          borderTop: "1px solid",
          borderColor: "rgba(61,47,37,0.08)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <WarningAmberIcon sx={{ color: "#d32f2f", fontSize: 20 }} />
          <Typography
            sx={{
              fontWeight: 700,
              color: "#d32f2f",
              fontSize: "0.95rem",
            }}
          >
            Danger Zone
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontSize: "0.85rem",
            mb: 2,
          }}
        >
          Once you delete your account, there is no going back. All your data,
          quotes, and listings will be permanently removed.
        </Typography>
        <Button
          variant="outlined"
          onClick={() => setIsConfirmOpen(true)}
          sx={{
            color: "#d32f2f",
            borderColor: "rgba(211,47,47,0.3)",
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.85rem",
            "&:hover": {
              bgcolor: "rgba(211,47,47,0.04)",
              borderColor: "#d32f2f",
            },
          }}
        >
          Delete Account
        </Button>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ color: "#d32f2f", fontWeight: 700 }}>
          Delete Account?
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ mt: 2 }}>
            This action cannot be undone. All your data, quotes, and listings
            will be permanently deleted.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ gap: 1 }}>
          <Button
            onClick={() => setIsConfirmOpen(false)}
            sx={{
              color: "text.secondary",
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            variant="contained"
            sx={{
              bgcolor: "#d32f2f",
              color: "#fff",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": { bgcolor: "#b71c1c" },
            }}
          >
            {isDeleting ? "Deleting..." : "Delete Account"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AccountDangerZone;
