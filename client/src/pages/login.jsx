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
import { usernameValidator } from "../utils/usernameValidator";

function Login() {
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  const username = useInputValidation("", usernameValidator);
  const email = useInputValidation("");
  const bio = useInputValidation("");
  const password = useInputValidation("");
  const avatar = useFileHandler("single");

  const toggleLogin = () => setIsLoggingIn((prev) => !prev);

  const handleRegister = (e) => {
    e.preventDefault()
  }

  const handleLogin = (e) => {
    e.preventDefault()
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
          {isLoggingIn ? (
            <>
              <Typography variant="h5">Login</Typography>
              <form onSubmit={handleLogin} style={{ width: "100%", marginTop: "1rem" }}>
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
                >
                  Register
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h5">Login</Typography>
              <form onSubmit={handleRegister} style={{ width: "100%", marginTop: "1rem" }}>
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
