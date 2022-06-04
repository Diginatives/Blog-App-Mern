import React from 'react';
import './Loader.css';
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/react";



const Loader = ({loading}) => {



  return (
    <div className='loader_component'>
        <HashLoader
 color={'#F75A33'} loading={loading} size={50} />
        </div>
  )
}

export default Loader