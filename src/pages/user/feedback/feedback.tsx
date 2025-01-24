import React, { useEffect } from 'react';
import './feedback.scss';

function FeedbackPage() {

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <div className='feedback'>
      <h1>Feedback Page</h1>
      <h1>Feedback Page</h1>
      <h1>Feedback Page</h1>
      <h1>Feedback Page</h1>
      <h1>Feedback Page</h1>
    </div>
  );
}

export default FeedbackPage;
