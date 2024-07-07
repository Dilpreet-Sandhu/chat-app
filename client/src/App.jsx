import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
import ProtectedRoutes from "./components/auth/protectedRote.jsx";
import Loaders from "./components/loaders/loaders.jsx";
const Home = lazy(() => import("./pages/home.jsx"));
// const Login = lazy(() => import('./pages/login.jsx'));
const Chat = lazy(() => import("./pages/chat.jsx"));
const Group = lazy(() => import("./pages/group.jsx"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard.jsx"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin.jsx"));
const ChatManagement = lazy(() => import('./pages/admin/ChatManagement.jsx'))
const UserMangement = lazy(() => import('./pages/admin/UserMangement.jsx'))
const MessageManagement = lazy(() => import('./pages/admin/MessageManagement.jsx'))

let user = false;

function App() {
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
    </BrowserRouter>
  );
}

export default App;
