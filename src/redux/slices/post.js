import { createSlice } from "@reduxjs/toolkit"; //создам редюсер

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
});

export const postsReducer = postsSlice.reducer;