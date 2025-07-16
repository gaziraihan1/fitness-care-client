import React from 'react';
import Banner from '../../Components/Banner/Banner';
import FeaturedSection from '../../Components/FeaturedSection/FeaturedSection';
import AboutSection from '../../Components/AboutSection/AboutSection';
import FeaturedClasses from '../../Components/FeaturedClasses/FeaturedClasses';
import Testimonials from '../../Components/ReviewsSection/Testimonials';
import Newsletter from '../../Components/Newsletter/Newsletter';
import TeamSection from '../../Components/TeamSection/TeamSection';
import LatestCommunityPosts from '../../Components/ForumsSection/LatestCommunityPosts';

const Home = () => {
    return (
        <div className='flex flex-col gap-16 lg:gap-32'>
            <Banner />
            <FeaturedSection />
            <AboutSection />
            <FeaturedClasses />
            <LatestCommunityPosts />
            <Testimonials />
            <TeamSection />
            <Newsletter />
        </div>
    );
};

export default Home;