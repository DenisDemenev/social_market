import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { pageCurrentValue, pageCountValue } from '../../store/paginatorSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import GroupCardVk from '../GroupCard/GroupCardVk';
import api from '../../api/api';
import Paginator from '../Paginator';

const GroupsVk = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [groups, setGroups] = useState([]);

  const subjectValue = useSelector((state) => state.filter.subject);
  const isLabel = useSelector((state) => state.filter.label);
  const searchValue = useSelector((state) => state.filter.search);
  const sortValue = useSelector((state) => state.filter.sort);
  const pageCount = useSelector((state) => state.paginator.pageCount);
  const pageCurrent = useSelector((state) => state.paginator.pageCurrent);

  useEffect(() => {
    api
      .getGroupsVk({
        pageCurrent,
        subjectValue,
        searchValue,
        sortValue,
        isLabel,
      })
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
        (() => navigate(`/vk?page=1`))();
      });
  }, [
    subjectValue,
    searchValue,
    pageCurrent,
    sortValue,
    dispatch,
    location.search,
    navigate,
    isLabel,
  ]);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} flexDirection="column">
        <Paginator page={pageCurrent} count={pageCount} link={'vk'} />
        {groups.map((group) => (
          <GroupCardVk key={group.id} group={group}></GroupCardVk>
        ))}
        <Paginator page={pageCurrent} count={pageCount} link={'vk'} />
      </Grid>
    </Container>
  );
};

export default GroupsVk;
