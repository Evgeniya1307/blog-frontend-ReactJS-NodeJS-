import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form"; //буду получать email и пароль
import { Navigate } from "react-router-dom";
import styles from "./Login.module.scss";
import { fethAuth, selectIsAuth } from "../../redux/slices/auth";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth); //авторизованы или нет
  const dispatch = useDispatch();

  const {
    register, //вытаскиваю
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "12testa@13.ru",
      password: "12345",
    },
    //валидация в том случае если эти поля поменялись
    mode: "onChange",
  });

  //соз-ла функцию выполняющая тогда когда хукform понял что валидация прошла корректно
  const onSubmit = (values) => {
    dispatch(fethAuth(values)); //ожидает получить объект с email,password и его передаст на бэк
  };
  if (isAuth) {
    return <Navigate to="/" />; //если авторизован перейди на главную страницу
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/*handleSubmit выполнит onSubmit тогда когда нижнее поля успешно  */}
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)} //если инфа получена то true
          helperText={errors.email?.message} //хукuseform вернёт formstate и из него вытаскиваю объект errors
          {...register("email", { required: "Укажите почту" })} //регистрирую для reactform
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Пароль"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", { required: "Укажите пароль" })}
          fullWidth
        />
        <Button type="sumbit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
