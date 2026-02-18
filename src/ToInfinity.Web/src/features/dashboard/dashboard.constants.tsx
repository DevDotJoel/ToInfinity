import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import ReplyIcon from "@mui/icons-material/Reply";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export const STATUS_COLORS = {
  pending: {
    label: "Pending",
    color: "#b08030",
    bg: "rgba(176,128,48,0.1)",
    icon: <HourglassEmptyIcon sx={{ fontSize: 18 }} />,
  },
  replied: {
    label: "Replied",
    color: "#2e7d6f",
    bg: "rgba(46,125,111,0.1)",
    icon: <ReplyIcon sx={{ fontSize: 18 }} />,
  },
  accepted: {
    label: "Accepted",
    color: "#2e7d32",
    bg: "rgba(46,125,50,0.1)",
    icon: <CheckCircleIcon sx={{ fontSize: 18 }} />,
  },
  declined: {
    label: "Declined",
    color: "#9e4040",
    bg: "rgba(158,64,64,0.1)",
    icon: <CancelIcon sx={{ fontSize: 18 }} />,
  },
};

export const STAT_CARD_COLORS = {
  venues: {
    color: "#3d2f25",
    bg: "rgba(61,47,37,0.06)",
  },
  quotes: {
    color: "#c4724e",
    bg: "rgba(196,114,78,0.08)",
  },
  quotesDaily: {
    color: "#2e7d6f",
    bg: "rgba(46,125,111,0.08)",
  },
  views: {
    color: "#5c6bc0",
    bg: "rgba(92,107,192,0.08)",
  },
};
