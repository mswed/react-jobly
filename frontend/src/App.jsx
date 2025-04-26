import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './Homepage';
import Companies from './Companies';
import Company from './Company';
import Jobs from './Jobs';
import NavBar from './NavBar';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
      <Routes>
        <Route path="/companies" element={<Companies />} />
      </Routes>
      <Routes>
        <Route path="/companies/:name" element={<Company />} />
      </Routes>
      <Routes>
        <Route path="/jobs" element={<Jobs />} />
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Routes>
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Routes>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
