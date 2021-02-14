import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [image, setImage] = React.useState(localStorage.getItem('avatar'));
  const open = Boolean(anchorEl);
  useEffect(() => {
    const Apicall = async () => {
      const authObject = {
        'Public-Key': '1514a656-ee38-4378-9f66-d87afa4fe896',
        'User-Name': 'Onto',
        'User-Secret': '123123',
      };
      try {
        const data = await axios.get('https://api.chatengine.io/chats/me/', {
          headers: authObject,
        });
        setImage(data.data.avatar);
        localStorage.setItem('avatar', data.data.avatar);
      } catch (err) {
        console.log(err, '..............');
      }
    };
    if (!image) {
      Apicall();
    }
  }, [image]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick = () => {
    localStorage.clear();
    window.location.reload();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          ></IconButton>
          <Typography variant='h6' className={classes.title}>
            Satirtho
          </Typography>
          {
            <div>
              <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
              >
                {image ? (
                  <Avatar alt={localStorage.getItem('userName')} src={image} />
                ) : (
                  <AccountCircle />
                )}
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} disabled>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleClick}>Logout</MenuItem>
              </Menu>
            </div>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}
