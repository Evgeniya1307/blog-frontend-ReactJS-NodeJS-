import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import React from "react";
import { fethAuthMe, selectIsAuth } from "./redux/slices/auth";

function App() {
const dispatch= useDispatch();
const isAuth = useSelector(selectIsAuth)//вытаскиваю авторизован или нет

React.useEffect(() => {
dispatch(fethAuthMe());
}, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
       <Routes>
  <Route path="/" element={<Home/>}/> {/*рендерю home, когда чел переёдёт на главный путь*/}
     <Route path="/posts/:id" element ={<FullPost />}/> {/*если динамический id тоFullPost*/}
       <Route path="/add-post" element={<AddPost />}/>
      <Route path="/login" element={<Login />}/>
     <Route path="register" element={<Registration />}/>
        </Routes>
      </Container>
    </>
  );
}

export default App;
