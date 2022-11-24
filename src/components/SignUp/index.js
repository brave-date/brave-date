import { useState } from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import { closeButtonLogo } from "../../icons";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MailIcon from "@mui/icons-material/Mail";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import isValidEmail from "../Helper";
import { JWTAuth } from "../../api/AuthAPI";
import { useDispatch } from "react-redux";
import React from "react";

const SignUp = ({ setShowSignUp, isSignUp }) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const [errorValues, setErrorValues] = useState({
    emailError: "",
    passwordError: "",
  });

  const dispatch = useDispatch();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleErrorChange = (prop) => (event) => {
    if (typeof event == "string")
      setErrorValues({ ...errorValues, [prop]: event });
    else setErrorValues({ ...errorValues, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onClick = async (e) => {
    e.preventDefault();
    if (!isValidEmail(values.email)) {
      handleErrorChange("emailError")("Email address must be valid!");
    } else if (!values.password) {
      handleErrorChange("passwordError")("Password is required!");
    } else {
      if (!isSignUp) {
        dispatch(
          JWTAuth.onLogin({
            email: values.email,
            password: values.password,
            navigate,
          })
        );
      } else {
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: values.email,
            password: values.password,
            navigate,
          })
        );
        navigate("/app/onboarding");
      }
    }
  };

  const closeSignUp = () => {
    setShowSignUp(false);
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
              onClick={onClick}
            >
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
                placeholder="email"
                required={true}
                value={values.email}
                onChange={(e) => {
                  handleChange("email")(e);
                  handleErrorChange("emailError")("");
                }}
                helperText={errorValues.emailError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" variant="standard">
                      <IconButton aria-label="Email" edge="end" disabled>
                        <MailIcon
                          sx={{
                            padding: "10px",
                            left: "10px",
                            top: "25px",
                            "& > *": {
                              color: "black",
                            },
                          }}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
                placeholder="password"
                type={values.showPassword ? "text" : "password"}
                required={true}
                value={values.password}
                onChange={(e) => {
                  handleChange("password")(e);
                  handleErrorChange("passwordError")("");
                }}
                helperText={errorValues.passwordError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff
                            sx={{
                              padding: "10px",
                              left: "10px",
                              top: "25px",
                              "& > *": {
                                color: "black",
                              },
                            }}
                          />
                        ) : (
                          <Visibility
                            sx={{
                              padding: "10px",
                              left: "10px",
                              top: "25px",
                              "& > *": {
                                color: "black",
                              },
                            }}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                  startAdornment: (
                    <InputAdornment position="start" variant="standard">
                      <IconButton aria-label="Email" edge="end" disabled>
                        <LockIcon
                          sx={{
                            padding: "10px",
                            left: "10px",
                            top: "25px",
                            "& > *": {
                              color: "black",
                            },
                          }}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box
                sx={{
                  position: "relative",
                  left: "-30px",
                }}
              >
                <Button
                  type="submit"
                  disabled={!isValidEmail(values.email) || !values.password}
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
