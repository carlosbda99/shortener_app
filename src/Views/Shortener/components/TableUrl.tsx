import React from "react";
import {TableURLProps} from "../../../Types/Props";
import {Button, Link, Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles( (theme: Theme) => createStyles ({
  urlListItem: {
    backgroundColor: "#F4F4F4",
    margin: theme.spacing(2)
  },
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2)
  }
}));

const TableUrl = (props: TableURLProps) => {
  const {error, urls, userId} = props;

  const classes = useStyles();

  if (error?.status || urls?.length === 0) return null;

  return (
    <Paper className={classes.paper}>
      <TableContainer>
        <Table>
          <TableBody>
            {urls?.map((url) => (
              <TableRow key={url.urlShortened} className={classes.urlListItem}>
                <TableCell component="th" scope="row">
                  {url.url}
                </TableCell>
                <TableCell>
                  <Link href={`http://localhost:5000/shortener/${userId}/${url.urlShortened}`}>http://localhost:5000/shortener/{userId}/{url.urlShortened}</Link>
                </TableCell>
                <TableCell>
                  {url.visits}
                </TableCell>
                <TableCell align="right">
                  <Button
                    color="primary"
                  >
                    <DeleteIcon/>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TableUrl;
