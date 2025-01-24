import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, FormikHelpers, FormikProps, FormikValues } from 'formik';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { socialLinks } from '../../../config/environment';
import { regexConstants } from '../../../services/constants/validation-regex';
import { sendRequest } from '../../../services/utils/request';
import './contact.scss';
import HeroSect from './hero/hero';

function Contact() {

  const validate = (values: FormikValues) => {
    const errors: any = {};

    if (!values.name) {
      errors.name = "Institution name is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regexConstants.emailPattern.test(values.email)) {
      errors.email = "Invalid email";
    }
    if (!values.subject) {
      errors.subject = "Subject is required";
    }
    if (!values.company) {
      errors.company = "Company name is required";
    }
    if (!values.message) {
      errors.message = "Message is required";
    }
    return errors;
  };

  const sendForm = (values: any, controls: FormikHelpers<any>) => {
    sendRequest({
        url: `website/contact-us`,
        method: 'POST',
        body: values
      }, (res: any)=>{
        controls.setSubmitting(false);
        controls.setValues({ name: '', email: '', subject: '', company: '', message: '', });
        controls.setTouched({})
        toast.success('Message successfully sent');
      }, (err: any)=>{
        toast.error(err.responseText || 'Request failed');
    })
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <div className='contact'>
    <HeroSect/>
    <div className='py-5'>
      <h3 className='h3b text-center pt-4'>Get in <span className='purple-tx'> Touch</span></h3>
      <div className="contact-grid">
        <div className='info-side'>
          <h3 className='f700 mb-4'>Contact Info & Form</h3>
          <div className='c-info-grid'>
            <div className='contact-icon'>
              <FontAwesomeIcon icon={'envelope'} className='icon' />
            </div>
            <div className='contact-text'>
              <span>Email us</span>
              <p>info@golio.com</p>
            </div>
          </div>
          <div className='c-info-grid'>
            <div className='contact-icon'>
              <FontAwesomeIcon icon={'phone-volume'} className='icon' />
            </div>
            <div className='contact-text'>
              <span>Phone number</span>
              <p className='number-light'>+1-202-555-0138</p>
            </div>
          </div>
          <div className='c-info-grid'>
            <div className='contact-icon'>
              <FontAwesomeIcon icon={'envelope'} className='icon' />
            </div>
            <div className='contact-text'>
              <p className='reduced-soft'>901 N Pitt Str., Suite 170 <br /> Alexandria, VA 22314, USA</p>
            </div>
          </div>
          <div className='pt-4'>
            <p>
              - Connect with us:
            </p>
            <div className='spread-info-front'>
              <a href={socialLinks.facebook}>
                <div className='social-icon'>
                  <FontAwesomeIcon icon={['fab', 'facebook-f']} />
                </div>
              </a>
              <a href={socialLinks.facebook}>
                <div className='social-icon'>
                  <FontAwesomeIcon icon={['fab', 'twitter']} />
                </div>
              </a>
              <a href={socialLinks.facebook}>
                <div className='social-icon'>
                  <FontAwesomeIcon icon={['fab', 'linkedin-in']} />
                </div>
              </a>
              <a href={socialLinks.facebook}>
                <div className='social-icon'>
                  <FontAwesomeIcon icon={['fab', 'instagram']} />
                </div>
              </a>
              <a href={socialLinks.facebook}>
                <div className='social-icon'>
                  <FontAwesomeIcon icon={['fab', 'dribbble']} />
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className='form-side'>
          <div className="admin-apply-box">
            <Formik
              initialValues={{
                name: '',
                email: '',
                subject: '',
                company: '',
                message: '',
              }}
              validate={(value) => validate(value)}
              onSubmit={(values, controls) =>
                sendForm(values, controls)
              }>
              {(
                props: FormikProps<{
                  name: string,
                  email: string,
                  subject: string,
                  company: string,
                  message: string,
                }>
              ) => {
                const {
                  values,
                  errors,
                  touched,
                  isSubmitting,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                } = props;
                return (
                  <form action="" className="row" onSubmit={handleSubmit}>
                    <div className="reg-card col-sm-6">
                      <label className="text-left">Name</label>
                      <input
                        type={'text'}
                        placeholder="Enter name"
                        id="name"
                        value={values.name}
                        onBlur={handleBlur}
                        onFocus={() => (errors.name = "")}
                        onChange={handleChange}
                        className={
                          errors.name && touched.name ? "im-error" : ""
                        }
                      />
                      {errors.name && touched.name && (
                        <p className="reduced error-popup pt-1 mb-0">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="reg-card col-sm-6">
                      <label className="text-left">Email</label>
                      <input
                        type="email"
                        placeholder="enter email"
                        id="email"
                        value={values.email}
                        onBlur={handleBlur}
                        onFocus={() => (errors.email = "")}
                        onChange={handleChange}
                        className={
                          errors.email && touched.email ? "im-error" : ""
                        }
                      />
                      {errors.email && touched.email && (
                        <p className="reduced error-popup pt-1 mb-0">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div className="reg-card col-sm-12">
                      <label className="text-left">Subject</label>
                      <input
                        type={'text'}
                        placeholder="Enter subject"
                        id="subject"
                        value={values.subject}
                        onBlur={handleBlur}
                        onFocus={() => (errors.subject = "")}
                        onChange={handleChange}
                        className={
                          errors.subject && touched.subject ? "im-error" : ""
                        }
                      />
                      {errors.subject && touched.subject && (
                        <p className="reduced error-popup pt-1 mb-0">
                          {errors.subject}
                        </p>
                      )}
                    </div>
                    <div className="reg-card col-sm-12">
                      <label className="text-left">Company Name</label>
                      <input
                        type={'text'}
                        placeholder="Brand/Company/Product Name"
                        id="company"
                        value={values.company}
                        onBlur={handleBlur}
                        onFocus={() => (errors.company = "")}
                        onChange={handleChange}
                        className={
                          errors.company && touched.company ? "im-error" : ""
                        }
                      />
                      {errors.company && touched.company && (
                        <p className="reduced error-popup pt-1 mb-0">
                          {errors.company}
                        </p>
                      )}
                    </div>
                    <div className="reg-card col-12">
                      <label className="text-left">Message</label>
                      <textarea
                        placeholder="Enter your message"
                        id="message"
                        rows={3}
                        value={values.message}
                        onBlur={handleBlur}
                        onFocus={() => (errors.message = "")}
                        onChange={handleChange}
                        className={
                          errors.message && touched.message ? "im-error" : ""
                        }
                      />
                      {errors.message && touched.message && (
                        <p className="reduced error-popup pt-1 mb-0">
                          {errors.message}
                        </p>
                      )}
                    </div>
                    <div className="col-12 pt-4 pb-2">
                        <button type="submit" className="reg-button2">
                          {
                          isSubmitting ? 
                          'Sending...' :
                          <>Send Message <FontAwesomeIcon icon={'arrow-right'} className='icon'/></>
                          }
                        </button>
                    </div>
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Contact;
