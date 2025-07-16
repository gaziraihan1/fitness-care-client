import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

const RootLayout = () => {
    return (
        <div>
            <div className='p-4 md:px-6 lg:p-0 shadow-md bg-white'>

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