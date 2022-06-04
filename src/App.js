import './App.css';
import Home from './Pages/Home/Home';
import {BrowserRouter,Routes,Route,} from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import Single from './Pages/Single/Single';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import Login from './Pages/Login/Login';
import Admin from './Pages/Admin/Admin';
import UnderConstruction from './Pages/UnderConstruction/UnderConstruction';
import { axiosPublic } from './Requests';
import { Context } from './Context/Context';


function App() {


  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const { user } = useContext(Context);

  const GetPost = async () => {
    const res = await axiosPublic.get("/posts/")
    const data = res.data;
    setPosts(data);
    setLoading(false);
  }

  useEffect(() => {
    GetPost();
  }, []);


  return (
    <div className="App">

      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home posts={posts} loading={loading} />} />
          <Route path="/view/:id" element={<Single posts={posts} loading={loading} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/underConstruction" element={<UnderConstruction />} />
          <Route path="/login" element={user ? <Home posts={posts} loading={loading} /> : <Login />} />
          <Route path="/admin/*" element={user ? <Admin posts={posts} /> : <Login />} />
        </Routes>

      </BrowserRouter>



    </div>
  );
}

export default App;
