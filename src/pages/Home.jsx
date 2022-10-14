import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import axios from '../axios';
import {useDispatch, useSelector} from 'react-redux';//чтобы отправить асинхронный экшен

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import {fetchPosts} from '../redux/slices/posts'

export const Home = () => {
  const dispatch= useDispatch();
  const{posts, tags}=useSelector(state=>state.posts);
const isPostsLoading = posts.status === 'loading';//идёт загрузка проверить статус 

  //делаю запрос на бэкенд 
React.useEffect(()=>{
dispatch(fetchPosts());
}, []);


  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) => 
            isPostsLoading ? ( 
              <Post key={index} isLoading={true}/> //если статьи подгружаются идёт загрузка
              ) :( //если есть загрузка то массив если нет то в посте беру айтемс и мапим, если статьи загруж то рендерю то то иначе то
            <Post  //если статьи нету то рендерю реальную статью
            id={obj.id}
            title={obj.title}
            imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
            user={{
              avatarUrl:
                'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
              fullName: 'Keff',
            }}
            createdAt={'obj.createdAt'}
            viewsCount={'obj.viewsCount'}
            commentsCount={3}
            tags={obj.tags}
            isEditable
          />
        ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={['react', 'typescript', 'заметки']} isLoading={false} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
