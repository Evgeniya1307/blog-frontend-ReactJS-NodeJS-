import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; //создам редюсер.createAsyncThunk-асинхронную добавила
import axios from "../../axios";
//создала асинхронный запрос
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async()=>{
const{data} = await axios.get('/posts');//нужно вытащить data из аксиос запроса
return data;//что придёт от бэка возвращаю 
});

const initialState = {
  //список статей
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

const postsSlice = createSlice({
  //получает
  name: "posts",
  initialState,
  reducer: {}, //пишу редюсер и тут методы обновляющие мой state
extraReducers: {//описала состояние асинхронного экшена

}
});

export const postsReducer = postsSlice.reducer;