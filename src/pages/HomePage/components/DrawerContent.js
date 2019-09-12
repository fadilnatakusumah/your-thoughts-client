import React, { Component } from 'react';
import { Avatar, Button } from '@material-ui/core';
import { connect } from 'react-redux'

import BlankProfilePict from '../../../assets/images/blank-profile-picture.png';

class DrawerContent extends Component {
  render() {
    const { data: user } = this.props.user;
    console.log("USER", user)
    return (
      <React.Fragment>
        <div style={{
          width: '70vw',
          maxWidth: '400px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '30px 20px'
        }}>
          <Avatar
            src={user.image_url}
            style={{
              width: "150px",
              height: "150px",
            }}
          />
          <div style={{ width: '100%' }}>
            <h2 style={{ textAlign: 'center' }}>{user.username}</h2>
            <h4>{user.bio}</h4>
            <p>Followers: {user.followers.length}</p>
            <p>Following: {user.following.length}</p>
            <p>Location: <strong>{user.location}</strong></p>
          </div>

          <div>
            <Button variant="outlined" color="secondary">
              Sign out
            </Button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(DrawerContent)
