import React, { Suspense } from "react";
import MiniLoader from "../mini-loader/mini-loader";

interface Props {
  component: JSX.Element;
  path: string;
}

const SuspenseFallback = ({ component, path }: Props) => {
  return (
    <Suspense
      fallback={
        <div className="loader-holder">
          <MiniLoader />
        </div>
      }
      key={path}
    >
      {component}
    </Suspense>
  );
};

export default SuspenseFallback;
