import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, FormikHelpers, FormikProps, FormikValues } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { ProfilePicture } from '../../../../../assets/images';
import { regexConstants } from '../../../../../services/constants/validation-regex';
import { sendRequest } from '../../../../../services/utils/request';
import './profile-settings.scss';

interface IUserInfo {
  first_name: string;
  last_name: string;
  username: string;
  phone: string;
}

function ProfileSettingsPage(props: any) {

  const userImageInput = useRef(null);
  
  const [userInfo, setUserInfo] = useState<IUserInfo>({ first_name: '', last_name: '', username: '', phone: '' });
  
  const validate = (values: FormikValues) => {
    const errors: any = {};
    if(!values.first_name) {
      errors.first_name = "First name is required";
    }
    if(!values.last_name) {
      errors.last_name = "Last name is required";
    }
    if(!values.username) {
      errors.username = "Username is required";
    }
    if(!values.phone) {
      errors.phone = "Phone number is required";
    } else if(!regexConstants.phonePattern.test(values.phone)) {
      errors.phone = "Invalid phone number";
    }
    return errors;
  }

  const updateInfo = (values: FormikValues, controls: FormikHelpers<any>) => {}

  const getUserInfo = () => {
    sendRequest({
      url: 'user-settings/user'
    }, (res: any) => {
      setUserInfo(res);
    }, () => {})
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getUserInfo();
  }, [props]);
  
  return (
    <div className='profile-settings'>
      <div className='user-view'>
        <div className='im-holder'>
          <div className='imh'>
            <img src={ProfilePicture} alt="" />
          </div>
          <div className='edit-band'>
            <p><FontAwesomeIcon icon={'upload'}/> Upload Picture</p>
            <input type="file" ref={userImageInput} />
          </div>
        </div>
        <div className='text-holder'>
          <p>Image size should be under 1MB and image ratio needs to be 1:1</p>
        </div>
      </div>
      <div className='separator'></div>
      <div className='user-info'>
        <h5 className='fainter-font'>Account Settings</h5>
        <Formik
          initialValues={{
            first_name: userInfo.first_name || '',
            last_name: userInfo.last_name || '',
            username: userInfo.username || '',
            phone: userInfo.phone || '',
          }}
          validate={(values) => validate(values)}
          onSubmit={updateInfo}
        >
          {
            (Props: FormikProps<{
              first_name: string;
              last_name: string;
              username: string;
              phone: string;
            }>) => {
              const {
                values,
                errors,
                touched,
                isSubmitting,
                isValid,
                handleChange,
                handleSubmit,
              } = Props;
              console.log({touched, isValid, errors})
              return <form action='' onSubmit={handleSubmit} className='row'>
                <div className='col-md-6 reg-card'>
                  <label>First Name</label>
                  <input
                    type='text'
                    id='first_name'
                    name='first_name'
                    placeholder='Enter first name'
                    value={values.first_name}
                    onChange={handleChange}
                    className={touched.first_name && errors.first_name ? 'im-error' : ''}
                  />
                  {touched.first_name && errors.first_name && <p className='im-error mb-0 reduced red-tx'>{errors.first_name}</p>}
                </div>
                <div className='col-md-6 reg-card'>
                  <label>Last Name</label>
                  <input
                    type='text'
                    id='last_name'
                    name='last_name'
                    placeholder='Enter last name'
                    value={values.last_name}
                    onChange={handleChange}
                    className={touched.last_name && errors.last_name ? 'im-error' : ''}
                  />
                  {touched.last_name && errors.last_name && <p className='im-error mb-0 reduced red-tx'>{errors.last_name}</p>}
                </div>
                <div className='col-md-6 reg-card'>
                  <label>Username</label>
                  <input
                    type='text'
                    id='username'
                    name='username'
                    placeholder='Enter username'
                    value={values.username}
                    onChange={handleChange}
                    className={touched.username && errors.username ? 'im-error' : ''}
                  />
                  {touched.username && errors.username && <p className='im-error mb-0 reduced red-tx'>{errors.username}</p>}
                </div>
                <div className='col-md-6 reg-card'>
                  <label>Phone Number</label>
                  <input
                    type='text'
                    id='phone'
                    name='phone'
                    placeholder='Enter phone number'
                    value={values.phone}
                    onChange={handleChange}
                    className={touched.phone && errors.phone ? 'im-error' : ''}
                  />
                  {touched.phone && errors.phone && <p className='im-error mb-0 reduced red-tx'>{errors.phone}</p>}
                </div>
                <div className='col-md-12 pt-3'>
                  <button className='purple-button ' disabled={isSubmitting || !isValid}>{isSubmitting ? 'Updating...': 'Save Changes'}</button>
                </div>
              </form>
            }
          }
        </Formik>
        <div className='row'>
          <div className='col-md-6 pb-3'></div>
          <div className='col-md-6 pb-3'></div>
          <div className='col-md-12 py-3'></div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettingsPage;
