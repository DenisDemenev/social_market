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
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  subjectValue,
  searchValue,
  sortValue,
  labelValue,
  priceMaxValue,
  priceMinValue,
} from '../../store/slice/filterSlice';
import api from '../../api/api';
import { selectIsAuth } from '../../store/slice/authSlice';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';

const SearchMenu = () => {
  const [subject, setSubject] = useState([]);
  const value = useSelector((state) => state.filter.subject);
  const search = useSelector((state) => state.filter.search);
  const sort = useSelector((state) => state.filter.sort);
  const priceMin = useSelector((state) => state.filter.priceMin);
  const priceMax = useSelector((state) => state.filter.priceMax);
  const isLabel = useSelector((state) => state.filter.label);
  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();
  const location = useLocation();
  const priceValue =
    location.pathname === '/instagram' ? 'price_post' : 'price';

  useEffect(() => {
    api
      .getSubject()
      .then((res) => {
        setSubject(res);
      })
      .catch((err) => {
        console.log(`Что-то пошло не так: ${err}`);
      });
  }, []);

  const handleChangeSubjectValue = (e) => {
    dispatch(subjectValue(e.target.value));
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
    dispatch(subjectValue(''));
    dispatch(searchValue(''));
    dispatch(sortValue(''));
    dispatch(labelValue(false));
    dispatch(priceMaxValue(''));
    dispatch(priceMinValue(''));
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
            onChange={handleChangeSubjectValue}>
            {subject.map((item) => (
              <MenuItem
                key={item.id}
                value={item.slug}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>
        </ListItem>
        {isAuth ? (
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
        )}
        <ListItem>
          <Button
            color='error'
            variant='contained'
            sx={{ marginX: 'auto' }}
            onClick={handleClickButtonClear}>
            Сбросить
          </Button>
        </ListItem>
      </List>
      <Divider />
      {isAuth ? (
        <Box sx={{ pt: 5 }}>
          <Button
            variant='contained'
            color='primary'
            startIcon={<MailOutlineOutlinedIcon />}>
            <Link
              style={{ textDecoration: 'none', color: 'inherit' }}
              href='https://vk.me/id773837067'
              target={'_blank'}>
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
