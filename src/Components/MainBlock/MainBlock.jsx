import React from 'react';
import './MainBlock.css'
import BlogPost from'../BlogPost/BlogPost';


const MainBlock = ({admin, posts}) => {
  return (
    <div className='main_block'>

        <div className='mb_heading'>
         {admin?  <h2 style={{justifySelf:'flex-start', marginBottom: '10px'}}>BLOGS LIST</h2>: <h1>This Week Stories</h1> }   
        </div>
<div className='blogs_list'>
        <BlogPost admin={admin} posts={posts}/>
</div>
    </div>
  )
}

export default MainBlock