import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { AvatarIcon } from '../../../assets/images';
import AppModal from '../app-modal/app-modal';
import { iStoreState, IUserData } from '../../../services/constants/interfaces/store-schemas';
import { sendRequest } from '../../../services/utils/request';
import './reviews-sect.scss';

function ReviewsComp({reviewList, updateList}:{reviewList : any[], updateList: Function}) {

  const user: IUserData = useSelector((state: iStoreState) => state?.user);
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewStats, setReviewStats] = useState<{count: number, average: number, averageRemark: string}>();
  const [activeReview, setActiveReview] = useState<any>({});
  const [showEditModal, setShowEditModal] = useState(false);

  const modalRef = useRef<any>(null);


  const calculateReviewStats = (data: any[]) => {
    let total = 0;
    data.map((info) => {
      total += parseFloat(info.rating);
    });
    const average = total / (data.length || 1);
    let averageRemark;
    if (average < 1.8) {
      averageRemark = 'Poor Service';
    } else if (average < 2.7) {
      averageRemark = 'Managable Service';
    } else if (average < 3.6) {
      averageRemark = 'Average Service';
    } else if (average < 4.5) {
      averageRemark = 'Good Service';
    } else {
      averageRemark = 'Excelent Service';
    }
    setReviewStats({count: data.length, average, averageRemark})
  }

  const openEditModal = (review: any) => {
    setActiveReview(review);
    setShowEditModal(true);
  }

  const closeModal = (type: any) => {
    if(type) {
      modalRef.current?.closeModal();
      if(type === 2) {
        editReview();
      }
    }
    setTimeout(() => setShowEditModal(false), 500);
  }
  const editReview = () => {
      sendRequest({
          url: 'host-profile/reviews',
          method: 'GET',
      }, (res: any) => {
          setReviews(res.data || []);
      }, (err: any) => {});
  }

  useEffect(() => {
    calculateReviewStats(reviewList);
    setReviews(reviewList);
    console.log({user})
  }, [reviewList]);
  
  return (
    <>
      <div className='reviews-comp'>
        <div className='holder'>
          <h3>Reviews</h3>
          {
            reviews.length > 0 ?
            <>
              <div className='spread-info-front'>
                <h1 className='increased-xxxl reduce-height number-bold italic mb-0'>{reviewStats?.average?.toFixed(1)}</h1>
                <div className='ps-3'>
                  <h6>{reviewStats?.averageRemark}</h6>
                  <p className='mb-0'>{reviewStats?.count} verified review{reviewStats?.count !== 1 && 's'}</p>
                </div>
              </div>
              <hr />
            </> :
            <div className='pt-5 pb-3 text-center'>
              <h3 className='f700 black-tx'>No Reviews Yet.</h3>
            </div>
          }
          {
            reviews.map((review, index) => (
              <Fragment key={index}>
                <div className='review'>
                  <div>
                    <div className='imh'>
                      <img src={AvatarIcon} alt="" />
                    </div>
                  </div>
                  <div className='content'>
                    <div className='spread-info-front'>
                      <h6 className='increased mb-0 number-medium italic'>{review.rating}.0</h6> &nbsp; | &nbsp;
                      <p className='mb-0'>{review.reviewer_name}</p>
                    </div>
                    <p className='mb-0'>{review.review}</p>
                  </div>
                  <div className='flag'>
                    {
                      review.id === user.id ?
                      <FontAwesomeIcon icon={'edit'} className='edit orange-tx clickable increased' onClick={() => openEditModal(review)} /> :
                      <FontAwesomeIcon icon={'flag'} className='flag orange-tx' />
                    }
                  </div>
                </div>
                <hr />
              </Fragment>
            ))
          }
        </div>
      </div>
      {
        showEditModal &&
        <AppModal styleClass='' small onCloseModal={closeModal} ref={modalRef}>
          <div className='action-popup p-3'>
            <p className='text-center'>You are attempting to change your profile picture</p>
            <div className='info-grid'>
              <button onClick={() => closeModal(1)} className='reject-button'>{'Cancel'}</button>
              <button onClick={() => closeModal(2)} className='accept-button'>{'Update'}</button>
            </div>
          </div>
        </AppModal>
      }
    </>
  );
}

export default ReviewsComp;
