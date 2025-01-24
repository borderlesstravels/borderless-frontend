
import React, { useEffect, useState } from 'react';
import { sendRequest } from '../../../../services/utils/request';
import ReviewsComp from '../../../../components/block-components/reviews-comp/reviews-sect';
import './reviews-sect.scss';

function ReviewsSect(props: any) {

  const [reviews, setReviews] = useState<any[]>([]);

  const getReviews = () => {
      sendRequest({
          url: 'host-profile/reviews',
          method: 'GET',
      }, (res: any) => {
          setReviews(res.data || []);
      }, (err: any) => {});
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getReviews();
  }, [props]);
  
  return (
    <>
      <div className='reviews-sect'>
        <ReviewsComp reviewList={reviews} updateList={() => {}} />
      </div>
    </>
  );
}

export default ReviewsSect;
