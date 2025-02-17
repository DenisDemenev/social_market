import { Tab, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { TabPanel, TabList, TabContext } from "@mui/lab/";

import GroupsVk from "../components/Groups/GroupsVk";
import { Link } from "react-router-dom";
import GroupsFavorite from "../components/Groups/GroupsFavorite";
import { useDispatch, useSelector } from "react-redux";
import { getMe, selectIsAuth } from "../store/slice/authSlice";

const Home = ({ link }) => {
  const [value, setValue] = useState(link || "vk");
  const isAuth = useSelector(selectIsAuth);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token") || localStorage.getItem("access")) {
      dispatch(getMe());
    }
  }, [dispatch]);

  return (
    <>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label='Соцети'>
            <Tab
              label='Вконтакте'
              value='vk'
              component={Link}
              to={`/vk`}
            />
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
        <TabPanel value='favorite'>
          <GroupsFavorite />
        </TabPanel>
      </TabContext>
      {window.yaContextCb.push(() => {Ya.Context.AdvManager.render({"blockId": "R-A-14187607-1", "type": "floorAd", "platform": "desktop"})})}
    </>  
  );
};

export default Home;
