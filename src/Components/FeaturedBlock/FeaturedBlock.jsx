import React from 'react';
import './FeaturedBlock.css'
import {BlogsData} from '../../BlogSource';
import { NavLink} from 'react-router-dom';

const FeaturedBlock = ({posts}) => {

    const PF = "https://blog-api-11.herokuapp.com/images/";
   


    return (
        <div className='featured_block' 
        style={{ backgroundImage:"url(https://images.unsplash.com/photo-1604762512526-b7ce049b5764?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80)"}}>

            <div className="featured_post">

               
                <div className='featured_left'>
                    
                    <div className='feat_left_content'>
                        <div  className='heading'>
                            <h3 className='snippet'>Featured</h3>
                            <h3 className='snippet createdAt'>{new Date( (posts[0].createdAt) ).toDateString()}</h3>
                            <NavLink to={`/view/${posts[0]._id}`} className='title'>{posts[0].title}</NavLink>
                        </div>
                        <div className="content">
                        <p  dangerouslySetInnerHTML={{__html: posts[0].postbody}} />
                        </div>
                        <h3 className='snippet' style={{marginTop: '10px'}}>By: {posts[0].username}</h3>
                    </div>
                </div>



                <div className="featured_right">

                    <img className='feat_img' src={`${PF}${posts[0].postimg}`} alt="Post Image" />

                </div>
            </div>
        </div>
    )
}

export default FeaturedBlock