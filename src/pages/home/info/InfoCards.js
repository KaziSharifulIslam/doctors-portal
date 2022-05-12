import React from 'react';
import InfoCard from './InfoCard';
import clock from "../../../assets/icons/clock.svg";
import marker from "../../../assets/icons/marker.svg";
import phone from "../../../assets/icons/phone.svg";
const InfoCards = () => {
    return (
        <div className='grid lg:grid-cols-3 grid-cols-1 gap-4 px-12 my-12 container mx-auto'>
            <InfoCard h="Opening Hours" p="Lorem Ipsum is simply dummy text of the pri" bg={`bg-gradient-to-r from-secondary to-primary`} img={clock}  />
            <InfoCard h="Visit our location" p="Brooklyn, NY 10036, United States" bg={`bg-accent`} img={marker}  />
            <InfoCard h="Contact us now" p="+000 123 456789" bg={`bg-gradient-to-r from-secondary to-primary`} img={phone}  />
        </div>
    );
};

export default InfoCards;