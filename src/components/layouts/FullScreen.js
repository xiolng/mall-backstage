import React, { Component } from 'react';
import { Icon, Tooltip } from 'antd';

export default class FullScreen extends Component {
  clickFull() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  render() {
    return (
      <Tooltip placement={'top'} title={'全屏'}>
        <Icon
          style={{ color: '#333', marginRight: '10px', fontSize: '20px' }}
          type={'fullscreen'}
          onClick={() => this.clickFull()}
        />
      </Tooltip>
    );
  }
}
