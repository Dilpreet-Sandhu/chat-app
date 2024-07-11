import { AlternateEmail, CalendarMonth, Face, SportsTennis } from '@mui/icons-material'
import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';

const Profile = () => {
  const {user} = useSelector(state => state.auth);
  const joinedDate = moment(user.createdAt).fromNow();
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
      <ProfileCard text={user.bio} heading={"bio"}/>
      <ProfileCard text={user.email} icon={<AlternateEmail/>} heading={"email"}/>
      <ProfileCard text={user.name} icon={<Face/>} heading={"name"}/>
      <ProfileCard text={joinedDate} icon={<CalendarMonth/>} heading={"joined"}/>
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
