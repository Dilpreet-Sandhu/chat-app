import React, { useEffect } from "react";
import Header from "./Header";
import Title from "../shared/title";
import { Drawer, Grid, Skeleton } from "@mui/material";
import ChatList from "../specific/ChatList";
import chats from "../shared/sample.js";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile.jsx";
import { useMyChatsQuery } from "../../redux/api/api.js";
import { useDispatch, useSelector } from "react-redux";
import { setIsDeleteMenu, setIsMobile } from "../../redux/reducers/misc.js";
import toast from "react-hot-toast";

const AppLayout = () => (Component) => {
  return (props) => {
    const params = useParams();
    const dispatch = useDispatch()
    const { chatId } = params;

    const {isMobile} = useSelector(state => state.misc);

    const { isLoading, isError, data, error, refetch } = useMyChatsQuery("");
   

    useEffect(() => {
      if (isError) {
        toast.error('something went wrong')
      }
    },[])



    const handleDeleteChat = (e, _id, groupChat) => {
      console.log("delte chat");

    };
    console.log(data)

    const handleMobile = () => dispatch(setIsMobile(false));

    return (
      <div>
        <Title />
        <Header />
 
        {
          isLoading ? <Skeleton/> : (
            <Drawer open={isMobile} onClose={handleMobile}>
               <ChatList
               w="40vw"
              chats={data.data }
              chatId={chatId}
              newMessageAlert={[{ chatId, count: "4" }]}
              handleDeleteChat={handleDeleteChat}
            />
            </Drawer>
          )
        }

        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            item
            sm="4"
            sx={{ display: { xs: "none", sm: "block" } }}
            md="3"
            height={"100%"}
          >
           {
            isLoading ? (
              <Skeleton/>
            ) : (
              <ChatList
              chats={data.data }
              chatId={chatId}
              newMessageAlert={[{ chatId, count: "4" }]}
              handleDeleteChat={handleDeleteChat}
            />
            )
           }
          </Grid>
          <Grid item xs="12" sm="8" md="5" lg="6" height={"100%"}>
            <Component {...props} />
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
