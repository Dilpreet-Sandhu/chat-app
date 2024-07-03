import React,{lazy} from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
const Home = lazy(() => import('./pages/home.jsx'));
const Login = lazy(() => import('./pages/login.jsx'));


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
