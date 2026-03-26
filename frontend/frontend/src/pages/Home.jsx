import React from 'react'
import Navbar from '../component/Navbar'
import Hero_Section from './Hero_Section'
import Seller_Product from './Seller_Product'
import Footer from './Footer'
import Section_1 from './Section_1'
import Section_2 from './Section_2'
import New_Launch from './New_Launch'
import Category from './Category'

const Home = () => {

    return (

        <>
            <Navbar />

            <Hero_Section />

            <Seller_Product />

            <Section_1 />
            <Section_2 />

            <Category />

            <New_Launch />


            <Footer />

        </>
    )
}

export default Home