import Header from "../../components/Header";
import ContentLoader from "../../components/ContentLoader";
import React, { useState, useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { JWTAuth } from "../../api/AuthAPI";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import moment from "moment";
import { useDropzone } from "react-dropzone";

// TODO: move all css objects into index.css file
const buttonStyle = {
  position: "relative",
  top: "105px",
  left: "50px",
  display: "inline-block",
  width: "25px",
  height: "25px",
  padding: "7px",
  boxSizing: "border-box",
  background:
    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0) content-box, red",
  backgroundPosition: "center",
  backgroundSize: "100% 3px, 3px 100%",
  backgroundRepeat: "no-repeat",
  borderRadius: "50%",
  border: "none",
  cursor: "pointer",
};
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2.5,
  borderColor: "rgb(210, 206, 210)",
  borderStyle: "dashed",
  backgroundColor: "rgb(234, 234, 234)",
  color: "rgb(162, 151, 151)",
  outline: "none",
  transition: "border .24s ease-in-out",
  height: "100px",
  width: "70px",
};
const thumbsContainer = {
  display: "grid",
  gridTemplateColumns: "auto auto auto",
  gridTemplateRows: "auto auto",
  gridGap: "10px",
  gridAutoRows: "0px",
  margin: 16,
};
const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};
const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const OnBoarding = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [personelInfo, setPersonelInfo] = useState({
    first_name: "",
    last_name: "",
    birthday: "",
    date: "",
    display_gender_bool: false,
    gender: "man",
    interests: "woman",
    profile_picture: "",
    passion: "",
  });

  const handleSubmit = async (e) => {
    const userInfo = location.state;
    e.preventDefault();
    dispatch(
      JWTAuth.onRegister({
        personelInfo: {
          ...personelInfo,
          email: userInfo.email,
          password: userInfo.password,
          display_gender: Number(personelInfo.display_gender_bool),
        },
        navigate,
      })
    );
  };

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;
    setPersonelInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    const formattedDate = moment(date).format("DD-MM-YYYY");
    setPersonelInfo((prevState) => ({
      ...prevState,
      // eslint-disable-next-line
      ["birthday"]: formattedDate,
      // eslint-disable-next-line
      ["date"]: date,
    }));
  };
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/*": [],
      },
      onDrop: (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
        setPersonelInfo((prevState) => ({
          ...prevState,
          // eslint-disable-next-line
          ["profile_picture"]: acceptedFiles[0],
        }));
      },
    });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          alt={file.name}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );
  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  if (!(location.state && "email" in location.state)) {
    return <Navigate to={"/"} replace />;
  } else {
    return (
      <>
        <Header
          landing={false}
          showSignUp={false}
          src={"../../android-chrome-512x512.png"}
          setShowSignUp={() => {}}
          setIsSignUp={() => {}}
        />
        <Typography
          variant="h5"
          sx={{
            borderTop: "solid 1px rgb(213, 213, 213)",
            cursor: "default",
            left: "100px",
            display: "flex",
            justifyContent: "center",
            fontStyle: "italic",
            paddingTop: "25px",
            fontWeight: "800",
          }}
        >
          CREATE ACCOUNT
        </Typography>

        <Box sx={{ justifyContent: "center", display: "flex" }}>
          <Box
            component="form"
            autoComplete="off"
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
            onSubmit={handleSubmit}
          >
            <Box
              component="section"
              autoComplete="off"
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "20px",
                width: "35",
                textAlign: "start",
              }}
              onSubmit={handleSubmit}
            >
              <Typography variant="label">First Name</Typography>
              <TextField
                id="first_name"
                type="text"
                name="first_name"
                placeholder="First Name"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& > fieldset": {
                      padding: "15px 30px",
                      margin: "10px 0",
                      fontSize: "15px",
                      border: "solid 2px rgb(219, 219, 219)",
                      borderRadius: "10px",
                    },
                  },
                }}
                required={true}
                value={personelInfo.first_name}
                onChange={handleChange}
              />

              <FormLabel
                sx={{
                  padding: "10px",
                  borderRadius: "10px",
                  transition: "all 0.3s",
                  color: "#000",
                  margin: "0px",
                  marginLeft: "-10px",
                }}
              >
                Birthday
              </FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disableToolbar
                  renderInput={(params) => <TextField {...params} />}
                  variant="inline"
                  views={["day"]}
                  sx={{
                    borderColor: "#fff",
                  }}
                  inputFormat="DD/MM/YYYY"
                  id="date-picker-inline"
                  value={personelInfo.date}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </LocalizationProvider>

              <FormControl>
                <FormLabel
                  sx={{
                    padding: "10px",
                    borderRadius: "10px",
                    transition: "all 0.3s",
                    color: "#000",
                    margin: "0px",
                    marginLeft: "-10px",
                    marginTop: "0px",
                    "&.MuiFormControlLabel:checked": {
                      color: "red",
                    },
                  }}
                >
                  Gender
                </FormLabel>
                <RadioGroup row name="position" defaultValue="top">
                  <FormControlLabel
                    id="man-gender-identity"
                    name="gender"
                    value="man"
                    sx={{
                      marginLeft: "0px",
                      padding: "15px",
                      paddingTop: "7px",
                      paddingBottom: "7px",
                      borderRadius: "5px",
                      color: "#000",
                      border: "solid 1px #000",
                      "&:hover": {
                        color: "#d6002f",
                        border: "solid 1px #d6002f",
                      },
                    }}
                    onChange={handleChange}
                    checked={personelInfo.gender === "man"}
                    control={<Radio sx={{ display: "none" }} />}
                    label="Man"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    id="woman-gender-identity"
                    name="gender"
                    value="woman"
                    onChange={handleChange}
                    sx={{
                      marginLeft: "0px",
                      padding: "15px",
                      paddingTop: "7px",
                      paddingBottom: "7px",
                      borderRadius: "5px",
                      color: "#000",
                      border: "solid 1px #000",
                      "&:hover": {
                        color: "#d6002f",
                        border: "solid 1px #d6002f",
                      },
                    }}
                    checked={personelInfo.gender === "woman"}
                    control={<Radio sx={{ display: "none" }} />}
                    label="Woman"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    id="more-gender-identity"
                    name="gender"
                    value="more"
                    onChange={handleChange}
                    sx={{
                      marginLeft: "0px",
                      padding: "15px",
                      paddingTop: "7px",
                      paddingBottom: "7px",
                      borderRadius: "5px",
                      color: "#000",
                      border: "solid 1px #000",
                      "&:hover": {
                        color: "#d6002f",
                        border: "solid 1px #d6002f",
                      },
                    }}
                    checked={personelInfo.gender === "other"}
                    control={<Radio sx={{ display: "none" }} />}
                    label="Other"
                    labelPlacement="end"
                  />
                </RadioGroup>
              </FormControl>

              <FormControl component="fieldset">
                <FormGroup row>
                  <FormControlLabel
                    value="top"
                    id="show-gender"
                    name="display_gender"
                    onChange={handleChange}
                    checked={personelInfo.display_gender_bool}
                    control={<Checkbox />}
                    label="Show my gender on my profile"
                    labelPlacement="end"
                    sx={{
                      padding: "10px",
                      borderRadius: "10px",
                      transition: "all 0.3s",
                      color: "#000",
                      margin: "0px",
                      marginLeft: "-21px",
                      marginTop: "10px",
                    }}
                  />
                </FormGroup>
              </FormControl>

              <FormControl>
                <FormLabel
                  sx={{
                    padding: "10px",
                    borderRadius: "10px",
                    transition: "all 0.3s",
                    color: "#000",
                    margin: "0px",
                    marginLeft: "-10px",
                    marginTop: "0px",
                  }}
                >
                  Show Me
                </FormLabel>
                <RadioGroup row name="position" defaultValue="top">
                  <FormControlLabel
                    id="man-gender-interests"
                    name="interests"
                    value="man"
                    onChange={handleChange}
                    checked={personelInfo.interests === "man"}
                    control={<Radio sx={{ display: "none" }} />}
                    label="Man"
                    labelPlacement="end"
                    sx={{
                      marginLeft: "0px",
                      padding: "15px",
                      paddingTop: "7px",
                      paddingBottom: "7px",
                      borderRadius: "5px",
                      color: "#000",
                      border: "solid 1px #000",
                      "&:hover": {
                        color: "#d6002f",
                        border: "solid 1px #d6002f",
                      },
                    }}
                  />
                  <FormControlLabel
                    id="woman-gender-interest"
                    name="interests"
                    value="woman"
                    onChange={handleChange}
                    checked={personelInfo.interests === "woman"}
                    control={<Radio sx={{ display: "none" }} />}
                    label="Woman"
                    labelPlacement="end"
                    sx={{
                      marginLeft: "0px",
                      padding: "15px",
                      paddingTop: "7px",
                      paddingBottom: "7px",
                      borderRadius: "5px",
                      color: "#000",
                      border: "solid 1px #000",
                      "&:hover": {
                        color: "#d6002f",
                        border: "solid 1px #d6002f",
                      },
                    }}
                  />
                  <FormControlLabel
                    id="everyone-gender-interests"
                    type="radio"
                    name="interests"
                    value="everyone"
                    onChange={handleChange}
                    checked={personelInfo.interests === "everyone"}
                    control={<Radio sx={{ display: "none" }} />}
                    label="Everyone"
                    labelPlacement="end"
                    sx={{
                      marginLeft: "0px",
                      padding: "15px",
                      paddingTop: "7px",
                      paddingBottom: "7px",
                      borderRadius: "5px",
                      color: "#000",
                      border: "solid 1px #000",
                      "&:hover": {
                        color: "#d6002f",
                        border: "solid 1px #d6002f",
                      },
                    }}
                  />
                </RadioGroup>
              </FormControl>
              <FormLabel
                sx={{
                  padding: "10px",
                  borderRadius: "10px",
                  transition: "all 0.3s",
                  color: "#000",
                  margin: "0px",
                  marginLeft: "-10px",
                  marginTop: "10px",
                }}
              >
                Email Address
              </FormLabel>
              <TextField
                disabled
                id="about"
                type="text"
                name="about"
                placeholder={location.state ? location.state.email : ""}
                sx={{
                  marginBottom: "10px",
                  "& .MuiOutlinedInput-root": {
                    "& > fieldset": {
                      padding: "15px 30px",
                      margin: "10px 0",
                      fontSize: "15px",
                      border: "solid 2px rgb(219, 219, 219)",
                      borderRadius: "10px",
                    },
                  },
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  borderTop: "solid 1px rgb(213, 213, 213)",
                  cursor: "default",
                  left: "100px",
                  display: "flex",
                  justifyContent: "center",
                  fontStyle: "italic",
                  paddingTop: "10px",
                  fontWeight: "800",
                }}
              >
                Optional
              </Typography>
              <FormLabel
                sx={{
                  padding: "10px",
                  borderRadius: "10px",
                  transition: "all 0.3s",
                  color: "#000",
                  margin: "0px",
                  marginLeft: "-10px",
                  marginTop: "10px",
                }}
              >
                Passion
              </FormLabel>
              <TextField
                id="passion"
                type="text"
                name="passion"
                required={true}
                placeholder="Potterhead"
                value={personelInfo.passion}
                onChange={handleChange}
                sx={{
                  marginBottom: "10px",
                  "& .MuiOutlinedInput-root": {
                    "& > fieldset": {
                      padding: "15px 30px",
                      margin: "10px 0",
                      fontSize: "15px",
                      border: "solid 2px rgb(219, 219, 219)",
                      borderRadius: "10px",
                    },
                  },
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  type="submit"
                  sx={{
                    cursor: "pointer",
                    backgroundColor: "#d6002f",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#d6002f",
                    },
                    "&:disabled": {
                      cursor: "default",
                      backgroundColor: "#656e7b",
                      color: "#fff",
                    },
                  }}
                  disabled={
                    !personelInfo.first_name ||
                    !personelInfo.birthday ||
                    !personelInfo.profile_picture ||
                    !personelInfo.passion
                  }
                >
                  Continue
                </Button>
              </Box>
            </Box>
          </Box>
          <Box
            component="section"
            autoComplete="off"
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "20px",
            }}
            onSubmit={handleSubmit}
          >
            <Typography variant="label">Profile Photo</Typography>
            <div style={thumbsContainer}>
              <div {...getRootProps({ style })}>
                <button style={buttonStyle}>
                  <input {...getInputProps()} />
                </button>
                {thumbs[0]}
              </div>
              <div {...getRootProps({ style })}>
                <button style={buttonStyle}>
                  <input {...getInputProps()} />
                </button>
                {thumbs[1]}
              </div>
              <div {...getRootProps({ style })}>
                <button style={buttonStyle}>
                  <input {...getInputProps()} />
                </button>
                {thumbs[2]}
              </div>
              <div {...getRootProps({ style })}>
                <button style={buttonStyle}>
                  <input {...getInputProps()} />
                </button>
                {thumbs[3]}
              </div>
              <div {...getRootProps({ style })}>
                <button style={buttonStyle}>
                  <input {...getInputProps()} />
                </button>
                {thumbs[4]}
              </div>
              <div {...getRootProps({ style })}>
                <button style={buttonStyle}>
                  <input {...getInputProps()} />
                </button>
                {thumbs[5]}
              </div>
            </div>
          </Box>
        </Box>
        <ContentLoader />
      </>
    );
  }
};

export default OnBoarding;
