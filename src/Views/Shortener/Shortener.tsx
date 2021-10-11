import React, {useEffect, useState} from "react";
import NewUrl from "./components/NewUrl";
import AlertWindow from "../../Shared/AlertWindow";
import {LinearProgress} from "@material-ui/core";
import TableUrl from "./components/TableUrl";
import {CustomError} from "../../Types/Error";
import {API} from "../../Config/Api";
import {getToken} from "../../Services/Auth";
import {User} from "../../Types/User";
import {Url} from "../../Types/Url";

export default function Shortener() {
  const [loading, setLoading] = useState<boolean>(false);
  const [openAlertWindow, setOpenAlertWindow] = useState<boolean>(false);
  const [error, setError] = useState<CustomError>({status: false, text: ""});
  const [urls, setUrls] = useState<Url[] | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect( () => {
    setLoading(true);
    fetch(`${API}/users/detail`,{
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `${getToken()}`
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        setOpenAlertWindow(true);
        setError({status: true, text: "Não foi possível carregar as URLs corretamente"});
      })
      .then( (res: User) => {
        setUrls(res.urls);
        setUserId(res.id);
      })
      .catch(() => {
        setError({status: true, text: "Houve um erro inesperado no carregamento das informações"});
        setOpenAlertWindow(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <LinearProgress/>;

  return (
    <>
      <NewUrl setError={setError} setLoading={setLoading}/>
      <AlertWindow open={openAlertWindow} setOpen={setOpenAlertWindow} text={error.text}/>
      <TableUrl urls={urls} userId={userId} error={error}/>
    </>
  );
}
