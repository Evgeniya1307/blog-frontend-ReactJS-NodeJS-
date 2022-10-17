import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";//буду получать email и пароль
import styles from "./Login.module.scss";

export const Login = () => {
  const {register, //вытаскиваю 
    handleSubmit, 
    setError, 
    formState:{errors, isValid},
   }= useForm({ 
    defaultValues:{
      email: '',
      password: '',
    },
  });

  //соз-ла функцию выполняющая тогда когда хукform понял что валидация прошла корректно
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <TextField
        className={styles.field}
        label="E-Mail"
        error
        helperText="Неверно указана почта"
        fullWidth
      />
      <TextField className={styles.field} label="Пароль" fullWidth />
      <Button size="large" variant="contained" fullWidth>
        Войти
      </Button>
    </Paper>
  );
};
