import React from 'react';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';
import './Contact.css'

const Contact = () => {
  return (
    <div className='about'>

      <Navbar />

      <div>
        <div className='about_content'>
          <h2>Contact</h2>
          <hr />
          <p className='desc'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem voluptatem cumque atque, possimus officia modi repudiandae. Nostrum libero doloremque eligendi hic veniam porro nam illum possimus! Repellendus, asperiores dignissimos saepe ducimus reiciendis consequuntur facere illum, accusamus consectetur consequatur, rem id enim natus repudiandae numquam voluptas?
          </p>

          <div className='contact_block'>

            <p className='contact_desc' > <b>Ph:</b> 0000 1223 5433 </p>
            <p className='contact_desc' >
              <b> Email:</b> random@abc.com
            </p>
            <p className='contact_desc'>
              <b>Address:</b> xyz street, kk city, lk
            </p>

          </div>
        </div>
        <div className='about_footer'>
          <Footer />
        </div>
      </div>
    </div>

  )
}

export default Contact