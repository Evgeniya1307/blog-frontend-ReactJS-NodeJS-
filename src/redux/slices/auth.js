import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; //создам редюсер.createAsyncThunk-асинхронную добавила
import axios from "../../axios";

//запросы
export const fethAuth = createAsyncThunk(
  "auth/fethAuth",
  async (params) => {
    const { data } = await axios.post("/auth/login", params); //ин-фа о входе при запросе получит fethUserData и отдам на бэк и он вернёт ответ и сохраню в редакс
    return data;
  }
);

export const fethAuthMe = createAsyncThunk("auth/fethAuthMe",
    async () => {
      const { data } = await axios.get("/auth/me"); 
      return data;
    }
  );

  export const fethRegister = createAsyncThunk("auth/fethRegister", async (params) => {
    const { data } = await axios.post("/auth/register",params);
    return data;
  });

//делаю авторизацию
const initialState = {
  //ин-фа о пользователе хр-ся в data
  data: null,
  status: "loading", //инфа загружается
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {//выйти из акаунта 
      state.data = null;
    },
  },
  extraReducers: {
    //инфу о пользователе получаю из редакса(из асинхронного экшена)
    //запрос делается на авторизацию
    [fethAuth.pending]: (state) => {
      state.status = "loading";
      state.data = "null"; //если запрос сделается
    },
    //завершилась
    [fethAuth.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    //если ошибка
    [fethAuth.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },

    [fethAuthMe.pending]: (state) => {
        state.status = "loading";
        state.data = null;
      },
      [fethAuthMe.fulfilled]: (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      },
      [fethAuthMe.rejected]: (state) => {
        state.status = "error";
        state.data = null;
      },


      [fethRegister.pending]: (state) => {
        state.status = "loading";
        state.data = null;
      },
      [fethRegister.fulfilled]: (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      },
      [fethRegister.rejected]: (state) => {
        state.status = "error";
        state.data = null;
      },
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data); //проверит на авторизацию
export const authReducer = authSlice.reducer; //вытаскиваю authReducer из редюсер
export const {logout}= authSlice.actions//все экшены экспорт и вытащить logout