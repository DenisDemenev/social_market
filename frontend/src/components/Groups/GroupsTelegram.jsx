import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  pageCurrentValue,
  pageCountValue,
} from '../../store/slice/paginatorSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import GroupCardTelegram from '../GroupCard/GroupCardTelegram';
import api from '../../api/api';
import Paginator from '../Paginator';

const GroupsTelegram = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [groups, setGroups] = useState([]);

  const subjectValue = useSelector((state) => state.filter.subject);
  const searchValue = useSelector((state) => state.filter.search);
  const sortValue = useSelector((state) => state.filter.sort);
  const pageCount = useSelector((state) => state.paginator.pageCount);
  const pageCurrent = useSelector((state) => state.paginator.pageCurrent);

  useEffect(() => {
    api
      .getGroupsTelegram({ pageCurrent, subjectValue, searchValue, sortValue })
      .then((res) => {
        setGroups(res.results);
        dispatch(pageCountValue(Math.ceil(res.count / 50)));
        dispatch(
          pageCurrentValue(parseInt(location.search?.split('=')[1] || 1))
        );
      })
      .catch((err) => {
        console.log(`Что-то пошло не так: ${err}`);
        dispatch(pageCurrentValue(1));
        (() => navigate(`/telegram?page=1`))();
      });
  }, [
    subjectValue,
    searchValue,
    pageCurrent,
    sortValue,
    dispatch,
    location.search,
    navigate,
  ]);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} flexDirection="column">
        <Paginator page={pageCurrent} count={pageCount} link={'telegram'} />
        {groups.map((group) => (
          <GroupCardTelegram
            key={group.tg_id}
            group={group}></GroupCardTelegram>
        ))}
        <Paginator page={pageCurrent} count={pageCount} link={'telegram'} />
      </Grid>
    </Container>
  );
};

export default GroupsTelegram;
