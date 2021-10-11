import React from "react";
import {Alert} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core/styles";
import {AlertProps} from "../Types/Props";

const useStyles = makeStyles({
  alert: {
    position: 'fixed',
    'bottom': '30px',
    'right': '30px'
  }
});

const AlertWindow = (props: AlertProps) => {
  const classes = useStyles();
  const {text, open, setOpen} = props;

  if (!open) return null;

  const closeAlert = () => setOpen(false);

  return (
    <Alert severity={props.severity ?? "warning"} className={classes.alert} onClose={closeAlert}>
      {text}
    </Alert>
  );
};

export default AlertWindow;
