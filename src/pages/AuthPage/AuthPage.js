import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  withStyles,
  Grid,
  Typography,
  Button,
  Link,
  TextField,
  FormControl,
  CircularProgress,
} from '@material-ui/core';
import PT from 'prop-types';

import yourThoughtLogo from '../../assets/images/logo.png';
import ThoughtSkeleton from '../../components/ThoughtSkeleton';

// REDUX
import { connect } from 'react-redux';
import { userSignin } from '../../redux/actions/userActions';
import Axios from 'axios';

export class AuthPage extends Component {
  state = {
    mode: 'signin',
    form: {},
  }

  handleChange = (name, newValue) => {
    this.setState(prevstate => ({
      form: {
        ...prevstate.form,
        [name]: newValue
      }
    }))
  }

  handleChangeIndex = (index) => {
    this.setState({ value: index })
  }

  changeMode = () => {
    this.state.mode === 'signin' ? this.setState({ mode: 'signup' }) : this.setState({ mode: 'signin' })
  }

  signinHandler = async (e) => {
    e.preventDefault();
    const { form } = this.state;
    const payload = {
      username: form.email,
      password: form.password,
    }
    const { history } = this.props;
    this.props.userSignin(payload, history);
  }

  renderThoughtsSkeleton = () => {
    return Array(5).fill(null).map(() => <ThoughtSkeleton />)
  }

  render() {
    const { classes, UI } = this.props;
    const { mode } = this.state;

    return (
      <Grid container item={12} className={classes.wrapperStyle}>
        {/* All thoughts */}
        <div className="thoughts-container">
          <h2>Latest thoughts</h2>
          {this.renderThoughtsSkeleton()
          }
        </div>
        <form>
          <div className="form-container">
            <img src={yourThoughtLogo} alt={"logo"} className={classes.logoStyle} />
            <Typography variant={"h5"} align="center">
              {mode === 'signin' ? "Sign in" : "Sign up"}
            </Typography>
            {mode === 'signup' && <TextField
              id="standard-full-width"
              label="Name"
              type="text"
              // helperText=
              fullWidth
              onChange={(e) => this.handleChange('username', e.target.value)}
            />}
            <TextField
              id="standard-full-width"
              label={mode === "signup" ? "Email" : "Email / Username"}
              type="email"
              fullWidth
              onChange={(e) => this.handleChange('email', e.target.value)}
            />
            <TextField
              id="standard-full-width"
              label="Password"
              type="password"
              fullWidth
              onChange={(e) => this.handleChange('password', e.target.value)}
            />
            {mode === 'signup' &&
              <TextField
                id="standard-full-width"
                label="Confirm Password"
                type="password"
                fullWidth
                onChange={(e) => this.handleChange('confirm_password', e.target.value)}
              />
            }
            {UI.errors && UI.errors.message &&
              <div>
                <Typography variant="body2" style={{ color: 'red', margin: '8px 0' }}>{UI.errors.message}</Typography>
              </div>}
            <div style={{
              margin: '14px 0px'
            }}>
              <Button
                type="submit"
                variant={'contained'} color={'primary'}
                onClick={mode === 'signup' ? this.signupHandler : this.signinHandler}
                disabled={UI.loading}
              >
                {UI.loading && <CircularProgress size={24} />}

                {!UI.loading ?
                  mode === "signup" ? "Sign up"
                    : "Sign in"
                  : null}
              </Button>
            </div>
            <span>
              <Typography variant="body2">
                {
                  mode === "signup" ? "Already have an account? "
                    : "Not registered yet? "
                }
              </Typography>
              <Link
                variant="body2"
                onClick={this.changeMode}
                style={{ cursor: 'pointer' }}
              >
                {mode === "signup" ? "Sign in Here"
                  : "Signup here"
                }
              </Link></span>
          </div>
        </form>
      </Grid>
    )
  }
}

const styles = (theme) => ({
  wrapperStyle: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    minHeight: '600px',
    height: '100vh',
    width: '100%',

    '& .form-container': {
      minHeight: '300px',
      padding: '0 15px',
      textAlign: 'center',
      width: '80%',

      [theme.breakpoints.up('md')]: {
        maxWidth: '500px'
      }
    },

    '& .thoughts-container': {
      width: '500px',
      maxHeight: '500px',
      height: '100%',
      overflowY: 'auto',
      // padding: '0 15px',

      [theme.breakpoints.down('md')]: {
        display: 'none'
      }
    },

    '& div:first-child': {
      textAlign: 'center',
      margin: '0 24px',
      alignSelf: 'center'
    },

    thoughts: [],
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },

  },
  logoStyle: {
    width: '190px',
    alignSelf: 'center'
  },
});

AuthPage.propTypes = {
  classes: PT.object.isRequired,
  UI: PT.object.isRequired,
  userSignin: PT.func.isRequired
}

const mapStateToProps = state => ({
  UI: state.UI
})

const mapDispatchToProps = dispatch => ({
  userSignin: (payload, history) => dispatch(userSignin(payload, history))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(AuthPage)))

// OR
// export default connect(mapStateToProps, {userSignin})(withRouter(withStyles(styles)(AuthPage)))
