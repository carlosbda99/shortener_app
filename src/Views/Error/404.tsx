import React from "react";
import {makeStyles, ThemeProvider} from "@material-ui/styles";
import {useHistory} from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from "@material-ui/core";
import clsx from "clsx";
import theme from "../../Styles/Theme";

const useStyles = makeStyles( {
  root: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  centered: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  cardError: {
    width: '500px',
    height: '500px'
  },
  media: {
    height: '250px'
  },
  itemLink: {
    textDecoration: 'none',
  }
});

export default function Error404() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.root}>
        <Card variant="elevation" className={clsx(classes.centered, classes.cardError)}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image="https://www.hostinger.com.br/tutoriais/wp-content/uploads/sites/12/2018/08/Como-criar-uma-pagina-de-erro-404-personalizada-no-cPanel-1280x720.png"
              title="Error 404"
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p" align="center">
                Não foi possível encontrar a página solicitada
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions className={classes.centered}>
            <Button size="small" variant="outlined" color="primary" onClick={() => history.goBack()}>
              Voltar
            </Button>
          </CardActions>
        </Card>
      </Box>
    </ThemeProvider>
);
}
