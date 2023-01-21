import { Tab, Box } from '@mui/material';
import { useState } from 'react';
import { TabPanel, TabList, TabContext } from '@mui/lab/';

import GroupsVk from '../components/Groups/GroupsVk';
import GroupsTelegram from '../components/Groups/GroupsTelegram';
import { Link } from 'react-router-dom';
import GroupsInstagram from '../components/Groups/GroupsInstagram';

const Home = ({ link }) => {
  const [value, setValue] = useState(link || 'vk');

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="Соцети">
          <Tab label="Вконтакте" value="vk" component={Link} to={`/vk`} />
          <Tab
            label="Telegram"
            value="telegram"
            component={Link}
            to={`/telegram`}
          />
          <Tab
            label="Instangram"
            value="instagram"
            component={Link}
            to={`/instagram`}
          />
        </TabList>
      </Box>
      <TabPanel value="vk">
        <GroupsVk />
      </TabPanel>
      <TabPanel value="telegram">
        <GroupsTelegram />
      </TabPanel>
      <TabPanel value="instagram">В процессе разработки</TabPanel>
    </TabContext>
  );
};

export default Home;
