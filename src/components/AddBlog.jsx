import React from "react";
import {Box,Button,InputLabel,TextField,Typography} from "@mui/material"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const label = {mb:1,mt:2,fontSize:'24px',fontweight:'bold'};
const AddBlog = () => {
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

    const sendRequest = async() => {
        try {
            let res = await axios.post("https://mern-blogapp-project.herokuapp.com/api/blogs/add",{
                title:inputs.title,
                description:inputs.description,
                image:inputs.imageURL,
                user : localStorage.getItem("userPersonalId")
            });
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        sendRequest().then((data)=> {window.location.reload()}).catch((error)=> {console.log(error)});
    }

    return (<div>
        <form onSubmit={handleSubmit}>
            <Box border={3} borderColor="green" borderRadius={10} boxShadow="10px 10px 20px #ccc" padding={3} margin={'auto'} marginTop={13} display={'flex'} flexDirection={'column'} width={'60%'}>
                <Typography fontWeight={'bold'} padding={3} color="blueviolet" variant="h2" textAlign={'center'}>Post your Blog</Typography>
                <InputLabel sx={label} >Title</InputLabel>
                <TextField name="title" value={inputs.title} onChange={handleChanges} margin="normal" variant="outlined" />
                <InputLabel sx={label}>Description</InputLabel>
                <TextField name="description" value={inputs.description} onChange={handleChanges} margin="normal" variant="outlined" />
                <InputLabel sx={label}>ImageURL</InputLabel>
                <TextField name="imageURL" value={inputs.imageURL} onChange={handleChanges} margin="normal" variant="outlined" />
                <Button sx={{mt:2,borderRadius:4}} varient="contained" color="warning" type="submit">Post</Button>
            </Box>
        </form>
        
    </div>)
}

export default AddBlog;