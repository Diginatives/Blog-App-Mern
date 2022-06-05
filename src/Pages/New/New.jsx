import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { axiosUser } from "../../Requests";
import './New.css';
import PropagateLoader from "react-spinners/PropagateLoader";


const New = () => {
  const [file, setFile] = useState("");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [singleuser, setSingleuser] = useState({});
  const [isolduser, setIsolduser] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState('');
  const { id } = useParams();



  // 000 is used for new User, While other used for updating existing User
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFetching(true);

    const newUser = {
      username: username,
      email: email,
      password: password,
      isAdmin: isAdmin
    }
    //handling image upload
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newUser.profilePic = filename;
      try {
        await axiosUser.post("/upload", data);
      } catch (err) { }
    }

    //For Adding new user
    if (id === '000') {

      try {
        const res = await axiosUser.post('/auth/register', newUser);
        setFetching(false);
        window.location.replace('/admin/users')
      } catch (error) {
        console.log(error);
        setError(error.message);
        setFetching(false);
      }
    } else {

      //For Updating user
      try {
        const res = await axiosUser.put(`/users/${id}`, newUser);
        setFetching(false);
        window.location.replace('/admin/users')
      } catch (error) {
        console.log(error);
        setFetching(false);

      }

    }
  }



  const getSingleuser = async () => {
    //getting single user for updating
    try {
      const res = await axiosUser.get(`/users/${id}`)
      console.log('user recieved');
      setSingleuser(res.data);
      setIsolduser(true);

    } catch (error) {
      console.log(error);
    }
  }



  useEffect(() => {
    //not 000, means updating an existing user
    if (id !== '000') {
      getSingleuser();

    }
  }, []);

  useEffect(() => {

    setUsername(singleuser.username);
    setEmail(singleuser.email);
    setPassword(singleuser.password);
    setIsAdmin(singleuser.isAdmin);
    setFile(singleuser.profilePic)

  }, [singleuser]);


  // For old user image upload cleanup
  const handleFile = () => {
    setIsolduser(false);
    setFile('');
  }

  // link to files cloud storage
  const PF = "https://blog-api-11.herokuapp.com/images/";

  return (
    <div className="new">


      <div className="new-top">
        <h1 >ADD NEW USER</h1>
      </div>
      <div className="new-bottom">
        <div className="left">
          {isolduser ? <img className='uploaded_img'
            src={file ? `${PF}${file}` : 
            "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="" />

            : <img className='uploaded_img'
              src={file ? URL.createObjectURL(file) : 
              "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="" />
          }



          <label htmlFor="file" onClick={handleFile}>
            Image: <DriveFolderUploadOutlinedIcon className="icon" />
          </label>
        </div>
        <div className="right">
          <form className="new_user_form" onSubmit={handleSubmit} >

            <div className="formInput" >

              <input
                type="file"
                id="file"
                required
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
              <label>Username</label>
              <input type='text' required value={username} placeholder='Username' 
              onChange={(e) => setUsername(e.target.value)} />

              <label>Email</label>
              <input type='email' required value={email} placeholder='Email' 
              onChange={(e) => setEmail(e.target.value)} />

              <label>Password</label>
              <input type='password' required minLength={4} value={password} placeholder='Password' 
              onChange={(e) => setPassword(e.target.value)} />

              <label style={{ marginBottom: '3px' }}>Role</label>
              <select id="role" required type='boolean' 
              onChange={(e) => setIsAdmin((e.target.value === 'true'))}  >
                <option selected="selected" disabled="disabled" value="" >Please Select</option>
                <option value="false">user</option>
                <option value="true">admin</option>

              </select>
            </div>

            {isolduser ? <button onClick={handleSubmit}>Update</button> :
              <button type="submit">Add</button>}
            <br />
            {fetching && <PropagateLoader color={'rgb(247, 90, 51)'} size={8} />}
            <br />
            <p style={{ color: 'red', width: '450px', marginLeft: '10px' }}>{error}</p>
          </form>
        </div>
      </div>

    </div>
  );
};

export default New;