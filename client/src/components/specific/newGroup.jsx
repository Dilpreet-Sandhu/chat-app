import React, { useState,useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  Stack,
  Typography,
  ListItem,
  Avatar,
  Button,
  TextField,
  Skeleton,
} from "@mui/material";
import chats from "../shared/sample.js";
import UserItem from "./UserItem";
import { useInputValidation } from "6pp";
import { useAvailableFriendsQuery, useLazySearchUsersQuery, useNewGroupMutation } from "../../redux/api/api.js";
import { useDispatch, useSelector } from "react-redux";
import { setNewGroup } from "../../redux/reducers/misc.js";
import { useSearchParams } from "react-router-dom";
import toast from 'react-hot-toast';
import useAsyncMutation from '../auth/hook.jsx'


const NewGroupDialogue = () => {
  const [searchUser] = useLazySearchUsersQuery();
  
  const [members, setMembers] = useState([]);
  const [selectedMemebers, setSelectedMembers] = useState([]);
  const {isNewGroup} = useSelector(state => state.misc);
  const dispatch = useDispatch();
  const [loading,createNewGroup] = useAsyncMutation(useNewGroupMutation);

  const availableFriends = useAvailableFriendsQuery();

  const groupName = useInputValidation("");

  const handleSubmit = () => {
    if (!groupName.value) {
     return toast.error('group name value cannot be empty')
      
    }
    else if (selectedMemebers.length < 1) {
      return toast.error('group should contain at least 2 members')
       
    }
     
    createNewGroup("creating new Group ",{name : groupName.value,members : selectedMemebers})

      handleCloseGroupBox()
  };
  const selectMemeberHandler = (id) => {
    
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };
  useEffect(() => {
        searchUser("").then(({data}) => setMembers(data.data)).catch((err) => console.log(err));

  },[]);

  const handleCloseGroupBox = () => {
      return dispatch(setNewGroup(false))
  }

 




  return (
    <Dialog open={isNewGroup} onClose={handleCloseGroupBox}>
      <Stack spacing={"2rem"} p={{ xs: "1rem", sm: "2rem" }} width={"25rem"}>
        <DialogTitle variant="h4">New Group</DialogTitle>

        <TextField value={groupName.value} onChange={groupName.changeHandler} />

        <Typography sx={{ marginBottom: "1rem" }}>Members</Typography>

        {availableFriends.isLoading ? <Skeleton/>  : availableFriends?.data?.data.map((user) => {
          return (
            <UserItem
              user={user}
              handler={selectMemeberHandler}
              isAdded={selectedMemebers.includes(user._id) ? true : false}
            />
          );
        })}

        <Stack
          direction={"row"}
          justifyContent={"space-around"}
          sx={{ marginTop: "1rem" }}
        >
          <Button variant="text" color="error" onClick={handleCloseGroupBox}>
            cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit} disabled={loading}>
            create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroupDialogue;
