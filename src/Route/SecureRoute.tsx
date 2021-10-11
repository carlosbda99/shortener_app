import {useStyles} from "../Styles/Style";
import {Redirect, Route} from "react-router-dom";
import {isAuthenticated} from "../Services/Auth";
import {ThemeProvider} from "@material-ui/core/styles";
import theme from "../Styles/Theme";
import LayoutLogged from "../Shared/LayoutLogged";
import {Breadcrumbs, Typography} from "@material-ui/core";
import React from "react";

const SecureRoute = ({component: CustomComponent, page: Page, ...rest}: any) => {
  const classes = useStyles();

  return (
    <Route
      {...rest}
      render={({location}) =>
        isAuthenticated() ? (
          <div className={classes.root}>
            <ThemeProvider theme={theme}>
              <LayoutLogged/>
              <main className={classes.content}>
                <div className={classes.toolbar}/>
                <Breadcrumbs>
                  <Typography>{Page}</Typography>
                </Breadcrumbs>
                <CustomComponent/>
              </main>
            </ThemeProvider>
          </div>
        ) : (
          <Redirect to={{
            pathname: "/login",
            state: { from: location}
          }}/>
        )
      }
    />
  );
};

export default SecureRoute;
