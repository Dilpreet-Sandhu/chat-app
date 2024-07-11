import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
import ProtectedRoutes from "./components/auth/protectedRote.jsx";
import Loaders from "./components/loaders/loaders.jsx";
import {server} from './components/auth/config.js';
import axios from 'axios';
import {useDispatch,useSelector} from 'react-redux';
import {userNotExists,userExists} from './redux/reducers/auth.js';
import {Toaster} from 'react-hot-toast';
import Cookies from 'js-cookie';
// import {CookiesProvider,Cookies} from 'react-cookie'

const Home = lazy(() => import("./pages/home.jsx"));
// const Login = lazy(() => import('./pages/login.jsx'));
const Chat = lazy(() => import("./pages/chat.jsx"));
const Group = lazy(() => import("./pages/group.jsx"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard.jsx"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin.jsx"));
const ChatManagement = lazy(() => import('./pages/admin/ChatManagement.jsx'))
const UserMangement = lazy(() => import('./pages/admin/UserMangement.jsx'))
const MessageManagement = lazy(() => import('./pages/admin/MessageManagement.jsx'))



function App() {
  
const {user} = useSelector(state => state.auth);

  
  const dispatch = useDispatch();


   useEffect(() => {
     axios
     .get(`${server}/users/getmyprofile`,{withCredentials:true})
     .then((data) => {
       dispatch(userExists(data.data.data))
     })
     .catch((err) => dispatch(userNotExists()));

   },[dispatch])
    
  


  
 



  return (
    <BrowserRouter>
      <Suspense fallback={<Loaders/>}>
      <Routes>
        <Route element={<ProtectedRoutes user={user}/>}>
        <Route path="/" element={<Home />} />
        <Route path="/chat/:chatId" element={<Chat />} />
        <Route path="/group" element={<Group />} />
        </Route>
        <Route path="/login" element={<ProtectedRoutes redirect="/" user={!user}>
          <Login />
        </ProtectedRoutes>} />

        <Route path="/admin" element={<AdminLogin/>}/>
        <Route path="/admin/dashboard" element={<Dashboard/>}/>
        <Route path="/admin/user-managment" element={<UserMangement/>}/>
        <Route path="/admin/chat-management" element={<ChatManagement/>}/>
        <Route path="/admin/message-management" element={<MessageManagement/>}/>

      <Route path="*" element={<h1>Error 404 not found</h1>}/>
      </Routes>
      </Suspense>
      <Toaster position="top-center"/>
    </BrowserRouter>
  );
}

export default App;
