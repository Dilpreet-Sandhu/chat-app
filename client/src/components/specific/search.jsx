import { Dialog, DialogTitle, InputAdornment, List, ListItem, ListItemText, Stack, TextField } from '@mui/material'
import React from 'react';
import {useInputValidation} from '6pp'
import { Search } from '@mui/icons-material';

function SearchDialogue() {

  const search = useInputValidation('');
  const users = [1,352,6,7,1];

  return (
    <Dialog open>
      <Stack p={"2rem"} direction={"column"} alignItems={"center"} width={"25rem"}>
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

        <List>
          {
            users.map((user) => {
              return <ListItem>
                <ListItemText/>
              </ListItem>
            })
          }
        </List>



      </Stack>
    </Dialog>
  )
}

export default SearchDialogue
