import { Dialog, DialogTitle ,Stack, Typography,ListItem,Avatar, Button, Skeleton} from '@mui/material'
import React,{memo} from 'react';
import {notification} from '../shared/sample.js'
import { useAcceptRequestMutation, useNotificationQuery } from '../../redux/api/api.js';
import {setIsNotification} from '../../redux/reducers/misc.js';
import {useDispatch, useSelector} from 'react-redux';
import toast from 'react-hot-toast';
const NotificationDialogue = () => {

  const {isNotification} = useSelector(state => state.misc);
  const dispatch = useDispatch()
  
  const {isLoading,data} = useNotificationQuery();
  const [acceptRequest] = useAcceptRequestMutation();
 


  const friendRequestHandler = async (_id,accept) => {
    try {
      const res = await acceptRequest({requestId : _id,accept});
      //use socket here 
      toast.success('friend request accepted')
    } catch (error) {
      toast.error("couldn't accept friend request")
    }
    
  }
  const handleClose = () => {
    dispatch(setIsNotification(false))
  }
 

  return (
    <Dialog open={isNotification} onClose={handleClose}>
      <Stack p={{xs :'1rem',sm : "2rem"}} maxWidth={"25rem"}>
          <DialogTitle>Notifications</DialogTitle>
          {
            isLoading ? <Skeleton/> : (
              
            data?.data.length > 0 ? 
              data?.data.map(({name,avatar,requestId}) => <NotificationItem key={requestId} requestId={requestId} name={name} avatar={avatar} handler={friendRequestHandler}/>)
             : <Typography textAlign={"center"}>0 notifications</Typography>
          
            )
          }
      </Stack>
    </Dialog>
  )
}
const NotificationItem = memo(({name,avatar,handler,requestId}) => {
  return (
    <ListItem>
        <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
        >
            <Avatar src={avatar}/>
            <Typography
                sx={{
                    flexGrow :"1",
                    display:"-webkit-flex",
                    WebkitLineClamp : "1",
                    WebkitBoxOrient: "vertical",
                    overflow:"hidden",
                    textOverflow:"ellipsis"
                }}
            >{name}</Typography>

           <Stack direction={{xs :"column",sm : "row"}}>
                <Button  onClick={() => handler(requestId,true)}>accept</Button>
                <Button color='error' onClick={() => handler(requestId,false)}>Reject</Button>
           </Stack>
        </Stack>
    </ListItem>
  )
})

export default NotificationDialogue
