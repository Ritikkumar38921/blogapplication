import axios from "axios";
import React, { useEffect,useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import {Typography,Box,TextField,InputLabel,Button} from "@mui/material"

const label = {mb:1,mt:2,fontSize:'24px',fontweight:'bold'};
const BlogDetail = () => {

    let { id } = useParams();
    console.log(id);
    // const navigate = useNavigate();
    const [inputs,setInputs] = useState({
        title : "",
        description:"",
        imageURL : ""
    });

    const handleChanges = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }));
    }

    const fetchRequest = async() => {
        try {
            // console.log(id);
            let res = await axios.get(`https://mern-blogapp-project.herokuapp.com/api/blogs/${id}`);
            // console.log(res);
            return await res.data;
        } catch (error) {
            console.log(error);
        }
    }

    const updateBlog = async() => {
        try{
           let updated = await axios.put(`https://mern-blogapp-project.herokuapp.com/api/blogs/update/${id}`,{
             title : inputs.title,
             description : inputs.description,
             image:inputs.imageURL,
             user:localStorage.getItem("userPersonalId")
           });
        //    console.log("updated successfully");
        //    console.log(updated);
           return updated;
        //    navigate("/myblogs");
        }catch(err){
            console.log(err);
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        updateBlog().then( (data) => {window.location.reload()}).catch((error)=>{
            console.log(error);
        });
    }

    useEffect(()=>{
        fetchRequest().then((data)=>{
            console.log(data);
            let {image,description,title} = data.blog;
            // console.log(image);
            // console.log(description);
            // console.log(title);
            setInputs({title,imageURL:image,description:description});
           

        }).catch((err)=>{
            console.log(err);
        })
    },[id]);

    return (<div>
         <form onSubmit={handleSubmit}>
           
            <Box border={3} borderColor="green" borderRadius={10} boxShadow="10px 10px 20px #ccc" padding={3} margin={'auto'} marginTop={13} display={'flex'} flexDirection={'column'} width={'60%'}>
                <Typography fontWeight={'bold'} padding={3} color="blueviolet" variant="h2" textAlign={'center'}>Update Blog</Typography>
                <InputLabel sx={label} >Title</InputLabel>
                <TextField name="title" value={inputs.title} onChange={handleChanges} margin="normal" variant="outlined" />
                <InputLabel sx={label}>Description</InputLabel>
                <TextField name="description" value={inputs.description} onChange={handleChanges} margin="normal" variant="outlined" />
                <InputLabel sx={label}>ImageURL</InputLabel>
                <TextField name="imageURL" value={inputs.imageURL} onChange={handleChanges} margin="normal" variant="outlined" />
                <Button sx={{mt:2,borderRadius:4}} varient="contained" color="warning" type="submit">Update</Button>
            </Box>
        </form>
        
    </div>
    )
}

export default BlogDetail;