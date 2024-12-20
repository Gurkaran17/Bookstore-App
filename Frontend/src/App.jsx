import React from 'react'
import Home from './home/Home'
import {Navigate, Route, Routes} from "react-router-dom"
import Courses from "./courses/courses";
import Signup from './components/Signup';
import Contactus from './components/Contactus';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthProvider';
import Abouts from './Abouts/Abouts';

function App() {
  const [authUser, setAuthUser] = useAuth();
console.log(authUser);
  return (
    <>
   <div>
   <Routes className = "dark:bg-slate-900 dark:text-white">
    <Route path="/" element ={<Home/>}/>
    <Route path="/course" element ={authUser?<Courses/>:<Navigate to ="/signup"/>}/>
    <Route path="/signup" element ={<Signup/>}/>
    <Route path="/contactus" element ={<Contactus/>}/>
    <Route path="/about" element ={<Abouts/>}/>
   </Routes>
   <Toaster />
   </div>

    </>
  )
}

export default App


