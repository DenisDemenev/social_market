import { Tab, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { TabPanel, TabList, TabContext } from '@mui/lab/';

import GroupsVk from '../components/Groups/GroupsVk';
import GroupsTelegram from '../components/Groups/GroupsTelegram';
import { Link } from 'react-router-dom';
// import GroupsInstagram from '../components/Groups/GroupsInstagram';
import GroupsFavorite from '../components/Groups/GroupsFavorite';
import { useDispatch, useSelector } from 'react-redux';
import { getMe, selectIsAuth } from '../store/slice/authSlice';

const Home = ({ link }) => {
  const [value, setValue] = useState(link || 'vk');
  const isAuth = useSelector(selectIsAuth);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList
          onChange={handleChange}
          aria-label='Соцети'>
          <Tab
            label='Вконтакте'
            value='vk'
            component={Link}
            to={`/vk`}
          />
          <Tab
            label='Telegram'
            value='telegram'
            component={Link}
            to={`/telegram`}
          />
          {/* <Tab
            label="Instangram"
            value="instagram"
            component={Link}
            to={`/instagram`}
          /> */}
          {isAuth ? (
            <Tab
              label='Избранные'
              value='favorite'
              component={Link}
              to={`/favorite`}
            />
          ) : (
            <></>
          )}
        </TabList>
      </Box>
      <TabPanel value='vk'>
        <GroupsVk />
      </TabPanel>
      <TabPanel value='telegram'>
        <GroupsTelegram />
      </TabPanel>
      {/* <TabPanel value="instagram">
        <GroupsInstagram />
      </TabPanel> */}
      <TabPanel value='favorite'>
        <GroupsFavorite />
      </TabPanel>
    </TabContext>
  );
};

export default Home;
