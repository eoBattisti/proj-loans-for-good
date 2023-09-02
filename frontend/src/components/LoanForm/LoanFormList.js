import React from "react";
import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";

import LoanFormItem from "./LoanFormItem";
import useStyles from "./styles";

const LoanFormList = (props) => {
  const classes = useStyles();

  const {data, loading, error} = props;

  if (loading) {
    return (
      <Box sx={{ display: 'flex' }}>
          <CircularProgress />
      </Box>
    )
  }

  if (data.length > 0) {
    return (
      <Grid
        container spacing={2}
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
        alignContent="center">
          {data.map((item) => {
            return (
              <Grid item key={item.id} className={classes.listItem}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={item.id}
                    id={item.id}>
                    <Typography variant="h5">{item.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <LoanFormItem item={item}/>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            )
          })}

      </Grid>
    )
  }

  if (error) {
    return null;
  }

  return (
    <Grid item md={6} lg={6} xl={6}>
      <Box>
          Desculpe não há registro de formulários cadastrados "
      </Box>
    </Grid>
  );
}

export default LoanFormList;
