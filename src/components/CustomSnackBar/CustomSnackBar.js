import React, { Component } from 'react'
import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

const CustomSnackBar = ({ type, message, position, onClose, ...others }) => {
  return (
    <Snackbar style={{
      color: 'white',
      backgroundColor: type === 'success' ? 'green' : 'red'
    }}>
      <SnackbarContent
        message={message}
        action={[
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ]}
      />
    </Snackbar>
  )
}

export default CustomSnackBar
