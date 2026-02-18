import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import ReplyIcon from "@mui/icons-material/Reply";
import CancelIcon from "@mui/icons-material/Cancel";
import type { QuoteRequest } from "../../lib/data";

export const STATUS_CONFIG: Record<
  QuoteRequest["status"],
  { label: string; color: string; bgcolor: string; icon: React.ReactNode }
> = {
  pending: {
    label: "Pending",
    color: "#b08030",
    bgcolor: "rgba(176,128,48,0.1)",
    icon: <HourglassEmptyIcon sx={{ fontSize: 16 }} />,
  },
  replied: {
    label: "Replied",
    color: "#2e7d6f",
    bgcolor: "rgba(46,125,111,0.1)",
    icon: <ReplyIcon sx={{ fontSize: 16 }} />,
  },
  accepted: {
    label: "Accepted",
    color: "#2e7d32",
    bgcolor: "rgba(46,125,50,0.1)",
    icon: <CheckCircleIcon sx={{ fontSize: 16 }} />,
  },
  declined: {
    label: "Declined",
    color: "#9e4040",
    bgcolor: "rgba(158,64,64,0.1)",
    icon: <CancelIcon sx={{ fontSize: 16 }} />,
  },
};
