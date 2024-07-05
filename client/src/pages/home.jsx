import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import { Typography,Box } from '@mui/material';


function Home() {
  return (
    <Box sx={{background : "gray",height: '100%'}}>

      <Typography p={"2rem"} variant='h5' textAlign={"center"}>select a friend to chat</Typography>
    </Box>
  )
}

export default AppLayout()(Home)
