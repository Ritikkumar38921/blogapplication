
import Header from "./components/Header"
import {Routes,Route,Navigate} from "react-router-dom";
import Auth from "./components/Auth";
import UserBlogs from "./components/UserBlogs";
import Blogs from "./components/Blogs";
import BlogDetails from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import {useSelector} from "react-redux";

function App() {
   const isLoggedIn = useSelector(state => state.isLoggedIn);
   // console.log(isLoggedIn);
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

   console.log(res);
  return <>
     <header>
        <Header/>
     </header>
     <main>
        <Routes>
         {/* <Route path="/" element={res && <Navigate to={'/blogs'} replace={true} />}></Route> */}
          <Route path="/auth" element={<Auth/>}></Route>
          <Route path="/blogs" element={<Blogs/>}></Route>
          <Route path="/blogs/add" element={<AddBlog/>}></Route>
          <Route path="/myblogs" element={<UserBlogs/>}></Route>
          <Route path="/myblogs/:id" element={<BlogDetails/>}></Route>
          <Route path="/blogs/add" element={<AddBlog/>}></Route>
        </Routes>
     </main>
  </>
}

export default App;
