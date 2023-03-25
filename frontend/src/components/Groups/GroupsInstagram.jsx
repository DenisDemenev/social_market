import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  pageCurrentValue,
  pageCountValue,
} from '../../store/slice/paginatorSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import GroupCardInstagram from '../GroupCard/GroupCardInstagram';
import { getGroupsInstagram } from '../../api/api';
import Paginator from '../Paginator';

const GroupsInstagram = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [groups, setGroups] = useState([]);

  const categoryValue = useSelector((state) => state.filter.category);
  const searchValue = useSelector((state) => state.filter.search);
  const sortValue = useSelector((state) => state.filter.sort);
  const pageCount = useSelector((state) => state.paginator.pageCount);
  const pageCurrent = useSelector((state) => state.paginator.pageCurrent);

  useEffect(() => {
    getGroupsInstagram({
      pageCurrent,
      categoryValue,
      searchValue,
      sortValue,
    })
      .then((res) => {
        setGroups(res.results);
        dispatch(pageCountValue(Math.ceil(res.count / 50)));
        dispatch(
          pageCurrentValue(parseInt(location.search?.split('=')[1] || 1)),
        );
      })
      .catch((err) => {
        console.log(`Что-то пошло не так: ${err}`);
        dispatch(pageCurrentValue(1));
        (() => navigate(`/instagram?page=1`))();
      });
  }, [
    categoryValue,
    searchValue,
    pageCurrent,
    sortValue,
    dispatch,
    location.search,
    navigate,
  ]);

  return (
    <Container maxWidth='lg'>
      <Grid
        container
        spacing={2}
        flexDirection='column'>
        <Paginator
          page={pageCurrent}
          count={pageCount}
          link={'telegram'}
        />
        {groups.map((group) => (
          <GroupCardInstagram
            key={group.id}
            group={group}></GroupCardInstagram>
        ))}
        <Paginator
          page={pageCurrent}
          count={pageCount}
          link={'telegram'}
        />
      </Grid>
    </Container>
  );
};

export default GroupsInstagram;
