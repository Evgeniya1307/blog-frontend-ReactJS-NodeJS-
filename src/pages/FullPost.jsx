import React from "react";
import {useParams} from 'react-router-dom'

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";


export const FullPost = () => {
  const [data, setDate]= React.useState()//хранится data
  const [isLoading, setIsLoading] = React.useState(true);//на загрузку
  //вытаскиваю id полученный 
  const { id } = useParams();
 
React.useEffect(()=>{
  axios.get(`/posts/${id}`)//при первом рендере делаю запрос
  .then(res=>{//выполнился когда запрос сох-ла в state
    setDate(res.data);
    setIsLoading(false);
  })
  .catch((err)=>{
    console.warn(err);
    alert('Ошибка при получении статьи');
  });
},[])

if(isLoading){//если загрузка идёт то рендерю пост,если завершена то реальную инфу
 return <Post isLoading={isLoading} isFullPost/>
}
 
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <p>
          {data.text}
        </p>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
