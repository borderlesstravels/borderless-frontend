import React, { useEffect, useState } from "react";
import SubHeaderMenu from "./sub-header-menu/sub-header-menu";

import "./sub-header.scss";

function SubHeader(props: any) {

  useEffect(() => {}, [props]);

  return (
    <>
      <div className="sub-header">
        <SubHeaderMenu className="web-version" />
      </div>
      <div className="sub-header-space"></div>
    </>
  );
}

export default SubHeader;
