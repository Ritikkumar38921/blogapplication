import React from "react";
import {Card,CardHeader,Avatar,CardMedia,CardContent,Typography,Box, IconButton} from "@mui/material"
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Blog = ({id,title,image,description,username,isUser,date}) => {

    const navigate = useNavigate();
    // console.log(title);
    // console.log(description);
    // console.log(image);
    // console.log(blog);

    const handleEdit = (e) => {
        navigate(`/myblogs/${id}`);
    }

    const deleteblog = async() => {
      try {
        await axios.delete(`https://mern-blogapp-project.herokuapp.com/api/blogs/${id}`);      
      } catch (error) {
        console.log(error);
      }
    }

    const handleDelete = () => {
        deleteblog().then((data)=>{window.location.reload()}).catch((error)=>{console.log(error)});
    }

    return (
        <Card sx={{ width: "40%",margin:'auto',mt:10,padding:2,boxShadow:"5px 5px 10px #ccc",":hover":{
            boxShadow:"10px 10px 20px #ccc"
        }}}>

        {
          isUser && (
            <Box display='flex'>
              <IconButton sx={{marginLeft:'auto'}} onClick={handleEdit}><ModeEditOutlineOutlinedIcon/></IconButton>
              <IconButton onClick={handleDelete}><DeleteIcon/></IconButton>
            </Box>
          )
        }

      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {username.charAt(0).toUpperCase()}
          </Avatar>
        }
       
        title={title}
        subheader={date.substr(0,10)}
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <b style={{color:"red",fontSize:"15px"}}>{username}</b> {": "} {description}
        </Typography>
      </CardContent>
    </Card>
    )
}

export default Blog;