import React, {  } from 'react';
import './micro-loader.scss';

interface iLoaderProps {
  size?: 'small' | 'mideum' | 'big';
}

function MicroLoader(props: iLoaderProps) {
  return (
    <div className={'micro-loader-space' + (props.size === 'big' ? ' micro-loader-space-big' : '') + (props.size === 'small' ? ' micro-loader-space-small' : '')}>
      <div className="lds-spinner"></div>
    </div>
  );
}

export default MicroLoader;
