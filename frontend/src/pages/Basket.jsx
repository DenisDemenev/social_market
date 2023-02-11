import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import BasketElement from '../components/BasketElement/BasketElement';
import { badgeValue } from '../store/slice/badgeSlice';

const Basket = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [sum, setSum] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    api
      .getGroupsVk({
        isShoppingCart: 'True',
      })
      .then((res) => {
        setGroups(res.results);
        setSum(
          res.results
            .map((group) => group.price)
            .reduce(function (sum, current) {
              return sum + current;
            }, 0)
        );
        dispatch(badgeValue(res.count));
      })
      .catch((err) => {
        console.log(`Что-то пошло не так: ${err}`);
      });
  }, [dispatch, count]);

  const handleCart = ({ id }) => {
    api
      .addToCart({ id })
      .then((res) => {
        const groupsUpdated = groups.map((group) => {
          if (group.id === id) {
            group.is_in_shopping_cart = true;
          }
          return group;
        });
        setGroups(groupsUpdated);
      })
      .catch((err) => {
        const { errors } = err;
        if (errors) {
          alert(errors);
        }
      });
  };
  const handleDeleteCart = ({ id }) => {
    const groupsUpdated = groups.map((group) => {
      if (group.id === id) {
        group.is_in_shopping_cart = false;
      }
      return group;
    });
    setGroups(groupsUpdated);
    setCount(count + 1);
    api
      .removeFromCart({ id })
      .then((res) => {})
      .catch((err) => {
        const { errors } = err;
        if (errors) {
          alert(errors);
        }
      });
  };

  return (
    <Container maxWidth="lg">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 380 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={8}>
                Корзина
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="left">Название</TableCell>
              <TableCell></TableCell>
              <TableCell align="right">Цена</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groups.map((group) => (
              <BasketElement
                key={group.id}
                group={group}
                handleCart={handleCart}
                handleDeleteCart={handleDeleteCart}></BasketElement>
            ))}

            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="right">Сумма:</TableCell>
              <TableCell align="right">{sum} руб.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Button variant="contained" onClick={() => navigate(`/`)}>
                  назад
                </Button>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="right">
                <Button variant="contained">Заказать</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Basket;