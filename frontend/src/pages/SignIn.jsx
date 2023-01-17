import React from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as NavLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  CssBaseline,
  Button,
  Avatar,
} from '@mui/material';

const SignIn = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
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
          Авторизация
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Запомните меня"
            /> */}
          <Button
            type="submit"
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
              <NavLink to="/register">
                <Typography variant="body2">
                  {'У вас нет аккаунта? Зарегистрироваться'}
                </Typography>
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
