import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { boolean } from "yup/lib/locale";
import './incremental-count.scss';

interface iIncrementalCountProp {
  updateCount: Function;
  count?: number;
  holdUpdateKey?: string;
  increased?: boolean;
  negativeCount?: boolean;
  minimum?: number;
  verticalCount?: boolean;
  forcedWhite?: boolean;
}

const IncrementalCountComponent = (props: iIncrementalCountProp) => {

  const [count, setCount] = useState<number>(props.count || 0);

  const updateCount = (incremental?: boolean) => {
    if(incremental){
      setCount(count + 1);
    } else {
      if(props.minimum && (count === props.minimum || count < props.minimum)) {
        setCount(props.minimum);
        return;
      }
      if(props.negativeCount) {
        setCount(count - 1);
      } else {
        if(count > 0) {
          setCount(count - 1);
        } else {
          setCount(0);
        }
      }
      
    }
  }

  const sendUpdate = () => {
    props.updateCount(count);
  }

  useEffect(() => {
    if(!props.holdUpdateKey){
      props.updateCount(count);
    }
  }, [count]);
  

  return (
    <div className={"incremental-count" + (props.increased ? ' increased-counts' : '') + (props.verticalCount ? ' vertical-count' : '') + (props.forcedWhite ? ' forced-white' : '')}>
      <div className="change" onClick={() => updateCount(false)}>
        <FontAwesomeIcon className="change-icon" icon={'minus'} />
      </div>
      <span>{count}</span>
      <div className="change" onClick={() => updateCount(true)}>
        <FontAwesomeIcon className="change-icon" icon={'plus'} />
      </div>
      {
        props.holdUpdateKey &&
        <div className="hold-update">
          <button onClick={sendUpdate}>{props.holdUpdateKey}</button>
        </div>
      }
    </div>
  );
}
export default IncrementalCountComponent;
