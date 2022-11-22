import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const NoMatchesRecordFound = ({ content, ...restProps }) => {
  return (
    <Box p={4} className="no-records-root" {...restProps}>
      <Box className="no-records-root-inner" {...restProps}>
        <Box className="rectangle-animation"></Box>
        <Box>
          <Typography
            variant="h6"
            style={{ fontWeight: 550 }}
            className="matches-message"
          >
            Start Matching
          </Typography>
          <Box component="span" className="matches-message">
            Matches will appear here once you start to Like people. You can
            message them directly from here when you’re ready to spark up the
            conversation.
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NoMatchesRecordFound;
