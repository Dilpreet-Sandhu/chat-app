import {
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Add,
  Group,
  Logout,
  Menu,
  Search,
  Notifications,
} from "@mui/icons-material";
import React, { Suspense, lazy, useState } from "react";
import { useNavigate } from "react-router-dom";
const SearchDialogue = lazy(() => import('../specific/search'));
const NotificationDialogue = lazy(() => import('../specific/notification'));
const NewGroupDialogue = lazy(() => import('../specific/newGroup'));

function Header() {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  const handleMobile = () => {
    setIsMobile((prev) => !prev);
  };
  const openSearchDialogue = () => {
    setIsSearch((prev) => !prev);
  };
  const openNewGroup = () => {
    setIsNewGroup((prev) => !prev);
  };
  const openNotification = () => {
    setIsNotification((prev) => !prev);
  };
  const manageGroups = () => navigate("/group");

  const handleLogout = () => {};

  return (
    <>
      <Box sx={{ flexGrow: "1" }} bgcolor={"#ea7070"} height={"4rem"}>
        <AppBar position="static"></AppBar>
        <Toolbar>
          <Typography
            variant="h6"
            color={"white"}
            sx={{ display: { xs: "none", sm: "block" } ,cursor:"pointer"}} 

          >
            Chat app
          </Typography>
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <IconButton
              sx={{ position: "absolute", top: "5px", left: "5px" }}
              onClick={handleMobile}
            >
              <Menu htmlColor="white" />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: "1" }} />
          <Box sx={{}}>
            <IconBtn
              title="search"
              handleClick={openSearchDialogue}
              icon={<Search htmlColor="white" />}
            />
            <IconBtn
              title="New group"
              handleClick={openNewGroup}
              icon={<Add htmlColor="white" />}
            />
            <IconBtn
              title="Mange Groups"
              handleClick={manageGroups}
              icon={<Group htmlColor="white" />}
            />
            <IconBtn
              title="Notification"
              handleClick={openNotification}
              icon={<Notifications htmlColor="white" />}
            />
            <IconBtn
              title="logout"
              handleClick={handleLogout}
              icon={<Logout sx={{ marginLeft: "10px" }} htmlColor="white" />}
            />
          </Box>
        </Toolbar>
      </Box>
      {
        isSearch && (
          <Suspense fallback={<Backdrop open/>}>
            <SearchDialogue/>
          </Suspense>
        )
      }
      {
        isNotification && (
          <Suspense fallback={<Backdrop open/>}>
            <NotificationDialogue/>
          </Suspense>
        )
      }
      {
        isNewGroup && (
          <Suspense fallback={<Backdrop open/>}>
            <NewGroupDialogue/>
          </Suspense>
        )
      }
    </>
  );
}

const IconBtn = ({ title, handleClick, icon }) => {
  return (
    <Tooltip title={title}>
      <IconButton onClick={handleClick}>{icon}</IconButton>
    </Tooltip>
  );
};

export default Header;
