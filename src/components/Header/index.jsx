import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';//делаю ссылки
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { useSelector } from 'react-redux';//извлекать данные из состояния хранилища Redux помощью функции выбора
import { useDispatch} from 'react-redux';
import {logout, selectIsAuth } from '../../redux/slices/auth';


export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);//при авторизации

  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout());
      // при log out удаляю токен 
      window.localStorage.removeItem('token')
    };
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>Evgeniya Blog</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">{/*вместо href to перекинь на создание статьи*/}
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
