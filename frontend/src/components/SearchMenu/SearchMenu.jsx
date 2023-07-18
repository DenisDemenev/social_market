import {
  Button,
  Divider,
  List,
  ListItem,
  MenuItem,
  TextField,
  Toolbar,
  Checkbox,
  FormControlLabel,
  Link,
  Box,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryValue,
  searchValue,
  sortValue,
  labelValue,
  priceMaxValue,
  priceMinValue,
} from "../../store/slice/filterSlice";
import { getCategory } from "../../api/api";
import { selectIsAuth } from "../../store/slice/authSlice";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";

const SearchMenu = () => {
  const [category, setCategory] = useState([]);
  const value = useSelector((state) => state.filter.category);
  const search = useSelector((state) => state.filter.search);
  const sort = useSelector((state) => state.filter.sort);
  const priceMin = useSelector((state) => state.filter.priceMin);
  const priceMax = useSelector((state) => state.filter.priceMax);
  const isLabel = useSelector((state) => state.filter.label);
  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();
  const location = useLocation();
  const priceValue =
    location.pathname === "/instagram" ? "price_post" : "price";

  useEffect(() => {
    getCategory()
      .then((res) => {
        setCategory(res);
      })
      .catch((err) => {
        console.log(`Что-то пошло не так: ${err}`);
      });
  }, []);

  const handleChangecategoryValue = (e) => {
    dispatch(categoryValue(e.target.value));
  };

  const handleChangeLabelValue = (e) => {
    dispatch(labelValue(e.target.checked));
  };

  const handleChangeSearchValue = (e) => {
    dispatch(searchValue(e.target.value));
  };

  const handleChangeSortValue = (e) => {
    dispatch(sortValue(e.target.value));
  };

  const handleChangePriceMinValue = (e) => {
    dispatch(priceMinValue(e.target.value));
  };

  const handleChangePriceMaxValue = (e) => {
    dispatch(priceMaxValue(e.target.value));
  };

  const handleClickButtonClear = () => {
    dispatch(categoryValue(""));
    dispatch(searchValue(""));
    dispatch(sortValue(""));
    dispatch(labelValue(false));
    dispatch(priceMaxValue(""));
    dispatch(priceMinValue(""));
  };

  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem>
          <TextField
            id='sort'
            label='Сортировать'
            select
            fullWidth
            value={sort}
            onChange={handleChangeSortValue}>
            <MenuItem value={priceValue}>Цена по возрастанию</MenuItem>
            <MenuItem value={`-${priceValue}`}>Цена по убыванию</MenuItem>
            <MenuItem value='cpm'>CPM по возростанию</MenuItem>
            <MenuItem value='-cpm'>CPM по убыванию</MenuItem>
          </TextField>
        </ListItem>
        <ListItem>
          <TextField
            id='outlined-basic'
            label='Цена от'
            variant='outlined'
            value={priceMin}
            onChange={handleChangePriceMinValue}
          />
          <Typography
            component='span'
            sx={{ paddingX: 0.5 }}>
            -
          </Typography>
          <TextField
            id='outlined-basic'
            label='до'
            variant='outlined'
            value={priceMax}
            onChange={handleChangePriceMaxValue}
          />
        </ListItem>
        <ListItem>
          <TextField
            id='outlined-basic'
            label='Поиск'
            variant='outlined'
            value={search}
            onChange={handleChangeSearchValue}
          />
        </ListItem>

        <ListItem>
          <TextField
            id='category'
            label='Категория'
            select
            fullWidth
            value={value}
            onChange={handleChangecategoryValue}>
            {category.map((item) => (
              <MenuItem
                key={item.id}
                value={item.slug}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>
        </ListItem>
        {/* {isAuth ? (
          <ListItem>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleChangeLabelValue}
                  checked={isLabel}
                />
              }
              label='Группы без метки'
            />
          </ListItem>
        ) : (
          <></>
        )} */}
        <ListItem>
          <Button
            color='error'
            variant='contained'
            sx={{ marginX: "auto" }}
            onClick={handleClickButtonClear}>
            Сбросить
          </Button>
        </ListItem>
      </List>
      <Divider />
      <Button
        size='small'
        sx={{ marginY: 2 }}>
        <NavLink
          style={{ textDecoration: "none", color: "inherit" }}
          to='rules'>
          Ограничения на содержимое рекламных публикаций
        </NavLink>
      </Button>
      <Button size='small'>
        <NavLink
          style={{ textDecoration: "none", color: "inherit" }}
          to='order-variant'>
          Как заказать
        </NavLink>
      </Button>
      <Button
        size='small'
        sx={{ marginY: 2 }}>
        <NavLink
          style={{ textDecoration: "none", color: "inherit" }}
          to='payment'>
          Способы оплаты
        </NavLink>
      </Button>
      <Divider />
      {isAuth ? (
        <Box sx={{ pt: 5 }}>
          <Button
            variant='contained'
            color='primary'
            startIcon={<MailOutlineOutlinedIcon />}>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              href='https://vk.me/id773837067'
              target={"_blank"}>
              Написать нам
            </Link>
          </Button>
        </Box>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchMenu;
