import { useFileHandler, useInputValidation } from "6pp";
import { CameraAlt } from "@mui/icons-material";
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
import axios from "axios";
axios.defaults.withCredentials = true;
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { server } from "../components/auth/config";
import { userExists, userNotExists } from "../redux/reducers/auth";
import { usernameValidator } from "../utils/usernameValidator";

function Login() {
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [isLoading,setIsLoading] = useState(false);

  const username = useInputValidation("", usernameValidator);
  const email = useInputValidation("");
  const bio = useInputValidation("");
  const password = useInputValidation("");
  const avatar = useFileHandler("single");

  const toggleLogin = () => setIsLoggingIn((prev) => !prev);
  const handleRegister = async (e) => {
    e.preventDefault();
    
    setIsLoading(true)

    const toastId = toast.loading('registering')

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", username.value);
    formData.append("email", email.value);
    formData.append("password", password.value);
    formData.append("bio", bio.value);

    try {

      axios.post(`${server}/users/reg`,formData,{withCredentials:true,headers:{"Content-Type":"multipart/form-data"}}).then((res)=> {
        console.log(res)
        setIsLoggingIn(true)
      }).catch((err) => console.log(err))

      toast.success('user created succesfully',{id:toastId})
      
      
    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(false)
    }
    
  };

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    const config = {
      withCredentials: true,
     
    };
    e.preventDefault();

    const toastId = toast.loading('logging in');

    setIsLoading(true)

    axios
      .post(`${server}/users/login`, {
        email: email.value,
        password: password.value,
      },config)
      .then((data) => {
        console.log(data?.data?.data)
        dispatch(userExists(data.data?.data));
        email.value = "";
        password.value = "";
        
      
        
      })
      .catch((err) => dispatch(userNotExists()))
      .finally(() => {
        setIsLoading(false)
      })
      ;
    toast.success('user logged in successfully',{id:toastId});
  };

  return (
    <div
      style={{
        background: "linear-gradient(rgb(225,225,209),rgb(255,159,158))",
      }}
    >
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
          {isLoggingIn ? (
            <>
              <Typography variant="h5">Login</Typography>
              <form style={{ width: "100%", marginTop: "1rem" }}>
                <TextField
                  required
                  fullWidth
                  label="email"
                  variant="outlined"
                  placeholder="enter email"
                  type="email"
                  sx={{ marginBottom: "0.5rem" }}
                  value={email.value}
                  onChange={email.changeHandler}
                />
                {username.error ? (
                  <Typography color="error" variant="caption">
                    {username.error}
                  </Typography>
                ) : null}
                <TextField
                  required
                  fullWidth
                  label="password"
                  type="password"
                  variant="outlined"
                  placeholder="enter password"
                  value={password.value}
                  onChange={password.changeHandler}
                />

                <Button
                  sx={{ marginTop: "1rem" }}
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                  onClick={handleLogin}
                  disabled={isLoading}
                >
                  Login
                </Button>

                <Typography textAlign={"center"} m="1rem">
                  or
                </Typography>

                <Button
                  sx={{ marginTop: "1rem" }}
                  variant="text"
                  fullWidth
                  onClick={toggleLogin}
                  disabled={isLoading}
                >
                  Register
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h5">Login</Typography>
              <form style={{ width: "100%", marginTop: "1rem" }}>
                <Stack
                  position={"relative"}
                  width="10rem"
                  margin="auto"
                  sx={{ marginBottom: "1rem" }}
                >
                  <Avatar
                    sx={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: "contain",
                    }}
                    src={avatar.preview}
                  />
                  {avatar.error ? (
                    <Typography color="error" variant="caption">
                      {avatar.error}
                    </Typography>
                  ) : null}
                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                    }}
                    component="label"
                  >
                    <CameraAlt />
                    <input
                      type="file"
                      style={{
                        border: 0,
                        clip: "rect(0 0 0 0)",
                        height: 1,
                        margin: -1,
                        overflow: "hidden",
                        padding: 0,
                        whiteSpace: "nowrap",
                        width: 1,
                      }}
                      onChange={avatar.changeHandler}
                    />
                  </IconButton>
                </Stack>

                <TextField
                  required
                  fullWidth
                  label="Username"
                  variant="outlined"
                  placeholder="enter useranme"
                  sx={{ marginBottom: "0.5rem" }}
                  value={username.value}
                  onChange={username.changeHandler}
                />
                {username.error ? (
                  <Typography color="error" variant="caption">
                    {username.error}
                  </Typography>
                ) : null}
                <TextField
                  required
                  fullWidth
                  label="email"
                  variant="outlined"
                  placeholder="enter email"
                  sx={{ marginBottom: "0.5rem" }}
                  value={email.value}
                  onChange={email.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="bio"
                  variant="outlined"
                  placeholder="enter bio"
                  sx={{ marginBottom: "0.5rem" }}
                  value={bio.value}
                  onChange={bio.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="password"
                  variant="outlined"
                  type="password"
                  placeholder="enter password"
                  value={password.value}
                  onChange={password.changeHandler}
                />
                <Button
                  sx={{ marginTop: "1rem" }}
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleRegister}
                  disabled={isLoading}
                >
                  Register
                </Button>

                <Typography textAlign={"center"} m="1rem">
                  or
                </Typography>

                <Button
                  sx={{ marginTop: "1rem" }}
                  variant="text"
                  fullWidth
                  onClick={toggleLogin}
                  disabled={isLoading}
                >
                  Login
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
}

export default Login;
