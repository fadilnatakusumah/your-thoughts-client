import React, { Component } from 'react'
import PT from 'prop-types';
import { connect } from 'react-redux';

import {
  AppBar,
  Toolbar,
  IconButton, Badge, Drawer, Grid, Tab, Tabs, Dialog, Avatar, Typography,
  TextField,
  Button,
  DialogContent,
  Menu,
  MenuItem,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList
} from '@material-ui/core';

import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Close as CloseIcon
} from '@material-ui/icons'

import SwipeableViews from 'react-swipeable-views'
import { fade, withStyles, withTheme } from '@material-ui/core/styles';

import DrawerContent from './components/DrawerContent';
import TabPanel from './components/TabPanel';
import ThoughtSkeleton from '../../components/ThoughtSkeleton';
import Thought from '../../components/Thought';
import Comment from '../../components/Comment';
import BlankProfile from '../../assets/images/blank-profile-picture.png';

import { getAllThoughts } from '../../redux/actions/thoughtActions';

class HomePage extends Component {
  state = {
    drawerOpen: false,
    notificationOpen: false,
    value: 0,
    openDetail: false,
  }

  toggleDrawer = () => {
    this.setState(prevState => ({
      drawerOpen: !prevState.drawerOpen
    }))
  }

  openNotification = () => this.setState({ notificationOpen: true })
  closeNotification = () => this.setState({ notificationOpen: false })

  componentDidMount() {
    this.props.getAllThoughts();
  }

  handleChangeIndex = (index) => {
    this.setState({ value: index })
  }

  handleChange = (event, newVal) => {
    this.setState({ value: newVal })
  }

  handleOpenThought = () => {
    this.setState({ openDetail: true })
  }

  handleCloseThought = () => {
    this.setState({ openDetail: false })
  }

  render() {
    const { classes, theme, UI, thoughts } = this.props;
    const { drawerOpen, value, openDetail, notificationOpen } = this.state;

    return (
      <div style={{
        width: '100%',
        height: '100vh',
        minHeight: '600px',
        backgroundColor: '#eee'
      }}>
        <Grid container
          direction="row"
          justify="center"
          alignItems="center"
          style={{
            position: 'fixed',
            top: '65px',
            bottom: '70px',
            overflowY: 'auto',
          }}>
          <Grid item
            style={{
              width: '100%', height: '100%',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center'
            }}>
            <AppBar color="default" style={{
              top: '0',
              bottom: 'auto',
              width: '80%',
              left: '43%',
              marginLeft: '-32.5%',
              position: 'fixed'
            }}>
              <Tabs
                value={value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="action tabs example"
              >
                <Tab
                  label="Explore Thoughts"
                  style={{ textTransform: 'none' }}
                />
                <Tab label="Following Thoughts"
                  style={{ textTransform: 'none' }}
                />
              </Tabs>
            </AppBar>
            <div className="panel" style={{
              // backgroundColor: 'red',
              padding: '12px',
              maxWidth: '700px',
              width: '100%',
              margin: '0 auto',
            }}>
              <SwipeableViews
                // style={{ display: 'flex', justifyContent: 'center' }}
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={this.handleChangeIndex}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  {UI.loading && (
                    <React.Fragment>
                      <ThoughtSkeleton />
                      <ThoughtSkeleton />
                      <ThoughtSkeleton />
                      <ThoughtSkeleton />
                    </React.Fragment>
                  )}

                  {!UI.loading && thoughts.allThoughts && thoughts.allThoughts.length > 0 &&
                    thoughts.allThoughts.map(thought => (
                      <Thought thought={thought} handleOpenThought={this.handleOpenThought} />
                    ))
                  }
                  {/* <Thought handleOpenThought={this.handleOpenThought} />
                  <Thought handleOpenThought={this.handleOpenThought} />
                  <Thought handleOpenThought={this.handleOpenThought} /> */}
                  {/* <ThoughtSkeleton />
                  <ThoughtSkeleton /> */}
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  <span>
                    <ThoughtSkeleton />
                  </span>
                </TabPanel>
              </SwipeableViews>
            </div>
          </Grid>
        </Grid>

        {/* Dialog */}
        <Dialog open={openDetail} maxWidth="md">
          <DialogContent>
            <div style={{ textAlign: 'right' }}>
              <IconButton style={{ float: 'right' }} onClick={this.handleCloseThought}>
                <CloseIcon />
              </IconButton>
            </div>
            <div style={{
              padding: '10px',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}>
                <Avatar sizes={24} src={BlankProfile} />
                <div style={{ textAlign: 'left', width: '100%', marginLeft: '10px' }}>
                  <Typography variant="body" style={{ fontWeight: 'bold' }}>
                    USERNAME
                </Typography>
                  <Typography variant="body2">
                    TEXT ON THOUGHTS, TEXT ON THOUGHTS,TEXT ON THOUGHTS,TEXT ON THOUGHTS
              </Typography>
                </div>
              </div>

              {/* Reply feed */}
              <div style={{ margin: '14px 0', display: 'grid' }}>
                <small>Comment here</small>
                <TextField
                  variant="outlined"
                  type="text"
                  multiline
                  rowsMax="4" />
                <div style={{ margin: '10px 0' }}>
                  <Button size="small" variant="outlined" color="primary">Reply</Button>
                </div>
              </div>

              {/* All the comments */}
              <div>
                <Comment />
                <Comment />
                <Comment />
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* NavBar */}
        <Drawer open={drawerOpen} onClose={this.toggleDrawer}>
          <DrawerContent />
        </Drawer>


        {/* AppBar */}
        <AppBar position="fixed" className={classes.bottomNavbar}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={this.toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton aria-label="show 17 new notifications" ref={(ref) => this.anchorRef = ref} color="inherit" onClick={this.openNotification}>
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Popper open={notificationOpen} transition disablePortal anchorEl={this.anchorRef}>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                    }}
                  >
                    <Paper id="menu-list-grow">
                      <ClickAwayListener onClickAway={this.closeNotification}>
                        <MenuList>
                          {/* notification */}
                          {/* {options.map((option, index) => ( */}
                            <MenuItem
                              // key={option}
                              // disabled={index === 2}
                              // selected={index === selectedIndex}
                              onClick={this.closeNotification}
                            >
                              Notification 1
                            </MenuItem>
                            <MenuItem
                              // key={option}
                              // disabled={index === 2}
                              // selected={index === selectedIndex}
                              onClick={this.closeNotification}
                              // onClick={event => handleMenuItemClick(event, index)}
                            >
                              Notification 2
                            </MenuItem>
                            <MenuItem
                              // key={option}
                              // disabled={index === 2}
                              // selected={index === selectedIndex}
                              onClick={this.closeNotification}
                              // onClick={event => handleMenuItemClick(event, index)}
                            >
                              Notification 3
                            </MenuItem>
                          {/* ))} */}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
              {/* <IconButton
                edge="end"
                aria-label="account of current user"
                // aria-controls={menuId}
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircleIcon />
              </IconButton> */}
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-label="show more"
                aria-haspopup="true"
                onClick={() => {
                  // handleMobileMenuOpen
                }}
                color="inherit"
              >
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

const styles = (theme) => ({
  bottomNavbar: {
    top: 'auto',
    bottom: 0,
    width: '75%',
    left: '50%',
    marginLeft: '-37.5%',
    borderRadius: '20px 20px 0 0',

    [theme.breakpoints.down('md')]: {
      borderRadius: '0',
      marginLeft: '0',
      left: '0',
      width: '100%',
    }
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

HomePage.propTypes = {
  UI: PT.object.isRequired,
  thoughts: PT.object.isRequired,
  getAllThoughts: PT.func.isRequired
}

const mapStateToProps = state => ({
  UI: state.UI,
  thoughts: state.thoughts
})

const mapDispatchToProps = dispatch => ({
  getAllThoughts: () => dispatch(getAllThoughts())
})

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(withStyles(styles)(HomePage)));
