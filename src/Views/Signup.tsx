import React, {ChangeEvent, Props, useState} from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  LinearProgress,
  TextField,
  ThemeProvider
} from "@material-ui/core";
import {ClassNameMap} from "@material-ui/styles";
import {useHistory} from "react-router-dom";
import {API} from "../Config/Api";
import clsx from "clsx";
import AlertLabel from "../Shared/AlertLabel";
import theme from "../Styles/Theme";
import {CustomError} from "../Types/Error";
import {useStyles} from "../Styles/Style";

const Signup = (props: Props<any>) => {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [openAlertLabel, setOpenAlertLabel] = useState<boolean>(false);
  const [btnText, setBtnText] = useState<string>("Cancelar");
  const [errorSignup, setErrorSignup] = useState<CustomError>({status: false, text: ""});

  const classes: ClassNameMap = useStyles();
  const history = useHistory();

  const validateSignup = (): boolean => {
    return !(username && password && (password === password2));
  };

  const handleName = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.currentTarget.value);
  };

  const handleUsername = (e: ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.currentTarget.value);
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.currentTarget.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.currentTarget.value);
  };

  const handlePassword2 = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword2(e.currentTarget.value);
  };

  const submitSignup = async (): Promise<void> => {
    setLoading(true);
    await fetch(`${API}/signup`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username, password, name, email
      })
    })
      .then( res => {
        if (res.status === 200) {
          setBtnText("Login");
          return res;
        }
        setErrorSignup({status: true, text: "Houve um problema no cadastro, tente novamente em instantes"});
        return res;
      })
      .catch(() => {
        setBtnText("Cancelar");
        setErrorSignup({status: true, text: "Houve um erro inesperado, tente novamente em instantes"});
      })
      .finally(() => {
        setLoading(false);
        setOpenAlertLabel(true);
      });
  };

  if (loading) return <LinearProgress/>;

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.fullPage}>
        <Card variant="elevation" className={clsx(classes.centered, classes.cardLogin)}>
          <CardHeader title={"Área de registro"}/>
          <CardContent className={classes.centered}>
            <TextField
              autoComplete="off"
              onChange={handleName}
              variant="outlined"
              label="Nome"
              margin="normal"
            />

            <TextField
              autoComplete="off"
              onChange={handleUsername}
              variant="outlined"
              label="Usuário"
              margin="normal"
            />

            <TextField
              autoComplete="off"
              onChange={handleEmail}
              variant="outlined"
              label="Email"
              margin="normal"
            />

            <TextField
              autoComplete="off"
              onChange={handlePassword}
              type="password"
              variant="outlined"
              label="Senha"
              margin="normal"
            />

            <TextField
              autoComplete="off"
              onChange={handlePassword2}
              type="password"
              variant="outlined"
              label="Confirmação de senha"
              margin="normal"
            />

          </CardContent>
          <CardActions className={classes.centered}>
            <div className={classes.m1}>
              <Button
                disabled={validateSignup()}
                variant="contained"
                color="primary"
                onClick={submitSignup}
              >
                Cadastrar
              </Button>
            </div>
            <div className={classes.m1}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => history.push("/login")}
              >
                {btnText}
              </Button>
            </div>
            <div className={classes.m1}>
              <AlertLabel
                severity={btnText === "Login" ? 'success' : 'warning'}
                open={openAlertLabel}
                setOpen={setOpenAlertLabel}
                text={btnText === "Login" ? 'Usuário cadastrado com sucesso' : errorSignup.text}
              />
            </div>
          </CardActions>
        </Card>
      </Box>
    </ThemeProvider>
  );
} ;

export default Signup;
