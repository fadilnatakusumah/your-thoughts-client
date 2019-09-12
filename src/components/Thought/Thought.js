import React, { Component } from 'react'
import { Paper, Avatar, Typography, Button, IconButton, Grid } from '@material-ui/core';
import PT from 'prop-types';


import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import ReplyOutlinedIcon from '@material-ui/icons/ReplyOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { isIdSameAsLoggedUser } from '../../helpers/functions';

class Thought extends Component {
  static propTypes = {
    handleOpenThought: PT.func.isRequired,
    thought: PT.object.isRequired
  }

  render() {
    const { thought } = this.props;
    return (
      <Paper style={{
        marginBottom: '10px',
        padding: '12px',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
          <Avatar sizes="small" src={"https://i.kym-cdn.com/photos/images/newsfeed/001/275/715/010.png"} />
          <div style={{ textAlign: 'left', width: '100%', marginLeft: '10px' }}>
            <Typography variant="body1" style={{ fontWeight: 'bold' }}>
              {thought.username}
            </Typography>
            <div style={{ display: 'inline', float: 'right' }}>
              <Button variant="outlined" size="small">Follow</Button>
              {/* <Typography variant="caption" color="primary">Followed</Typography> */}
            </div>
            <Typography variant="body2">
              {thought.body}
            </Typography>
          </div>
        </div>
        <Grid
          style={{ margin: '14px 0 0 0', display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Button onClick={this.props.handleOpenThought} size="small" variant="outlined" color="primary" style={{ marginRight: '10px' }}>
              <ReplyOutlinedIcon />
              Reply
            </Button>
            {
              // isIdSameAsLoggedUser(thought.id) &&
              <Button size="small" variant="outlined" color="secondary">
                <DeleteOutlinedIcon />
                Delete
              </Button>
            }
          </div>
          <div>
            {/* <IconButton size="small">
              <FavoriteBorderOutlinedIcon />
            </IconButton> */}
            <IconButton size="small">
              <FavoriteIcon color="secondary" />
            </IconButton>
          </div>
        </Grid>
      </Paper >
    )
  }
}

export default Thought
