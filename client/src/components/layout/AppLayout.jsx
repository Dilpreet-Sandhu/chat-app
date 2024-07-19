import { Drawer, Grid, Skeleton } from "@mui/material";
import React, { useCallback, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getOrSaveFromLocalStorage } from "../../lib/feautres.js";
import { useMyChatsQuery } from "../../redux/api/api.js";
import {
  incrementCount,
  setNewMessageAlert,
} from "../../redux/reducers/chat.js";
import { setIsDeleteMenu, setIsMobile, setSelectedDeleteChat } from "../../redux/reducers/misc.js";
import { getSocket } from "../../socket.jsx";
import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  ONLINE_USERS,
  REFETCH_CHATS
} from "../../utils/constants.js";
import { useSocketEvents } from "../auth/hook.jsx";
import DeleteChatDialogue from "../dialog/DeleteChatDialogue.jsx";
import Title from "../shared/title";
import ChatList from "../specific/ChatList";
import Profile from "../specific/Profile.jsx";
import Header from "./Header";

const AppLayout = () => (Component) => {
  return (props) => {
    const params = useParams();
    const dispatch = useDispatch();
    const socket = getSocket();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { chatId } = params;
    const deleteAnchor = useRef(null);

    const { isMobile,isDeleteMenu } = useSelector((state) => state.misc);
    const { newMessageAlert } = useSelector((state) => state.chat);

    const { isLoading, isError, data, error, refetch } = useMyChatsQuery("");

    useEffect(() => {
      if (isError) {
        toast.error("something went wrong");
      }
    }, []);

    useEffect(() => {
      getOrSaveFromLocalStorage({
        key: NEW_MESSAGE_ALERT,
        value: newMessageAlert,
      });
    }, [newMessageAlert]);

    const handleDeleteChat = (e, _id, groupChat) => {
      deleteAnchor.current = e.currentTarget;
      dispatch(setIsDeleteMenu(true))
      dispatch(setSelectedDeleteChat({chatId : _id,groupChat}))
    };

    const handleMobile = () => dispatch(setIsMobile(false));

    const newMessageAlertHandler = useCallback(
      (data) => {
        if (data?.chatId === chatId) return;
        dispatch(setNewMessageAlert({ chatId: data.chatId }));
      },
      [chatId]
    );
    const newRequestHandler = useCallback(() => {
      dispatch(incrementCount());
    }, []);

    const refetchHandler = useCallback(() => {
      refetch();
  
    },[refetch,navigate])

   
    const eventArr = {
      [NEW_MESSAGE_ALERT]: newMessageAlertHandler,
      [NEW_REQUEST]: newRequestHandler,
      [REFETCH_CHATS] : refetchHandler,
    };

    useSocketEvents(socket, eventArr);

    return (
      <div>
        <Title />
        <Header />

        <DeleteChatDialogue dispatch={dispatch} deleteOptionAnchor={deleteAnchor.current}/>

        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobile} onClose={handleMobile}>
            <ChatList
              w="40vw"
              chats={data.data}
              chatId={chatId}
              newMessageAlert={newMessageAlert}
              handleDeleteChat={handleDeleteChat}
            />
          </Drawer>
        )}

        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            item
            sm="4"
            sx={{ display: { xs: "none", sm: "block" } }}
            md="3"
            height={"100%"}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data.data}
                chatId={chatId}
                newMessageAlert={newMessageAlert}
                handleDeleteChat={handleDeleteChat}
              />
            )}
          </Grid>
          <Grid item xs="12" sm="8" md="5" lg="6" height={"100%"}>
            <Component {...props} chatId={chatId} user={user} />
          </Grid>
          <Grid
            item
            md={"4"}
            lg="3"
            sx={{
              display: {
                xs: "none",
                md: "block",
                padding: "2rem",
                background: "rgba(0,0,0,0.80)",
              },
            }}
            height={"100%"}
          >
            <Profile />
          </Grid>
        </Grid>
      </div>
    );
  };
};

export default AppLayout;
