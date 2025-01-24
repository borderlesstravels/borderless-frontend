import React, { useEffect } from 'react';
import './privacy-policy.scss';

function PrivacyPolicyPage() {

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <div className='privacy-policy'>
      <div className='banner'>
        <div className='text-side'>
          <div className='text-holder'>
            <p><span></span>Borderless Services</p>
            <h1>Privacy Policy</h1>
          </div>
        </div>
        <div className='empty-side'></div>
      </div>
      <div className='py-5 w90 max1200'>
        <h3 className='h3b'>Privacy Policy<span className='purple-tx'></span></h3>
        <h6 className='increased orange-tx mt-4 pb-3'>1. Introduction</h6>
        <p className='mb-3'>
          Welcome to Borderless  ("Borderless ," "we," "us," or "our"). Protecting your privacy is of utmost importance 
          to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information 
          when you access or use our website, mobile application, or related services (collectively referred to as 
          the "Platform").
        </p>
        <h6 className='increased orange-tx mt-4 pb-3'>2. Information We Collect</h6>
        <p className='mb-3'>
          <span className='f600'>2.1 Personal Information:</span>
          When you register for an account or use our services, we may collect personal information such as your name, 
          email address, phone number, and payment information. You may also provide additional information when 
          communicating with us.
        </p>
        <p className='mb-3'>
          <span className='f600'>2.2 Usage Information:</span>
          We collect information about your interactions with the Platform, including your IP address, device 
          information, browser type, and pages you visit.
        </p>
        <p className='mb-3'>
          <span className='f600'>2.3 Location Information:</span>
          If you grant us permission, we may collect location information from your device to provide location-based 
          services, such as flight and hotel search results.
        </p>
        <p className='mb-3'>
          <span className='f600'>2.4 Cookies and Tracking Technologies:</span>
          We use cookies and similar tracking technologies to collect information about your browsing behavior and 
          preferences. You can control cookies through your browser settings.
        </p>
        <h6 className='increased orange-tx mt-4 pb-3'>3. How We Use Your Information</h6>
        <p className='mb-3'>
          We use the information we collect for various purposes, including but not limited to:
        </p>
        <p className='mb-3'>
          <span className='f600'>3.1 Providing Services:</span>
          We use your personal information to facilitate flight and hotel bookings, process payments, and provide customer support.
        </p>
        <p className='mb-3'>
          <span className='f600'>3.2 Personalization:</span>
          We use your information to personalize your experience on the Platform, including tailoring recommendations and content.
        </p>
        <p className='mb-3'>
          <span className='f600'>3.3 Communication:</span>
          We may send you transactional emails related to your bookings, as well as promotional and informational emails. 
          You can opt out of promotional emails at any time.
        </p>
        <p className='mb-3'>
          <span className='f600'>3.4 Analytics:</span>
          We analyze usage patterns to improve the Platform, troubleshoot issues, and monitor performance.
        </p>
        <p className='mb-3'>
          <span className='f600'>3.5 Legal Compliance:</span>
          We may use your information to comply with legal obligations, such as tax reporting or fraud prevention.
        </p>
        <h6 className='increased orange-tx mt-4 pb-3'>4. Information Sharing</h6>
        <p className='mb-3'>
          We may share your information with third parties in the following circumstances:
        </p>
        <p className='mb-3'>
          <span className='f600'>4.1 Service Providers:</span>
          We may share information with third-party service providers who assist us in operating the Platform, 
          including payment processors, customer support, and marketing services.
        </p>
        <p className='mb-3'>
          <span className='f600'>4.2 Partners:</span>
          We may share information with airline and hotel partners to facilitate bookings.
        </p>
        <p className='mb-3'>
          <span className='f600'>4.3 Legal Compliance:</span>
          We may disclose information when required by law, such as in response to a subpoena or government request.
        </p>
        <p className='mb-3'>
          <span className='f600'>4.4 Business Transfers:</span>
          In the event of a merger, acquisition, or sale of all or part of our assets, your information may be 
          transferred to the acquiring entity.
        </p>
        <h6 className='increased orange-tx mt-4 pb-3'>5. Data Security</h6>
        <p className='mb-3'>
          We take data security seriously and implement reasonable measures to protect your information from 
          unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over 
          the internet or electronic storage is entirely secure.
        </p>
        <h6 className='increased orange-tx mt-4 pb-3'>6. Your Choices</h6>
        <p className='mb-3'>
          You have the right to access, correct, or delete your personal information. You can also opt out of 
          receiving promotional emails. To exercise your rights, please contact us at [Contact Information].
        </p>
        <h6 className='increased orange-tx mt-4 pb-3'>7. Changes to Privacy Policy</h6>
        <p className='mb-3'>
          We may update this Privacy Policy from time to time to reflect changes in our practices or for 
          legal reasons. The updated policy will be posted on the Platform, and the "Effective Date" at the 
          top will indicate when the changes become effective.
        </p>
        <h6 className='increased orange-tx mt-4 pb-3'>8. Contact Us</h6>
        <p className='mb-3'>
          If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us at 
          [Contact Information].
        </p>
        <p className='mt-4 pb-3 orange-tx'>
          By using the Platform, you consent to the terms of this Privacy Policy and the processing of your personal 
          information as described herein.
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;
