import React from 'react';
import { useState } from 'react';

// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserRouter ,RouterProvider } from 'react-router-dom';
import './App.css';

// import all components
import Username from './components/user/Username';
import Password from './components/user/Password';
import Profile from './components/user/Profile';
import Recovery from './components/user/Recovery';
import Register from './components/user/Register';
import Reset from './components/user/Reset';
import PageNotFound from './components/PageNotFound';
import GoldCalculator from './components/calculator/GoldCalculator';
import Header from './components/Header';
import Contact from './components/contact';
import About from './components/about';
import Home from './components/homePage';
import Footer from './components/Footer';

/** auth middleware */
import { AuthorizeUser,ProtectRoute } from './middleware/auth';

// root routers
const router = createBrowserRouter([
  {
    path:'/login',
    element:<Username></Username>
  },
  {
    path:'/register',
    element:<Register></Register>
  },
  {
    path:'/profile',
    element: <AuthorizeUser><Profile/></AuthorizeUser>
  },
  {
    path:'/password',
    element: <ProtectRoute><Password/></ProtectRoute> 
  },
  {
    path:'/recovery',
    element:<Recovery></Recovery>
  },
  {
    path:'/reset',
    element:<Reset></Reset>
  },
  {
    path:'*',
    element:<PageNotFound></PageNotFound>
  },
  {
    path:'/calculator',
    element:<AuthorizeUser><GoldCalculator/></AuthorizeUser>
  },
  {
    path:'/contact',
    element:<Contact/>
  },
  {
    path:'/about',
    element:<About/>
  },
  {
    path:'/',
    element:<Home/>
  }
])

function App() {

  
  return (
    
    <main >
    <Header />
    <RouterProvider router={router}></RouterProvider>
    <Footer/>
   
     
    </main>
  );
}

export default App;




