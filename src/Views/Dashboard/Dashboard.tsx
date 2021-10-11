import React, {useEffect, useState} from "react";
import {Card, CardContent, Grid, LinearProgress, Typography} from "@material-ui/core";
import {Url} from "../../Types/Url";
import {API} from "../../Config/Api";
import {getToken} from "../../Services/Auth";
import {User} from "../../Types/User";
import {CustomError} from "../../Types/Error";
import AlertWindow from "../../Shared/AlertWindow";

export default function Dashboard() {
  const [urls, setUrls] = useState<Url[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [openAlertWindow, setOpenAlertWindow] = useState<boolean>(false);
  const [error, setError] = useState<CustomError>({status: false, text: ""});
  const [userId, setUserId] = useState<number | null>(null);

  useEffect( () => {
    setLoading(true);
    fetch(`${API}/users/urls`,{
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
        setError({status: true, text: "Não foi possível carregar as URLs corretamente"});
        setOpenAlertWindow(true);
        return null;
      })
      .then( (res: User) => {
        setUrls(res.urls);
        setUserId(res.id);
      })
      .catch(() => {
        setError({status: true, text: "Houve um erro inesperado no carregamento das informações"});
        setOpenAlertWindow(true);
      })
      .finally( () => {
        setLoading(false);
      });
  }, []);

  if (loading) return <LinearProgress/>;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card variant="outlined" elevation={3}>
            <CardContent>
              <Typography variant="h4" component="h2">
                Sua URL mais visitada
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                {`http://localhost:5000/shortener/${userId}/${(urls ?? [])[0]?.urlShortened}`}
              </Typography>
              <Typography color="textSecondary">
                {(urls ?? [])[0]?.url}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card variant="outlined" elevation={3}>
            <CardContent>
              <Typography variant="h4" component="h2">
                Suas URLs
              </Typography>
              <Typography variant="h5" color="textSecondary" component="h2">
                {urls?.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card variant="outlined" elevation={3}>
            <CardContent>
              <Typography variant="h4" component="h2">
                Total de visitas
              </Typography>
              <Typography variant="h5" color="textSecondary" component="h2">
                {urls?.reduce((cont, user) => cont + user.visits, 0)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <AlertWindow text={error.text} open={openAlertWindow} setOpen={setOpenAlertWindow}/>
    </>
  );
}
