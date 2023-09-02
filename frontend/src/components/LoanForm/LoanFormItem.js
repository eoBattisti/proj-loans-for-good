import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send"
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import LoanService from "../../services/loan";
import useStyles from "./styles";

const LoanFormItem = ({ item }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    client_name: "",
    client_document: "",
    data: [],
  });

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
      if (!formData["client_name"] || !formData["client_document"]){
        return;
      }
      await LoanService.addLoan(formData);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Typography variant="h6">{item.description}</Typography>
      <Box
        className={classes.fieldWrapper}
        component="form"
        autoComplete="off"
      >
        <TextField
          className={classes.field}
          required
          id="${item.id}"
          name="client_name"
          label="Nome"
          helperText="Por favor digite seu nome completo"
          onChange={handleChange}
        />
        <TextField
          required={true}
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
              {field.optional ? (
                <TextField
                  name={field.name}
                  id={field.id}
                  label={field.name}
                  helperText={field.description}
                  onChange={handleExtraFieldChanges}
                  className={classes.field}
                />
              ) : (
                <TextField
                  name={field.name}
                  required
                  id={field.id}
                  label={field.name}
                  helperText={field.description}
                  onChange={handleExtraFieldChanges}
                  className={classes.field}
                />
              )}
            </div>
          );
        })}
      </Box>
      <Box className={classes.buttonFormWrapper}>
        <Button variant="contained" onClick={handleSubmit} endIcon={<SendIcon/>} >Enviar</Button>
      </Box>
    </div>
  );
};

export default LoanFormItem;
