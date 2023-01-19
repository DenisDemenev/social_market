import { useState, useEffect } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Avatar,
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  CssBaseline,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import api from '../api/api';
import { useNavigate } from 'react-router-dom/';
import { Navigate } from 'react-router-dom/';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../store/authSlice';

const SignUp = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const isAuth = useSelector(selectIsAuth);
  useEffect(() => {
    if (isAuth) {
      <Navigate to="/" />;
    }
  }, [isAuth]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      lastName: '',
      firstName: '',
      email: '',
      password: '',
    },
    mode: 'all',
  });

  const onSubmit = (data) => {
    api
      .signUp(data)
      .then((res) => {
        (() => navigate(`/auth`))();
      })
      .catch((err) => {
        setOpen(true);
        console.log(`Что-то пошло не так: ${err}`);
      });
  };

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
          Регистрация
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={Boolean(errors.firstName?.message)}
                helperText={errors.firstName?.message}
                {...register('firstName', { required: 'Укажите имя' })}
                name="firstName"
                fullWidth
                id="firstName"
                label="Имя"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={Boolean(errors.lastName?.message)}
                helperText={errors.lastName?.message}
                {...register('lastName', { required: 'Укажите фамилию' })}
                fullWidth
                id="lastName"
                label="Фамилия"
                name="lastName"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={Boolean(errors.email?.message)}
                helperText={errors.email?.message}
                {...register('email', { required: 'Укажите Email' })}
                fullWidth
                id="email"
                label="Email"
                name="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={Boolean(errors.password?.message)}
                helperText={errors.password?.message}
                {...register('password', { required: 'Укажите пароль' })}
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
              />
            </Grid>
          </Grid>
          <Button
            disabled={!isValid}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            Зарегистрироваться
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <NavLink to="/auth">
                <Typography variant="body2">
                  У вас уже есть аккаунт? Войти
                </Typography>
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}>
        <Alert severity="error" sx={{ width: '100%' }}>
          Что-то пошло не так
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SignUp;
