import React, {ChangeEvent, useEffect, useState} from "react";
import {Card, CardContent, Grid, IconButton, LinearProgress, TextField, Typography} from "@material-ui/core";
import {API} from "../../Config/Api";
import {getToken} from "../../Services/Auth";
import {User} from "../../Types/User";
import {CustomError} from "../../Types/Error";
import AlertWindow from "../../Shared/AlertWindow";
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import {useStyles} from "../../Styles/Style";
import ResetPassword from "./components/ResetPassword";

export default function Profile() {
  const [loading, setLoading] = useState<boolean>(false);
  const [openAlertWindow, setOpenAlertWindow] = useState<boolean>(false);
  const [editEmail, setEditEmail] = useState<boolean>(false);
  const [editName, setEditName] = useState<boolean>(false);
  const [error, setError] = useState<CustomError>({status: false, text: ""});
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  const classes = useStyles();

  const handleEmail = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handleName = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  const submitEmailChange = async (): Promise<void> => {
    await updateEmail('email', email);
    setEmail("");
    setEditEmail(false);
  };

  const submitNameChange = async (): Promise<void> => {
    await updateEmail('name', name);
    setName("");
    setEditName(false);
  };

  const updateEmail = (property: string, value: string) => {
    fetch(`${API}/users`,{
      method: 'PATCH',
      body: JSON.stringify({
        [property]: value
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `${getToken()}`
      })
    })
      .then(res => {
        if (!res.ok) {
          setOpenAlertWindow(true);
          setError({status: true, text: "Não foi possível carregar as informações de perfil corretamente"});
        }
        getData();
      })
      .catch(() => {
        setError({status: true, text: "Houve um erro inesperado no carregamento das informações"});
        setOpenAlertWindow(true);
      })
      .finally( () => {
        setLoading(false);
      });
  };

  const getData = () => {
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
        setOpenAlertWindow(true);
        setError({status: true, text: "Não foi possível carregar as informações de perfil corretamente"});
        return null;
      })
      .then( (res: User) => {
        setUser(res);
      })
      .catch(() => {
        setError({status: true, text: "Houve um erro inesperado no carregamento das informações"});
        setOpenAlertWindow(true);
      })
      .finally( () => {
        setLoading(false);
      });
  };

  useEffect( () => {
    setLoading(true);
    getData();
  }, []);

  if (loading) return <LinearProgress/>;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card variant="outlined" elevation={3} className={classes.h100}>
            <CardContent>
              <Typography variant="h4" component="h2">
                Nome de usuário
              </Typography>
              <Typography variant="h5" color="textSecondary" gutterBottom>
                {`${user?.username}`}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card variant="outlined" elevation={3} className={classes.h100}>
            <CardContent>
              <Typography variant="h4" component="h2">
                Email
              </Typography>
              <Typography variant="h5" color="textSecondary" component="h2">
              {
                editEmail ?
                  <>
                    <TextField label={"Email"} value={email} onChange={handleEmail}/>
                    <IconButton onClick={submitEmailChange}><CheckRoundedIcon/></IconButton>
                  </> :
                  user?.email
              }
                <IconButton onClick={() => setEditEmail(!editEmail)}>
                  {
                    editEmail ?
                      <CloseRoundedIcon/> :
                      <EditRoundedIcon/>
                  }
                </IconButton>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card variant="outlined" elevation={3} className={classes.h100}>
            <CardContent>
              <Typography variant="h4" component="h2">
                Nome
              </Typography>
              <Typography variant="h5" color="textSecondary" component="h2">
                {
                  editName ?
                    <>
                      <TextField label={"Nome"} value={name} onChange={handleName}/>
                      <IconButton onClick={submitNameChange}><CheckRoundedIcon/></IconButton>
                    </> :
                    user?.name
                }
                <IconButton onClick={() => setEditName(!editName)}>
                  {
                    editName ?
                      <CloseRoundedIcon/> :
                      <EditRoundedIcon/>
                  }
                </IconButton>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <ResetPassword error={error} setError={setError}/>
        </Grid>
      </Grid>
      <AlertWindow open={openAlertWindow} setOpen={setOpenAlertWindow} text={error.text}/>
    </>
  );
}
