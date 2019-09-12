import React, { Component } from 'react'
import { Paper} from '@material-ui/core';

class ThoughtSkeleton extends Component {
  render() {
    return (
      <Paper style={{
        // margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between', 
        alignItems:'center',
        // width: '100%', 
        marginBottom: '10px', 
        padding: '12px',
        position: 'relative',
      }}>
        <div style={{ width:'50px', height:'50px', backgroundColor: '#ccc', borderRadius: '50%'}}></div>
        <div style={{textAlign:'left', width:'100%', marginLeft: '10px'}}>
          <div style={{height: '24px', minWidth: '30px', width: '40%', backgroundColor: '#aaa', margin: '8px 0px'}}></div>
          <div style={{height: '12px', minWidth: '60px', width: '80%',backgroundColor: '#ccc'}}></div>
        </div>
      </Paper >
    )
  }
}

export default ThoughtSkeleton
