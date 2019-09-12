import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  withStyles,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Input,
  Button,
  Link,
  Paper,
  Avatar
} from '@material-ui/core';
import axios from 'axios';

import yourThoughtLogo from '../../assets/images/logo.png';
import ThoughtSkeleton from '../../components/ThoughtSkeleton';

const styles = (theme) => ({
  containerStyle: {
    minHeight: '600px',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.dark,
  },
  wrapperStyle: {
    backgroundColor: theme.palette.primary.main,
    // flexDirection: 'column',
    height: '90%',
    width: '90%',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      // width: '150px',
      // flexFlow: 'column-reverse',
      height: '100%',
      width: '100%',
    },
  },

  imageStyle: {
    width: '200px',
    margin: '0px',
    display: 'block',
    [theme.breakpoints.down('md')]: {
      width: '150px',
    },
  },
  imageContainer: {
    textAlign: 'center', width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    }
  },
  imageFormContainer: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center', width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }
  },
  formContainer: {
    backgroundColor: 'white',
    [theme.breakpoints.down('sm')]: {
      minHeight: '100vh'
    }
  },
  formControlContainerSignin: {
    padding: '25px', textAlign: 'left', margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    position: 'relative', top: '30%',

    [theme.breakpoints.down('sm')]: {
      top: 0,
    },


    '& span:last-child': {
      margin: '0 auto',
      padding: '30px 0',
      '& a': {
        textDecoration: 'none'
      }
    },
  },
  formControlContainerSignup: {
    padding: '25px', textAlign: 'left', margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    position: 'relative', top: '10%',

    [theme.breakpoints.down('sm')]: {
      top: 0,
    },


    '& span:last-child': {
      margin: '0 auto',
      padding: '30px 0',
      '& a': {
        textDecoration: 'none'
      }
    },
  },

  formControlStyle: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  buttonContainer: {
  },

  // RIGHT SIDE
  avatar: {
    margin: 5,
    width: 60,
    height: 60,
    marginRight: 15,
  },
  exploreContainer: {
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '25px',

    '& .explore-style': {
      margin: '10px 0',
      color: 'white'
    },

    '& .paper-container': {
      borderRadius: '10px',
      backgroundColor: '#fff',
      width: '80%',
      padding: '10px',
      maxHeight: '300px',
      overflow: 'auto'
    }
  }
})

const YourThought = () => (
  <Typography variant={'h5'}>
    Your Thoughts
  </Typography>
)
export class AuthPage extends Component {
  state = {
    mode: 'signin',
    form: {},
    errors: {},
    loading: '',
    thoughts: [],
  }

  handleChange = (name, newValue) => {
    this.setState(prevstate => ({
      form: {
        ...prevstate.form,
        [name]: newValue
      }
    }))
  }

  async componentDidMount() {
    this.setState({loading: true})
    const thoughts = await axios.get('https://us-central1-your-thoughts-project.cloudfunctions.net/api/thoughts');
    if (!thoughts.errors) {
      this.setState({loading: false})
      this.setState({ thoughts: thoughts.data.data })
    }
    this.setState({loading: false})
  }

  handleChangeIndex = (index) => {
    this.setState({ value: index })
  }

  changeMode = () => {
    this.state.mode === 'signin' ? this.setState({ mode: 'signup' }) : this.setState({ mode: 'signin' })
  }

  signinHandler = async (e) => {
    e.preventDefault();
    console.log("THIS", this.state.form)
    const { form } = this.state;
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.containerStyle}>
        <Grid container item={12} className={classes.wrapperStyle}>
          <Grid item md={6} sm={12} xs={12} className={classes.formContainer}>
            <div className={classes.imageFormContainer}>
              <img
                className={classes.imageStyle}
                src={yourThoughtLogo} />
              <YourThought />
            </div>
            {
              this.state.mode === 'signin' ?
                <div className={classes.formControlContainerSignin}>
                  {/* form */}
                  <Typography variant={"h5"}>
                    Sign in
                  </Typography>
                  <FormControl className={classes.formControlStyle}>
                    <InputLabel>Email/Username</InputLabel>
                    <Input defaultValue={this.state.form.email} onChange={({ target }) => this.handleChange('username', target.value)} name="username" placeholder="YourEmail@here.com" type="email" />
                  </FormControl>
                  <FormControl className={classes.formControlStyle}>
                    <InputLabel>Password</InputLabel>
                    <Input defaultValue={this.state.form.password} onChange={({ target }) => this.handleChange('password', target.value)} name="password" placeholder="*****" type="password" />
                  </FormControl>
                  <div className={classes.buttonContainer}>
                    <Button variant={'contained'} color={'primary'} onClick={this.signinHandler}>
                      Sign in
                    </Button>
                  </div>
                  <span>Haven't registered yet? <Link
                    component="button"
                    variant="body2"
                    onClick={this.changeMode}
                  >Sign up Here</Link></span>
                </div>
                :
                <div className={classes.formControlContainerSignup}>
                  <Typography variant={"h5"}>
                    Sign up
                </Typography>
                  <FormControl className={classes.formControlStyle}>
                    <InputLabel>Name</InputLabel>
                    <Input placeholder="YourEmail@here.com" />
                  </FormControl>
                  <FormControl className={classes.formControlStyle}>
                    <InputLabel>Username</InputLabel>
                    <Input placeholder="YourEmail@here.com" />
                  </FormControl>
                  <FormControl className={classes.formControlStyle}>
                    <InputLabel>Email</InputLabel>
                    <Input placeholder="YourEmail@here.com" />
                  </FormControl>
                  <FormControl className={classes.formControlStyle}>
                    <InputLabel>Password</InputLabel>
                    <Input placeholder="YourEmail@here.com" />
                  </FormControl>
                  <FormControl className={classes.formControlStyle}>
                    <InputLabel>Confirm Password</InputLabel>
                    <Input placeholder="YourEmail@here.com" />
                  </FormControl>
                  <div className={classes.buttonContainer}>
                    <Button variant={'contained'} color={'primary'}>
                      Sign up
                    </Button>
                  </div>
                  <span>Already have an account? <Link
                    component="button"
                    variant="body2"
                    onClick={this.changeMode}
                  >Sign in Here</Link></span>
                </div>
            }
          </Grid>
          <Grid item md={6} sm={12} xs={12} className={classes.exploreContainer}>
            <div className={classes.imageContainer}>
              <img
                className={classes.imageStyle}
                src={yourThoughtLogo} />
              <YourThought />
            </div>
            <Typography variant="h6" className={'explore-style'}>Explore Thoughts</Typography>
            <div className="paper-container">
              {this.state.loading &&
                <ThoughtSkeleton />
              }
              {
                this.state.thoughts.map(thought => (
                  <Paper style={{ padding: '10px 0', marginBottom: '10px' }}>
                    <Grid container>
                      <Grid item={2}>
                        <Avatar alt="Remy Sharp" src={thought.user_image} className={classes.avatar} />
                      </Grid>
                      <Grid item={10}>
                        <div>
                          <Typography variant="h6">{thought.username}</Typography>
                          <Typography variant="body2">{thought.body}</Typography>
                        </div>
                      </Grid>
                    </Grid>
                  </Paper>
                ))
              }
            </div>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withRouter(withStyles(styles)(AuthPage))
