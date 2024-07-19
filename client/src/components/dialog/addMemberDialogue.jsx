import { Dialog, DialogTitle, Stack, Typography,Button, Skeleton } from '@mui/material';

import React,{useState} from 'react';
import chats from '../shared/sample';
import UserItem from '../specific/UserItem';
import useAsyncMutation from '../auth/hook';
import { useAddMemberMutation, useAvailableFriendsQuery } from '../../redux/api/api';
import { useDispatch, useSelector } from 'react-redux';
import { setAddMember } from '../../redux/reducers/misc';
import { useAsyncValue } from 'react-router-dom';

const AddMemberDialogue = ({chatId}) => {

    const {isAddMember} = useSelector(state => state.misc);
    const dispatch = useDispatch()
    const [members, setMembers] = useState(chats);
    const [selectedMemebers, setSelectedMembers] = useState([]);
    const [addMemberLoading,addMember,addMemberData] = useAsyncMutation(useAddMemberMutation);

    const {data,isError,isLoading,error} = useAvailableFriendsQuery(chatId);

    const selectMemeberHandler = (id) => {
    
        setSelectedMembers((prev) =>
          prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
      };

    const addFriendHandler = () => {
        addMember("adding to group",{id,chatId})
    }

    const closeHandler = () => {
        setSelectedMembers([]);
        dispatch(setAddMember(false))
    }
    
    const addMemberSubmitHandler = () => {
        addMember("adding member",{chatId,members : selectedMemebers})
        closeHandler()
    }

   
  return (
   <Dialog open={isAddMember} onClose={closeHandler}>

    <Stack p={"2rem"} width="20rem" spacing="2rem">
        <DialogTitle textAlign={"center"}>Add member</DialogTitle>

        <Stack spacing="1rem">
            {isLoading ? <Skeleton/> : (
                data?.data.length > 0 ? (
                    data?.data.map((chat) => {
                        return <UserItem user={chat} handler={selectMemeberHandler} isAdded={selectedMemebers.includes(chat._id)}/>
                    })
                ) : (
                    <Typography>No friends</Typography>
                )
            )
            }
        </Stack>
    <Stack flexDirection={"row"} alignitems={"center" } justifyContent={"space-evenly"}>
        <Button onClick={closeHandler} color={"error"}>Cancel</Button>
        <Button onClick={addMemberSubmitHandler} variant={'contained'} disabled={addMemberLoading}>Submit changes</Button>
    </Stack>
    </Stack>


   </Dialog>
  )
}

export default AddMemberDialogue
