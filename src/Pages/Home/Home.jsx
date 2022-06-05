import React, { useState, useEffect } from 'react'
import './Home.css';
import FeaturedBlock from '../../Components/FeaturedBlock/FeaturedBlock'
import MainBlock from '../../Components/MainBlock/MainBlock';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';
import Loader from '../../Components/Loader/Loader';



const Home = ({ posts, loading }) => {



  return (
    <div className='home'>
      <Navbar />
      
      {loading ? <Loader /> :
        <>
          <FeaturedBlock posts={posts} />
          <MainBlock posts={posts} />
          <Footer />
        </>
      }

    </div>
  )
}

export default Home