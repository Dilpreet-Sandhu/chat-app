import { Dialog, DialogTitle, InputAdornment, List, ListItem, ListItemText, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react';
import {useInputValidation} from '6pp'
import { Search } from '@mui/icons-material';
import UserItem from './UserItem';
import chats from '../shared/sample';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSearch } from '../../redux/reducers/misc';
import { useLazySearchUsersQuery } from '../../redux/api/api';

function SearchDialogue() {

  const {isSearch} = useSelector(state => state.misc);
  const dispatch = useDispatch();

  const search = useInputValidation('');
  const [users,setUsers] = useState(chats);
  const [searchUser] = useLazySearchUsersQuery();

  const addFriendHandler = () => console.log('add friend');

  const closeHandler = () => dispatch(setIsSearch(false))


  useEffect(() => {
    const timeOutId = setTimeout(() => {

        searchUser(search.value).then(({data}) => setUsers(data.data)).catch((err) => console.log(err));
        

    }, 1000);


    return () => {
      clearTimeout(timeOutId )
    }

  },[search.value])

  let addFriendHandlerLoading = false;

  return (
    <Dialog open={isSearch} onClose={closeHandler}>
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
