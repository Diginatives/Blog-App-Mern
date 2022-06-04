import React from 'react';
import { useParams } from 'react-router-dom';
import SingleView from '../../Components/SingleView/SingleView';

// To preview a single post in admin panel
const AdminSingle = ({posts}) => {
    const { id } = useParams();

    return (
  
      <div className='single'>
 
        {posts.map((BlogsData) => {
          if (BlogsData._id === id)
            return (
             <SingleView BlogsData={BlogsData}/>
            )
        })}
  
      </div>
    )
}

export default AdminSingle