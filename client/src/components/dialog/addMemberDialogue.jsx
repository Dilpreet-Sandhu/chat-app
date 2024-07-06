import { Dialog, DialogTitle, Stack, Typography,Button } from '@mui/material';

import React,{useState} from 'react';
import chats from '../shared/sample';
import UserItem from '../specific/UserItem';

const AddMemberDialogue = ({addMember,isLoadingMember,chatId}) => {

    const [members, setMembers] = useState(chats);
    const [selectedMemebers, setSelectedMembers] = useState([]);

    const selectMemeberHandler = (id) => {
    
        setSelectedMembers((prev) =>
          prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
      };

    const addFriendHandler = () => {
        addMember(id,chatId)
    }

    const closeHandler = () => {
        setSelectedMembers([]);
    }
    
    const addMemberSubmitHandler = () => {
        closeHandler()
    }

  return (
   <Dialog open>

    <Stack p={"2rem"} width="20rem" spacing="2rem">
        <DialogTitle textAlign={"center"}>Add member</DialogTitle>

        <Stack spacing="1rem">
            { members ?(
                members.map((chat) => {
                    return <UserItem user={chat} handler={selectMemeberHandler} isAdded={selectedMemebers.includes(chat._id)}/>
                }))  : (
                    <Typography>No friends</Typography>
                )
            }
        </Stack>
    <Stack flexDirection={"row"} alignitems={"center" } justifyContent={"space-evenly"}>
        <Button onClick={closeHandler} color={"error"}>Cancel</Button>
        <Button onClick={addMemberSubmitHandler} variant={'contained'} disabled={isLoadingMember}>Submit changes</Button>
    </Stack>
    </Stack>


   </Dialog>
  )
}

export default AddMemberDialogue
