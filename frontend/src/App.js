import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {Register} from './pages/Registration/Registration';
import {Authentication, Logout} from './pages/Authentication/Authentication';
import {Home} from './pages/Home/Home';
import { FrontURLS } from './URL';


function App() {
  return (
    <>
    <header className="header">
      <a href={FrontURLS.LOGIN}>Login</a>
      <a href={FrontURLS.LOGOUT}>Logout</a>
      <a href={FrontURLS.REGISTER}>Register</a>
      <a href={FrontURLS.HOME}>Main</a>
    </header>
      <Routes>
        <Route path={FrontURLS.LOGIN} element={<Authentication />} />
        <Route path={FrontURLS.LOGOUT} element={<Logout />} />
        <Route path={FrontURLS.REGISTER} element={<Register />} />
        <Route path={FrontURLS.HOME} element={<Home/>}/>
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </>
  );
}


export default App;
