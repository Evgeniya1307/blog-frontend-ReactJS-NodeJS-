import React from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";//делаю редактор для статьи
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsAuth } from "../../redux/slices/auth";


export const AddPost = () => {
  const imageUrl = "";
  const isAuth = useSelector(selectIsAuth);
  const [value, setValue] = React.useState("");//value-сох-ет то что я ввела в редакторе
const [title, setTitle]=React.useState('')//на title
const[tags, setTegs]=React.useState('')
  const inputFileRef = React.useRef(null);//для загрузки изображения

const handleChangeFile = () => {};//проверяет изменилось в инпуте или нет

  const onClickRemoveImage = () => {};

  const onChange = React.useCallback((value) => {//будет получать value я его сохранять я делаю компилированный редактор 
    setValue(value);
  }, []);

  const options = React.useMemo( //получает настройки
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
      <Button onClick={()=>inputFileRef.current.click()} variant="outlined" size="large">{/*когда кликаешь то по факту на inputFileRef */}
        Загрузить превью
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
      )}
      {imageUrl && (
        <img
          className={styles.image}
          src={`http://localhost:4444${imageUrl}`}
          alt="Uploaded"
        />
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        fullWidth
      />
      <TextField
      value={tags}
      onChange={(e)=>setTegs(e.target.value)}
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        fullWidth
      />
      
      <SimpleMDE
        className={styles.editor}
        value={value}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button size="large" variant="contained">
          Опубликовать
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
