import React from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { pageCurrentValue } from '../store/slice/paginatorSlice';

const Paginator = ({ page, count, link }) => {
  const dispatch = useDispatch();
  return (
    <Pagination
      page={page}
      count={count}
      color="primary"
      showFirstButton
      showLastButton
      hideNextButton
      hidePrevButton
      boundaryCount={0}
      onChange={(_, page) => dispatch(pageCurrentValue(page))}
      sx={{
        margin: 'auto',
        paddingBottom: 2,
        paddingTop: 1,
      }}
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
