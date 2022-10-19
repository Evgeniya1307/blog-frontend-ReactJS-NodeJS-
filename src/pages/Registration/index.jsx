import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import styles from "./Login.module.scss";
import { fethRegister } from "../../redux/slices/auth";

export const Registration = () => {
  const dispatch = useDispatch();
  // вытаскиваю функции из react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "Evgeniya Fox",
      email: "12tesataaj@13.ru",
      password: "12345",
      //avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
    },
    // обьясняю что валидация будет происходить если же эти поля поменялись
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fethRegister(values));
    if (!data.payload) {
      return alert("Не удалось зарегистрироваться!");
    }
    // при успешном входе сохраняю токен
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          // обьясняю что если password рендерится - то сразу их регистрируем в useForm
          {...register("fullName", { required: "Укажите полное имя" })}
          className={styles.field}
          label="Полное имя"
          fullWidth
        />
        <TextField
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", { required: "Укажите email" })}
          className={styles.field}
          label="E-Mail"
          fullWidth
        />
        <TextField
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          // обьясняю что если password рендерится - то сразу их регистрируем в useForm
          {...register("password", { required: "Укажите пароль" })}
          className={styles.field}
          label="Пароль"
          fullWidth
        />
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
