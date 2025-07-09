import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

const RootLayout = () => {
    return (
        <div>
            <header className='p-4 md:px-6 lg:p-0 lg:w-11/12 2xl:w-10/12 mx-auto'>

            <Navbar />
            </header>
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