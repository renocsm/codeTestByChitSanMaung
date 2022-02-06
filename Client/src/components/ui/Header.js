import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import { Home } from '@material-ui/icons';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { MenuItem } from '@material-ui/core';
import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
 
import Equalizer from '@material-ui/icons/Equalizer';
 
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import { Link } from 'react-router-dom';

// customize 
import { Controls } from '../../resuableComponents/Controls'
import { useHistory } from 'react-router-dom'


// auth 
import {useUser} from '../../Auth/jwtAuth/useUser' 
 
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  DrawerItem: {
    backgroundColor: "#1B2635",
    color: '#D7C7CC'
  },
  root: {
    display: 'flex',
  },
  drawer: {
    background: "#1B2635",
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    background: "#1B2635",
    width: drawerWidth,
  },
  content: {
    flex: 1,
    padding: theme.spacing(2),
    overflowX:'hidden'
  },
  root1: {
    width: '100%',
    maxWidth: 360,

  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  RightCorner:{
    marginLeft:theme.spacing(2)
  } ,
  title: {
    flexGrow: 1
  },
  logout:{
    background:theme.palette.secondary.main,
    marginRight:'12px',
    color:'red'
  }
}));

const ResponsiveDrawer = (props) => {
  const { window, children } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const history = useHistory();
  const user = useUser();
 


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const [openItem1, setOpenItem1] = useState(false);
  const [openItem2, setOpenItem2] = useState(false);
  const [openItem3, setOpenItem3] = useState(false);
  const [selected, setSelected] = useState(null);


  const handleClick = (clickItem: String, selected) => {

    setSelected(selected)
    switch (clickItem) {
      case "Dashboard": setOpenItem1(!openItem1); setOpenItem2(false); setOpenItem3(false)
        break;
      case "Setting": setOpenItem2(!openItem2); setOpenItem1(false); setOpenItem3(false)
        break;
      case "MasterData": setOpenItem3(!openItem3); setOpenItem1(false); setOpenItem2(false)
        break;
      case null || undefined || '': setOpenItem1(false); setOpenItem2(false)
        break;
      default:
    }
  };

  const handleClickForSubMenu = (selected) => {
    setSelected(selected);
  }

  const logout = async () => {
    await localStorage.removeItem('token'); 
    history.push('/login');
  }

  const generateKey = (data) => {
    const random = Math.random() * (1000 - 1) + 1;
    return `${ data }_${random}_${ new Date().getTime() }`;
}


  const itemList = [
    { 
      
      ItemName: "Buy EVoucher",
      selected: "item1",
      route: "/buyEvoucher",
      clickCondition: openItem1,
      IconName: Home,
    },

    {
      ItemName : "OrderList",
      selected: "item2",
      route : "/orderList",
      clickCondition : openItem2,
      IconName : Equalizer,
    },

    {
      ItemName : "VoucherList", 
      selected : "item3", 
      route: "/voucherList", 
      clickCondition : openItem3, 
      IconName :  AirplaneTicketIcon
    }
    
    
  ]

  const drawer = (
    <div className={classes.DrawerItem}>
      <div className={classes.toolbar} />
      <Divider />
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">

          </ListSubheader>
        }
        className={classes.root1}
      >

        {itemList.map((item, index) => (
          <div key={ generateKey(item.ItemName) } >
            <MenuItem
              key={ generateKey(item.ItemName) }
              component={Link}
              to={item.route ? item.route : '/'}
              button
              onClick={() => handleClick(item.ItemName, item.selected)}
              selected={selected === item.selected}>
              <ListItemIcon>
                {
                  item.IconName ? (<item.IconName style={{ color: "#D7C7CC" }} />) : (<StarBorder style={{ color: "#D7C7CC" }} />)
                }
              </ListItemIcon>
              <ListItemText primary={<Typography type="body2" style={{ color: "#D7C7CC", fontSize: 16, fontWeight: "450px", }}>{item.ItemName}</Typography>} />

              {item.subMenus ? (
                item.clickCondition ? <ExpandLess key={ generateKey(item.ItemName) } /> : <ExpandMore  key={ generateKey(item.ItemName) }/>
              ) : (<></>)}
            </MenuItem>

            {
              item.subMenus ? (
                <Collapse in={item.clickCondition} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {
                      item.subMenus.map((item, index) => (
                        <MenuItem
                          key={ generateKey(item.ItemName) }
                          component={Link}
                          to={item.route ? item.route : '/'}
                          button
                          className={classes.nested}
                          onClick={() => handleClickForSubMenu(item.selected)}
                          selected={selected === item.selected}>
                          <ListItemIcon>
                            {
                              item.IconName ? (<item.IconName style={{ color: "#D7C7CC" }} />) : (<StarBorder style={{ color: "#D7C7CC" }} />)
                            }
                          </ListItemIcon>
                          <ListItemText primary={<Typography type="body2" style={{ color: "#D7C7CC", fontSize: 14, fontWeight: "300px", }}>{item.ItemName}</Typography>} />
                        </MenuItem>
                      ))
                    }
                  </List>
                </Collapse>
              ) : (<></>)
            }
          </div>
        )
        )}
      </List>
    </div >
  )
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h2" noWrap color="secondary" className={classes.title}>
            E VOUCHER
          </Typography>
          
          {
            user === null || user === undefined ? (<></>) :(<>{user.Username}</>)
          }

          <div >           
            <Controls.Button
              variant="contained"
              color="primary"
              size="large"
              text="Sign Out"
              onClick={logout}
              className={classes.logout}
            />
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
         
           <div style={{minHeight:500}}>
             {children}
           </div> 
      </main> 
    </div>
     
  );
}

ResponsiveDrawer.propTypes = {

  window: PropTypes.func,

};

export default ResponsiveDrawer;