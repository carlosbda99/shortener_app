import React, {useState} from "react";
import {Card, CardContent, CardMedia, Divider, IconButton, Link, Typography} from "@material-ui/core";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import EmailIcon from '@material-ui/icons/Email';
import {useStyles} from "../../Styles/Style";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import Rate from "./components/Rate";
import {ClassNameMap} from "@material-ui/styles";

export default function About() {
  const [rated, setRated] = useState<boolean>(false);
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
          <Typography gutterBottom variant="body1" component="p" align="center">
            Aqui você pode gerar urls encurtadas e utilizá-las para encaminhamento.
          </Typography>
          <Typography gutterBottom variant="body1" component="p" align="center">
            <Link href={"https://github.com/carlosbda99"} target="_blank" color="inherit">
              <IconButton>
                  <GitHubIcon/>
              </IconButton>
            </Link>
            <Link href={"https://www.linkedin.com/in/carlos-henrique-azevedo/"} target="_blank" color="inherit">
              <IconButton>
                <LinkedInIcon/>
              </IconButton>
            </Link>
            <Link href={"mailto:carlosbda99@hotmail.com"} target="_blank" color="inherit">
              <IconButton>
                <EmailIcon/>
              </IconButton>
            </Link>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" align="center">
            Aplicação desenvolvida por Carlos Azevedo
          </Typography>
          <Divider className={classes.m2}/>
          {
            rated ?
              <Typography
                align="center"
                component="div"
              >
                Obrigado pela sua avaliação! <ThumbUpAltIcon color="primary" style={{marginBottom: '-4px'}}/>
              </Typography> :
              <Rate setRated={setRated}/>
          }
        </CardContent>
      </Card>
    </div>
  );
}
