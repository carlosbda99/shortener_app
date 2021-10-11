import React, {ChangeEvent, useState} from "react";
import {Button, Card, CardActions, CardContent, TextField, Typography} from "@material-ui/core";
import {useStyles} from "../../../Styles/Style";
import {API} from "../../../Config/Api";
import {getToken} from "../../../Services/Auth";
import {ResetPasswordProps} from "../../../Types/Props";
import AlertWindow from "../../../Shared/AlertWindow";

const ResetPassword = (props: ResetPasswordProps) => {
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPassword2, setNewPassword2] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [openAlertWindow, setOpenAlertWindow] = useState<boolean>(false);
  const {error, setError} = props;
  const classes = useStyles();

  const handlePassword = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleNewPassword = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewPassword(e.target.value);
  };

  const handleNewPassword2 = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewPassword2(e.target.value);
  };

  const validateSubmit = (): boolean => {
    if (password && (newPassword.length > 0 && (newPassword === newPassword2))) return false;
    return true;
  };

  const submitResetPassword = async ():Promise<void> => {
    setLoading(true);
    await fetch(`${API}/users/new-password`,{
      method: 'POST',
      body: JSON.stringify({
        password, newPassword
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `${getToken()}`
      })
    })
      .then(res => {
        if (!res.ok) setError({status: true, text: "Não foi possível alterar a senha corretamente"});
      })
      .catch(() => {
        setError({status: true, text: "Houve um erro inesperado no registro das informações"});
      })
      .finally(() => {
        setPassword("");
        setNewPassword("");
        setNewPassword2("");
        setLoading(false);
        setOpenAlertWindow(true);
      });
  };

  return (
    <>
      <Card variant="outlined" elevation={3}>
        <CardContent className={classes.columnLeft}>
          <Typography variant="h4" component="h2">
            Reset de senha
          </Typography>
          <TextField
            label={"Senha atual"}
            onChange={handlePassword}
            value={password}
            type={"password"}
            disabled={loading}
            variant={"outlined"}
            className={classes.mt1}
          />
          <TextField
            label={"Nova senha"}
            onChange={handleNewPassword}
            value={newPassword}
            type={"password"}
            disabled={loading}
            variant={"outlined"}
            className={classes.mt1}
          />
          <TextField
            label={"Confirmação de senha"}
            onChange={handleNewPassword2}
            value={newPassword2}
            type={"password"}
            disabled={loading}
            variant={"outlined"}
            className={classes.mt1}
          />
        </CardContent>
        <CardActions className={classes.rowRighted}>
          <Button
            variant={"contained"}
            color={"primary"}
            disabled={validateSubmit() || loading}
            onClick={submitResetPassword}
          >Alterar</Button>
        </CardActions>
      </Card>
      {
        error.status ?
          <AlertWindow text={error.text} open={openAlertWindow} setOpen={setOpenAlertWindow}/> :
          <AlertWindow text={"Senha alterada com sucesso"} severity={"success"} open={openAlertWindow} setOpen={setOpenAlertWindow}/>
      }
    </>
  );
};

export default ResetPassword;
