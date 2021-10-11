import {makeStyles} from "@material-ui/core/styles";
import theme from "./Theme";

const drawerWidth = 220;

export const useStyles = makeStyles({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 16,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  centered: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  fullPage: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  cardLogin: {
    width: '300px'
  },
  itemLink: {
    textDecoration: 'none',
    color: 'black'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  rowRighted: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  columnLeft: {
    display: 'flex',
    flexDirection: 'column'
  },
  p1: {
    padding: theme.spacing(1)
  },
  m2: {
    margin: theme.spacing(2)
  },
  m1: {
    margin: theme.spacing(1)
  },
  ml1: {
    marginLeft: theme.spacing(1)
  },
  ml2: {
    marginLeft: theme.spacing(2)
  },
  mt1: {
    marginTop: theme.spacing(1)
  },
  mt2: {
    marginTop: theme.spacing(2)
  },
  mb1: {
    marginBottom: theme.spacing(1)
  },
  mb2: {
    marginBottom: theme.spacing(2)
  },
  w100: {
    width: "100%"
  },
  h100: {
    height: "100%"
  },
  itemLinkWhite: {
    textDecoration: 'none',
    color: 'white'
  }
});
