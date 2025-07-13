import React from 'react';
import Banner from '../../Components/Banner/Banner';
import FeaturedSection from '../../Components/FeaturedSection/FeaturedSection';
import AboutSection from '../../Components/AboutSection/AboutSection';
import FeaturedClasses from '../../Components/FeaturedClasses/FeaturedClasses';

const Home = () => {
    return (
        <div className='flex flex-col gap-16 lg:gap-32'>
            <Banner />
            <FeaturedSection />
            <AboutSection />
            <FeaturedClasses />
        </div>
    );
};

export default Home;