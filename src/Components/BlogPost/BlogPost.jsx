import React, { useContext, useEffect, useState } from 'react';
import './BlogPost.css';
import { NavLink, Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { axiosUser } from '../../Requests';
import { Context } from '../../Context/Context';
import PropagateLoader from "react-spinners/PropagateLoader";

const BlogPost = ({ admin, posts }) => {

  const {user} = useContext(Context);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState('');
  
  //Link to cloud storage
  const PF = "https://blog-api-11.herokuapp.com/images/";


  const handledelte = async (id) => {
    
    try {
      console.log(id);
      const res = await axiosUser.delete(`/posts/${id}`);
     
      window.location.reload();

    } catch (error) {
      console.log(error);
      window.alert(error.message);
      
    }
  }







  return (
    <>
      {
        posts.map((BlogData, key) => {

          return (

            <div
              className={`blog_post ${admin ? 'admin_post' : ''}`}
              style={{ backgroundImage: `url(${PF}${BlogData.postimg})` }}
              key={BlogData._id}
            >


              <div className='blog_list_content'>
                <div className='blog_list_heading'>

                  <div className='snippet category'>{BlogData.category}</div>
                  <div className='snippet author'>By: {BlogData.username}</div>
                  <div className='snippet createdAt'>{new Date(BlogData.createdAt).toDateString()}</div>

                  {admin ? <NavLink to={`/admin/adminview/${BlogData._id}`}>
                    <h2 className='blog_list_title'>{BlogData.title}</h2>
                  </NavLink> :

                    <NavLink to={`/view/${BlogData._id}`}>
                      <h2 className='blog_list_title'>{BlogData.title}</h2>
                    </NavLink>}
                </div>

                {/* To conver html tags description to text */}
                <div className='blog_list_description' dangerouslySetInnerHTML={{ __html: BlogData.postbody }} />

                {user&&( (admin && BlogData.username===user.username)||user.isAdmin) ? 
                <div className='blogs_actions'>
                  <Link to={`/admin/write/${BlogData._id}`} >
                    <EditIcon className='editicon' />
                  </Link>

                  <DeleteOutlineIcon className=' deleticon' onClick={() => { handledelte(BlogData._id) }} />
                
              

                </div> : <div></div>
                }

              </div>
            </div>

          )


        })}
    </>
  )
}

export default BlogPost