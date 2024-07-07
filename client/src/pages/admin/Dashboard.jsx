import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import {
  AdminPanelSettings,
  Chat,
  Group,
  GroupOutlined,
  Message,
  NotificationAdd,
  NotificationAddOutlined,
  Notifications,
  Person,
} from "@mui/icons-material";
import moment from "moment";
import { LineChart } from "../../components/specific/chart";

const Dashboard = () => {
  const appBar = (
    <>
      <Paper
        elevation={"3"}
        sx={{ margin: "2rem 0", borderRadius: "1rem", padding: "2rem" }}
      >
        <Stack direction="row" alignItems="center" spacing="1rem">
          <AdminPanelSettings sx={{ fontSize: "3rem" }} />
          <input
            placeholder=""
            style={{
              padding: "1rem 2rem",
              width: "20vmax",
              border: "none",
              outline: "none",
              borderRadius: "1.5rem",
              background: "#f1f1f1",
              fontSize: "1.1rem",
            }}
          />
          <button
            style={{
              borderRadius: "1.5rem",
              padding: "1rem 2rem",
              border: "none",
              outline: "none",
              cursor: "pointer",
              backgroundColor: "black",
              color: "white",
              fontSize: "1.1rem",
            }}
          >
            Search
          </button>
          <Box flexGrow={1} />
          <Typography
            sx={{
              display: {
                xs: "none",
                lg: "block",
              },
            }}
          >
            {moment().format("MMMM Do YYYY")}
          </Typography>
          <Notifications />
        </Stack>
      </Paper>
    </>
  );

  const widgets = <>
  <Stack direction={{xs:"column",sm:"row"}}
    spacing="2rem"
    justifyContent={'space-between'}
    alignItems={"center"}
    margin="2rem 0"
  >
    <Widget title={'users'} value={34} icon={<Person/>} />
    <Widget title={'chats'} value={3} icon={<GroupOutlined/>} />
    <Widget title={'Messages'} value={453} icon={<Message/>} />
  </Stack>
  </>;

  return (
    <AdminLayout>
      <Container component={"main"}>
        {appBar}
        <Stack direction={"row"} spacing="1rem" flexWrap="wrap">
          <Paper
            elevation={3}
            sx={{
              padding: "2rem 3.5rem",
              borderRadius: "2rem",
              width: "100%",
              maxWidth: "45rem",
              height:"25rem"
            }}
          >
            dsas;lfkadfsdkflja
            <LineChart/>
          </Paper>

          <Paper
          sx={{
            padding:'1rem',
            borderRadius:"1rem",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            width:{xs:"100%",sm:"50%"},
            position:"relative",
            maxWidth:"25rem",
            height:"25rem"
          }}
          >
            adsf
            <Stack sx={{
              position:"absolute",
              justifyContent:"center",
              alignItems:"center",
              flexDirection:"row",
              spacing:"0.5rem",
              width:"100%",
              height:"100%",
              position:'absolute',
             
            }}>
              <Group/> <Typography>Vs</Typography>
              <Person/>
               </Stack>
          </Paper>
        </Stack>
        {widgets}
      </Container>
    </AdminLayout>
  );
};

const Widget = ({title,value,icon}) => {
  return (
    <Paper elevation={3} sx={{
      padding:"2rem",
      margin:"2rem 0",
      borderRadius:"1rem",
      width:'20rem'

    }}>
      <Stack alignItems={"center"} spacing="1rem">
        <Typography sx={{
          color:"rgba(0,0,0,0.7)",
          borderRadius:"50%",
          border:"5px solid rgba(0,0,0,0.9)",
          width:"5rem",
          height:"5rem",
          display:"flex",
          alignItems:"center",
          justifyContent:"center "
        }}>{value}</Typography>
        <Stack>
          {icon}
          <Typography>{title}</Typography>
        </Stack>
      </Stack>
    </Paper>
  )
}

export default Dashboard;
