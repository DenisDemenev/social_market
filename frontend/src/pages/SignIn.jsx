import { useEffect, useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  CssBaseline,
  Button,
  Avatar,
  Snackbar,
  Alert,
  IconButton,
} from '@mui/material';
import api from '../api/api';
import { getMe, selectIsAuth } from '../store/slice/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuth) {
      (() => navigate(`/`))();
    }
  }, [isAuth, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'all',
  });

  const onSubmit = (values) => {
    api
      .signIn(values)
      .then((res) => {
        localStorage.setItem('token', res.auth_token);
        dispatch(getMe());
        (() => navigate(`/`))();
      })
      .catch((err) => {
        setOpen(true);
        console.log(`Что-то пошло не так: ${err}`);
      });
  };

  const handleVk = () => {
    api
      .authVk()
      .then((res) => {
        window.location.replace(res.authorization_url);
      })
      .catch((err) => {
        console.log(`Что-то пошло не так: ${err}`);
      });
  };

  useEffect(() => {
    if (location.search) {
      api
        .loginVk(location.search)
        .then((res) => {
          localStorage.setItem('access', res.access);
          (() => navigate(`/`))();
        })
        .catch((err) => {
          console.log(`Что-то пошло не так: ${err}`);
        });
    }
  }, [location, navigate]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Авторизация
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            {...register('email', { required: 'Укажите email' })}
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            {...register('password', { required: 'Укажите пароль' })}
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            disabled={!isValid}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            Войти
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                  Забыли пароль?
                </Link> */}
            </Grid>
            <Grid item>
              {/* <NavLink to="/register">
                <Typography variant="body2">
                  {'У вас нет аккаунта? Зарегистрироваться'}
                </Typography>
              </NavLink> */}
            </Grid>
          </Grid>
          <Box>
            <Typography variant="body1">Войти через:</Typography>
            <IconButton onClick={() => handleVk()}>
              <Avatar src="/static/images/VK.com-logo.svg.png" />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}>
        <Alert severity="error" sx={{ width: '100%' }}>
          Неверный логин или пароль
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SignIn;
