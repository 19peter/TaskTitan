import "../../styles/Navbar.css";
import { Link, Outlet } from "react-router-dom";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import ChecklistIcon from '@mui/icons-material/Checklist';

import LogoutIcon from '@mui/icons-material/Logout';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';

const pages = ['Home'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {/* <div>
          {" "}
          <header className="header">

            <h1 style={{color:'#66fcf1' , fontSize: '2em'}}>TaskTitan</h1>
            <nav className="navbar">
            </nav>
          </header>
        </div> */}


        <AppBar position="static" style={{ backgroundColor: "#0b0c10" }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <ChecklistIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} style={{marginLeft: "20px" , color: "rgba(255, 99, 132, 1)"}} />
              {/* <StickyNote2Icon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}

                
              >
                TaskTitan
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Link href='/home' style={{textDecoration: 'none'}}>
                        <Typography textAlign="center">Home</Typography>
                      </Link>
                    </MenuItem>
                  ))}





                </Menu>
              </Box>
              <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                TaskTitan
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button>
                    <Link
                      style={{ color: 'white', textDecoration: "none" }}
                      key={page}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                      to={`${page}`}
                    >
                      {page}
                    </Link>
                  </Button>
                ))}
              </Box>

             

              <Box sx={{ flexGrow: 0 }}>
                <MoveToInboxIcon style={{marginRight: "1vw"}}></MoveToInboxIcon>
                <LogoutIcon></LogoutIcon>
              </Box>


            </Toolbar>
          </Container>
        </AppBar>
      </div>

      <div style={{ height: "100%" }}>
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default Navbar;


