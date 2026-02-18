import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Divider from "@mui/material/Divider";
import { mockQuoteRequests } from "../../../lib/data";
import type { QuoteRequest } from "../../../lib/data";
import QuoteCard from "./quote-card";
import QuoteEmptyState from "./quote-empty-state";

const QuoteList = () => {
  const [tabValue, setTabValue] = useState(0);

  const tabFilters: (QuoteRequest["status"] | "all")[] = [
    "all",
    "pending",
    "replied",
    "accepted",
    "declined",
  ];

  const currentFilter = tabFilters[tabValue];
  const filteredQuotes =
    currentFilter === "all"
      ? mockQuoteRequests
      : mockQuoteRequests.filter((q) => q.status === currentFilter);

  const statusCounts = {
    all: mockQuoteRequests.length,
    pending: mockQuoteRequests.filter((q) => q.status === "pending").length,
    replied: mockQuoteRequests.filter((q) => q.status === "replied").length,
    accepted: mockQuoteRequests.filter((q) => q.status === "accepted").length,
    declined: mockQuoteRequests.filter((q) => q.status === "declined").length,
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        border: "1px solid rgba(61,47,37,0.06)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
        overflow: "hidden",
      }}
    >
      {/* Tabs */}
      <Tabs
        value={tabValue}
        onChange={(_, v) => setTabValue(v)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          px: { xs: 1.5, md: 3 },
          "& .MuiTab-root": {
            textTransform: "none",
            fontWeight: 500,
            fontSize: "0.88rem",
            color: "text.secondary",
            minHeight: 48,
            "&.Mui-selected": {
              color: "secondary.main",
              fontWeight: 700,
            },
          },
          "& .MuiTabs-indicator": {
            bgcolor: "secondary.main",
            height: 2.5,
            borderRadius: 2,
          },
        }}
      >
        <Tab label={`All (${statusCounts.all})`} />
        <Tab label={`Pending (${statusCounts.pending})`} />
        <Tab label={`Replied (${statusCounts.replied})`} />
        <Tab label={`Accepted (${statusCounts.accepted})`} />
        <Tab label={`Declined (${statusCounts.declined})`} />
      </Tabs>

      <Divider />

      {/* Quote list */}
      <Box>
        {filteredQuotes.length === 0 ? (
          <QuoteEmptyState />
        ) : (
          filteredQuotes.map((quote, index) => (
            <Box key={quote.id}>
              {index > 0 && <Divider />}
              <QuoteCard quote={quote} />
            </Box>
          ))
        )}
      </Box>
    </Card>
  );
};

export default QuoteList;
