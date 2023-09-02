import React from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import useStyles from "./styles";

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center">
        <Typography variant="body1" color="textSecondary">
          Loan for Good, 2023
        </Typography>
      </Grid>
    </footer>
  );
};

export default Footer;
