
import { Formik, FormikHelpers, FormikProps, FormikValues } from 'formik';
import React, { useEffect, useState } from 'react';
import { iBasicInfo } from '../add-shortlet-data';
import { countryList } from '../.././../../..//services/constants/country-list';
import './basic-info.scss';
import { regexConstants } from '../../../../../services/constants/validation-regex';
import { acceptOnlyNumbers } from '../../../../../services/utils/data-manipulation-utilits';

function BasicInfoSect({data, proceed}: {data: iBasicInfo, proceed: Function}) {

  const [response, setResponse] = useState<any>();
  const [stateList, setStateList] = useState<any[]>(countryList);
  const [lgaList, setLgaList] = useState<any[]>(countryList);
  

  const validate = (values: FormikValues) => {
    const errors: any = {};
    if(!values.apartment_name) {
      errors.apartment_name = 'Apartment_name is required';
    }
    if(!values.country) {
      errors.country = 'Country is required';
    }
    if(!values.state) {
      errors.state = 'State is required';
    }
    if(!values.lga) {
      errors.lga = 'Lga is required';
    }
    if(!values.address) {
      errors.address = 'Address is required';
    }
    if(!values.email) {
      errors.email = 'Email address is required';
    } else if(!regexConstants.emailPattern.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if(!values.phone) {
      errors.phone = 'Phone number is required';
    } else if(!regexConstants.phonePattern.test(values.phone)) {
      errors.phone = 'Invalid phone number';
    }
    // if(!values.website) {
    //   errors.website = 'Website is required';
    // }
    return errors;
  }

  const submitRegistration = (values: any, controls: FormikHelpers<any>) => {
    setResponse(' Baby code')
      controls.setSubmitting(false);
      proceed(values);
  }

  const cancel = () => {
    window.history.back();
  }

  useEffect(() => {});
  
  return (
    <div className='basic-info'>
      <div className='basic-info-card'>
        <div className=''>
          <h5 className='f700 center-info'>Basic Information</h5>
          <div className='reg-box'>
              <Formik initialValues={{
                  apartment_name: data.apartment_name || '',
                  country: data.country || '',
                  state: data.state || '',
                  lga: data.lga || '',
                  address: data.address || '',
                  email: data.email || '',
                  phone: data.phone || '',
                  website: data.website || '',
              }}
              validate={validate}
              onSubmit={(values: any, controls : any) => submitRegistration(values, controls)}
              >
                  {
                      (props: FormikProps<iBasicInfo>) => {
                          const {
                              values,
                              errors,
                              touched,
                              isSubmitting,
                              handleBlur,
                              handleChange,
                              handleSubmit,
                              handleReset
                          } = props;
                          return (
                              <form action="" onSubmit={handleSubmit}>
                                  <div className='reg-card'>
                                      <label>Apartment Name</label>
                                      <input
                                          type="text"
                                          placeholder='Enter apartment name'
                                          id='apartment_name'
                                          value={values.apartment_name}
                                          onBlur={handleBlur}
                                          onFocus={() => errors.apartment_name = ''}
                                          onChange={handleChange}
                                          className={(errors.apartment_name && touched.apartment_name) ? 'im-error' : ''}
                                      />
                                      {
                                          errors.apartment_name && touched.apartment_name &&
                                          <p className='reduced error-popup pt-1 mb-0'>{errors.apartment_name}</p>
                                      }
                                  </div>
                                  <div className='row'>
                                    <div className='col-lg-4 col-md-12'>
                                      <div className='reg-card'>
                                          <label>Country</label>
                                          <select
                                              id='country'
                                              value={values.country}
                                              onBlur={handleBlur}
                                              onFocus={() => errors.country = ''}
                                              onChange={handleChange}
                                              className={((errors.country && touched.country) ? 'im-error' : '') + (!values.country ? ' fainter-tx2' : '')}
                                          >
                                              <option value="">Choose property country</option>
                                              {countryList.map((country, index) => {
                                                  return <option value={country?.name} key={index}>{country?.name}</option>
                                              })}
                                          </select>
                                          {
                                              errors.country && touched.country &&
                                              <p className='reduced error-popup pt-1 mb-0'>{errors.country}</p>
                                          }
                                      </div>
                                    </div>
                                    <div className='col-lg-4 col-md-6'>
                                      <div className='reg-card'>
                                          <label>State/Province</label>
                                          {/* <select
                                              id='state'
                                              value={values.state}
                                              onBlur={handleBlur}
                                              onFocus={() => errors.state = ''}
                                              onChange={handleChange}
                                              className={((errors.state && touched.state) ? 'im-error' : '') + (!values.state ? ' fainter-tx2' : '')}
                                          >
                                              <option value="">Choose property State/Province</option>
                                              {stateList.map((state, index) => {
                                                  return <option value={state?.name} key={index}>{state?.name}</option>
                                              })}
                                          </select> */}
                                          <input
                                              type="text"
                                              placeholder='Enter State/Province'
                                              id='state'
                                              value={values.state}
                                              onBlur={handleBlur}
                                              onFocus={() => errors.state = ''}
                                              onChange={handleChange}
                                              className={(errors.state && touched.state) ? 'im-error' : ''}
                                          />
                                          {
                                              errors.state && touched.state &&
                                              <p className='reduced error-popup pt-1 mb-0'>{errors.state}</p>
                                          }
                                      </div>
                                    </div>
                                    <div className='col-lg-4 col-md-6'>
                                      <div className='reg-card'>
                                          <label>LGA/County</label>
                                          {/* <select
                                              id='lga'
                                              value={values.lga}
                                              onBlur={handleBlur}
                                              onFocus={() => errors.lga = ''}
                                              onChange={handleChange}
                                              className={((errors.lga && touched.lga) ? 'im-error' : '') + (!values.lga ? ' fainter-tx2' : '')}
                                          >
                                              <option value="">Choose property LGA/County</option>
                                              {lgaList.map((lga, index) => {
                                                  return <option value={lga?.name} key={index}>{lga?.name}</option>
                                              })}
                                          </select> */}
                                          <input
                                              type="text"
                                              placeholder='Enter LGA/County'
                                              id='lga'
                                              value={values.lga}
                                              onBlur={handleBlur}
                                              onFocus={() => errors.lga = ''}
                                              onChange={handleChange}
                                              className={(errors.lga && touched.lga) ? 'im-error' : ''}
                                          />
                                          {
                                              errors.lga && touched.lga &&
                                              <p className='reduced error-popup pt-1 mb-0'>{errors.lga}</p>
                                          }
                                      </div>
                                    </div>
                                  </div>
                                  <div className='reg-card'>
                                      <label>Full Address</label>
                                      <input
                                          type="text"
                                          placeholder='Enter property address'
                                          id='address'
                                          value={values.address}
                                          onBlur={handleBlur}
                                          onFocus={() => errors.address = ''}
                                          onChange={handleChange}
                                          className={(errors.address && touched.address) ? 'im-error' : ''}
                                      />
                                      {
                                          errors.address && touched.address &&
                                          <p className='reduced error-popup pt-1 mb-0'>{errors.address}</p>
                                      }
                                  </div>
                                  <div className='reg-card'>
                                      <label>Email Address</label>
                                      <input
                                          type="email"
                                          placeholder='Enter property email'
                                          id='email'
                                          value={values.email}
                                          onBlur={handleBlur}
                                          onFocus={() => errors.email = ''}
                                          onChange={handleChange}
                                          className={(errors.email && touched.email) ? 'im-error' : ''}
                                      />
                                      {
                                          errors.email && touched.email &&
                                          <p className='reduced error-popup pt-1 mb-0'>{errors.email}</p>
                                      }
                                  </div>
                                  <div className='row'>
                                    <div className='col-md-6'>
                                      <div className='reg-card'>
                                          <label>Phone Number</label>
                                          <input
                                              type="text"
                                              placeholder='Enter property phone number'
                                              id='phone'
                                              value={values.phone}
                                              onBlur={handleBlur}
                                              onKeyUp={acceptOnlyNumbers}
                                              onFocus={() => errors.phone = ''}
                                              onChange={handleChange}
                                              className={(errors.phone && touched.phone) ? 'im-error' : ''}
                                          />
                                          {
                                              errors.phone && touched.phone &&
                                              <p className='reduced error-popup pt-1 mb-0'>{errors.phone}</p>
                                          }
                                      </div>
                                    </div>
                                    <div className='col-md-6'>
                                      <div className='reg-card'>
                                          <label>Property Website</label>
                                          <input
                                              type="text"
                                              placeholder='Enter property website'
                                              id='website'
                                              value={values.website}
                                              onBlur={handleBlur}
                                              onFocus={() => errors.website = ''}
                                              onChange={handleChange}
                                              className={(errors.website && touched.website) ? 'im-error' : ''}
                                          />
                                          {
                                              errors.website && touched.website &&
                                              <p className='reduced error-popup pt-1 mb-0'>{errors.website}</p>
                                          }
                                      </div>
                                    </div>
                                  </div>
                                  <div className='text-center pt-3 pb-2'>
                                      <div className='spread-info'>
                                        <button type='button' className='recede-button px-4' onClick={cancel}>Cancel</button>
                                        <button type='submit' className='proceed-button px-3' disabled={isSubmitting}>{isSubmitting ? 'Processing..' : 'Save & Next'}</button>
                                      </div>
                                      {
                                          response && <div className=''>{response}</div>
                                      }
                                  </div>
                              </form>
                          );
                      }
                  }
              </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicInfoSect;
