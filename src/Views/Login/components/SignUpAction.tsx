import React from "react";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";
import {createTheme, makeStyles} from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";

const theme = createTheme({
  palette: {
    primary: purple
  },
});

const useStyles = makeStyles({
  margin2: {
    marginTop: theme.spacing(2)
  },
  links: {
    textDecoration: 'none'
  }
});

const SignUpAction = () => {
  const classes = useStyles();

  return (
    <div className={classes.margin2}>
      <Link to="/signup" className={classes.links}>
        <Button
          variant="outlined"
          color="primary"
        >
          Cadastrar
        </Button>
      </Link>
    </div>
  );
};

export default SignUpAction;
