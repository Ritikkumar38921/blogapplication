import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Blog from "./Blog";

const Blogs = () => {
    let userID = localStorage.getItem("userPersonalId");
    let [blogs,setBlogs] = useState();
    const sendRequest = async() => {
        let res = await axios.get("https://mern-blogapp-project.herokuapp.com/api/blogs/getallblogs").catch((err) =>{
            console.log(err);
        });
        const data = res.data;
        console.log(data);
        return data;
    }

    useEffect(()=>{
        sendRequest().then((data)=> {setBlogs(data.blogs)}).catch((error)=>{
            console.log(error);
        });
    },[]);

    return (
        <div>
            {blogs && blogs.map((blog,index) => {
                return (
                    <Blog isUser={blog.user._id === userID?(true):(false)} key={index} id={blog._id} title={blog.title} description={blog.description} image={blog.image} username={blog.user.name} date={blog.createdAt} />
                )
            }) } 
        </div>
    )
}

export default Blogs;