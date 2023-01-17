import { Grid, Tab, Box } from '@mui/material';
import { Container } from '@mui/system';
import { useState } from 'react';
import { TabPanel, TabList, TabContext } from '@mui/lab/';

import GroupsVk from '../components/Groups/GroupsVk';
import { Link } from 'react-router-dom';

const Home = ({ link }) => {
  const [value, setValue] = useState(link || 'vk');

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Grid justifyContent="space-between" container spacing={2}>
        <Container maxWidth="lg" sx={{ mt: 2 }}>
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
            <TabPanel value="telegram">В процессе разработки</TabPanel>
            <TabPanel value="instagram">В процессе разработки</TabPanel>
          </TabContext>
        </Container>
      </Grid>
    </Container>
  );
};

export default Home;
