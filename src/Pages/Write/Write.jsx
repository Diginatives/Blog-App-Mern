import React, { useState, useEffect, useContext } from 'react';
import PhotoIcon from '@mui/icons-material/Photo';
import './write.css';
import { Editor } from '@tinymce/tinymce-react';
import Loader from '../../Components/Loader/Loader';
import { axiosUser } from '../../Requests';
import { useParams } from 'react-router-dom';
import { Context } from '../../Context/Context';
import PropagateLoader from "react-spinners/PropagateLoader";
import HashLoader from "react-spinners/HashLoader";



const Write = ({ posts }) => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('New Blog...');
    const [category, setCategory] = useState('');
    const [file, setFile] = useState("");
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [isoldpost, setIsoldpost] = useState(false);
    const [imagecheck, setImagecheck] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState('');
    const { user } = useContext(Context)



    // There are two section in handleSubmit, 000 is used for new Post
    // While other used for updating existing Post
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFetching(true);
        setError('');

        let filename = '';
        const newPost = {
            username: user.username,
            title: title,
            postbody: body,
            category, category,
        };

        // 000 is used for new post
        if (id === '000') {
            if (file) {
                //handeling Image Upload
                const data = new FormData();
                filename = Date.now() + file.name;
                data.append("name", filename);
                data.append("file", file);
                newPost.postimg = filename;
                try {
                    await axiosUser.post("/upload", data);
                } catch (err) { }
            }

            try {
                //Post upload
                const res = await axiosUser.post("/posts", newPost);
                setFetching(false);
                window.location.replace("/admin");
            } catch (error) {
                console.log(error);
                setFetching(false);
                setError(error.message);
            }


        } else {
            //Updating existing Post image
            if (imagecheck) {
                const data = new FormData();
                filename = Date.now() + file.name;
                data.append("name", filename);
                data.append("file", file);
                newPost.postimg = filename;
                try {
                    await axiosUser.post("/upload", data);
                } catch (err) { }
            } else {
                filename = file;
            }

            try {
                //Updating existing Post      
                const res = await axiosUser.put(`/posts/${id}`, {
                    title: title,
                    postbody: body,
                    category: category,
                    postimg: filename
                })
                setFetching(false);
                window.location.replace("/admin");
            } catch (error) {
                console.log(error);
                setFetching(false);
                setError(error.message);
            }

        }

    };

    //Filtering which post to edit
    const edit_post = posts.filter((post) => (post._id === id));
    const PF = "https://blog-api-11.herokuapp.com/images/";


    useEffect(() => {
        // Edit existing post if not new
        if (id !== '000') {
            setTitle(edit_post[0].title);
            setBody(edit_post[0].postbody);
            setCategory(edit_post[0].category)
            setFile(edit_post[0].postimg);
            setIsoldpost(true);
        }

    }, [])

    // For old posts image upload cleanup
    const handleFile = () => {
        setIsoldpost(false);
        setFile('');
        setImagecheck(true);
    }


    return (
        <div className='write'>

            <div className='img_upload_container'>
                <label htmlFor='img_upload' className='img_icon'>
                    <PhotoIcon />
                    <span>Upload Photo</span>
                </label>

                {isoldpost ? <img className='uploaded_img'
                    src={file ? `${PF}${file}` : "/placeholder.jpg"} alt="" />

                    : <img className='uploaded_img'
                        src={file ? URL.createObjectURL(file) : "/placeholder.jpg"} alt="" />
                }
            </div>


            <form onSubmit={handleSubmit} >

                <input type="file" autoFocus name='file'
                    onClick={handleFile} id='img_upload' style={{ display: 'none' }}
                    onChange={(e) => setFile(e.target.files[0])} />

                <div className='write_title_area'>
                    <input type="text" name='title' required={true} value={title}
                        className='write_title' placeholder='Blog Title'
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                    <div className='post_category'>
                        <label for="category">Category:</label>
                        <select id="category" value={category} name="category"
                            required onChange={(e) => { setCategory(e.target.value) }}>
                            <option value="" >Please Select</option>
                            <option value="Health">Health</option>
                            <option value="Food">Food</option>
                            <option value="LifeStyle">LifeStyle</option>
                            <option value="Tech">Tech</option>
                            <option value="Nature">Nature</option>
                        </select>
                    </div>

                    <button type='submit' > submit</button>
                </div>

                <div>
                    &nbsp;
                    {fetching && <PropagateLoader color={'rgb(247, 90, 51)'} size={8} />}
                    <span style={{ color: 'red' }}>{error}</span>
                </div>


                {loading &&  <HashLoader style={{marginTop:'100px'}} color={'#F75A33'} loading={loading} size={50} />}
                <Editor

                    initialValue="<p>This is the initial content of the editor.</p>"
                    apiKey='tapczwtjh8jl8h09aj6fxheyuc84tpdpa5wok2pi53u8ojyl'
                    onEditorChange={(newText) => { setBody(newText) }}
                    value={body}
                    required
                    onInit={() => { setLoading(false); }}
                    init={{
                        height: 500,
                        width: 820,
                        menubar: false,

                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />

            </form>



        </div>
    )
}

export default Write