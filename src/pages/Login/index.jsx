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
 const onSubmit =(values)=> {
console.log(values)
 }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>{/*handleSubmit выполнит onSubmit тогда когда нижнее поля успешно  */}
      <TextField
        className={styles.field}
        label="E-Mail"
        error
        helperText="Неверно указана почта"
        {...register('email', {required:'Укажите почту'})}//регистрирую для reactform 
        fullWidth
      />
      <TextField className={styles.field} label="Пароль" 
      {...register('password',{required:'Укажите пароль'} )}//регистрирую для reactform 
      fullWidth />
      <Button size="large" variant="contained" fullWidth>
        Войти
      </Button>
      </form>
    </Paper>
  );
};
