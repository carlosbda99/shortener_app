import React, {ChangeEvent, Props, useState} from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader, CircularProgress,
  TextField, Typography
} from "@material-ui/core";
import {ClassNameMap, ThemeProvider} from "@material-ui/styles";
import {login} from "../../Services/Auth";
import {API} from "../../Config/Api";
import {useHistory, Link} from "react-router-dom";
import clsx from "clsx";
import theme from "../../Styles/Theme";
import AlertLabel from "../../Shared/AlertLabel";
import SignUpAction from "./components/SignUpAction";
import {CustomError} from "../../Types/Error";
import {useStyles} from "../../Styles/Style";

const Login = (props: Props<any>) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorLogin, setErrorLogin] = useState<CustomError>({status: false, text: ""});
  const [loading, setloading] = useState<boolean>(false);
  const [openAlertLabel, setOpenAlertLabel] = useState<boolean>(false);
  const history = useHistory();

  const classes: ClassNameMap = useStyles();

  const validateLogin= () => {
    return !(username && password);
  };

  const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const submitLogin = async () => {
    setloading(true);
    await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
       username, password
      })
    })
      .then( res => {
        if (res.status === 401) {
          setloading(false);
          setOpenAlertLabel(true);
          setErrorLogin({status: true, text: "Houve um problema ao entrar, verifique usuário e senha."});
          return res.json();
        }
        return res.json();
      })
      .then( res => {
        setloading(false);
        login(res);
        history.push("/");
      })
      .catch( () => {
        setloading(false);
        setOpenAlertLabel(true);
        setErrorLogin({status: true, text: "Houve um problema inesperado, tente novamente em instantes"});
      })
    ;
  };
  // if (loading) return <LinearProgress/>;

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.fullPage}>
        <Card variant="elevation" className={clsx(classes.centered, classes.cardLogin)}>
          <CardHeader title={"Área de login"}/>
          <CardContent className={classes.centered}>
            <TextField
              autoComplete="off"
              onChange={handleUsername}
              variant="outlined"
              label="Usuário"
              margin="normal"
              disabled={loading}
            />

            <TextField
              autoComplete="off"
              onChange={handlePassword}
              type="password"
              variant="outlined"
              label="Senha"
              margin="normal"
              disabled={loading}
            />
          </CardContent>
          <CardActions className={classes.centered}>
            <div>
              <Button
                disabled={validateLogin() || loading}
                variant="contained"
                color="primary"
                onClick={submitLogin}
              >
                Entrar
              </Button>
            </div>
            <SignUpAction/>
            <Link to={"/reset-password"} className={classes.itemLink}>
              <Typography variant={"body2"}>
                Esqueci minha senha
              </Typography>
            </Link>
            <div className={classes.m2}>
              <AlertLabel
                text={errorLogin.text}
                open={openAlertLabel}
                setOpen={setOpenAlertLabel}
              />
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

export default Login;
