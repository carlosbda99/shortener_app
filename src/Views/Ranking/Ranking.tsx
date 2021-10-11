import React, {useEffect, useState} from "react";
import TableUrl from "./components/TableUrl";
import AlertWindow from "../../Shared/AlertWindow";
import {LinearProgress} from "@material-ui/core";
import {CustomError} from "../../Types/Error";
import {Url} from "../../Types/Url";
import {API} from "../../Config/Api";
import {getToken} from "../../Services/Auth";
import {User} from "../../Types/User";

export default function Ranking() {
  const [loading, setLoading] = useState<boolean>(false);
  const [openAlertWindow, setOpenAlertWindow] = useState<boolean>(false);
  const [error, setError] = useState<CustomError>({status: false, text: ""});
  const [urls, setUrls] = useState<Url[] | null>(null);
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
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <LinearProgress/>;

  return (
    <>
      <TableUrl urls={urls} userId={userId} error={error}/>
      <AlertWindow open={openAlertWindow} setOpen={setOpenAlertWindow} text={error.text}/>
    </>
  );
}
