import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {logout} from "../Services/Auth";
import {useHistory} from "react-router-dom";
import {DialogProps} from "../Types/Props";

export default function DialogLogout(props: DialogProps) {
  const history = useHistory();
  const {open, handleClose} = props;

  const logoutUser = () => {
    logout();
    history.push("/login");
  };

  if (!open) return null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Logout"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Tem certeza que deseja sair do sistema?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus variant="contained">
          Não
        </Button>
        <Button onClick={logoutUser} color="primary" variant="outlined">
          Sim
        </Button>
      </DialogActions>
    </Dialog>
);
}
