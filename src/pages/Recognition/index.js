import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import SidebarHeader from "../../components/SideBar/SidebarHeader";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import MatchesList from "../../components/SideBar/MatchesList";
import MainContainer from "../../components/MainContainer";
//import MessagesList from "./MessagesList";
//TODO: redux selectors
//import {
//   currentUser,
//   messages,
//   matches,
// } from "../../redux/appReducer/selectors";
//TODO: redux actions
//import { onMatchesSelect } from "../../redux/appReducer/actions";
//import { useDispatch, useSelector } from "react-redux";
//TODO: axios
// import { getChatUsers, getContactUsers, getRoomsUser } from "../../api/Axios";

const Sidebar = () => {
  //TODO: const thisCurrentUser = useSelector(currentUser);
  const [thisCurrentUser] = useState({
    first_name: "Mahmoud",
    profile_picture: "",
  });
  // TODO: const currentMessages = useSelector(messages);
  //const [currentMessages,] = useState({});
  // TODO: currentMatches = useSelector(matches);
  const [currentMatches] = useState({});
  const [value, setValue] = useState(1);
  //const dispatch = useDispatch();

  const onMatchesSelect = (user) => {
    //TODO: dispatch(onMatchesSelect(user));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (value === 1) {
      //TODO: dispatch(getMatchesList());
    }
    if (value === 2) {
      //TODO: dispatch(getMessagesList());
    }
  }, [value]);
  return (
    <Box className="in-build-app-container">
      <Box className="in-build-app-sidebar">
        <SidebarHeader user={thisCurrentUser} />
        <Tabs
          className="tab-container"
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "#ec4764",
              marginLeft: "5px",
              marginBottom: "8px",
            },
          }}
        >
          <Tab
            style={{
              textTransform: "none",
              fontSize: 16,
              fontWeight: "bold",
              color: value === 1 ? "#000" : "",
            }}
            label="Matches"
            value={1}
          />
          <Tab
            style={{
              textTransform: "none",
              fontSize: 16,
              fontWeight: "bold",
              color: value === 2 ? "#000" : "",
            }}
            label="Messages"
            value={2}
          />
        </Tabs>
        {value === 1 ? (
          <MatchesList
            currentUser={thisCurrentUser}
            matches={currentMatches}
            onMatchesSelect={onMatchesSelect}
          />
        ) : (
          <MatchesList
            currentUser={thisCurrentUser}
            matches={currentMatches}
            onMatchesSelect={onMatchesSelect}
          />
        )}
      </Box>
      <MainContainer />
    </Box>
  );
};

export default Sidebar;
