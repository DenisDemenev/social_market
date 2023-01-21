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
import { useNavigate } from 'react-router-dom/';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, selectIsAuth } from '../store/slice/authSlice';

const SignUp = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const isRegister = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (isAuth) {
      return (() => navigate(`/`))();
    }
  }, [isAuth, navigate]);

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
    dispatch(registerUser(data));
    if (!(isRegister === 'error')) {
      return (() => navigate(`/auth`))();
    } else {
      setOpen(true);
    }
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
                {...register('password', {
                  required: 'Укажите пароль',
                  minLength: {
                    value: 8,
                    message: 'Длина пароля не менее 8 символов ',
                  },
                })}
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
          `Что-то пошло не так: ${error}`
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SignUp;
