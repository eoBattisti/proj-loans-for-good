import logo from './logo.svg';
import './App.css';

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import NavBar from './components/Navbar';
import LoanFormService from './services/loan_form';
import LoanFormList from './components/LoanForm/LoanFormList';
import useStyles from './utils/styles';
import Footer from './components/Footer';

function App() {
  const classes = useStyles();

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()
  const [loanForms, setLoanForms] = useState()


  const getLoanForms = async () => {
    try {
      setError(undefined)
      const forms = await LoanFormService.getLoanForms();
      if (forms) {
        console.log(forms)
        setError(false)
        setLoanForms(forms.results)
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getLoanForms();
  }, [])

  return (
    <div className="App">
      <NavBar />
      <main>
        <Grid container alignItems="center" spacing={2} rowSpacing={1} direction="column">
          <Box className={classes.textWrapper}>
            <Typography variant='h6'>
              A Loan For Good é uma organização financeira que se esforça para fazer com que os sonhos se tornem realidade, fornecendo opções de empréstimo personalizadas para indivíduos. Destacando-se pelo seu compromisso com a transparência e a responsabilidade financeira,a Loan For Good é a opção confiável quando se trata de adquirir crédito com inteligência.
            </Typography>
            <Typography variant='h6' textAlign="left" margin="16px 0">
              Confira algumas modalidades abaixo:
            </Typography>
          </Box>
          <LoanFormList data={loanForms} loading={loading} error={error}/>
        </Grid>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
