import React, {useState} from "react";
import {useStyles} from "../../../Styles/Style";
import {Button, Divider, Typography} from "@material-ui/core";
import {Rating} from "@material-ui/lab";
import clsx from "clsx";
import Comment from "./Comment";
import {API} from "../../../Config/Api";
import {getToken} from "../../../Services/Auth";
import {RateProps} from "../../../Types/Props";

const Rate = (props: RateProps) => {
  const [rate, setRate] = useState<number>(2.5);
  const [openComment, setOpenComment] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<boolean>(false);
  const classes = useStyles();
  const {setRated} = props;

  const handleRate = (e: any) => {
    setRate(+e.target.value);
    setRating(!rating);
    setOpenComment(!openComment);
  };

  const handleCommentAndRate = () => {
    setRating(!rating);
    setOpenComment(!openComment);
  };

  const submitCommentAndRate = async () => {
    await fetch(`${API}/users/rate`,{
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `${getToken()}`
      }),
      body: JSON.stringify({
        rate,
        comment
      })
    }).then(res => {
      if (res.ok) {
        setOpenComment(false);
      }
    }).finally( () => setRated(true));
  };

  return (
    <>
      <div className={clsx(classes.centered, classes.m2, classes.w100)}>
        <Divider/>
        <Typography>
          Deixe-nos sua avaliação
        </Typography>
        <Rating
          onChange={handleRate}
          value={rate}
          precision={0.5}
          disabled={rating}
        />
      </div>
      <Comment open={openComment} setComment={setComment} comment={comment}/>
      {openComment && (
        <div className={classes.rowRighted}>
          <Button
            variant="outlined"
            color="primary"
            className={classes.m2}
            onClick={handleCommentAndRate}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.m2}
            onClick={submitCommentAndRate}
          >
            Enviar
          </Button>
        </div>
      )}
    </>
  );
};

export default Rate;
