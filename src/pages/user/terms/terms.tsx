import React, { useEffect } from 'react';
import './terms.scss';

function TermsPage() {

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <div className='terms'>
      <div className='banner'>
        <div className='text-side'>
          <div className='text-holder'>
            <p><span></span>Borderless Services</p>
            <h1>Terms and Conditions</h1>
          </div>
        </div>
        <div className='empty-side'></div>
      </div>
      <div className='py-5 w90 max1200'>
        <h3 className='h3b'>Terms of  <span className='purple-tx'> Use</span></h3>
        <p className='mb-3'>
          Welcome to Borderless  ("Borderless ," "we," "us," or "our"). Please read these Terms of Use ("Terms") 
          carefully before accessing or using the Borderless  website, mobile application, or any associated services 
          (collectively referred to as the "Platform"). <br />
          By accessing or using the Platform, you agree to be bound by these Terms. If you do not agree to these Terms, 
          do not access or use the Platform.
        </p>
        <h6 className='increased orange-tx mt-4 pb-3'>1. Use of the Platform</h6>
        <p className='mb-3'>
          <span className='f600'>1.1 Eligibility:</span>
          You must be at least 18 years of age to use the Platform. By using the Platform, you represent and 
          warrant that you are at least 18 years old.
        </p>
        <p className='mb-3'>
          <span className='f600'>1.2 Registration:</span>
          To access certain features of the Platform, you may need to register for an account. You agree to provide 
          accurate, current, and complete information during the registration process and to update such information 
          to keep it accurate, current, and complete.
        </p>
        <p className='mb-3'>
          <span className='f600'>1.3 Account Security:</span>
          You are responsible for maintaining the confidentiality of your account credentials and for all activities 
          that occur under your account. You agree to notify us immediately of any unauthorized use of your account 
          or any other breach of security.
        </p>
        <p className='mb-0'>
          <span className='f600'>1.4 Prohibited Activities:</span>
          You agree not to use the Platform for any unlawful, harmful, or fraudulent purposes. Prohibited activities 
          include, but are not limited to:
        </p>
        <ul className='mb-3'>
          <li>Impersonating any person or entity.</li>
          <li>Violating any applicable laws or regulations.</li>
          <li>Interfering with the operation of the Platform.</li>
          <li>Uploading or transmitting viruses, worms, or any other malicious code.</li>
          <li>Attempting to gain unauthorized access to the Platform.</li>
        </ul>
        <h6 className='increased orange-tx mt-4 pb-3'>2. Booking Services</h6>
        <p className='mb-3'>
          <span className='f600'>2.1 Flight and Hotel Booking:</span>
          Our Platform allows you to search for, book, and pay for flights and hotels. All bookings are subject to 
          availability and the terms and conditions of the airlines and hotels.
        </p>
        <p className='mb-3'>
          <span className='f600'>2.2 Payment:</span>
          When booking through the Platform, you agree to pay all applicable fees and charges. Payment information 
          provided must be accurate and valid. We may use third-party payment processors to facilitate payments.
        </p>
        <p className='mb-3'>
          <span className='f600'>2.3 Cancellations and Refunds:</span>
          Cancellation and refund policies vary by airline and hotel. It is your responsibility to review and 
          understand the cancellation and refund policies associated with your bookings.
        </p>
        <h6 className='increased orange-tx mt-4 pb-3'>3. Privacy Policy</h6>
        <p className='mb-3'>
          Our Privacy Policy explains how we collect, use, and protect your personal information. By using the Platform, 
          you consent to our collection and use of your personal information as described in the Privacy Policy.
        </p>
        <h6 className='increased orange-tx mt-4 pb-3'>4. Termination</h6>
        <p className='mb-3'>
          We reserve the right to terminate or suspend your access to the Platform at our discretion, 
          with or without cause, and with or without notice.
        </p>
        <h6 className='increased orange-tx mt-4 pb-3'>5. Disclaimers and Limitations of Liability</h6>
        <p className='mb-3'>
          The Platform is provided on an "as-is" and "as-available" basis. We make no warranties or representations 
          regarding the accuracy or completeness of the information on the Platform. We shall not be liable for any 
          direct or indirect damages arising from your use of the Platform.
        </p>
        <h6 className='increased orange-tx mt-4 pb-3'>6. Intellectual Property</h6>
        <p className='mb-3'>
          The Platform and its content, including but not limited to text, graphics, logos, and software, are protected 
          by intellectual property laws. You may not reproduce, modify, distribute, or create derivative works based on 
          the Platform without our prior written consent.
        </p>
        <h6 className='increased orange-tx mt-4 pb-3'>7. Governing Law</h6>
        <p className='mb-3'>
          These Terms are governed by and construed in accordance with the laws of [Jurisdiction]. Any disputes arising 
          from these Terms shall be subject to the exclusive jurisdiction of the courts in [Jurisdiction].
        </p>
        <h6 className='increased orange-tx mt-4 pb-3'>8. Changes to Terms</h6>
        <p className='mb-3'>
          We may update these Terms from time to time. Any changes will be posted on the Platform, and your continued 
          use of the Platform after such changes will constitute your acceptance of the revised Terms.
        </p>
        <h6 className='increased orange-tx mt-4 pb-3'>9. Contact Information</h6>
        <p className='mb-3'>
          If you have any questions about these Terms or the Platform, please contact us at [Contact Information]. <br />
          By using the Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use.
        </p>
      </div>
    </div>
  );
}

export default TermsPage;
