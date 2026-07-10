import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import { Toaster } from './ui/toaster';
import ChatWidget from './ChatWidget'; // <-- Import it here!

const Layout = () => {
  return (
    <>
      <Toaster/>
      <ScrollToTop/>
      <Navbar/>
      
      <Outlet/>
      
      <Footer/>
      
      {/* Add the ChatWidget so it sits on top of every page */}
      <ChatWidget /> 
    </>
  );
}

export default Layout;