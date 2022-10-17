import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; //создам редюсер.createAsyncThunk-асинхронную добавила



//делаю авторизацию

const initialState = {
   //ин-фа о пользователе хр-ся в data
   data: null,
   status: 'loading',//инфа загружается
  };
  
  const authSlice = createSlice({ 
name: 'auth',
initialState,
//инфу о пользователе получаю из редакса(из асинхронного экшена)
  })
