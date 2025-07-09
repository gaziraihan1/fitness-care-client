import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

const RootLayout = () => {
    return (
        <div>
            <header>

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