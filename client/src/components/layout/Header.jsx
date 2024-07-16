import {
  AppBar,
  Backdrop,
  Badge,
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
import axios from "axios";
axios.defaults.withCredentials = true;
import React, { Suspense, lazy, useState } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "../auth/config";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth";
import { setIsMobile, setIsNotification, setIsSearch, setNewGroup } from "../../redux/reducers/misc";


const SearchDialogue = lazy(() => import("../specific/search"));
const NotificationDialogue = lazy(() => import("../specific/notification"));
const NewGroupDialogue = lazy(() => import("../specific/newGroup"));

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {isSearch,isNewGroup,isNotification} = useSelector(state => state.misc);
  const {notificationCount} = useSelector(state => state.chat);
  

  // const [isNotification, setIsNotification] = useState(false);

  const handleMobile = () => {
    dispatch(setIsMobile(true));
  };
  const openSearchDialogue = () => {
    dispatch(setIsSearch(true))
  };
  const openNewGroup = () => {
    dispatch(setNewGroup(true))
  };
  const openNotification = () => {
    dispatch(setIsNotification(true))
  };
  const manageGroups = () => navigate("/group");

  const handleLogout = () => {
    axios
      .get(`${server}/users/logout`, { withCredentials: true })
      .then((res) => {
        dispatch(userNotExists());
        navigate('/login')
      })
      .catch((err) => toast.error('couldn"t log out the user'));

    toast.success("user logged out sucessfully");
  };

  return (
    <>
      <Box sx={{ flexGrow: "1" }} bgcolor={"#ea7070"} height={"4rem"}>
        <AppBar position="static"></AppBar>
        <Toolbar>
          <Typography
            variant="h6"
            color={"white"}
            sx={{ display: { xs: "none", sm: "block" }, cursor: "pointer" }}
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
            <IconBtn value={notificationCount}
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
      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialogue />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <NotificationDialogue />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialogue />
        </Suspense>
      )}
    </>
  );
}

const IconBtn = ({ title, handleClick, icon, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton onClick={handleClick}>
        {
          value ? <Badge color={'error'} badgeContent={value}>{icon}</Badge> : icon
        }
      </IconButton>
    </Tooltip>
  );
};

export default Header;
