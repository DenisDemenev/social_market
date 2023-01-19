import { useState } from 'react';
import { Link as NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Button,
  Link,
} from '@mui/material';
import SearchMenu from '../SearchMenu/SearchMenu';
import { subjectValue, searchValue, sortValue } from '../../store/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../../store/authSlice';

const drawerWidth = 240;

const Header = ({ window, children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector((state) => state.auth.data);
  console.log(user);

  const handleClickLogo = () => {
    dispatch(subjectValue(''));
    dispatch(searchValue(''));
    dispatch(sortValue(''));
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleLogout = () => {
    dispatch(logout({}));
    localStorage.removeItem('token');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
        }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" edge="start">
            <NavLink
              style={{ textDecoration: 'none', color: 'inherit' }}
              to="/"
              onClick={handleClickLogo}>
              SocialMax
            </NavLink>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {!isAuth ? (
            <>
              <Button
                variant="outlined"
                color="inherit"
                size="small"
                startIcon={<AccountCircleIcon />}
                sx={{ mr: 1 }}>
                <NavLink
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  to="/auth">
                  Войти
                </NavLink>
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<MailOutlineOutlinedIcon />}
                size="small">
                <Link
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  href="https://vk.me/id773837067"
                  target={'_blank'}>
                  Написать нам
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Typography sx={{ mr: 1 }}>{user.username}</Typography>
              <Button
                onClick={handleLogout}
                variant="outlined"
                color="inherit"
                size="small">
                Выйти
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}>
          <SearchMenu />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', lg: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open>
          <SearchMenu />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { lg: `calc(100% - ${drawerWidth}px)` },
        }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Header;
