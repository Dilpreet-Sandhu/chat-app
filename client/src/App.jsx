import axios from "axios";
import React, { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { server } from "./components/auth/config.js";
import ProtectedRoutes from "./components/auth/protectedRote.jsx";
import Loaders from "./components/loaders/loaders.jsx";
import Login from "./pages/login.jsx";
import { userExists, userNotExists } from "./redux/reducers/auth.js";
import { getSocket, SocketProvider } from "./socket.jsx";
// import {CookiesProvider,Cookies} from 'react-cookie'

const Home = lazy(() => import("./pages/home.jsx"));
// const Login = lazy(() => import('./pages/login.jsx'));
const Chat = lazy(() => import("./pages/chat.jsx"));
const Group = lazy(() => import("./pages/group.jsx"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard.jsx"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin.jsx"));
const ChatManagement = lazy(() => import("./pages/admin/ChatManagement.jsx"));
const UserMangement = lazy(() => import("./pages/admin/UserMangement.jsx"));
const MessageManagement = lazy(() =>
  import("./pages/admin/MessageManagement.jsx")
);

function App() {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const socket = getSocket();

  useEffect(() => {
    axios
      .get(`${server}/users/getmyprofile`, { withCredentials: true })
      .then((data) => {
        dispatch(userExists(data.data.data));
      })
      .catch((err) => dispatch(userNotExists()));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loaders />}>
        <Routes>
          <Route
            element={
              <SocketProvider>
                <ProtectedRoutes user={user} />
              </SocketProvider>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/group" element={<Group />} />
          </Route>
          <Route
            path="/login"
            element={
              <ProtectedRoutes redirect="/" user={!user}>
                <Login />
              </ProtectedRoutes>
            }
          />

          {/* <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/user-managment" element={<UserMangement />} />
          <Route path="/admin/chat-management" element={<ChatManagement />} />
          <Route
            path="/admin/message-management"
            element={<MessageManagement />}
          /> */}

          <Route
            path="*"
            element={
              <h1
                style={{
                  width: "100%",
                  height: "100vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Error 404 not found
              </h1>
            }
          />
        </Routes>
      </Suspense>
      <Toaster position="top-center" />
    </BrowserRouter>
  );
}

export default App;
