import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import './NavbarResp.css'

// import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';

const Navbar = () => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [menuOpen, setmenuOpen] = useState(false);
  // const Userid =  props.id;

  return (
    <>
      <nav className="fixed-top shadow-xl">
        <div className="title d-flex-row">
          <a className="navbar-brand fw-bold fs-3 d-flex" href="/">
            <p>Fellow Post</p>
          </a>
        </div>
        {/* Search bar */}
        
        {/* Search end */}
        <div className="menu" onClick={
          () => {
            setmenuOpen(!menuOpen)
            // seticon(!CloseIcon)
          }
         }>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={menuOpen ? "open" : ""}>
          <li>
            <Dropdown size="sm">
              {/* <MenuButton><Avatar alt="s" src="/static/images/avatar/1.jpg" size="sm" /></MenuButton> */}
              <MenuButton><img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/></MenuButton>

              <Menu>
                <MenuItem>Profile</MenuItem>
                <MenuItem>My account</MenuItem>
                <MenuItem>Logout</MenuItem>
              </Menu>
            </Dropdown>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleClose}>
                <Avatar /> {localStorage.getItem('name')}
              </MenuItem>
              <MenuItem onClick={handleClose}>
                {localStorage.getItem('email')}
              </MenuItem>
              <Divider />
              {/* <NavLink to="/" onClick={signoutHandler}> */}
              {/* <MenuItem onClick={signoutHandler} > */}
              <ListItemIcon>
                {/* <Logout fontSize="small" /> */}
              </ListItemIcon>
              <NavLink to="/signup">LogOut</NavLink>
              {/* </MenuItem> */}
              {/* </NavLink> */}
            </Menu>
          </li>
          <li>

            <NavLink to="/home" className="underline">
              {localStorage.getItem('name')}
            </NavLink>

          </li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar;