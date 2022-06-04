import React, { useState, useEffect, useContext } from 'react';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';
import { axiosPublic } from '../../Requests';
import { Context } from '../../Context/Context';
import PropagateLoader from "react-spinners/PropagateLoader";
import Loader from '../../Components/Loader/Loader';



const Login = () => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { dispatch, isFetching, error } = useContext(Context);
  console.log(errorMessage);


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axiosPublic.post("/auth/login", {
        email: email,
        password: password
      })
      
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      window.alert('Logged in succefully!');
      navigate("/");

    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
      window.alert(error.message)
      setErrorMessage(error.message)

    }


  }



  return (



    <div className='login'>
      {loading ? <Loader loading={loading} /> :
        <>
          <h1>Login</h1>

          <form onSubmit={handleSubmit}>
            <input type="email" required={true} placeholder='Enter Email' 
             onChange={(e) => { setEmail(e.target.value) }} />
            <input type="password" required={true} minLength={3} placeholder='Enter Password'
             onChange={(e) => { setPassword(e.target.value) }} />
            <button type='submit'>Login</button>

            {isFetching && <PropagateLoader color={'rgb(247, 90, 51)'} size={8} />}
            {error && <span>Something went wrong !</span>}
          </form>

          <Link to='/'> <button className='goback_button'> Go Back to Public view</button></Link>

        </>
      }

    </div>
  )
}

export default Login