import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import AppModal from '../../../../../components/block-components/app-modal/app-modal';
import MiniLoader from '../../../../../components/block-components/mini-loader/mini-loader';
import { resourceLinks } from '../../../../../config/environment';
import { iStoreState } from '../../../../../services/constants/interfaces/store-schemas';
import { routeConstants } from '../../../../../services/constants/route-constants';
import { formatDate } from '../../../../../services/utils/data-manipulation-utilits';
import { sendRequest } from '../../../../../services/utils/request';
import { swalDanger, swalSuccess } from '../../../../../services/utils/swal-utils';
import { iBookedAppartmentInfo, iFullShortletInfo } from '../../../../host/add-stay/add-shortlet/add-shortlet-data';
import { formatTime } from '../../../stays/stay-search/stay-search-service';
import './stay-booking-single-record.scss';

function StayBookingSingleRecord(props: any) {
  const stayId = useParams().id || '';
  const [loading, setLoading] = useState<0 | 1 | 2>(0);
  const [processingOrder, setProcessingOrder] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [stayDetails, setStayDetails] = useState<iBookedAppartmentInfo>();
  const navigate = useNavigate();
  const userType: 'user' | 'host' = useSelector((state: iStoreState) => state?.user?.userMode || 'user');
  const [showEditModal, setShowEditModal] = useState(false);
  const [reviewInfo, setReviewInfo] = useState('');
  const [reviewStar, setReviewStar] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const modalRef = useRef<any>(null);

  const getStayDetails = () => {
    setLoading(0);
    
    sendRequest(
      {
        url: userType + "-profile/single-shortlet-booking/" + stayId,
        method: "GET",
      },
      (res: any) => {
        const refinedData = res.data;
        refinedData.images = res.data.apartment_img.split(', ').map((image: string) => resourceLinks.shortletImages + image);
        setStayDetails(refinedData);
        console.log({refinedData})
        setLoading(1);
      },
      (err: any) => {
        setLoading(2);
      }
    );
  };

  const reloadData = () => {
    getStayDetails();
  }

  const exitPage = () => {
    window.history.back();
  }

  const goToPreview = () => {
    navigate(`/${routeConstants.stayPreview}/${stayDetails?.apartment_id}`);
  }
  const returnToBookings = () => {
    navigate(`/${routeConstants.myBookings}/stay`);
  }
  const goHome = () => {
    navigate(`/`);
  }

  const rejectBooking = () => {
    swalDanger.fire({
      title: 'Reject Booking',
      text: `Are you sure you wish to reject the request to book your shortlet?`,
      icon: 'error',
    }).then((result: any) => {
      if(result.isConfirmed) {
        setProcessingOrder(1);
        sendRequest({
            url: 'host-profile/decline-booking/' + stayDetails?.booking_reference,
            method: 'PUT',
        }, (res: any) => {
          setProcessingOrder(2);
            toast.success(res.message || 'successful');
        }, (err: any) => {
          setProcessingOrder(0);
          toast.error(err?.message || err?.error || 'Unable to decline, please check your network and retry');
        });
      }
    })
  }

  const confirmBooking = () => {
    swalSuccess.fire({
      title: 'Confirm Booking',
      text: `Please verify the property is available and in the condition described before confirming this request to book your shortlet?`,
      icon: 'success',
    }).then((result: any) => {
      if(result.isConfirmed) {
        setProcessingOrder(3);
        sendRequest({
            url: 'host-profile/confirm-booking/' + stayDetails?.booking_reference,
            method: 'PUT',
        }, (res: any) => {
            setProcessingOrder(4);
            toast.success(res.message || 'successful');
        }, (err: any) => {
            setProcessingOrder(0);
          toast.error(err?.message || err?.error || 'Unable to confirm, please check your network and retry');
        });
      }
    })
  }
  const openEditModal = () => {
    // setActiveReview(review);
    setShowEditModal(true);
  }

  const handleReviewChange = (e: any) => {
    const value = e.target.value;
    setReviewInfo(value);
  }

  const writeReview = () => {
    if(!reviewStar){
      toast.warning('You can not submit without selecting star rating');
      return;
    }
    if(!reviewInfo || reviewInfo.length < 6){
      toast.warning('You can not submit an empty review, please write a review with a minimum of 6 characters');
      return;
    }
    setSubmitting(true);
    sendRequest({
        url: 'user-profile/create-review/' + stayDetails?.apartment_id,
        method: 'POST',
        body: {
          review: reviewInfo,
          rating: reviewStar,
          product_type: 'shortlet'
        }
    }, (res: any) => {
        setSubmitting(false);
        toast.success(res.message || 'successful');
        closeModal(2);
    }, (err: any) => {
        setSubmitting(false);
      toast.error(err?.message || err?.error || 'Unable to confirm, please check your network and retry');
    });
  }

  const closeModal = (type: any) => {
    setReviewInfo('');
    setReviewStar(0);
    if(type) {
      modalRef.current?.closeModal();
      if(type === 2) {
        getStayDetails();
      }
    }
    setTimeout(() => setShowEditModal(false), 500);
  }

  useEffect(() => {
    getStayDetails();
    window.scrollTo(0, 0);
  }, [props]);
  
  return (
    <>
    {
      loading === 0 &&
      <div className='loader-holder'>
        <MiniLoader />
      </div>
    }
    {
      loading === 2 &&
      <div className='loader-holder'>
        <div className='error-box'>
          <h3>An error occured while loading</h3>
          <button className='my-2 mx-2 confirmation-button' onClick={reloadData}>Reload</button>
          <button className='my-2 mx-2 cancel' onClick={exitPage}>Exit</button>
        </div>
      </div>
    }
      {
        loading === 1 &&
        <div className='stay-tickets'>
          <div className='preview-sect'>
            <div className='spread-info-web pt-3 pb-2'>
              <h5>
                <span className='orange-tx'>{stayDetails?.apartment_country} </span> <span className='px-2 fainter-tx'> &gt; </span>
                <span className='orange-tx'> {stayDetails?.apartment_state} </span> <span className='px-2 fainter-tx'> &gt; </span>
                <span className='increased-soft'> {stayDetails?.apartment_name}</span>
              </h5>
              <div className='spread-info py-2'>
                <h6 className='purple-tx clickable mb-0' onClick={goToPreview}> <FontAwesomeIcon icon={'chevron-left'} /> View Stay Details</h6>
                {
                  stayDetails &&
                  <button className='review-button' onClick={openEditModal}>Give Review</button>
                }
              </div>
            </div>
            {/* {
              stayDetails &&
              <div className='spread-info-web pt-3 pb-2'>
                <h5 className='mb-0'></h5>
                <button className='booking-button' onClick={openEditModal}>Give Review</button>
              </div>
            } */}

            <div className='spread-info-web pb-3'></div>

            <div>
              <div className='row pt-3 pb-4'>
                <div className='col-lg-6 spread-col py-3'>
                  <div className='text'>
                    <div className='spread-info-front'>
                      <div className='orange-box'></div>
                      <h5 className='mb-0 f700'>Reservation Status: {stayDetails?.status}</h5>
                    </div>
                    <p></p>
                    {
                      userType === 'host' ?
                      <p>
                        Your appartment ({stayDetails?.apartment_name}), located at {stayDetails?.apartment_address}
                        , {stayDetails?.apartment_city}, {stayDetails?.apartment_state}, {stayDetails?.apartment_country}
                        , has been requested for booking from {formatTime(stayDetails?.check_in_time || '', true)},
                        {formatDate(stayDetails?.check_in_date || '')} to {formatDate(stayDetails?.check_out_date || '')}.
                        <br /><br />
                        {
                          processingOrder === 4 &&
                          <p>You have successfully declined the guest reservation, go to bookings list to see more booking records.</p>
                        }
                        {
                          processingOrder === 2 &&
                          <p>You have successfully accepted the guest reservation, go to bookings list to see more booking records.</p>
                        }
                        {
                          (processingOrder !== 4 && processingOrder !== 2) &&
                          <p>Please confirm the property is in proper condition before accepting a guest.</p>
                        }
                      </p> :
                      <>
                        {
                          stayDetails?.status === 'pending' &&
                          <p>
                            Your booking for Ceasar Luxury Apartments is successful. We would automatically debit you from your 
                            chosen payment option once the host confirms availability of the stay within 24 hours.
                            <br /><br />
                            We would notify you on the progress of your booking via email and in-app notification. Alternatively, 
                            you can follow up through the ‘my bookings’ section.
                          </p>
                        }
                        {
                          stayDetails?.status === '' &&
                          <p>
                            Your booking for Ceasar Luxury Apartments is successful. We would automatically debit you from your 
                            chosen payment option once the host confirms availability of the stay within 24 hours.
                            <br /><br />
                            We would notify you on the progress of your booking via email and in-app notification. Alternatively, 
                            you can follow up through the ‘my bookings’ section.
                          </p>
                        }
                      </>
                    }
                  </div>
                  {
                    userType === 'user' &&
                    <div className='action'>
                      <button className='booking-button' onClick={returnToBookings}>My Bookings</button>
                      <span></span>
                      <button className='home-button' onClick={goHome}>Home</button>
                    </div>
                  }
                  {
                    userType === 'host' &&
                    <>
                      {
                        (processingOrder === 2 || processingOrder === 4) ?
                        <button className='home-button' onClick={goHome}>Return Home</button> :
                        <div className='action'>
                          <button className={'reject-button' + ((processingOrder === 1 || processingOrder === 3) ? ' deactivated' : '')} onClick={rejectBooking}>
                            {processingOrder === 1 ? 'Processing..' : 'Decline'}
                          </button>
                          <span></span>
                          <button className={'home-button' + ((processingOrder === 1 || processingOrder === 3) ? ' deactivated' : '')} onClick={confirmBooking}>
                            {processingOrder === 3 ? 'Processing..' : 'Confirm'}
                          </button>
                        </div>
                      }
                    </>
                  }
                </div>
                <div className='col-lg-1'></div>
                <div className='col-lg-5 py-3'>
                  <div className='single-image-holder'>
                    <img src={stayDetails?.apartment_img ? (resourceLinks.shortletImages + stayDetails?.apartment_img)  : ''} alt="" />
                  </div>
                  {/* <div className='row auto-scroll max-h60'>
                    {stayDetails?.images?.map((image, index) => (
                      <div className='col-6 px-1' key={index}>
                        <div className='imh pb-2'>
                          <img src={image} alt="" />
                        </div>
                      </div>
                    ))}
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {
        showEditModal &&
        <AppModal styleClass='' hideX onCloseModal={closeModal} ref={modalRef}>
          <div className='action-popup p-3 review-space'>
            <h3 className='f700 blue-tx text-center'>Give Review</h3>
            <div className='center-info pb-1 pt-4'>
              <FontAwesomeIcon icon={'star'} className={'review-star' + (reviewStar >= 1 ? ' active' : '')} onClick={() => setReviewStar(1)} />
              <FontAwesomeIcon icon={'star'} className={'review-star' + (reviewStar >= 2 ? ' active' : '')} onClick={() => setReviewStar(2)} />
              <FontAwesomeIcon icon={'star'} className={'review-star' + (reviewStar >= 3 ? ' active' : '')} onClick={() => setReviewStar(3)} />
              <FontAwesomeIcon icon={'star'} className={'review-star' + (reviewStar >= 4 ? ' active' : '')} onClick={() => setReviewStar(4)} />
              <FontAwesomeIcon icon={'star'} className={'review-star' + (reviewStar >= 5 ? ' active' : '')} onClick={() => setReviewStar(5)} />
            </div>
            {
              reviewStar ?
              <p className='number-medium text-center'>
                {reviewStar} Star (
                  {reviewStar === 1 && 'Poor Service'}
                  {reviewStar === 2 && 'Managable Service'}
                  {reviewStar === 3 && 'Average Service'}
                  {reviewStar === 4 && 'Good Service'}
                  {reviewStar === 5 && 'Excelent Service'}
                )
              </p> :
              <p className='faint-tx text-center'>Select Star Rating</p>
            }
            <textarea 
              onChange={handleReviewChange}
              value={reviewInfo}
              placeholder="Write about your experience"
              name="" id="" rows={5}
            ></textarea>
            <div className='info-grid w90 max500 py-3'>
              <button onClick={() => closeModal(1)} className={'reject-button' + (submitting ? ' deactivated' : '')}>
                {'Cancel'}
              </button>
              <button onClick={writeReview} className={'accept-button' + (submitting ? ' deactivated' : '')}>
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </AppModal>
      }
    </>
  );
}

export default StayBookingSingleRecord;
