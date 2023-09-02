import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

import useStyles from "./styles";

const NavBar = () => {
  const classes = useStyles();
  return (
      <header id="navbar" className={classes.root}>
          <nav className={classes.nav}>
              <Grid
                container
                spacing={1}
                direction="row"
                justifyContent="center"
                alignItems="center"
                className={classes.row}>
                  <Typography variant="h2" className={classes.brandText}> Loans for Good</Typography>
              </Grid>
          </nav>
      </header>
  )
};


export default NavBar;
