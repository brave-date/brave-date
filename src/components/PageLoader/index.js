import React from "react";
import Box from "@mui/material/Box";
import { tinderColoredLogo } from "../../icons";

const PageLoader = () => {
  return <Box className="page-loader">{tinderColoredLogo()}</Box>;
};

export default PageLoader;
