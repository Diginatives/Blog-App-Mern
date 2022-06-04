import React, { useContext, useEffect } from 'react';
import './DataTable.css';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import { useState } from "react";
import { userColumns } from '../../UsersTabelData';
import { axiosUser } from '../../Requests';
import PropagateLoader from "react-spinners/PropagateLoader";
import { Context } from '../../Context/Context';








const DataTable = ({ title, table }) => {


  const [pageSize, setPageSize] = React.useState(10);
  const [usersdata, setUsersData] = useState([]);
  const [reRender, setReRender] = useState(false);
  const [error, setError] = useState('');
  const [fetching, setFetching] = useState(false);
  const {user} = useContext(Context);



  const getusers = async () => {
    setFetching(true);
    try {
      const users = await axiosUser.get('/users/');
  
      users.data.forEach((user) => {
        const data ={ 
          id: user._id,
          username: user.username,
          img: user.profilePic,
          email: user.email,
          role: user.isAdmin? 'admin': 'user'              
        }
        setUsersData(oldArray => [...oldArray,data]);
        setFetching(false);
    
      })
    
    } catch (error) {
      console.log(error);
      setFetching(false);
      setError(error.message);
    }
  }


  const handleUsersDelete = async (id) => {
    try{
      const res = await axiosUser.delete(`/users/${id}`);
      setUsersData(usersdata.filter((item) => item.id !== id));
      
    }catch(error){
      console.log(error);
    }
  };


  useEffect(() => {
    getusers();
  }, []);

 


  // view and delte column of table
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {

        return (
          <div className="cellAction">

{( user.isAdmin || (params.row.id=== user._id) ) && <>
            <Link to={`/admin/users/new/${params.row.id}`} style={{ textDecoration: "none" }}>
              <span className="viewButton"> Edit </span>
            </Link>

            <div onClick={() => handleUsersDelete(params.row.id)} >
              <span className="deleteButton"> Delete </span>
            </div>
            </>
            
      }
          </div>
        );
      },
    },
  ];


  return (

    <div className="DataTable">



      <div className="table-top">
        <h3 className='title'>USERS LIST</h3>

        <div className='addnew' >
          <Link to='/admin/users/new/000' className='Addnew'>Add New User</Link>
        </div>

      </div>

      <div style={{display:'flex', justifyContent: 'center'}}>
                &nbsp;
                {fetching && <PropagateLoader  color={'rgb(247, 90, 51)'} size={8}/>}
                <span style={{color: 'red'}}>{error}</span>
                </div>

      <div className='table'>
        <DataGrid

          rows={usersdata}
          columns={userColumns.concat(actionColumn)}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
        />
      </div>
    </div>
  )

}

export default DataTable