import React from "react";
import './half-banner-imaged.scss';

function HalfBannerImaged(props: any) {

  return (
    <div className="half-banner-imaged">
      <div className='header-spacer'></div>
      <div className='top-band'>
        <div className='topic left-holder px-3 py-4'>
          <h2>{props.children}</h2>
        </div>
        <div className='floating-img'>
          <img src={props.image} alt="" />
        </div>
      </div>
    </div>
  );
}
export default HalfBannerImaged;
