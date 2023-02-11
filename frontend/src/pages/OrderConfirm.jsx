import { Box, Button, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { badgeValue } from '../store/slice/badgeSlice';

const OrderConfirm = () => {
  const dispatch = useDispatch();
  dispatch(badgeValue(0));

  return (
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
            <Typography
              sx={{ py: 8 }}
              align="center"
              color="textPrimary"
              variant="h2">
              Заказ успешно оформлен!
            </Typography>
            <Typography align="center" color="textPrimary" variant="h4">
              Спасибо за заказ!
            </Typography>
            <Typography align="center" color="textPrimary" variant="h4">
              Мы свяжемся с вами в ближайшее время.
            </Typography>

            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button
                component="button"
                startIcon={<ArrowBackIcon fontSize="small" />}
                sx={{ mt: 10 }}
                variant="contained">
                На главную
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default OrderConfirm;
