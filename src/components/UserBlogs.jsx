import React, { useState,useEffect } from "react";
import axios from "axios";
import Blog from "./Blog";

const UserBlogs = () => {
    const [blogs,setBlogs] = useState();
    let userId = localStorage.getItem("userPersonalId");
    console.log(userId);

    const sendRequest = async() => {
        // console.log(userId);
        try {
            console.log(userId);
            const res = await axios.get(`https://mern-blogapp-project.herokuapp.com/api/blogs/user/${userId}`);
            // console.log(res)
            // let r = await res.data;
            // console.log(r);
            let data =  await res.data.result;
            console.log(data);
            return data;
        } catch (error) {
            console.log("something went wrong at useBlog while bring data from backend");
            // throw new Error("something went wrong");
        }
    }

    useEffect(()=>{
        sendRequest().then((data)=> {setBlogs(data)}).catch((error) => {
            console.log("something went wrong");
        });
    },[]);

    return (
        <div>
            {/* {!blogs && <h3>you don't have your own posts</h3>} */}
            {blogs && blogs.map((blog,index) => {
                return (
                    <Blog key={index} title={blog.title} id={blog._id} description={blog.description} image={blog.image} isUser={true} username={localStorage.getItem('username')} date={blog.createdAt} />
                )
            }) } 
        </div>
    )
}

export default UserBlogs;