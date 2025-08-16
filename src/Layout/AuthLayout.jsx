import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

const AuthLayout = () => {
    return (
        <div>
            <header className='p-4 md:px-6 lg:p-0 shadow-md bg-white sticky top-0 left-0 z-50'>
                <Navbar />
            </header>
            <main>

            <Outlet />
            </main>
            <footer className='pt-16 lg:py-t2'>
                <Footer />
            </footer>
        </div>
    );
};

export default AuthLayout;