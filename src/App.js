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

// root routers
const router = createBrowserRouter([
  {
    path:'/',
    element:<Username></Username>
  },
  {
    path:'/register',
    element:<Register></Register>
  },
  {
    path:'/profile',
    element:<Profile></Profile>
  },
  {
    path:'/password',
    element:<Password></Password>
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
    element:<GoldCalculator/>
  }
])

function App() {

  
  return (
    
    <main >
    <Header />
    <RouterProvider router={router}></RouterProvider>
   
     
    </main>
  );
}

export default App;


// import About from './About';
// import Contact from './Contact';

// function App() {
//   return (
//     <Router>
      
//       <Switch>
//         <Route path="/about" component={About} />
//         <Route path="/contact" component={Contact} />
//       </Switch>
//     </Router>
//   );
// }


