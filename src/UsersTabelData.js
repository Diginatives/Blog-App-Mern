
const PF = "https://blog-api-11.herokuapp.com/images/";

export const userColumns = [
    { field: "_id", headerName: "ID", width: 70 },
    {
      field: "username",
      headerName: "User Name",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={`${PF}${params.row.img}`} alt="avatar" />
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
  
  
    {
      field: "role",
      headerName: "Role",
      width: 160,
      renderCell: (params) => {
        return (
          <div >
           <span className={`cellWithStatus ${params.row.role}`}> {params.row.role} </span>
          </div>
        );
      },
    },
  ];
  
  