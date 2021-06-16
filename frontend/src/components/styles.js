import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  // global
  card: {
    backgroundColor: theme.palette.primary.main + " !important",
    color: theme.palette.primary.contrastText + " !important",
  },
  button: {
    backgroundColor: theme.palette.success.main + " !important",
    color: theme.palette.primary.contrastText + " !important",
  },
  card_link: {
    textDecoration: "underline",
  },
  card_text: {
    marginBottom: "1rem !important",
  },
  card_text_last: {
    marginTop: "1rem !important",
  },
  alert: {
    alignItems: "center",
  },

  // password-reset

  form_input: {
    marginTop: "1rem !important",
  },
}));
export default useStyles;
