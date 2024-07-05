import { Dialog, DialogTitle ,Stack, Typography,ListItem,Avatar, Button} from '@mui/material'
import React,{memo} from 'react';
import {notification} from '../shared/sample.js'

const NotificationDialogue = () => {

  const friendRequestHandler = (_id,accept) => {
    console.log('')
  }

  return (
    <Dialog open>
      <Stack p={{xs :'1rem',sm : "2rem"}} maxWidth={"25rem"}>
          <DialogTitle>Notifications</DialogTitle>
          {
            notification.length > 0 ? 
              notification.map(({sender,_id}) => <NotificationItem key={_id} sender={sender} handler={friendRequestHandler}/>)
             : <Typography textAlign={"center"}>0 notifications</Typography>
          }
      </Stack>
    </Dialog>
  )
}
const NotificationItem = memo(({sender,id,handler}) => {
  return (
    <ListItem>
        <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
        >
            <Avatar src={sender.avatar}/>
            <Typography
                sx={{
                    flexGrow :"1",
                    display:"-webkit-flex",
                    WebkitLineClamp : "1",
                    WebkitBoxOrient: "vertical",
                    overflow:"hidden",
                    textOverflow:"ellipsis"
                }}
            >{sender.name}</Typography>

           <Stack direction={{xs :"column",sm : "row"}}>
                <Button  onClick={handler(sender._id,true)}>accept</Button>
                <Button color='error' onClick={handler(sender._id,false)}>accept</Button>
           </Stack>
        </Stack>
    </ListItem>
  )
})

export default NotificationDialogue
