import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import SidebarHeader from "../../components/SideBar/SidebarHeader";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import MatchesList from "../../components/SideBar/MatchesList";
import MessagesList from "../../components/SideBar/MessagesList";
import MainContainer from "../../components/MainContainer";
import { currentUser } from "../../redux/authReducer/selectors";
import { chatList } from "../../redux/chatReducer/selectors";
import { onUserSelect } from "../../redux/chatReducer/actions";
import { matches } from "../../redux/matchReducer/selectors";
import { useDispatch, useSelector } from "react-redux";
//import { getUserMatches } from "../../api/MatchAPI";

const Sidebar = () => {
  const thisCurrentUser = useSelector(currentUser);
  const currentMessages = useSelector(chatList);
  const currentMatches = useSelector(matches);
  const [value, setValue] = useState(1);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const onMatchUserSelect = (user) => {
    dispatch(onUserSelect(user));
  };
  useEffect(() => {
    if (value === 1) {
      //dispatch(getUserMatches());
    }
    if (value === 2) {
      //TODO: dispatch(getMessagesList());
    }
  }, [value, dispatch]);
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
            onMatchesSelect={onMatchUserSelect}
          />
        ) : (
          <MessagesList
            messages={currentMessages}
            onMessagesSelect={onMatchUserSelect}
          />
        )}
      </Box>
      <MainContainer />
    </Box>
  );
};

export default Sidebar;
