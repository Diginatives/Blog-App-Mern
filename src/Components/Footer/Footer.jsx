import React from 'react';
import './Footer.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import SearchIcon from '@mui/icons-material/Search';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';

const Footer = () => {
    return (
        <div className='footer'>

            <div className="footer_left">
                <div className='footer_left_line1'>

                    <div className='footer_logo'>MyBlogs</div>
                    <ul className='footer_list'>
                        <li>About</li>
                        <li>Press</li>
                        <li>Careers</li>
                        <li>Contact</li>
                    </ul>
                </div>

                <div className='footer_left_line2'>
                    <p> &copy; 2022 MYBlog Media All right reserved</p>

                </div>

            </div>
            <div className="footer_right">
                <FacebookIcon className='top_icon' />
                <TwitterIcon className='top_icon' />
                <InstagramIcon className='top_icon' />
                <PinterestIcon className='top_icon' />

            </div>
        </div>
    )
}

export default Footer