import { Close, ExitToApp, MenuBook, MenuRounded } from "@mui/icons-material";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Menu,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import adminTabs from "../shared/routes.jsx";
import { Link, Navigate } from "react-router-dom";

const SideBar = ({ w }) => {
    const logoutHandler = () => {}
  return (
    <Stack width={w} direction="column" p={"3rem"} spacing="2rem">
      <Typography variant="h5" textTransform={"uppercase"}>
        chat app
      </Typography>
      <Stack spacing={"1rem"}>
        {adminTabs.map((tab, idx) => {
          return (
            <Box key={idx}
              sx={{
                "&:hover": { bgcolor: "rgba(0,0,0,0.1)" },
                padding: "1rem 1rem",
                borderRadius: "1rem",
              }}
            >
              <Link
                style={{ color: "black", textDecoration: "none" }}
               
                to={tab.path}
              >
                <Stack direction="row" alignItems="center" spacing="1rem">
                  {tab.icon}
                  <Typography color={"black"}>{tab.name}</Typography>
                </Stack>
              </Link>
            </Box>
          );
        })}
      </Stack>
      <Link style={{color:'black',textDecoration:"none",marginLeft:"1rem"}} onClick={logoutHandler}>
        <Stack direction="row" alignItems="center" spacing="1rem">
          <ExitToApp />
          <Typography color={"black"}>Logout</Typography>
        </Stack>
      </Link>
    </Stack>
  );
};

const isAdmin = true;

const AdminLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  const handleMobile = () => {
    setIsMobile((prev) => !prev);
  };
  const handleClose = () => {
    setIsMobile(false);
  };

  if (!isAdmin) return <Navigate to={"/admin"}/>

  return (
    <Grid container minHeight={"100vh"}>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          top: "1rem",
          right: "1rem",
        }}
      >
        <IconButton onClick={handleMobile}>
          {isMobile ? <Close /> : <MenuRounded />}
        </IconButton>
      </Box>

      <Grid item md={4} lg={3} sx={{ display: { xs: "none", sm: "block" } }}>
        <SideBar />
      </Grid>
      <Grid item xs={12} md={8} lg={9} bgcolor="rgba(0,0,0,0.1)">
        {children}
      </Grid>

      <Drawer open={isMobile} onClose={handleClose}>
        <SideBar w={"55vw"} />
      </Drawer>
    </Grid>
  );
};

export default AdminLayout;
