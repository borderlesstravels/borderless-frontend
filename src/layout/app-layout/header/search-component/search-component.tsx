import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik, FormikProps, FormikValues } from "formik";
import React, { useEffect, useState } from "react";

import "./search-component.scss";

function SearchComponent(props: any) {

  const submitSearch = (values: FormikValues, controls: any) => {}

  const validate = (values: FormikValues) => {}

  useEffect(() => {}, [props]);

  return (
    <>
      <Formik
        initialValues={{search: ''}}
        validate={validate}
        onSubmit={(values, controls) => submitSearch(values, controls)}
      >
        {
          (formProps: FormikProps<{search: string}>) => {
            const {
              values,
              touched,
              errors,
              handleChange,
              handleSubmit,
            } = formProps;
            return (
              <form action="" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="search"
                  id="search"
                  value={values.search}
                  onChange={handleChange}
                  placeholder="Search for anything"
                />
              </form>
            )
          }
        }
      </Formik>
    </>
  );
}

export default SearchComponent;
