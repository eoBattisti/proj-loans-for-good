import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#fff",
    width: "100%",
    position: "fixed",
    zIndex: 16,
    boxShadow: "0px 4px 8px 0px #0000001F",
  },
  fixedHeader: {
    background: "#fff",
    left: 0,
    right: 0,
    transition: `all 0.4`,
  },
  brandText: {
    letterSpacing: ".15px",
    fontSize: "16px",
    fontWeight: "500",
  },
  nav: {
    padding: "25px 25px"
  },
  row: {
    alignItems: "center"
  }
}));

export default useStyles;
