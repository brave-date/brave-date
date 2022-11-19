import { useState } from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import { closeButtonLogo } from "../../icons";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import React from "react";

const SignUp = ({ setShowSignUp, isSignUp }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const closeSignUp = () => {
    setShowSignUp(false);
  };

  const toOnBoarding = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      navigate("/app/onboarding", {
        state: { email: email, password: password },
      });
      window.location.reload();
    }
  };

  return (
    <Box className="model-login">
      <Box className="model-login-inner">
        <Box
          component="img"
          sx={{
            position: "absolute",
            display: "block",
            left: "45%",
            height: "50px",
            width: "50px",
          }}
          alt="Brave Date Logo"
          src="./sign-up-logo.png"
        />
        <Box
          sx={{
            marginTop: "10%",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              borderRadius: "100px",
              marginTop: "20px",
              fontSize: "1.5rem",
              fontWeight: "800",
              fontStyle: "italic",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            {isSignUp ? "CREATE ACCOUNT" : "GET STARTED"}
          </Typography>
          <Box className="model-login-header-div">
            By clicking{" "}
            <Box component="span" sx={{ textTransform: "capitalize" }}>
              log in
            </Box>
            , you agree to our{" "}
            <Link
              className="model-login-header-div-terms-privacy-cookie"
              color="#505965"
              href="#"
              target="_blank"
            >
              Terms
            </Link>
            . Learn how we process your data in our{" "}
            <Link
              className="model-login-header-div-terms-privacy-cookie"
              color="#505965"
              href="#"
              target="_blank"
            >
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link
              className="model-login-header-div-terms-privacy-cookie"
              color="#505965"
              href="#"
              target="_blank"
            >
              Cookie Policy
            </Link>
            .
          </Box>

          <Box>
            <Box
              component="form"
              autoComplete="off"
              sx={{
                position: "relative",
                left: "30px",
              }}
              onSubmit={toOnBoarding}
            >
              <TextField
                sx={{
                  left: "-5%",
                  width: "100%",
                  "& .MuiInputLabel-root": { color: "green" },
                  "& .MuiOutlinedInput-root": {
                    "& > fieldset": {
                      borderRadius: "100px",
                      border: "solid 2px #505965",
                      padding: "7px",
                      position: "absolute",
                      margin: "7px",
                      height: "30px",
                      fontSize: "18px",
                    },
                  },
                }}
                placeholder="   email"
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                sx={{
                  left: "-5%",
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    "& > fieldset": {
                      borderRadius: "100px",
                      border: "solid 2px #505965",
                      padding: "7px",
                      position: "absolute",
                      margin: "7px",
                      height: "30px",
                      fontSize: "18px",
                    },
                  },
                }}
                variant="outlined"
                placeholder="   password"
                type="password"
                required={true}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Box
                sx={{
                  position: "relative",
                  left: "-30px",
                }}
              >
                <Button
                  type="submit"
                  disabled={!email || !password}
                  sx={{
                    position: "relative",
                    left: "10px",
                    fontWeight: "500",
                    fontSize: "14px",
                    textTransform: "uppercase",
                    padding: "12px 30px",
                    borderRadius: "25px",
                    border: "solid 2px",
                    margin: "6px",
                    cursor: "pointer",
                    backgroundColor: "#d6002f",
                    color: "#fff",
                    "&:disabled": {
                      cursor: "default",
                      backgroundColor: "#656e7b",
                      color: "#fff",
                    },
                    "&:hover": {
                      backgroundColor: "#000",
                      color: "#fff",
                    },
                  }}
                >
                  {isSignUp ? "Sign Up" : "Sign In"}
                </Button>
              </Box>
            </Box>

            <Box className="get-the-app-div">
              <hr className="get-the-app-div-line-break" />
              <Typography
                variant="h5"
                sx={{
                  borderRadius: "100px",
                  marginTop: "24px",
                  fontSize: "1.6rem",
                  fontWeight: "800",
                  fontStyle: "italic",
                  alignItems: "center",
                  marginBottom: "12px",
                  textTransform: "uppercase",
                }}
              >
                Get the app!
              </Typography>
              <Box className="download-ios-android-div">
                <Box className="download-ios-android-div-inner">
                  <Link
                    className="download-ios-android-div-inner-link-ios"
                    href="#"
                  >
                    <Box
                      className="download-ios-android-div-inner-link-ios-img"
                      focusable="true"
                    ></Box>
                    <Box component="span" className="Hidden">
                      Download for iOS
                    </Box>
                  </Link>
                  <Link
                    className="download-ios-android-div-inner-link-android"
                    href="#"
                    itemProp="relatedLink"
                  >
                    <Box
                      className="download-ios-android-div-inner-link-android-img"
                      focusable="true"
                    ></Box>
                    <Box component="span" className="Hidden">
                      Download for Android
                    </Box>
                  </Link>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className="model-login-inner-close-div">
        <Button
          sx={{
            color: "#d4d8de",
            borderColor: "#d4d8de",
            borderRadius: "50%",
            borderWidth: "3px",
            transitionDuration: "0.2s",
            transitionProperty: "transform",
            padding: "0",
            lineHeight: "1",
            cursor: "pointer",
            "&:hover": {
              color: "#656e7b",
              borderColor: "#656e7b",
              transform: "rotate(-90deg)",
            },
          }}
          onClick={closeSignUp}
        >
          {closeButtonLogo()}
          <Box component="span" className="Hidden">
            Close
          </Box>
        </Button>
      </Box>
    </Box>
  );
};

export default SignUp;
