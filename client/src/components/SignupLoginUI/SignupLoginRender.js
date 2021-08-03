import { useHistory } from "react-router-dom";
import { Grid, Box, Typography, Button, Hidden } from "@material-ui/core";
import { useStyles } from "./StyleSignupLogin";
import Bubble from "../../assets/bubble.svg";

const pageText = (page) => {
  if (/signup/i.test(page))
    return {
      xsScreenButtonText: "Signup",
      pageSwitchText: "Already have an account?",
      pageSwitchBtnText: "Login",
      pageSwitchUrl: "/login",
    };
  return {
    xsScreenButtonText: "Login",
    pageSwitchText: "Don't have an account?",
    pageSwitchBtnText: "Create Account",
    pageSwitchUrl: "/register",
  };
};

const SignupLoginRender = ({
  FormComponent,
  submitHandler,
  formErrorMessage,
  page,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const text = pageText(page);

  return (
    <Grid container className={classes.mainGrid}>
      <Grid
        container
        item
        className={classes.imgPanel}
        justify="center"
        alignItems="center"
        xs={12}
        md={5}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          className={classes.imgPanelColorOverlay}
        ></Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          className={classes.imgPanelTextOverlay}
        >
          <img src={Bubble} alt="conversation bubble" height={90} />
          <Typography variant="h4" component="h1" className={classes.imgHeader}>
            Converse with anyone with any language.
          </Typography>
        </Box>
      </Grid>
      <Grid
        container
        item
        className={classes.formPanel}
        id="formPanel"
        justify="flex-start"
        alignItems="center"
        direction="column"
        xs={12}
        md={7}
      >
        <Grid container item xs={12} justify="flex-end" alignItems="center">
          <Box my={10} />
          <Grid container item xs={8} justify="flex-end">
            <Box className={classes.pageChangeText}>
              <Typography color="secondary">
                <Box component="span" fontSize={18}>
                  {text.pageSwitchText}
                </Box>
              </Typography>
            </Box>
          </Grid>
          <Grid container item xs={4}>
            <Button
              variant="contained"
              className={classes.xlButtonWhite}
              onClick={() => history.push(text.pageSwitchUrl)}
            >
              <Typography color="primary">
                <Box component="span" fontSize={18} fontWeight="fontWeightBold">
                  {text.pageSwitchBtnText}
                </Box>
              </Typography>
            </Button>
          </Grid>
        </Grid>

        <FormComponent
          submitHandler={submitHandler}
          classes={classes}
          formErrorMessage={formErrorMessage}
        />
      </Grid>
    </Grid>
  );
};

export default SignupLoginRender;
