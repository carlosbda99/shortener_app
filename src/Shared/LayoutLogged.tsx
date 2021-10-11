import React, {useEffect} from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import HttpRoundedIcon from '@material-ui/icons/HttpRounded';
import BarChartRoundedIcon from '@material-ui/icons/BarChartRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Link} from 'react-router-dom';
import {useStyles} from "../Styles/Style";
import theme from "../Styles/Theme";
import DialogLogout from "./DialogLogout";
import {API} from "../Config/Api";
import {getToken} from "../Services/Auth";
import {User} from "../Types/User";
import {ClassNameMap} from "@material-ui/styles";
import {Tooltip} from "@material-ui/core";

export default function LayoutLogged() {
  const classes: ClassNameMap = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);
  const [openLogout, setOpenLogout] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>("");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleCloseDialogLogout = () => {
    setOpenLogout(false);
  };

  useEffect( () => {
    fetch(`${API}/users/profile`,{
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `${getToken()}`
      })
    })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
        return null;
      })
      .then( (res: User) => {
        setName(res.name);
      })
      .catch(() => {
        setName("");
      });
  }, []);

  return (
    <div>
      <DialogLogout open={openLogout} handleClose={handleCloseDialogLogout}/>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.toolbar}>
          <div className={classes.row}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Shortener - Encurtando URLs
            </Typography>
          </div>
          <div className={classes.row}>
            <Typography variant="h6" noWrap align="right">
              Olá {name}, bem-vindo!
            </Typography>
            <Tooltip title={"Perfil"} enterDelay={1000}>
              <Link to="/profile" className={classes.itemLinkWhite}>
                <IconButton
                  color="inherit"
                  className={classes.ml2}
                >
                  <AccountCircleIcon />
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title={"Sair"} enterDelay={1000}>
              <IconButton
                color="inherit"
                onClick={() => setOpenLogout(true)}
              >
                <ExitToAppIcon/>
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <Typography variant='h6'>Menu</Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {[
            { text: 'Home', icon: (<HomeRoundedIcon/>), link: '/' },
            { text: 'Dashboard', icon: (<DashboardRoundedIcon/>), link: '/dashboard' },
            { text: 'Ranking', icon: (<BarChartRoundedIcon/>), link: '/ranking' },
            { text: 'Encurtar', icon: (<HttpRoundedIcon/>), link: '/shorting' },
          ].map((item) => (
            <Link to={item.link} className={classes.itemLink} key={item.text}>
              <ListItem button key={item.text}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          <Link to='/about' className={classes.itemLink}>
            <ListItem button>
              <ListItemIcon><InfoRoundedIcon/></ListItemIcon>
              <ListItemText primary='Sobre' />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </div>
  );
}
