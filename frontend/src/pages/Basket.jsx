import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, getGroupsVk, orderCart, removeFromCart } from "../api/api";
import BasketElement from "../components/BasketElement/BasketElement";
import { badgeValue } from "../store/slice/badgeSlice";

const Basket = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [sum, setSum] = useState(0);
  const [count, setCount] = useState(0);
  const isDisabled = Boolean(groups.length);

  useEffect(() => {
    getGroupsVk({
      isShoppingCart: "True",
    })
      .then((res) => {
        setGroups(res.results);
        setSum(
          res.results
            .map((group) => group.price)
            .reduce(function (sum, current) {
              return sum + current;
            }, 0),
        );
        dispatch(badgeValue(res.count));
      })
      .catch((err) => {
        console.log(`Что-то пошло не так: ${err}`);
      });
  }, [dispatch, count]);

  const handleCart = ({ id }) => {
    addToCart({ id })
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
    removeFromCart({ id })
      .then((res) => {})
      .catch((err) => {
        const { errors } = err;
        if (errors) {
          alert(errors);
        }
      });
  };

  const handleOrderCart = async () => {
    await orderCart()
      .then((res) => {
        // eslint-disable-next-line array-callback-return
        groups.map((group) => {
          const id = group.id;
          removeFromCart({ id })
            .then((res) => {})
            .catch((err) => {
              const { errors } = err;
              if (errors) {
                alert(errors);
              }
            });
        });
        return navigate("/confirm");
      })
      .catch((err) => {
        const { errors } = err;
        if (errors) {
          alert(errors);
        }
      });
  };

  return (
    <Container maxWidth='lg'>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 320 }}
          aria-label='spanning table'>
          <TableHead>
            <TableRow>
              <TableCell
                align='center'
                colSpan={8}>
                Корзина
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align='left'>Название</TableCell>
              <TableCell></TableCell>
              <TableCell align='right'>Цена</TableCell>
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
              <TableCell align='right'>Сумма:</TableCell>
              <TableCell align='right'>{sum} руб.</TableCell>
            </TableRow>
            <TableRow sx={{ display: { xs: "none", sm: "contents" } }}>
              <TableCell>
                <Button
                  variant='contained'
                  onClick={() => navigate(`/`)}>
                  назад
                </Button>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align='right'>
                <Button
                  variant='contained'
                  onClick={() => handleOrderCart()}
                  disabled={!isDisabled}>
                  Заказать
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Box
          sx={{
            display: { xs: "flex", sm: "none" },
            justifyContent: "space-between",
            m: 2,
          }}>
          <Button
            variant='contained'
            onClick={() => navigate(`/`)}>
            назад
          </Button>
          <Button
            variant='contained'
            onClick={() => handleOrderCart()}
            disabled={!isDisabled}>
            Заказать
          </Button>
        </Box>
      </TableContainer>
    </Container>
  );
};

export default Basket;
