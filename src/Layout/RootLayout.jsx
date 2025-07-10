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
            <main>

            <Outlet />
            </main>
            <footer>

            <Footer />
            </footer>
        </div>
    );
};

export default RootLayout;