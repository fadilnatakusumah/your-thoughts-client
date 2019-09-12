import React, { Component } from 'react'

class TabPanel extends Component {
  render() {
    const { children, value, index } = this.props;
    return value === index && (
      <div style={{overflow: 'auto', height: '100%'}}>
        {children}
      </div>
    )
  }
}

export default TabPanel
