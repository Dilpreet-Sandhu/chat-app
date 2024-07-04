import React from "react";
import Header from "./Header";
import Title from "../shared/title";
import { Grid } from "@mui/material";
import ChatList from "../specific/ChatList";
import  chats  from "../shared/sample.js";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile.jsx";

const AppLayout = () => (Component) => {

  
  return (props) => {
    
      const params = useParams();
      const {chatId} = params;

      const handleDeleteChat = (e,_id,groupChat) => {
        console.log('delte chat')
      }

    return (
      <div>
        <Title />
        <Header />

        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid item sm="4" sx={{display : {xs : "none",sm : "block"}}} md="3" height={"100%"} >
            <ChatList chats={chats} chatId={chatId} newMessageAlert={[{chatId,count:'4'}]} handleDeleteChat={handleDeleteChat}/>
          </Grid>
          <Grid item xs="12" sm="8" md="5" lg="6" height={"100%"}>
        <Component {...props} />
          </Grid>
          <Grid item md={'4'} lg="3" sx={{display:{xs :"none",md : "block",padding:"2rem",background:"rgba(0,0,0,0.80)"}}} height={"100%"} >
            <Profile/>
          </Grid>
        </Grid>

      </div>
    );
  };
};

export default AppLayout;
