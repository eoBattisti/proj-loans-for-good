import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  listItem: {
    width: "70%"
  },
  field: {
    margin: "8px 0px !important",
    width: "70%"
  },
  fieldWrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr '
  },
  buttonFormWrapper: {
    display: "flex",
    justifyContent: "flex-end"
  }
}));

export default useStyles;
