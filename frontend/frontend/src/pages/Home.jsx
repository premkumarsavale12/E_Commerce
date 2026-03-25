import React from 'react'
import Navbar from '../component/Navbar'
import Hero_Section from './Hero_Section'
import Seller_Product from './Seller_Product'
import Footer from './Footer'
import Section_1 from './Section_1'
import Section_2 from './Section_2'
import New_Launch from './New_Launch'

const Home = () => {

    return (

        <>
            <Navbar />

            <Hero_Section />

            <Seller_Product />

            <Section_2 />

            <Section_1 />

            <New_Launch />


            <Footer />

        </>
    )
}

export default Home