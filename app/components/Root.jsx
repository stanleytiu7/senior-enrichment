import React from 'react';
//import Navbar from './Navbar';
import Footer from './Footer';
import Navbar from './Navbar';

const Root = ({ children}) => (
  <div id="main" className="container">
  <Navbar />
  { children }
  <Footer />
  </div>
);

export default Root;
