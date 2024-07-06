import { Stack } from '@mui/material'
import React from 'react'
import ChatItem from '../shared/ChatItem'

const ChatList = ({
    w="100%",
    chats=[],
    chatId,
    onlineUsers=[],
    newMessageAlert=[{
        chatId: "",
        count : 0
    }],
    handleDeleteChat,
    memebers=[],
}) => {
  return (
    <Stack sx={{overflow:"auto",height:"100%"}} width={w} direction="column">
        {
            chats?.map((data,idx) => {

                const {avatar,_id,name,groupChat,members} = data;

                const newMessage = newMessageAlert.find(({chatId}) => chatId == _id);

                const isOnline = memebers.map((member) => onlineUsers.includes(member));


                return <ChatItem key={idx}
                    index={idx}
                    newMessage={newMessage}
                    isOnline={isOnline}
                    avatar={avatar}
                    _id={_id}
                    name={name}
                    groupChat={groupChat}
                    sameSender={chatId == _id}
                    handleDeleteChat={handleDeleteChat}
                />
            })
        }
    </Stack>
  )
}

export default ChatList
