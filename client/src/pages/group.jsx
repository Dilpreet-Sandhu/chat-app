import React, { lazy, memo, Suspense, useEffect, useState } from "react";
import {
  Grid,
  Tooltip,
  IconButton,
  Box,
  Drawer,
  Stack,
  Typography,
  TextField,
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { Add, Delete, Done, Edit, KeyboardBackspace, Menu } from "@mui/icons-material";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import chats from "../components/shared/sample.js";
import AvatarBox from "../components/shared/AvatarBox";
import UserItem from "../components/specific/UserItem.jsx";
import { useAddMemberMutation, useChatDetailsQuery, useDeleteGroupMutation, useMyChatsQuery, useMyGroupsQuery, useRemoveMemberMutation, useRenameGroupMutation } from "../redux/api/api.js";
import Loaders from "../components/loaders/loaders.jsx";
import useAsyncMutation from "../components/auth/hook.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setAddMember } from "../redux/reducers/misc.js";
const ConfirmDeleteDialog = lazy(() => import("../components/dialog/configrmDeleteDialog.jsx"));
const AddMemberDialogue = lazy(() => import("../components/dialog/addMemberDialogue.jsx"));


const isMember = false;


function Group() {
  const navigate = useNavigate();
  const chatId = useSearchParams()[0].get("group");
  const dispatch = useDispatch();

  const {isAddMember} = useSelector(state => state.misc);

  const myGroups = useMyGroupsQuery();

  const groupDetails = useChatDetailsQuery({chatId,populate:true},{skip : !chatId});

  const [loading,changeGroupName,data] = useAsyncMutation(useRenameGroupMutation);
  const [removeMemberLoading,removeMember,removeMemberData] = useAsyncMutation(useRemoveMemberMutation);
  const [addMemberLoading,addMember,addMemberData] = useAsyncMutation(useAddMemberMutation);
  const [deleteGroupLoading,deleteGroup] = useAsyncMutation(useDeleteGroupMutation);

  

  const navigateToHomepage = () => navigate("/");

  const [isMobileOpen, setIsMobileOpen] = useState();

  const [isEdit, setIsEdit] = useState(false);
  const [groupName,setGroupName] = useState("");
  const [groupNameUpdatedValue,setGroupNameUpdatedValue] = useState("");
  const [members,setMembers] = useState([]);
  const [confirmDeleteHandler,setConfirmDeleteHandler] = useState(false);


  useEffect(() => {
    if (groupDetails.data) {
      setGroupName(groupDetails?.data?.data?.name);
      setGroupNameUpdatedValue(groupDetails?.data?.data?.name)
      setMembers(groupDetails?.data?.data?.members);
    }

    return () => {
      setGroupName("")
      setGroupNameUpdatedValue("")
      setMembers([])
      setIsEdit(false)
    }
  },[groupDetails.data])

 
  
  const updateGroupName = () => {
    setIsEdit(false);
    changeGroupName("updating group name",{chatId,newName : groupNameUpdatedValue})
    console.log(data)
  }

  const handleMobile = () => {
    setIsMobileOpen((prev) => !prev);
  };

  const handleMobileClose = () => {
    setIsMobileOpen(false);
  };

  const deleteGroupHandler = () => {

    setConfirmDeleteHandler(true)
  }

  const closeDeleteHandler = () => {
    setConfirmDeleteHandler(false)
  }

  const addMemberHandler = () => {
    dispatch(setAddMember(true))
  }
  const handleDelete = () => {
    deleteGroup("deleting group",{id : chatId})
    closeDeleteHandler()
    navigate('/group')
  }
  const removeHandler = (id) => {
    removeMember("removing member",{chatId,userId : id})
  }

  // useEffect(() => {
  //   if (chatId){
  //     setGroupName(groupDetails?.data?.data?.name)
  //     setGroupNameUpdatedValue("")
  //   }

  //   return () => {
  //     setGroupName("")
  //     setIsEdit(false)
  //     setGroupNameUpdatedValue("")
  //   }
  // },[chatId]);




  const GroupName = <>
  <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      p={"1rem"}
    >
      {isEdit ? (
        <>
          <TextField  value={groupNameUpdatedValue} onChange={(e) => setGroupNameUpdatedValue(e.target.value)}/>
          <IconButton onClick={updateGroupName} disabled={loading}>
            <Done />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h5">{groupName}</Typography>
          <IconButton onClick={() => setIsEdit(true)}>
            <Edit />
          </IconButton>
        </>
      )}
    </Stack>
  </>;


  const ButtonGroup = <>
    <Stack
      direction={{
        xs :"column-reverse",
        sm:"row"
      }}

      spacing="1rem"
      p={{
        xs :"0",
        sm:"1rem",
        md :"1rem 4rem"
      }}
    >

      <Button size="large" color="error" variant="outlined" startIcon={<Delete/>} onClick={deleteGroupHandler}>Delete Group</Button>
      <Button size="large" variant="contained" startIcon={<Add/>} onClick={addMemberHandler}>Add Members</Button>

    </Stack>
  </>


  return myGroups.isLoading ? <Loaders/> : (
    <Grid container height={"100vh"}>
      <Grid
        sm={"4"}
        item
        sx={{ display: { xs: "none", sm: "block" ,background:"linear-gradient(rgb(255,255,209),rgb(249,159,159))"} }}
      >
        <GroupList myGroups={myGroups.data.data} chatId={chatId} />
      </Grid>
      <Grid
        item
        sm="8"
        xs="12"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        <>
          <Box
            sx={{
              display: {
                xs: "block",
                sm: "none",
              },
              position: "fixed",
              top: "2rem",
              right: "2rem",
            }}
          >
            <IconButton onClick={handleMobile}>
              <Menu bgcolor="#c1c1c1" />
            </IconButton>
          </Box>
          <Tooltip>
            <IconButton
              onClick={navigateToHomepage}
              sx={{
                position: "absolute",
                top: "2rem",
                left: "2rem",
                bgcolor: "#c1c1c1",
                color: "white",
                "&:hover": { bgcolor: "black" },
              }}
            >
              <KeyboardBackspace />
            </IconButton>
          </Tooltip>
        {GroupName && <>
            {GroupName}

            <Typography 
              margin={"2rem"}
              alignSelf="flex-start"
              variant="body1"
            >Members</Typography>

            <Stack
              maxWidth={"45rem"}
              width="100%"
              boxSizing={"border-box"}
              padding={{sm:"1rem",xs:"0",md :"1rem 4rem"}}
              spacing="2rem"
              height="50vh"
              overflow="auto"
             
            >
                 {  deleteGroupLoading ? <CircularProgress/> :(
                   members.map((chat,idx) => {
                    return <UserItem key={idx} handler={removeHandler} user={chat} isAdded styling={{
                      boxShadow:"0 0 0.5rem rgba(0,0,0,0.2)",
                      padding:"1rem 2rem",
                      borderRadius:"1rem"
                    }}/>
                   }))
                 }
            </Stack>

            {ButtonGroup}

        </>}
        </>
      </Grid>
      {
          isAddMember && <Suspense fallback={<Backdrop open/>}>
              <AddMemberDialogue chatId={chatId}/>
          </Suspense>
      }

      {
        confirmDeleteHandler && <Suspense fallback={<Backdrop open/>}>
          <ConfirmDeleteDialog open={confirmDeleteHandler} handleClose={closeDeleteHandler} deleteHandler={handleDelete}/>
        </Suspense>
      }

      <Drawer
        sx={{ display: { xs: "block", sm: "none" } }}
        open={isMobileOpen}
        onClose={handleMobileClose}
      >
        <GroupList myGroups={chats} w="50vw" chatId={chatId} />
      </Drawer>
    </Grid>
  );
}

function GroupList({ myGroups, chatId, w = "100%" }) {
  return (
    <Stack sx={{background:"linear-gradient(rgb(255,255,209),rgb(249,159,159))",height:"100%"}}>
      {myGroups.length > 0 ? (
        myGroups.map((grp, idx) => {
          return <GroupItem key={idx} group={grp} chatId={grp._id} />;
        })
      ) : (
        <Typography sx={{ alignSelf: "center", padding: "1rem" }}>
          no groups
        </Typography>
      )}
    </Stack>
  );
}

const GroupItem = ({ group, chatId }) => {
  const { name, avatar, _id } = group;
  return (
    <Link
      to={`?group=${chatId}`}
      onClick={(e) => chatId === _id ?? e.preventDefault()}
      style={{ textDecoration: "none" }}
      color="black"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "1rem",
          borderBottom: "1px solid #f0f0f0",
          gap: "1rem",
          position: "relative",
          "&:hover": {
            bgcolor: "rgba(0,0,0,0.1)",
          },
        }}
      >
        <Stack>
          <AvatarBox avatar={avatar} />
          <Typography sx={{ marginLeft: "3rem" }} color={"black"}>
            {name}
          </Typography>
        </Stack>
      </Box>
    </Link>
  );
};
export default Group;
