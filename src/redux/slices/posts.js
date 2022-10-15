import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; //создам редюсер.createAsyncThunk-асинхронную добавила
import axios from "../../axios";


//создала новый запрос на получение тэгов
export const fetchTags= createAsyncThunk('posts/fetchTags', async()=>{
  const { data } = await axios.get('/tags');
  return data;
});


//создала асинхронный запрос на получение статей
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


//для тэгов описала состояние асинхронного экшена
[fetchTags.pending]:(state)=>{
  state.tags.items=[]
  state.tags.status ='loading';//идёт загрузка
},
//завершилась
[fetchTags.fulfilled]:(state,action)=>{
  state.tags.items = action.payload;
  state.tags.status ='loaded';
},
//если ошибка
[fetchTags.rejected]:(state)=>{
  state.tags.items=[];//сбрасываю статьи которые были изначально
  state.tags.status ='error';//
},
},
});

export const postsReducer = postsSlice.reducer;