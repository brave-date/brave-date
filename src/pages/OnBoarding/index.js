import Header from "../../components/Header";
import { useState } from "react";
import { useLocation } from "react-router-dom";
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
import moment from "moment";

import React from "react";

const OnBoarding = () => {
  let [personelInfo, setPersonelInfo] = useState({
    first_name: "",
    birthday: "",
    date: "",
    show_gender: false,
    gender_identity: "man",
    gender_interest: "woman",
    url: "",
    about: "",
    matches: [""],
  });

  const location = useLocation();

  const handleSubmit = async (e) => {
    //TODO: get email and password from location
    setPersonelInfo((prevState) => ({
      ...prevState,
      ["email"]: location.state.email,
      ["password"]: location.state.password,
    }));
    console.log("personelInfo : ", personelInfo);
    e.preventDefault();

    //TODO: Redux dispatch personelInfo
  };

  const handleChange = (e) => {
    console.log(e.target.name, ": ", e.target.value);
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
      ["birthday"]: formattedDate,
      ["date"]: date,
    }));
  };

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
            <Typography variant="label">Birthday</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disableToolbar
                renderInput={(params) => <TextField {...params} />}
                variant="inline"
                views={["day"]}
                margin="normal"
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
                }}
              >
                Gender
              </FormLabel>
              <RadioGroup row name="position" defaultValue="top">
                <FormControlLabel
                  id="man-gender-identity"
                  name="gender_identity"
                  value="man"
                  onChange={handleChange}
                  checked={personelInfo.gender_identity === "man"}
                  control={<Radio />}
                  label="Man"
                  labelPlacement="end"
                />
                <FormControlLabel
                  id="woman-gender-identity"
                  name="gender_identity"
                  value="woman"
                  onChange={handleChange}
                  checked={personelInfo.gender_identity === "woman"}
                  control={<Radio />}
                  label="Woman"
                  labelPlacement="end"
                />
                <FormControlLabel
                  id="more-gender-identity"
                  name="gender_identity"
                  value="more"
                  onChange={handleChange}
                  checked={personelInfo.gender_identity === "more"}
                  control={<Radio />}
                  label="More"
                  labelPlacement="end"
                />
              </RadioGroup>
            </FormControl>

            <FormControl component="fieldset">
              <FormLabel
                component="legend"
                sx={{
                  padding: "10px",
                  borderRadius: "10px",
                  transition: "all 0.3s",
                  color: "#000",
                  margin: "0px",
                  marginLeft: "-10px",
                }}
              >
                Show Gender On My Profile
              </FormLabel>
              <FormGroup row>
                <FormControlLabel
                  value="top"
                  id="show-gender"
                  name="show_gender"
                  onChange={handleChange}
                  checked={personelInfo.show_gender}
                  control={<Checkbox />}
                  labelPlacement="top"
                  sx={{
                    padding: "10px",
                    borderRadius: "10px",
                    transition: "all 0.3s",
                    color: "#000",
                    margin: "0px",
                    marginLeft: "-21px",
                    marginTop: "-10px",
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
                  id="man-gender-interest"
                  name="gender_interest"
                  value="man"
                  onChange={handleChange}
                  checked={personelInfo.gender_interest === "man"}
                  control={<Radio />}
                  label="Man"
                  labelPlacement="end"
                />
                <FormControlLabel
                  id="woman-gender-interest"
                  name="gender_interest"
                  value="woman"
                  onChange={handleChange}
                  checked={personelInfo.gender_interest === "woman"}
                  control={<Radio />}
                  label="Woman"
                  labelPlacement="end"
                />
                <FormControlLabel
                  id="everyone-gender-interest"
                  type="radio"
                  name="gender_interest"
                  value="everyone"
                  onChange={handleChange}
                  checked={personelInfo.gender_interest === "everyone"}
                  control={<Radio />}
                  label="Everyone"
                  labelPlacement="end"
                />
              </RadioGroup>
            </FormControl>

            <Typography variant="label">About me</Typography>
            <TextField
              id="about"
              type="text"
              name="about"
              required={true}
              placeholder="I like hiking..."
              value={personelInfo.about}
              onChange={handleChange}
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
            />

            <Box className="submit-onboarding-div">
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
                  !personelInfo.url ||
                  !personelInfo.about
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
          <TextField
            type="url"
            name="url"
            id="url"
            onChange={handleChange}
            required={true}
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
          />
          <Box sx={{ width: "70%" }}>
            {personelInfo.url && (
              <img src={personelInfo.url} alt="profile preview" />
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default OnBoarding;
