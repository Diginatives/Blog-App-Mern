import React from 'react';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';
import './UnderConstruction.css';

const UnderConstruction = () => {
  return (
    <div className='undc'>
      <Navbar />
      <div className='udc_block'>

        <div className='udc_img'>
          <h2 >Under Construction</h2>
          <img src={require('./underconstruction.gif')} alt="img" />

        </div>

        <div className='about_footer'>
          <Footer />
        </div>

      </div>
    </div>
  )
}

export default UnderConstruction