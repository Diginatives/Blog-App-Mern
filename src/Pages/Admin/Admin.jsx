import React, { useState, useEffect } from 'react';
import './Admin.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { Routes, Route, } from "react-router-dom";
import MainBlock from '../../Components/MainBlock/MainBlock';
import AdminSingle from '../AdminSingle/AdminSingle';
import Write from '../Write/Write';
import List from '../List/List';
import Loader from '../../Components/Loader/Loader';
import New from '../New/New';


const Admin = ({ posts }) => {

  const [loading, setLoading] = useState(true);



  useEffect(() => {
    setTimeout(() => {
    setLoading(false);
    }, 700)
  }, []);



  
  return (
    <div className='admin'>
      <div className='admin_container'>

        {loading ? <Loader loading={loading} /> :
          <>
            <Sidebar />

            <div className='admin_pages'>

              <Routes>
                <Route path="/" element={<MainBlock admin='true' posts={posts} />} />
                <Route path="/adminview/:id" element={<AdminSingle posts={posts} />} />
                <Route path="/write/:id" element={<Write posts={posts} />} />
                <Route path="/users" element={<List />} />
                <Route path="/users/new/:id" element={<New />} />
              </Routes>


            </div>
          </>
        }
      </div>

    </div>
  )
}

export default Admin