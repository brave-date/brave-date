import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import CustomAvatar from "../../CustomAvatar";

const MatchCell = ({ data, onMatchSelect }) => {
  return (
    <Box className="match-cell-item" onClick={() => onMatchSelect(data)}>
      <Box className="match-avatar-root">
        <Badge variant="dot">
          <CustomAvatar src={data.profile_picture} alt={data.first_name} />
        </Badge>
      </Box>
      <Box className="match-cell-info">
        <Box display="flex" alignItems="center">
          <Typography
            component="div"
            variant="subtitle2"
            className="title-root"
          >
            {data.first_name}
          </Typography>
        </Box>
        <Typography className="match-root">{data.passion}</Typography>
      </Box>
    </Box>
  );
};

export default MatchCell;
