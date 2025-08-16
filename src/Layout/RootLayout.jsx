import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import ScrollToTop from '../Components/ScrollToTop/ScrollToTop';

const RootLayout = () => {
    return (
        <div>
            <ScrollToTop />
            <div className='p-4 md:px-6 lg:p-0 shadow-md bg-white sticky top-0 left-0 z-50'>

            <Navbar />
            </div>
            <main className='min-h-screen px-4 lg:px-0'>

            <Outlet />
            </main>
            <footer className='pt-16 lg:pt-32'>

            <Footer />
            </footer>
        </div>
    );
};

export default RootLayout;