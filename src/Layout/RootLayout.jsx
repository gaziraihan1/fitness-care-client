import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import ScrollToTop from '../Components/ScrollToTop/ScrollToTop';

const RootLayout = () => {
    return (
        <div className='bg-white dark:bg-gray-900'>
            <ScrollToTop />
            <div className='md:px-6 lg:p-0 shadow-md sticky top-0 left-0 z-50'>

            <Navbar />
            </div>
            <main className='min-h-screen'>

            <Outlet />
            </main>
            <footer className='pt-16 lg:pt-32'>

            <Footer />
            </footer>
        </div>
    );
};

export default RootLayout;