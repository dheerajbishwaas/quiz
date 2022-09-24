import React from 'react'
import {BrowserRouter,Routes,Route } from 'react-router-dom';
import AddQuestion from './components/AddQuestion';
import Client from './pages/Client';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Test from './pages/Test';

export default function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/' element={<Client/>}></Route>
      <Route path='/admin' element={<Login/>}></Route>
      <Route path='/test' element={<Test/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/admin' element={<Login/>}></Route>
      <Route path='/add' element={<AddQuestion/>}></Route>

    </Routes>
   </BrowserRouter>
  )
}
