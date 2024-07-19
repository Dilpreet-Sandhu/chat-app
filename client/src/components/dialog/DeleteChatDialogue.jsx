import { Menu, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { setIsDeleteMenu } from '../../redux/reducers/misc';
import { Delete, ExitToApp } from '@mui/icons-material';
import useAsyncMutation from '../auth/hook';
import { useDeleteGroupMutation, useLeaveGroupMutation } from '../../redux/api/api';
import { useNavigate } from 'react-router-dom';

const DeleteChatDialogue = ({dispatch,deleteOptionAnchor}) => {
    
    const {isDeleteMenu,selectedDeleteChat} = useSelector(state => state.misc);
    const navigate = useNavigate();

    const [_,deleteChat,deleteChatData] = useAsyncMutation(useDeleteGroupMutation);

    const [__,leaveGroup,leaveGroupData] = useAsyncMutation(useLeaveGroupMutation);

    const leaveGroupHandler = () => {   
        closeHandler()
        leaveGroup("leaving group",{chatId : selectedDeleteChat?.chatId})
    }

    const deleteChatHandler = () => {
        closeHandler()
        deleteChat('deleting chat',{id : selectedDeleteChat.chatId})
        

    }

    const closeHandler = () => {
        dispatch(setIsDeleteMenu(false))
        deleteOptionAnchor.current = null;
    }

    useEffect(() => {
        if (deleteChatData || leaveGroupData) {
            navigate("/")
        }
    },[deleteChatData,leaveGroupData])

  return (
    <Menu sx={{cursor:"pointer"}}  open={isDeleteMenu} anchorEl={deleteOptionAnchor}  
    anchorOrigin={{
        vertical:"bottom",
        horizontal:"right"
    }}
    transformOrigin={{
        vertical:"center",
        horizontal:"left"

    }}
     onClose={closeHandler}>
        <Stack 
        direction={"row"}
        spacing={"0.5rem"}
        sx={{
            width:"10rem",
            padding:'0.5rem',
            directon:"row",
            alignItems:"center",
            spacing:"0.5rem"

        }}
        onClick={selectedDeleteChat.groupChat ? leaveGroupHandler : deleteChatHandler}

        >
            {
                selectedDeleteChat.groupChat ? <><ExitToApp/> <Typography>leave group</Typography></> : <><Delete/> Delete chat</>
            }

        </Stack>
    </Menu>
  )
}

export default DeleteChatDialogue
