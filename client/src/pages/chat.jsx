import React, { Fragment, useRef, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Skeleton, Stack } from "@mui/material";
import { AttachFile, Send } from "@mui/icons-material";
import FileMenu from "../components/dialog/FileMenu";
import { messageData } from "../components/shared/sample";
import MessageComponent from "../components/shared/MessageComponent";
import { getSocket } from "../socket";
import { NEW_MESSAGE } from "../utils/constants";
import { useChatDetailsQuery } from "../redux/api/api";

const user = {
  _id : "falkfw3320af",
  name : "baba"
}

function Chat({chatId}) {
  const containerRef = useRef();

  const socket = getSocket();

  const chatDetails = useChatDetailsQuery({chatId},{skip : !chatId});

 const members = chatDetails?.data?.data?.members;

  const [message,setMessage] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return ;

    socket.emit(NEW_MESSAGE,{chatId : chatId,members : members,message});
    setMessage("");
  }

  

  return ( chatDetails.isLoading ? <Skeleton/> :(
    <Fragment>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={"rgba(0,0,0,0.1)"}
        height={"90%"}
        sx={{ overflowX: "hidden", overflowY: "auto" }}
      >
        {
          messageData.map((data,idx) => {
            return <MessageComponent key={idx} message={data} user={user}/>
          })
        }
      </Stack>

    
    <form style={{height:"10%"}}>
      <Stack direction="row" height={'100%'} padding="10px" position="relative" alignItems="center" >
        <IconButton sx={{
          position:"absolute",
          left:"1.5rem",
          rotate:"30deg"
        }}
    
        >
          <AttachFile/>
        </IconButton>

        <input placeholder="Type message here" style={{
          width:"100%",
          height:"100%",
          border:'none',
          outline:"none",
          padding:'0 3rem',
          borderRadius:"1.5rem",
          backgroundColor:"rgba(0,0,0,0.1)"

        }} value={message} onChange={(e) => setMessage(e.target.value)}/>

        <IconButton type="submit" sx={{
          bgcolor:"#ea7070",
          padding:'0.5rem',
          marginLeft:"1rem",
          "&:hover" : {
            bgcolor : 'error.dark'
          }
        }} onClick={submitHandler}>
          <Send/>
        </IconButton>
      </Stack>
    </form>

    <FileMenu />

    </Fragment>)
  );
}

export default AppLayout()(Chat);
