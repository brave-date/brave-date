import React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import {
  languagePicker,
  languagePickerDark,
} from "../icons";

const Header = ({ landing, showSignUp, setShowSignUp, setIsSignUp }) => {
  const displaySignUp = () => {
    setShowSignUp(true);
    setIsSignUp(false);
  };

  return (
    <Box className="header-div">
      <Box className="brave-date-logo-nav-div">
        <Box className="brave-date-nav-div">
          <Link className="brave-date-logo-a" href="#">
            <img src="./android-chrome-512x512.png" height="180px" alt="brave date logo"/>
          </Link>
          <Box component="span" className="Hidden">
            Brave Date
          </Box>
          {landing ? (
            <List className="nav-ul">
              <ListItem className="nav-ul-li-li">
                <Link
                  underline="none"
                  color="inherit"
                  className="nav-ul-li-li-a"
                  href="#"
                >
                  Products
                </Link>
              </ListItem>
              <ListItem className="nav-ul-li-li">
                <Link
                  underline="none"
                  color="inherit"
                  className="nav-ul-li-li-a"
                  href="#"
                >
                  Learn
                </Link>
              </ListItem>
              <ListItem className="nav-ul-li-li">
                <Link
                  underline="none"
                  color="inherit"
                  className="nav-ul-li-li-a"
                  href="#"
                >
                  Safety
                </Link>
              </ListItem>
              <ListItem className="nav-ul-li-li">
                <Link
                  underline="none"
                  color="inherit"
                  className="nav-ul-li-li-a"
                  href="#"
                >
                  Support
                </Link>
              </ListItem>
              <ListItem className="nav-ul-li-li">
                <Link
                  underline="none"
                  color="inherit"
                  className="nav-ul-li-li-a"
                  href="#"
                >
                  Download
                </Link>
              </ListItem>
            </List>
          ) : null}
        </Box>

        <Box className="language-login-div">
          <Box className="language-picker-div">
            <Button
              className="language-picker-button"
              title="Language"
              lang="en"
              color="inherit"
            >
              {landing ? languagePicker() : languagePickerDark()}
              {landing ? (
                <Box component="span" className="language-picker-name">
                  English
                </Box>
              ) : (
                <Box component="span" className="language-picker-name-dark">
                  English
                </Box>
              )}
            </Button>
          </Box>
          {landing ? (
            <Box className="login-button">
              <Button
                className="login-button-a"
                onClick={displaySignUp}
                color="inherit"
                sx={{
                  borderRadius: "70px",
                  backgroundColor: "#fff",
                  color: "#000",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                }}
              >
                <Box component="span" className="login-button-a-span">
                  Log in
                </Box>
              </Button>
            </Box>
          ) : (
            ""
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
