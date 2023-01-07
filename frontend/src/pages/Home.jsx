import { Grid, Pagination, PaginationItem } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import api from '../api/api';
import GroupHeader from '../components/GroupHeader/GroupHeader';
import Groups from '../components/Groups/Groups';

const Home = () => {
  const [groups, setGroups] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [pageCurrent, setPageCurrent] = useState(1);

  const subjectValue = useSelector((state) => state.filter.subject);
  const searchValue = useSelector((state) => state.filter.search);
  const sortValue = useSelector((state) => state.filter.sort);

  useEffect(() => {
    api
      .getGroupsInfo({ pageCurrent, subjectValue, searchValue, sortValue })
      .then((res) => {
        setGroups(res.results);
        setPageCount(Math.ceil(res.count / 20));
      })
      .catch((err) => {
        setPageCurrent(1);
        console.log(`Что-то пошло не так: ${err}`);
      });
  }, [subjectValue, searchValue, pageCurrent, sortValue]);

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
              component={NavLink}
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
