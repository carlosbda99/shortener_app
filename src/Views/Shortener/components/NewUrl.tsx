import React, {ChangeEvent, useState} from "react";
import {WithApiProps} from "../../../Types/Props";
import {Button, Paper, TextField} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import clsx from "clsx";
import {API} from "../../../Config/Api";
import {getToken} from "../../../Services/Auth";

const useStyles = makeStyles( (theme: Theme) => createStyles({
  m2: {
    margin: theme.spacing(1)
  },
  url: {
    width: '80%'
  },
  paper: {
    display: 'flex',
    alignItems: 'center'
  },
  createButton: {
    marginRight: theme.spacing(1),
    padding: theme.spacing(2),
    width: '20%',
  }
}));

const NewUrl = (props: WithApiProps) => {
  const [url, setUrl] = useState<string>("");
  const classes = useStyles();
  const {setLoading, setError} = props;

  const handleUrl = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const shortingUrl = async () => {
    setLoading(true);
    await fetch(`${API}/urls`,{
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `${getToken()}`
      }),
      body: JSON.stringify({
        url
      })
    })
      .then(res => {
        if (res.status === 200) {
          setLoading(false);
          return res.json();
        }
        setLoading(false);
        setError({status: true, text: "Não foi possível encurtar a url, tente novamente em instantes"});
      })
      .catch(() => {
        setLoading(false);
        setError({status: true, text: "Não foi possível encurtar a url, tente novamente em instantes"});
      });
  };

  return (
    <Paper elevation={3} className={classes.paper}>
      <TextField label="URL" variant="outlined" className={clsx(classes.m2, classes.url)} onChange={handleUrl}/>
      <Button
        variant="contained"
        color="primary"
        className={clsx(classes.createButton)}
        onClick={shortingUrl}
      >
        Encurtar
      </Button>
    </Paper>
  );
};

export default NewUrl;
