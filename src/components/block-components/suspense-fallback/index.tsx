import React, { Suspense } from "react";
import Loader from "../loader/loader";

interface Props {
  component: JSX.Element;
  path: string;
}

const SuspenseFallback = ({ component, path }: Props) => {
  return (
    <Suspense fallback={<Loader />} key={path}>
      {component}
    </Suspense>
  );
};

export default SuspenseFallback;
