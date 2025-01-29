import {
  Formik,
  FormikConfig,
  FormikProps,
  FormikValues,
  isFunction,
  Form as FormikForm,
} from 'formik';
import cs from 'classnames';
import { ReactNode } from 'react';

export interface FormProps<T extends FormikValues = FormikValues>
  extends FormikConfig<T> {
  children?: React.ReactNode | ((props: FormikProps<T>) => ReactNode);
  className?: string;
}

const Form = <T extends FormikValues = FormikValues>({
  validationSchema,
  initialValues,
  onSubmit,
  children,
  validateOnChange = true,
  validateOnBlur = true,
  className,
  ...props
}: FormProps<T>) => {
  const classes = cs('', {
    [`${className}`]: className,
  });

  if (isFunction(children)) {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnChange={validateOnChange} // if false, it will prevent the form fields to be validated onChange
        validateOnBlur={validateOnBlur}
        {...props}
      >
        {(formikProps) => (
          <FormikForm className={classes}>{children(formikProps)}</FormikForm>
        )}
      </Formik>
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnChange={validateOnChange} // if false, it will prevent the form fields to be validated onChange
      validateOnBlur={validateOnBlur} // if false, it will prevent the form fields to be validated onBlur
      {...props}
    >
      <FormikForm className={classes}>{children as ReactNode}</FormikForm>
    </Formik>
  );
};

export default Form;
