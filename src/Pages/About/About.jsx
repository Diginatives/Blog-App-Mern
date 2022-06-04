import React from 'react';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';
import './About.css';

const About = () => {
  return (
    <div className='about'>

      <Navbar />
      <div className='about_content'>
        <h2>About</h2>
        <hr />
        <p className='desc'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem voluptatem cumque atque, possimus officia modi repudiandae. Nostrum libero doloremque eligendi hic veniam porro nam illum possimus! Repellendus, asperiores dignissimos saepe ducimus reiciendis consequuntur facere illum, accusamus consectetur consequatur, rem id enim natus repudiandae numquam voluptas? Laudantium consequuntur excepturi illum recusandae nostrum perspiciatis sint provident corporis id? Nisi temporibus at eaque mollitia unde enim optio placeat illum totam, provident laudantium delectus asperiores tenetur explicabo voluptatum, suscipit non iusto corporis veritatis officia nam recusandae tempore magni similique! Sunt sequi quae non dolores!
        </p>
      </div>
      <div className='about_footer'>
        <Footer />
      </div>
    </div>
  )
}

export default About