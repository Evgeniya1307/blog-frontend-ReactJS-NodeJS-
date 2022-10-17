import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; //создам редюсер.createAsyncThunk-асинхронную добавила
import axios from "../../axios";

export const fethUserData = createAsyncThunk(
  "auth/fethUserData",
  async (params) => {
    const { data } = await axios.post("/auth/login", params); //ин-фа о входе при запросе получит fethUserData и отдам на бэк и он вернёт ответ и сохраню в редакс
    return data;
  }
);

//делаю авторизацию

const initialState = {
  //ин-фа о пользователе хр-ся в data
  data: null,
  status: "loading", //инфа загружается
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    //инфу о пользователе получаю из редакса(из асинхронного экшена)
    //запрос делается на авторизацию
    [fethUserData.pending]: (state) => {
      state.status = "loading";
      state.data = "null"; //если запрос сделается
    },
    //завершилась
    [fethUserData.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    //если ошибка
    [fethUserData.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
  },
});

export const authReducer = authSlice.reducer; //вытаскиваю authReducer из редюсер
