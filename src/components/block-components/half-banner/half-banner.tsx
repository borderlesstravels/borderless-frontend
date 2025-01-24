import React from "react";
import './half-banner.scss';

function HalfBanner(props: any) {

  return (
    <div className="half-banner">
      <div className='top-band w90 max800'>
        <div className='header-spacer'></div>
        <div className='topic-space' data-aos="fade-in">
          <div className='header-spacer'></div>
          <h2>{props.children}</h2>
          <hr />
          <p className="text-center">{props.subInfo}</p>
        </div>
      </div>
    </div>
  );
}
export default HalfBanner;
