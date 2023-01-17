import React from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { pageCurrentValue } from '../store/paginatorSlice';

const Paginator = ({ page, count, link }) => {
  const dispatch = useDispatch();
  return (
    <Pagination
      page={page}
      count={count}
      color="primary"
      showFirstButton
      showLastButton
      onChange={(_, page) => dispatch(pageCurrentValue(page))}
      style={{ margin: 'auto', paddingBottom: 20, paddingTop: 15 }}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`/${link}?page=${item.page}`}
          {...item}
        />
      )}
    />
  );
};

export default Paginator;
