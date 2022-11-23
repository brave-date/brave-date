import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { tinderMessagesLogo } from "../../../icons";

const NoMessageRecordsFound = ({ content, ...restProps }) => {
  return (
    <Box p={4} className="no-records-root" {...restProps}>
      <Box className="no-records-root-inner" {...restProps}>
        {tinderMessagesLogo()}
        <Box>
          <Typography
            variant="h6"
            style={{ fontWeight: 550 }}
            className="matches-message"
          >
            Say Hello
          </Typography>
          <Box component="span" className="matches-message">
            Looking to strike up a conversation? When you match with others, you
            can send them a message under “Matches”
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default NoMessageRecordsFound;
