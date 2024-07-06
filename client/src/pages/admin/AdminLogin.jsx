import {
    Avatar,
    Button,
    Container,
    IconButton,
    Paper,
    Stack,
    TextField,
    Typography,
  } from "@mui/material";
  import React, { useState } from "react";
  import { CameraAlt } from "@mui/icons-material";
  import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import { Navigate } from "react-router-dom";

const isAdmin = true;

const AdminLogin = () => {


    const sumbitHandler = (e) => {
        e.preventDefault();
        console.log('submited')
    }

    const adminKey = useInputValidation("");

    if (isAdmin) {
        return <Navigate to={"/admin/dashboard"}/>
    }


  return (
    <div style={{background : "linear-gradient(rgb(225,225,209),rgb(255,159,158))"}}>
    <Container
      component={"main"}
      maxWidth="xs"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >

          <>
            <Typography variant="h5">Admin login</Typography>
            <form onSubmit={sumbitHandler} style={{ width: "100%", marginTop: "1rem" }}>
              <TextField
                required
                fullWidth
                label="admin Key"
                variant="outlined"
                type="password"
                placeholder="enter useranme"
                sx={{ marginBottom: "0.5rem" }}
                value={adminKey.value}
                onChange={adminKey.changeHandler}
              />
              
             
              
              <Button
                sx={{ marginTop: "1rem" }}
                variant="contained"
                color="primary"
                fullWidth
              >
                Login
              </Button>

              
            </form>
          </>
         
      </Paper>
    </Container>
  </div>
  )
}

export default AdminLogin
