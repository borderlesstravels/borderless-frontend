import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import './app-popup.scss';

interface iPopupProp {
  showPopup: 0 | 1 | 2;
  switch: React.ReactNode;
  switchClass?: string;
  children: any;
  onClosePopup?: Function;
  styleClass?: string;
  keepOpen?: boolean;
}

const AppPopup = (props: iPopupProp) => {

  const [xAnchor, setXAnchor] = useState('');

  const random: any = Math.random().toFixed(5);
  const unique = random * 100000

  const openPopup = () => {
    if(window.innerWidth < 751) {
      document.body.style.overflow = 'hidden';
    } else {
      determinePosition();
    }
    const vidPopup: any = document.querySelector('.app-popup');
    const popupContainer: any = document.querySelector('.popup-container');
    setTimeout(() => {
      if (vidPopup && popupContainer) {
        vidPopup.style.opacity = '1';
        popupContainer.style.transform = 'scale(1)';
      }
    }, 200);
  }

  const closePopup = (silent?: any) => {
    document.body.style.overflow = '';
    const appPopup: any = document.querySelector('.app-popup');
    const popupContainer: any = document.querySelector('.popup-container');
    if (appPopup && popupContainer) {
      appPopup.style.opacity = '';
      popupContainer.style.transform = '';
    }
    setTimeout(() => {
      if(props.onClosePopup && (silent !== true)) {
        props.onClosePopup();
      }
    }, 400);
  }

  const closePopupOnBluredClick = () => {
    if(!props.keepOpen) {
      closePopup();
    }
  }

  const determinePosition = () => {
    const inlineswitch = document.getElementById('inline-switch-width' + unique);
    const leftSide = inlineswitch?.getBoundingClientRect().x || 0;
    const rightSide = window.innerWidth - ((inlineswitch?.getBoundingClientRect().x || 0) + (inlineswitch?.clientWidth || 0));
    
    if(leftSide >= (rightSide * 5)) {
      setXAnchor(' anchor-full-right')
    } else if(leftSide < (rightSide * 5) && leftSide >= (rightSide * 3)) {
      setXAnchor(' anchor-partly-right')
    } else if(leftSide < (rightSide * 3) && leftSide >= (rightSide * 1.5)) {
      setXAnchor(' anchor-part-right')
    } else if(rightSide >= (leftSide * 3)) {
      setXAnchor(' anchor-full-left')
    } else if(rightSide < (leftSide * 5) && rightSide >= (leftSide * 3)) {
      setXAnchor(' anchor-partly-left')
    } else if(rightSide < (leftSide * 3) && rightSide >= (leftSide * 1.5)) {
      setXAnchor(' anchor-part-left')
    } else {
      setXAnchor(' anchor-center')
    }
  }

  useEffect(() => {
    if(props.showPopup === 2){
      openPopup();
    } else {
      closePopup();
    }
  }, [props.showPopup]);

  return (
    <>
    <div className={"popup-inline " + (props.switchClass || '')} id={"inline-switch-width" + unique}>
      {props.switch}
      {
        (props.showPopup === 2 || props.showPopup === 1) &&
        <>
          {createPortal(
            <div className="popup-bg" onClick={closePopupOnBluredClick}></div>,
            document.getElementById('popup-bg-holder') || document.body
          )}
          <div className={"app-popup" + xAnchor} id="app-popup">
            <div className="popup-in-bg" onClick={closePopupOnBluredClick}></div>
            <div className={"popup-container " + (props.styleClass || '')}>
              {props.children}
            </div>
          </div>
        </>
      }
    </div>
    </>
  );
}
export default AppPopup;
