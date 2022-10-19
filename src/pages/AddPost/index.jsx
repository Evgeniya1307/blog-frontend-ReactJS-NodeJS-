import React from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor"; //делаю редактор для статьи
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { selectIsAuth } from "../../redux/slices/auth";
import axios from "../../axios";

export const AddPost = () => {
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  const [isLoading, setLoading] = React.useState(false); //для сервака, false по умолчанию(неотправляется запрос)
  const [title, setTitle] = React.useState(""); //на title
  const [text, setText] = React.useState(""); //text-сох-ет то что я ввела в редакторе
  const [tags, setTegs] = React.useState("");
  const inputFileRef = React.useRef(null); //для загрузки изображения
  const [imageUrl, setImageUrl] = React.useState("");

  const handleChangeFile = async (event) => {
    //проверяет изменилось в инпуте или нет
    try {
      //если загрузка нормально
      const formData = new FormData(); //формат позволяющий загружать вшивать и отправлять на бэк
      const file = event.target.files[0];
      formData.append("image", file); //применит спец св-во image и эту картинку вытащит из files[0]первым массивом
      const { data } = await axios.post("/upload", formData); //взять файл и сделать пост запрос на upload, в formdata есть этот файл и отправь на сервак и вернётся любой ответ и какая ссылка
      setImageUrl(data.url);
    } catch (err) {
      //ошибка
      console.warn(err);
      alert("Ошибка при загрузке файла");
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl(""); //на удаление
  };

  const onChange = React.useCallback((value) => {
    //будет получать value я его сохранять я делаю компилированный редактор
    setText(value);
  }, []);

  const onSumbit = async () => {
    try {
      setLoading(true); //идёт загрузка отправляю на сервак
      const fields = {
        //объект с полями передавваемый на сервер
        title,
        imageUrl,
        tags: tags.split(','),//превратила строчку в массив для отправки на бэк
        text,
      };
      const { data } = await axios.post("posts", fields); //вытащить из запроса инфу
      const _id = data._id;
      navigate(`/posts/${_id}`); //на пост переход на id на саму статью если она создана
    } catch (error) {
      console.warn(error);
      alert("Ошибка при создании статьи!");
    }
  };

  const options = React.useMemo(
    //получает настройки
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  //если не авторизованны статью соз-ть нельзя и переход на главную
  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    // при клике на эту кнопку переводи его на этот DOM-элемент
    <Paper style={{ padding: 30 }}>
      <Button
        onClick={() => inputFileRef.current.click()}
        variant="outlined"
        size="large"
      >
        {/*когда кликаешь то по факту на inputFileRef */}
        Загрузить превью
      </Button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl && (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}
          >
            Удалить
          </Button>
          <img
            className={styles.image}
            src={`http://localhost:4444${imageUrl}`}
            alt="Uploaded"
          />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        value={tags}
        onChange={(e) => setTegs(e.target.value)}
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        fullWidth
      />

      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSumbit} size="large" variant="contained">
          Опубликовать
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
