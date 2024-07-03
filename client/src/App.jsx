import React, { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
import ProtectedRoutes from "./components/auth/protectedRote.jsx";
const Home = lazy(() => import("./pages/home.jsx"));
// const Login = lazy(() => import('./pages/login.jsx'));
const Chat = lazy(() => import("./pages/chat.jsx"));
const Group = lazy(() => import("./pages/group.jsx"));

let user = true;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes user={user}/>}>
        <Route path="/" element={<Home />} />
        <Route path="/chat/:chatId" element={<Chat />} />
        <Route path="/group" element={<Group />} />
        </Route>
        <Route path="/login" element={<ProtectedRoutes redirect="/" user={!user}>
          <Login />
        </ProtectedRoutes>} />
      <Route path="*" element={<h1>Error 404 not found</h1>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
