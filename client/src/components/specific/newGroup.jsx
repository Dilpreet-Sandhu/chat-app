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
} from "@mui/material";
import chats from "../shared/sample.js";
import UserItem from "./UserItem";
import { useInputValidation } from "6pp";
import { useLazySearchUsersQuery } from "../../redux/api/api.js";
import { useDispatch, useSelector } from "react-redux";
import { setNewGroup } from "../../redux/reducers/misc.js";


const NewGroupDialogue = () => {
  const [searchUser] = useLazySearchUsersQuery();
  const [members, setMembers] = useState([]);
  const [selectedMemebers, setSelectedMembers] = useState([]);
  const {isNewGroup} = useSelector(state => state.misc);
  const dispatch = useDispatch()

  const groupName = useInputValidation("");

  const handleSubmit = () => {
      
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

        {members.map((user) => {
          return (
            <UserItem
              user={user}
              handler={selectMemeberHandler}
              isAdded={selectedMemebers.includes(chats._id)? true : false}
            />
          );
        })}

        <Stack
          direction={"row"}
          justifyContent={"space-around"}
          sx={{ marginTop: "1rem" }}
        >
          <Button variant="text" color="error">
            cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroupDialogue;
