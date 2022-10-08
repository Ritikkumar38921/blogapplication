import React, { useState } from "react";
import {AppBar, Box, Button, Tab,Tabs, Toolbar, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { authActions } from "../store";

const Header = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let [value,setValue] = useState(0);
    let isLoggedIn = useSelector(state => state.isLoggedIn);

    let res;
   if(isLoggedIn === true){
    res = true;
   }else{
    let ele = localStorage.getItem("user_login_12321");
    if(ele === "false"){
        res = false;
    }else{
        res = true;
    }
   }

    const handleLogOut = () => {
        dispatch(authActions.logout());
        navigate("/");
    }

    return <AppBar sx={{background:"green"}}>
        <Toolbar>
            <Typography variant="h4" color={"white"}>BlogsApp</Typography>
            {res && <Box display="flex" marginLeft={"auto"} marginRight={"auto"}>
                <Tabs textColor={"red"} value={value} onChange={(e,val)=>setValue(val)}>
                    <Tab LinkComponent={Link} to={'/blogs'} label="All Blogs"/>
                    <Tab  LinkComponent={Link} to={'/myblogs'} label="My Blogs"/>
                    <Tab LinkComponent={Link} to={'/blogs/add'} label="Add Blogs" />
                </Tabs>
            </Box>}
            <Box display="flex" marginLeft="auto">
                { !res &&<Button LinkComponent={Link} to={'/auth'} label={"Login"} sx={{margin:1,borderRadius:10,color:"white",backgroundColor:"orange"}} >Login</Button>}
                {/* { !isLoggedIn && <Button LinkComponent={Link} to={'/auth'} label={"Signup"} sx={{margin:1,borderRadius:10,color:"white",backgroundColor:"orange"}}>Signup</Button>} */}
                { res && <Button onClick={handleLogOut} LinkComponent={Link} to={'/auth'} label={"Logout"} sx={{margin:1,borderRadius:10,color:"white",backgroundColor:"orange"}}>Logout</Button>}
            </Box>
        </Toolbar>
    </AppBar>;
}

export default Header;