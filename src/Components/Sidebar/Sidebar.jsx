import React, { useContext } from 'react';
import './Sidebar.css';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StreetviewIcon from '@mui/icons-material/Streetview';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from '../../Context/Context';




const Sidebar = () => {



  const {dispatch} = useContext(Context);
  const Navigate = useNavigate();

  const handleLogout = () =>{
      dispatch({type: "LOGOUT"});
      Navigate("/");
  

  }



  return (

    <div className='sidebar'>

       <div className="side-top">
          <div className="side_logo">BLOGS ADMIN</div>
       </div>

     <div className="side-middle">

      

         <NavLink to='/admin/'  className='navLink'>
         
            <DashboardIcon className="icon" />
            <span className='icon_span'>Blogs List</span>
          
          </NavLink>


          <NavLink to='/admin/write/000' className='navLink' > 
          
          <DriveFileRenameOutlineIcon className='icon'/>
          <span className='icon_span'>Write Blog</span>
       
        </NavLink>

        
           <NavLink to='/admin/users' className='navLink' > 
          
              <PersonOutlineIcon className="icon" />
              <span className='icon_span'>Users</span>
           
            </NavLink>

          <NavLink to='/' className='navLink' > 
          <StreetviewIcon className="icon" />
          <span className='icon_span'>Go to Pulic site</span>
        </NavLink>
         

         
          <div style={{cursor: "pointer"}}  className='navLink' onClick={handleLogout}> 
         
            <ExitToAppIcon className="icon" />
            <span className='icon_span'>Logout</span>
          
          </div>
      <br />
       

       </div>
      



       
        
        </div>
  )
}

export default Sidebar