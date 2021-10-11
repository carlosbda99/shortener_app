import React from "react";
import {Card, CardContent, CardMedia, Typography} from "@material-ui/core";
import {useStyles} from "../Styles/Style";
import {ClassNameMap} from "@material-ui/styles";

export default function Home() {
  const classes: ClassNameMap = useStyles();

  return (
    <div className={classes.centered}>
      <Card>
        <CardMedia
          component="img"
          alt="Media Shortener"
          height="140"
          image="https://blog.hotmart.com/blog/2019/08/670x419-BR-encurtador-url.jpg"
          title="Media Shortener"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" align="center">
            SHORTENER URL
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" align="center">
            Seja bem-vindo, aqui você poderá encurtar suas URLs, verificar o ranking das mais visitadas e gerenciar
            suas URLs encurtadas
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
