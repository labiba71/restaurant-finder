import { makeStyles } from "@material-ui/core";

export const useStyle = makeStyles((theme) => ({
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  subHeader:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    margin: "15px"
  },
  button: {
    margin: "0 10px"
  }
}));
