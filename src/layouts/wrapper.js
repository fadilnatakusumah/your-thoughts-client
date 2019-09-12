import React from 'react'
import { withStyles } from '@material-ui/core';
import Proptypes from 'prop-types';

const styles = {
  containerStyle: {
    maxWidth: '1200px',
    minHeight: '100vh',
    width: '100%'
  }
}

function container(props) {
  return (
    <div className={props.classes.containerStyle}>
      {props.children}
    </div>
  )
}

container.propTypes = {
  children: Proptypes.object.isRequired,
  classes: Proptypes.object.isRequired
}

export default withStyles(styles)(container)
