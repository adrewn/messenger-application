import {
  Box,
  Button,
  FormControl,
  TextField,
  FormHelperText,
  Typography,
} from "@material-ui/core";

/* SignupForm Component */

const SignupForm = ({ submitHandler, classes, formErrorMessage }) => (
  <Box className={classes.formWrapper}>
    <Typography variant="h4" component="h2">
      <b>Create an account.</b>
    </Typography>
    <form onSubmit={submitHandler}>
      <Box py={1} />
      <FormControl className={classes.formControl}>
        <TextField
          aria-label="username"
          label="Username"
          name="username"
          type="text"
          autoComplete="username"
          fullWidth
          required
          InputProps={{
            classes: {
              root: classes.inputFont,
            },
          }}
          InputLabelProps={{
            classes: {
              root: classes.labelFont,
            },
          }}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          label="E-mail address"
          aria-label="e-mail address"
          type="email"
          name="email"
          autoComplete="email"
          fullWidth
          required
          InputProps={{
            classes: {
              root: classes.inputFont,
            },
          }}
          InputLabelProps={{
            classes: {
              root: classes.labelFont,
            },
          }}
        />
      </FormControl>
      <FormControl
        className={classes.formControl}
        error={!!formErrorMessage.confirmPassword}
      >
        <TextField
          aria-label="password"
          label="Password"
          type="password"
          inputProps={{ minLength: 6 }}
          name="password"
          autoComplete="password"
          fullWidth
          required
          InputProps={{
            classes: {
              root: classes.inputFont,
            },
          }}
          InputLabelProps={{
            classes: {
              root: classes.labelFont,
            },
          }}
        />
        <FormHelperText>{formErrorMessage.confirmPassword}</FormHelperText>
      </FormControl>
      <FormControl
        className={classes.formControl}
        error={!!formErrorMessage.confirmPassword}
      >
        <TextField
          label="Confirm Password"
          aria-label="confirm password"
          type="password"
          inputProps={{ minLength: 6 }}
          name="confirmPassword"
          autoComplete="password"
          fullWidth
          required
          InputProps={{
            classes: {
              root: classes.inputFont,
            },
          }}
          InputLabelProps={{
            classes: {
              root: classes.labelFont,
            },
          }}
        />
        <FormHelperText>{formErrorMessage.confirmPassword}</FormHelperText>
      </FormControl>
      <Box display="flex" justifyContent="center" py={4}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.xxlButton}
        >
          <Box fontSize={20}>Create</Box>
        </Button>
      </Box>
    </form>
  </Box>
);

export default SignupForm;
