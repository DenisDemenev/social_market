import { Box, Button, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

const Page404 = () => (
  <>
    <Box
      component="main"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        minHeight: '100%',
      }}>
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}>
          <Typography align="center" color="textPrimary" variant="h3">
            404: Страницы, которую вы ищете, здесь нет.
          </Typography>
          <Typography align="center" color="textPrimary" variant="subtitle2">
            Возможно вы пришли сюда по ошибке
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <img
              alt="Under development"
              src="/static/images/undraw_page_not_found_su7k.svg"
              style={{
                marginTop: 50,
                display: 'inline-block',
                maxWidth: '100%',
                width: 560,
              }}
            />
          </Box>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
              sx={{ mt: 3 }}
              variant="contained">
              На главную
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  </>
);

export default Page404;
