import { Grid, makeStyles, Paper } from "@material-ui/core";
import React, { useState } from "react";
import { Controls } from "../resuableComponents/Controls";
import { UseForm, Form } from "../resuableComponents/useForm";
import { useHistory } from "react-router-dom";
import { BiErrorCircle } from "react-icons/bi";

// materail UI
import { InputAdornment, IconButton, CssBaseline } from "@material-ui/core";

//avatar and ICons
import { Visibility, VisibilityOff } from "@material-ui/icons";

// api
import { postData } from "../API/API";

// auth
import { useToken } from "../Auth/jwtAuth/useToken";

const useStyles = makeStyles((theme) => ({
  body: {
    padding: 0,
    margin: 0,
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: "theme.spacing(1)",
      width: "100%",
      maxheight: "1000px",
    },
    maxWidth: "100%",
    alignItems: "center",
    margin: 0,
    padding: 0,
    height: "750px",
    background: theme.palette.primary.main,
  },
  container: {
    padding: 0,
    margin: 0,
    justifyContent: "center",
  },
  paper: {
    background: theme.palette.primary.main,
    height: "500px",
    alignItems: "center !important",
    justifyContent: "center",
    display: "inherit",
    flexDirection: "column",
    maring: 0,
    paddding: 0,
  },
  Input: {
    width: "400px !important",
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.secondary.main,
      color: "green",
    },
    "& .Mui-focused": {
      color: theme.palette.secondary.main,
    },
    "& .MuiIconButton-root": {
      color: theme.palette.secondary.main,
    },
  },
  floatingLabelFocusStyle: {
    color: theme.palette.secondary.main,
  },
  inputInterior: {
    color: theme.palette.secondary.main,
  },
  newButton: {
    width: "200px",
    background: theme.palette.secondary.main,
    color: "#488C52",
    "&:hover": {
      background: "#488C52",
      color: theme.palette.secondary.main,
    },
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },

  typo: {
    color: theme.palette.secondary.main,
    "&:hover": {
      cursor: "pointer",
      color: "#488C52",
    },
  },
}));

const initialFValues = {
  username: "",
  password: "",
};

const errorDiv = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  position: "absolute",
  top: "170px",
  right: "40px",
  transition: "300ms",
};

const hideerror = {
  display: "none",
};

const errortext = {
  fontSize: "20px",

  color: "#e3101a",
  fontWeight: "200",
  marginLeft: "10px",
};

export const getRoleCollettion = (data) => data;

const Login = (props) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [errormessage, setErrormesssage] = useState(false);

  // eslint-disable-next-line
  const [token, setToken] = useToken();
  const history = useHistory();

  const validate = (fieldValues = values) => {
    let temp = { ...error };
    if ("username" in fieldValues)
    temp.username = fieldValues.username ? "" : "This Field is required";
    if ("password" in fieldValues)
      temp.password =
        fieldValues.password.length > 6
          ? ""
          : "Password Must be At Least 6 Character";
    setError({ ...temp });
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, error, setError, handleInputChange, resetForm } = UseForm(
    initialFValues,
    true,
    validate
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      let res = await postData("auth/login", {
           
          userName: values.username,
          password: values.password
      });
      if (res.ok) {
        const  token  = res.data.data;
        console.log(res.data.data)
        setToken(token);
        history.push("/home");
      } else {
        setErrormesssage(true);
      }
    }
    resetForm();
  };

  const forgetPassword = () => {
    history.push("/forgetPassword");
  };

  return (
    <div className={classes.root}>
      <div style={errormessage ? errorDiv : hideerror}>
        <BiErrorCircle
          style={{
            fontSize: "25px",
            marginTop: "21px",
            color: "#e3101a",
          }}
        />
        <h3 style={errortext}>Incorrect username or password</h3>
      </div>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Grid container>
            <Controls.Input
              autoComplete="off"
              name="username"
              label="Username"
              value={values.username}
              onChange={handleInputChange}
              error={error.username}
              className={classes.Input}
              InputLabelProps={{
                className: classes.floatingLabelFocusStyle,
              }}
              InputProps={{
                autoComplete: "off",
                className: classes.inputInterior,
              }}
              type="text"
            />
          </Grid>

          <Grid container>
            <Grid item xs={12}>
              <Controls.Input
                autoComplete="new-password"
                name="password"
                label="Password"
                value={values.password}
                onChange={handleInputChange}
                error={error.password}
                className={classes.Input}
                InputLabelProps={{
                  className: classes.floatingLabelFocusStyle,
                }}
                InputProps={{
                  autoComplete: "off",
                  className: classes.inputInterior,
                  endAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                type={showPassword ? "text" : "password"}
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Grid
              item
              xs={12}
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <Controls.Button
                variant="contained"
                color="primary"
                size="large"
                text="Sign In"
                type="submit"
                className={classes.newButton}
              />
            </Grid>
            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <h3 className={classes.typo} onClick={forgetPassword}>
                {" "}
                Forget Password ?
              </h3>
            </Grid>
          </Grid>
        </Form>
      </Paper>
    </div>
  );
};

// function Copyright() {
//     return (
//         <Typography variant="body2" color="textSecondary" align="center">
//             {'Copyright © '}
//             <Link color="inherit" href="https://material-ui.com/">
//                 Your Website
//         </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }
export default Login;
