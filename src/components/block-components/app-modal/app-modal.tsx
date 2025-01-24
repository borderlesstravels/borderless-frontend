import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import './app-modal.scss';

interface ImodalProps {
  onCloseModal: Function;
  styleClass?: string;
  small?: boolean;
  hideX?: boolean;
  children: any;
}

const AppModal = forwardRef((props: ImodalProps, ref: any) => {

  const closeModal = () => {
    document.body.style.overflow = '';
    const appModal: any = document.querySelector('.app-modal');
    const modalContent: any = document.querySelector('.modal-content');
    if (appModal && modalContent) {
      appModal.style.opacity = '';
      modalContent.style.transform = '';
    }
    setTimeout(() => {
      // this.modalSignal.emit();
      props.onCloseModal();
    }, 500);
  }
  useImperativeHandle(ref, () => ({
    closeModal
  }));

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const vidModal: any = document.querySelector('.app-modal');
    const modalContent: any = document.querySelector('.modal-content');
    setTimeout(() => {
      if (vidModal && modalContent) {
        vidModal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
      }
    }, 200);
  }, []);

  return (
    <div className="app-modal">
      <div className="modal-bg"></div>
      <div className={"modal-container " + (props.styleClass || '') + (props.small ? ' small' : '')}>
        <div className="modal-content">
            {
              !props.hideX &&
              <div className="modal-closer" onClick={closeModal}>
                  {/* <i className="fas fa-times"></i> */}
                  <FontAwesomeIcon icon={'times'} />
              </div>
            }
            {props.children}
        </div>
      </div>
    </div>
  );
})
export default AppModal;
