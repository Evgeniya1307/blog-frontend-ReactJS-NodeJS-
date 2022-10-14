import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; //создам редюсер.createAsyncThunk-асинхронную добавила
import axios from "../../axios";
//создала асинхронный запрос
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async()=>{
const{data} = await axios.get('/posts');//нужно вытащить data из аксиос запроса
return data;//что придёт от бэка возвращаю 
});


//создала новый запрос на получение тэгов


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
[fetchPosts.pending]:(state)=>{
  state.posts.items=[]
  state.posts.status ='loading';//идёт загрузка
},
//завершилась
[fetchPosts.fulfilled]:(state,action)=>{
  state.posts.items = action.payload;
  state.posts.status ='loaded';
},
//если ошибка
[fetchPosts.rejected]:(state)=>{
  state.posts.items=[];//сбрасываю статьи которые были изначально
  state.posts.status ='error';//
},
},
});

export const postsReducer = postsSlice.reducer;