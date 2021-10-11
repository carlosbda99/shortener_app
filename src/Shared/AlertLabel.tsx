import React from "react";
import {Alert} from "@material-ui/lab";
import {AlertProps} from "../Types/Props";

const AlertLabel = (props: AlertProps) => {
  const {text, open, setOpen} = props;

  const handleClose = () => {
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div>
      <Alert severity={props.severity ?? 'warning'} onClose={handleClose}>
        {text}
      </Alert>
    </div>
  );
};

export default AlertLabel;
