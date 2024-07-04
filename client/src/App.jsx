import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
import ProtectedRoutes from "./components/auth/protectedRote.jsx";
import Loaders from "./components/loaders/loaders.jsx";
const Home = lazy(() => import("./pages/home.jsx"));
// const Login = lazy(() => import('./pages/login.jsx'));
const Chat = lazy(() => import("./pages/chat.jsx"));
const Group = lazy(() => import("./pages/group.jsx"));

let user = true;

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
      <Route path="*" element={<h1>Error 404 not found</h1>}/>
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
