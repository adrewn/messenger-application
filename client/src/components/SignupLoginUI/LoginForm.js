import {
  Box,
  Button,
  FormControl,
  TextField,
  Typography,
} from "@material-ui/core";

/** LoginForm component */

const LoginForm = ({ submitHandler, classes }) => (
  <Box className={classes.formWrapper}>
    <Typography variant="h4" component="h2">
      <b>Welcome back!</b>
    </Typography>
    <form onSubmit={submitHandler}>
      <Box py={3} />
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
      <Box py={2} />
      <FormControl className={classes.formControl}>
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
      </FormControl>
      <Box display="flex" justifyContent="center" py={6}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.xxlButton}
        >
          <Box fontSize={20}>Login</Box>
        </Button>
      </Box>
    </form>
  </Box>
);

export default LoginForm;
