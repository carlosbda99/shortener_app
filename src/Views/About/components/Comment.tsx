import React, {ChangeEvent} from "react";
import {useStyles} from "../../../Styles/Style";
import {TextField} from "@material-ui/core";
import {CommentProps} from "../../../Types/Props";

const Comment = (props: CommentProps) => {
  const classes = useStyles();
  const {open, comment, setComment} = props;

  const handleComment = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  if (!open) return null;

  return (
    <div className={classes.m2}>
      <TextField
        label="Deixe também um comentário"
        multiline
        rows={4}
        maxRows={4}
        fullWidth
        variant="outlined"
        onChange={handleComment}
        value={comment}
      />
    </div>
  );
};

export default Comment;
