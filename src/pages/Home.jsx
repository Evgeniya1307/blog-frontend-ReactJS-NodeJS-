import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux"; //чтобы отправить асинхронный экшен

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { fetchPosts, fetchTags } from "../redux/slices/posts";

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data); //инфа авторизована или нет
  const { posts, tags } = useSelector((state) => state.posts);
  const isPostsLoading = posts.status === "loading"; //идёт загрузка проверить статус
  const isTagsLoading = tags.status === "loading";

  //делаю запрос на бэкенд
  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} /> //если статьи подгружаются идёт загрузка
            ) : (
              //если есть загрузка то массив если нет то в посте беру айтемс и мапим, если статьи загруж то рендерю то то иначе то
              <Post //если статьи нету то рендерю реальную статью
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl}
                user={{
                  avatarUrl:
                    "https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png",
                  fullName: "Кат Старовойтов",
                }}
                createdAt={"obj.createdAt"}
                viewsCount={"obj.viewsCount"}
                commentsCount={3}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id} //есть ли userData и совпадает ли с id
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Вася Пупкин",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "Это тестовый комментарий",
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
          />
        </Grid>
      </Grid>
    </>
  );
};
