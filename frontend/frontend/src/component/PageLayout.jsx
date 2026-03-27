import React from 'react';
import Navbar from './Navbar';
import Footer from '../pages/Footer';

const PageLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
