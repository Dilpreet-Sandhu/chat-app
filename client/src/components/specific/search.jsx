import { Dialog, DialogTitle, InputAdornment, List, ListItem, ListItemText, Stack, TextField } from '@mui/material'
import React, { useState } from 'react';
import {useInputValidation} from '6pp'
import { Search } from '@mui/icons-material';
import UserItem from './UserItem';
import chats from '../shared/sample';

function SearchDialogue() {

  const search = useInputValidation('');
  const [users,setUsers] = useState(chats)

  const addFriendHandler = () => console.log('add friend')
  let addFriendHandlerLoading = false;

  return (
    <Dialog open>
      <Stack p={"5px"} direction={"column"} alignItems={"center"} width={"25rem"}>
      <DialogTitle textAlign={"center"}>Find people</DialogTitle>
      <TextField
       value={search.value} 
       onChange={search.changeHandler} 
       label="search"
       variant='outlined'
       size='small'
       InputProps={{
        startAdornment : (
          <InputAdornment position='start'>
            <Search/>
          </InputAdornment>
        )
       }}
       />

        <List sx={{width:'80%'}}>
          {
            users.map((user) => {
              return <UserItem user={user} handler={addFriendHandler} handlerIsLoading={addFriendHandlerLoading}/>
            })
          }
        </List>



      </Stack>
    </Dialog>
  )
}

export default SearchDialogue
