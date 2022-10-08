import React, { useState } from "react";
import {Box,Typography,TextField, Button} from "@mui/material"
import axios from "axios";
import {useDispatch} from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";


const Auth = () =>{
    let navigate = useNavigate();
    let [isSignUp,setIsSignUp] = useState(false);
    let [inputs,setInputs] = useState({
        name : "",
        email : "",
        password : "",
    }); 
    let dispatch = useDispatch();


    const sendRequest = async(flag) => {
        // console.log(flag);
        try{
            if(flag === "signup"){
                const res = await axios.post("https://mern-blogapp-project.herokuapp.com/api/user/signup",{
                    name : inputs.name,
                    email:inputs.email,
                    password : inputs.password,
                    blogs: []
                });
                let data = res.data;
                return data;
            }else{
                const res = await axios.post("https://mern-blogapp-project.herokuapp.com/api/user/login",{
                    email:inputs.email,
                    password : inputs.password,
                });
                let data = res.data;
                return data;
            }
        }catch(error){
            throw new Error("could not able to send data to backend");
        }
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(inputs.name);
        if(inputs.name === ""){
            sendRequest("login").then((data) => localStorage.setItem("userPersonalId",data.user._id)).then(()=> dispatch(authActions.login()) ).then(()=>navigate("/blogs")).then((data) => {console.log(data)}).catch((err)=>{
                console.log("something went wrong while returning data");
            });
        }else{
            sendRequest("signup").then((data)=> {localStorage.setItem("userPersonalId",data.user._id);
           localStorage.setItem("username",inputs.name);
        }).then(()=> dispatch(authActions.login())).then(()=> navigate("/blogs")).then((data) => {console.log(data)}).catch((err)=>{
                console.log("something went wrong while returning data");
            });
        }
    }

    const handleChange = (e) => {
       setInputs((prevstate)=>({
        ...prevstate,
        [e.target.name]:e.target.value
       }));
    }

    return <div>
        <form onSubmit={handleSubmit} action="" method="post">
            <Box maxWidth={400} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} boxShadow={'10px 10px 20px #ccc'} padding={3} margin={'auto'} marginTop={15} borderRadius={5}>
                <Typography padding={3} variant="h3" textAlign='center'> {isSignUp ? "SignUp" : "Login"}</Typography>
                {isSignUp && <TextField value={inputs.name} name="name" onChange={handleChange} type={'text'} placeholder="Name" margin="normal"/>}
                <TextField name="email" onChange={handleChange} value={inputs.email} type={'email'} placeholder="Email" margin="normal"/>
                <TextField name="password" onChange={handleChange} value={inputs.password} type={'password'} placeholder="Password" margin="normal"/>
                <Button type="submit" variant="contained" color="warning" sx={{borderRadius:3,marginTop:3}}>Submit</Button>
              <Button onClick={(e)=>setIsSignUp(!isSignUp)} sx={{borderRadius:3}}>Change to {isSignUp ? "Login" : "SignUp" }</Button>
            </Box>
        </form>

    </div>
}

export default Auth;