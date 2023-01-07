import {
  Button,
  Divider,
  List,
  ListItem,
  MenuItem,
  TextField,
  Toolbar,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { subjectValue, searchValue, sortValue } from '../../store/filterSlice';
import api from '../../api/api';

const SearchMenu = () => {
  const [subject, setSubject] = useState([]);
  const value = useSelector((state) => state.filter.subject);
  const search = useSelector((state) => state.filter.search);
  const sort = useSelector((state) => state.filter.sort);

  const dispatch = useDispatch();

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
  const handleChangeSearchValue = (e) => {
    dispatch(searchValue(e.target.value));
  };

  const handleChangeSortValue = (e) => {
    dispatch(sortValue(e.target.value));
  };

  const handleClickButtonClear = () => {
    dispatch(subjectValue(''));
    dispatch(searchValue(''));
    dispatch(sortValue(''));
  };

  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem>
          <TextField
            id="sort"
            label="Сортировать"
            select
            fullWidth
            value={sort}
            onChange={handleChangeSortValue}>
            <MenuItem value="-price">Цена по возрастанию</MenuItem>
            <MenuItem value="price">Цена по убыванию</MenuItem>
            <MenuItem value="cpm">CPM по возростанию</MenuItem>
            <MenuItem value="-cpm">CPM по убыванию</MenuItem>
          </TextField>
        </ListItem>
        <ListItem>
          <TextField
            id="outlined-basic"
            label="Поиск"
            variant="outlined"
            value={search}
            onChange={handleChangeSearchValue}
          />
        </ListItem>
        <ListItem>
          <TextField
            id="category"
            label="Категория"
            select
            fullWidth
            value={value}
            onChange={handleChangeSubjectValue}>
            {subject.map((item) => (
              <MenuItem key={item.id} value={item.slug}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>
        </ListItem>
        <ListItem>
          <Button
            color="error"
            variant="contained"
            sx={{ marginX: 'auto' }}
            onClick={handleClickButtonClear}>
            Сбросить
          </Button>
        </ListItem>
      </List>
      <Divider />
    </div>
  );
};

export default SearchMenu;
