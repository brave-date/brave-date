import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { Avatar } from "@mui/material";
import "./style.css";

const CustomAvatar = forwardRef(
  ({ src, alt, phCharLength, children, ...rest }, ref) => {
    const placeHolderChar =
      alt && phCharLength > 0
        ? alt.substr(0, phCharLength).toUpperCase()
        : null;

    src = `${src}`;
    return (
      <Avatar ref={ref} className="avatar-root" src={src} alt={alt} {...rest}>
        {!src && !children && alt ? placeHolderChar : children}
      </Avatar>
    );
  }
);

CustomAvatar.propTypes = {
  phCharLength: PropTypes.number,
};

CustomAvatar.defaultProps = {
  phCharLength: 1,
};

export default CustomAvatar;
