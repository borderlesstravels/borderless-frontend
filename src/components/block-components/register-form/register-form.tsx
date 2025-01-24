import { Formik, FormikProps } from 'formik';
import React, { useEffect, useState } from 'react';
import { JsxElement } from 'typescript';
import * as Yup from 'yup';
import { countryList } from '../../../services/constants/country-list';
import { regexConstants } from '../../../services/constants/validation-regex';
import { sendRequest } from '../../../services/utils/request';
import { toast } from 'react-toastify';

import './register-form.scss';

function RegisterForm() {

    const [response, setResponse] = useState<any>();

    const submitRegistration = (values: any, controls: any) => {
        controls.setSubmitting(true);
        sendRequest({
            url: 'whitelist-subscriber',
            method: 'POST',
            body: {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                country: values.country,
                phoneNo: values.phoneNo,
            }
        }, (res: any) => {
            controls.setSubmitting(false);
            setResponse(<p className='c-green mb-0 pt-2'>{res.message}</p>);
            toast.success(res.message);
            controls.resetForm();
        }, (err: any) => {
            controls.setSubmitting(false);
            setResponse(<p className='c-red-faded mb-0 pt-2'>{err.error?.emailError || err.message || 'Unable to complete'}</p>);
            toast.error(err.error?.emailError || err.message || 'Unable to complete');
        });
    }

    const clearResponse = () => {
        setResponse(undefined);
    }

    useEffect(() => {
    });

    return (
        <div className='reg-box' onClick={clearResponse}>
            <Formik initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                country: '',
                phoneNo: ''
            }}
            onSubmit={(values: any, controls : any) => submitRegistration(values, controls)}
            // validationSchema={Yup.object().shape({
            //     firstName: Yup.string().required('First name is required'),
            //     lastName: Yup.string().required('Last name is required'),
            //     email: Yup.string().required('Email is required').matches(regexConstants.emailPattern, 'Invalid email'),
            //     country: Yup.string().required('Last name is required'),
            //     phoneNo: Yup.string().required('Phone number is required').min(8, 'Phone number must be at least 8 characters'),
            // })}
            >
                {
                    (props: FormikProps<{
                        firstName: string,
                        lastName: string,
                        email: string,
                        country: string,
                        phoneNo: string,
                    }>) => {
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
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        placeholder='Enter your first name'
                                        id='firstName'
                                        value={values.firstName}
                                        onBlur={handleBlur}
                                        onFocus={() => errors.firstName = ''}
                                        onChange={handleChange}
                                        className={(errors.firstName && touched.firstName) ? 'im-error' : ''}
                                    />
                                    {
                                        errors.firstName && touched.firstName &&
                                        <p className='reduced error-popup pt-1 mb-0'>{errors.firstName}</p>
                                    }
                                </div>
                                <div className='reg-card'>
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        placeholder='Enter your last name'
                                        id='lastName'
                                        value={values.lastName}
                                        onBlur={handleBlur}
                                        onFocus={() => errors.lastName = ''}
                                        onChange={handleChange}
                                        className={(errors.lastName && touched.lastName) ? 'im-error' : ''}
                                    />
                                    {
                                        errors.lastName && touched.lastName &&
                                        <p className='reduced error-popup pt-1 mb-0'>{errors.lastName}</p>
                                    }
                                </div>
                                <div className='reg-card'>
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        placeholder='enter your email'
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
                                <div className='reg-card'>
                                    <label>Country</label>
                                    <select
                                        id='country'
                                        value={values.country}
                                        onBlur={handleBlur}
                                        onFocus={() => errors.country = ''}
                                        onChange={handleChange}
                                        className={(errors.country && touched.country) ? 'im-error' : ''}
                                    >
                                        <option value="">Choose your country</option>
                                        {countryList.map((country, index) => {
                                            return <option value={country?.name} key={index}>{country?.name}</option>
                                        })}
                                    </select>
                                    {
                                        errors.country && touched.country &&
                                        <p className='reduced error-popup pt-1 mb-0'>{errors.country}</p>
                                    }
                                </div>
                                <div className='reg-card'>
                                    <label>Phone Number</label>
                                    <input
                                        type="text"
                                        placeholder='Enter your phone number'
                                        id='phoneNo'
                                        value={values.phoneNo}
                                        onBlur={handleBlur}
                                        onFocus={() => errors.phoneNo = ''}
                                        onChange={handleChange}
                                        className={(errors.phoneNo && touched.phoneNo) ? 'im-error' : ''}
                                    />
                                    {
                                        errors.phoneNo && touched.phoneNo &&
                                        <p className='reduced error-popup pt-1 mb-0'>{errors.phoneNo}</p>
                                    }
                                </div>
                                <div className='text-center pt-3 pb-2'>
                                    <button type='submit' className='solid-button-2c' disabled={isSubmitting}>{isSubmitting ? 'Processing..' : 'Submit'}</button>
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
    );
}

export default RegisterForm;
