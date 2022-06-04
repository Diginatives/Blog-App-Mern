import React, { useContext } from 'react';
import './Navbar.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import SearchIcon from '@mui/icons-material/Search';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavLink, Link } from 'react-router-dom';
import { Context } from '../../Context/Context';

const Navbar = () => {

    const { user, dispatch } = useContext(Context);
    const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
   
    }



    return (
        <div className='navbar'>

            <div className="nav_left">

                <a href='/' className='logo'>MyBlogs</a>
                <div className='nav_list'>
                    <NavLink to="/" className='list'>Home</NavLink>
                    <NavLink to="/about" className='list'>About</NavLink>
                    <NavLink to="/contact" className='list'>Contact</NavLink>
                    <NavLink to="/underConstruction" className='list'>More</NavLink>

                </div>
            </div>
            <div className="nav_right">
                <SearchIcon className='search_icon' />
                <FacebookIcon className='top_icon' />
                <TwitterIcon className='top_icon' />
                <InstagramIcon className='top_icon' />
                <PinterestIcon className='top_icon' />
                <div className='avatar'>
                    <AccountCircleIcon />
                    {user ? <div onClick={handleLogout}
                        style={{ cursor: "pointer" }}> Log Out </div> : <NavLink to='/login'>Log In</NavLink>}
                </div>
                {user ? <NavLink to='/admin'> Admin </NavLink> : <div></div>}
            </div>

        </div>
    )
}

export default Navbar