import { AlternateEmail, CalendarMonth, Face } from '@mui/icons-material'
import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react';
import moment from 'moment';

const Profile = () => {
  return (
    <Stack spacing={"2rem"} direction="column" alignItems="center">
        <Avatar 
            sx={{
                width:"100px",
                height:"100px",
                objectFit :"contain",
                marginBottom:"1rem",
                border:"5px solid white"
            }}
        />
      <ProfileCard text={"bio"} heading={"my name is baba singh sandhu"}/>
      <ProfileCard text={"baba@gmail.com"} icon={<AlternateEmail/>} heading={"email"}/>
      <ProfileCard text={"baba sandhu"} icon={<Face/>} heading={"name"}/>
      <ProfileCard text={'3 months ago'} icon={<CalendarMonth/>} heading={"joined"}/>
    </Stack>
  )
}

const ProfileCard = ({text,icon,heading}) => (
    <Stack
     direction={"row"}
      alignItems={"center"}
      spacing={"1rem"}
      color={"white"}
      textAlign={"center"}
       >

    {
        icon && icon
    }

    <Stack>
        <Typography variant='body1'>{text}</Typography>
        <Typography color={"gray"} variant='caption'>{heading}</Typography>
    </Stack>


    </Stack>
)


export default Profile
