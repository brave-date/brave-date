import React, { useEffect } from "react";
import { Box } from "@mui/material";
//import "../style.css";
import { useDispatch, useSelector } from "react-redux";

import { getConversation } from "../../api/ChatAPI";

import Conversation from "../Conversation";
import ContentHeader from "../ContentHeader";
import ChatFooter from "../ChatFooter";
import ContentLoader from "../ContentLoader";
import CardsContainer from "../CardsContainer";

import { conversation, selectedUser } from "../../redux/chatReducer/selectors";

import { authUser } from "../../redux/authReducer/selectors";

import { initiateChatSocket } from "../../api/Socket";

const MainContainer = () => {
  const dispatch = useDispatch();
  const thisConversation = useSelector(conversation);
  const currentAuthUser = useSelector(authUser);

  const receiver = useSelector(selectedUser);
  useEffect(() => {
    if (receiver) {
      dispatch(getConversation(receiver));
      dispatch(initiateChatSocket(currentAuthUser, receiver));
    }
  }, [receiver, dispatch, currentAuthUser]);

  if (!receiver) {
    return <CardsContainer />;
  }
  return (
    <Box className="in-build-app-main-content">
      {receiver && (
        <>
          <ContentHeader user={receiver} />
          <Conversation
            conversation={thisConversation}
            selectedUser={receiver}
          />
          <ChatFooter receiver={receiver} />
        </>
      )}
      <ContentLoader withLoader={false} variant="info" />
    </Box>
  );
};

export default MainContainer;
