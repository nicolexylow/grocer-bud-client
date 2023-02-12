import React, { useState, useEffect } from'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { AuthProvider } from '../contexts/AuthContext';
import Home from './home/Home';
import Categories from './categories/Categories';
import GroceryList from './groceryList/GroceryList';
import Signup from './pages/Signup'
import { Login } from './pages/Login'
import About from './pages/About'

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/categories' element={<Categories />} />
          <Route exact path='/grocery-list' element={<GroceryList />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/login' element={<Login />} />
        </Routes>
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
