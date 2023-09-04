import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Snackbar from "@mui/material/Snackbar";

import LoanService from "../../services/loan";
import useStyles from "./styles";

const LoanFormItem = ({ item }) => {
  const classes = useStyles();

  const [buttonLoading, setLoading] = useState(false);
  const [clientDataError, setClientDataError] = useState(false);
  const [extraFieldsError, setExtraFieldsError] = useState(false);
  const [alertOpen, setOpen] = useState(false);
  const [loanResponse, setResponse] = useState({});
  const [error, setError] = useState(false);

  const [formData, setFormData] = useState({
    client_name: "",
    client_document: "",
    data: [],
  });

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChange = (e) => {
    const auxData = { ...formData };
    auxData[e.target.name] = e.target.value;
    setFormData(auxData);
  };

  const handleExtraFieldChanges = (e) => {
    const auxData = { ...formData };
    let exists = false;
    if (!auxData["data"].length) {
      auxData["data"].push({
        field: e.target.name,
        value: e.target.value,
      });
      exists = true;
    } else {
      for (let extra_data of auxData["data"]) {
        if (extra_data["field"] === e.target.name) {
          extra_data["value"] = e.target.value;
          exists = true;
          break;
        }
      }
    }
    if (!exists) {
      auxData["data"].push({
        field: e.target.name,
        value: e.target.value,
      });
    }
    setFormData(auxData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData["client_name"] || !formData["client_document"]) {
        setClientDataError(true);
        return;
      }

      var allFieldsOptional = true
      var find = false;
      for (let field of item.fields) {
        if (!field.optional) {
          for (let el of formData["data"]) {
            if (el.field === field.name) {
              find = true;
              allFieldsOptional = false
              break;
            }
          }
        }
      }



      if (!find && !allFieldsOptional) {
        setExtraFieldsError(true);
        return;
      }
      setExtraFieldsError(false);

      setLoading(true);
      const data = await LoanService.addLoan(formData);
      setResponse(data);
    } catch (e) {
      console.log(e)
      setError(true);
      setOpen(true);
    } finally {
      setLoading(false);
      setOpen(true);
    }
  };

  return (
    <div>
      <Box component="form" autoComplete="true">
        <Box className={classes.fieldWrapper}>
          <TextField
            className={classes.field}
            error={clientDataError}
            required
            id="${item.id}"
            name="client_name"
            label="Nome"
            helperText="Por favor digite seu nome completo"
            onChange={handleChange}
          />
          <TextField
            required={true}
            error={clientDataError}
            id="${item.id}"
            name="client_document"
            label="CPF"
            helperText="Por favor digite os números do seu CPF"
            onChange={handleChange}
            className={classes.field}
          />
          {item.fields.map((field) => {
            return (
              <div>
                {field.ftype === 0 ? (
                  <TextField
                    required={!field.optional}
                    name={field.name}
                    error={extraFieldsError}
                    id={field.id}
                    label={field.name}
                    helperText={field.description}
                    onChange={handleExtraFieldChanges}
                    className={classes.field}
                  />
                ) : field.ftype === 1 ? (
                  <TextField
                    inputProps={{ inputMode: "numeric" }}
                    required={!field.optional}
                    name={field.name}
                    error={extraFieldsError}
                    id={field.id}
                    label={field.name}
                    helperText={field.description}
                    onChange={handleExtraFieldChanges}
                    className={classes.field}
                  />
                ) : field.ftype === 2 ? (
                  <TextField
                    required={!field.optional}
                    type="date"
                    name={field.name}
                    error={extraFieldsError}
                    id={field.id}
                    label={field.name}
                    helperText={field.description}
                    onChange={handleExtraFieldChanges}
                    className={classes.field}
                  />
                ) : field.ftype === 3 ? (
                  <TextField
                    inputProps={{ inputMode: "email" }}
                    required={!field.optional}
                    name={field.name}
                    error={extraFieldsError}
                    id={field.id}
                    label={field.name}
                    helperText={field.description}
                    onChange={handleExtraFieldChanges}
                    className={classes.field}
                  />
                ) : field.ftype === 4 ? (
                  <TextField
                    inputProps={{ inputMode: "tel" }}
                    required={!field.optional}
                    name={field.name}
                    error={extraFieldsError}
                    id={field.id}
                    label={field.name}
                    helperText={field.description}
                    onChange={handleExtraFieldChanges}
                    className={classes.field}
                  />
                ) : null}
              </div>
            );
          })}
        </Box>
        <Box className={classes.buttonFormWrapper}>
          <LoadingButton
            loading={buttonLoading}
            loadingPosition="end"
            variant="contained"
            onClick={handleSubmit}
            endIcon={<SendIcon />}
          >
            Enviar
          </LoadingButton>
        </Box>
        <Snackbar
          open={alertOpen}
          onClose={handleClose}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          {error ? (
            <Alert onClose={handleClose} severity="error">
              {" "}
              Um erro inesperado aconteceu. Por gentileza tente mais tarde.
            </Alert>
          ) : loanResponse.status === 1 || loanResponse.status === 3 ? (
            <Alert onClose={handleClose} severity="success">
              {" "}
              Sucesso ao consultar o empréstio. Entraremos em contato o mais
              breve possivel
            </Alert>
          ) : (
            <Alert onClose={handleClose} severity="error">
              {" "}
              No momento não podemos realizar o empréstimo.
            </Alert>
          )}
        </Snackbar>
      </Box>
    </div>
  );
};

export default LoanFormItem;
