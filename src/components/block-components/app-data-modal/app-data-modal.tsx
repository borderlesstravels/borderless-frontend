import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import './app-data-modal.scss';
import { closeAppModal, openModal } from "../../../services/utils/app-data-modal-service";

const AppDataModal = (props: any) => {

  const data = props.data;
  const closeModal = () => {
    closeAppModal(()=> props.closeModal(data));
  };

  useEffect(() => {
    openModal();
  }, []);

  return (
    <div className="app-data-modal edit-news-modal">
      <div className="modal-bg"></div>
      <div className="modal-container">
        <div className="modal-content">
            <div className="modal-closer" onClick={closeModal}>
                <i className="fas fa-times"></i>
            </div>
            <div className="space-control">
              {/* <h1 className="text-center">Content Starts Here</h1> */}

              {/* <h1 className="text-center">Content Ends Here</h1> */}
            </div>
        </div>
      </div>
    </div>
  );
}

export default AppDataModal;
