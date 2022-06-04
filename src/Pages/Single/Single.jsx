import React,{useState, useEffect} from 'react';
import './Single.css';
import { BlogsData } from '../../BlogSource';
import { useParams } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import SingleView from '../../Components/SingleView/SingleView';
import Loader from '../../Components/Loader/Loader';

const Single = ({posts, loading}) => {

  const { id } = useParams();
  

  return (

    <div className='single'>

      <Navbar />

      {loading ? <Loader loading={loading}/>:
      <>
      {posts.map((BlogsData) => {
        if (BlogsData._id === id)
        return (
          <SingleView BlogsData={BlogsData} />
          )
      })}

      

      </>}

      <Footer />
    </div>
  )
}

export default Single