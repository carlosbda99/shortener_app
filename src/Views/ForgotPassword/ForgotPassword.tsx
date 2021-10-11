import React, {ChangeEvent, Props, useState} from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader, CircularProgress,
  TextField
} from "@material-ui/core";
import {ClassNameMap, ThemeProvider} from "@material-ui/styles";
import {API} from "../../Config/Api";
import {Link} from "react-router-dom";
import clsx from "clsx";
import theme from "../../Styles/Theme";
import AlertLabel from "../../Shared/AlertLabel";
import {CustomError} from "../../Types/Error";
import {useStyles} from "../../Styles/Style";

const ForgotPassword = (props: Props<any>) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<CustomError>({status: false, text: ""});
  const [loading, setloading] = useState<boolean>(false);
  const [openAlertLabel, setOpenAlertLabel] = useState<boolean>(false);

  const classes: ClassNameMap = useStyles();

  const validateSubmit = () => {
    return !(username && email);
  };

  const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const submitLogin = async () => {
    setloading(true);
    await fetch(`${API}/auth/reset-password`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username, email
      })
    })
      .then( res => {
        if (res.status === 401) {
          setError({status: true, text: "Houve um problema ao resetar a senha"});
          return res;
        }
      })
      .catch( () => {
        setError({status: true, text: "Houve um problema inesperado, tente novamente em instantes"});
      })
      .finally( () => {
        setEmail("");
        setUsername("");
        setloading(false);
        setOpenAlertLabel(true);
      })
    ;
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.fullPage}>
        <Card variant="elevation" className={clsx(classes.centered, classes.cardLogin)}>
          <CardHeader title={"Reset de senha"}/>
          <CardContent className={classes.centered}>
            <TextField
              autoComplete="off"
              onChange={handleUsername}
              value={username}
              variant="outlined"
              label="Usuário"
              margin="normal"
              disabled={loading}
            />

            <TextField
              autoComplete="off"
              onChange={handleEmail}
              value={email}
              variant="outlined"
              label="Email"
              margin="normal"
              disabled={loading}
            />
          </CardContent>
          <CardActions className={classes.centered}>
            <div>
              <Button
                disabled={validateSubmit() || loading}
                variant="contained"
                color="primary"
                onClick={submitLogin}
              >
                Solicitar senha
              </Button>
            </div>
            <div className={classes.mt2}>
              <Link to={"/login"} className={classes.itemLink}>
                <Button
                  variant="outlined"
                  color="primary"
                >
                  Login
                </Button>
              </Link>
            </div>
            <div className={classes.m2}>
              {
                error.status ?
                  <AlertLabel
                    text={error.text}
                    open={openAlertLabel}
                    setOpen={setOpenAlertLabel}
                  /> :
                  <AlertLabel
                    text={`Um email foi enviado com a nova senha para '${email}'`}
                    open={openAlertLabel}
                    severity={'success'}
                    setOpen={setOpenAlertLabel}
                  />
              }
            </div>
            {
              loading ?
                <div className={classes.m2}>
                  <CircularProgress/>
                </div> : null
            }
          </CardActions>
        </Card>
      </Box>
    </ThemeProvider>
  );
} ;

export default ForgotPassword;
