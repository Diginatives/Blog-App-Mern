import React, { useState } from 'react';
import './SingleView.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import { axiosPublic, axiosUser } from '../../Requests';
import { useParams, useNavigate } from 'react-router-dom';
import PropagateLoader from "react-spinners/PropagateLoader";


function SingleView({ BlogsData }) {

  const [comment, setComment] = useState('');
  const [commentname, setCommentname] = useState('');
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState('');

  const PF = "https://blog-api-11.herokuapp.com/images/";
  const { id } = useParams();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setFetching(true);
    setError('');

    const newComment = {
      comment: {
        comment: comment,
        commentname: commentname,
        postedat: new Date(),
      }
    }

    try {
      const res = await axiosPublic.post(`/posts/${id}/comment`, newComment);
      setFetching(false);
      window.location.replace(`/view/${id}`);

    } catch (error) {
      setError(error.message);
      setFetching(false);
      console.log(error);
    }

  }



  return (

    <>
      <div className='single_container'>

        <div className='single_heading'>
          <div className='snippet view category'>{BlogsData.category}</div>
          <div className='title view'>{BlogsData.title}</div>

          <div className='single_details'>
            <div className='meta_details'>
              <div className='snippet view author'>{BlogsData.username}</div>
              <div className='snippet view createdAt'>{new Date(BlogsData.createdAt).toDateString()}</div>
            </div>
            <div className='single_icons'>
              <FacebookIcon className='top_icon view' />
              <TwitterIcon className='top_icon view' />
              <InstagramIcon className='top_icon view' />
              <PinterestIcon className='top_icon view' />
            </div>
          </div>
        </div>

        <div >
          <img className='single_img' src={`${PF}${BlogsData.postimg}`} alt="" />
        </div>

        <div className='single_description'>
          <p className='single_content' dangerouslySetInnerHTML={{ __html: BlogsData.postbody }} />
        </div>

      </div>


      <div className='comment_section comment_view'>

        <div className='comment_top'>
          {console.log(BlogsData.comment)}
          <h3>Recent comments</h3>
          {BlogsData.comment.map((data) => {
            return (<div style={{ marginTop: '30px' }}>
              <p style={{ marginBottom: '3px' }}>  {data.comment.comment}</p>
              <p style={{ color: 'grey', fontSize: '13px', marginTop: '4px' }}>By: {data.comment.commentname}</p>
              <p style={{ color: 'grey', fontSize: '13px', marginBottom: '10px' }}>{
                new Date(data.comment.postedat).toDateString()}</p>
              <hr />
            </div>)
          })}
        </div>

      </div>


      <div className='comment_section comment_write'>

        <div className='comment_top'>
          <h3>Leave a comment</h3>
        </div>

        <form className='comment_form' onSubmit={handleSubmit}>

          <textarea name='comment' required={true} placeholder='Write your comment' onChange={(e) => setComment(e.target.value)} />

          <div className="comment_middle">
            <input type="text" placeholder='Name' required={true} onChange={(e) => setCommentname(e.target.value)} />
            <input type="email" required={true} placeholder='email' />
          </div>

          <div className='comment_bottom'>
            <button className='comment_button' type='submit'>Post Comment</button>
          </div>

        </form>
        
        <div style={{marginLeft:'120px'}}>
            &nbsp;
            {fetching && <PropagateLoader color={'rgb(247, 90, 51)'} size={6} />}
            <span style={{ color: 'red' }}>{error}</span>
          </div>

      </div>
    </>
  )
}

export default SingleView