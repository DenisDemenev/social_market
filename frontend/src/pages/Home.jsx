import { Grid, Pagination, PaginationItem } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import api from '../api/api';
import GroupHeader from '../components/GroupHeader/GroupHeader';
import Groups from '../components/Groups/Groups';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [groups, setGroups] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [pageCurrent, setPageCurrent] = useState(
    parseInt(location.search?.split('=')[1] || 1)
  );

  const subjectValue = useSelector((state) => state.filter.subject);
  const searchValue = useSelector((state) => state.filter.search);
  const sortValue = useSelector((state) => state.filter.sort);

  useEffect(() => {
    api
      .getGroupsInfo({ pageCurrent, subjectValue, searchValue, sortValue })
      .then((res) => {
        setGroups(res.results);
        setPageCount(Math.ceil(res.count / 50));
        setPageCurrent(parseInt(location.search?.split('=')[1] || 1));
      })
      .catch((err) => {
        console.log(`Что-то пошло не так: ${err}`);
        setPageCurrent(1);
        (() => navigate('/?page=1'))();
      });
  }, [
    subjectValue,
    searchValue,
    pageCurrent,
    sortValue,
    pageCount,
    location.search,
    navigate,
  ]);

  return (
    <Container maxWidth="lg">
      <Grid justifyContent="space-between" container spacing={2}>
        <Container maxWidth="lg">
          <GroupHeader />
          {groups.map((group) => (
            <Groups key={group.id} group={group}></Groups>
          ))}
        </Container>
        <Pagination
          page={pageCurrent}
          count={pageCount}
          color="primary"
          showFirstButton
          showLastButton
          onChange={(_, page) => setPageCurrent(page)}
          style={{ margin: 'auto', paddingBottom: 20, paddingTop: 15 }}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`/?page=${item.page}`}
              {...item}
            />
          )}
        />
      </Grid>
    </Container>
  );
};

export default Home;
