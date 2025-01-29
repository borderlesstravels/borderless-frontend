import { ErrorMessage, Field, useField } from "formik";
import { ReactNode, useState } from "react";
import cs from "classnames";

import "./form-input.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  isRequired?: boolean;
  extraDetails?: ReactNode;
}

const FormInput = ({
  label,
  name,
  id,
  type = "text",
  isRequired = true,
  extraDetails,
  disabled,
  ...otherProps
}: Props) => {
  const [inputType, setInputType] = useState(type);

  const [, { touched, error }] = useField(name);

  const handlePasswordShow = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  const isInvalid = !!touched && !!error;

  return (
    <div className="form-input-component">
      <div className="relative w-full">
        {label && (
          <label className="label" htmlFor={id || name}>
            {label}
          </label>
        )}
        <Field
          {...otherProps}
          name={name}
          id={id || name}
          type={inputType}
          disabled={disabled}
          className={cs("input", {
            "input-invalid": isInvalid,
          })}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={handlePasswordShow}
            disabled={disabled}
            className={cs(
              "absolute right-2 bottom-[7px] focus:outline focus:outline-accent-color-200/30 bg-text-color-50 text-text-color-500 text-[11px] px-3 py-2 rounded-lg",
              {
                "opacity-60 cursor-not-allowed": disabled,
              }
            )}
          >
            {inputType === "password" && <span>Show</span>}
            {inputType === "text" && <span>Hide</span>}
          </button>
        )}
      </div>
      <ErrorMessage
        name={name}
        render={(errorMessage) => (
          <p className="error-text text-error-900">{errorMessage}</p>
        )}
      />
      {extraDetails && <p className="text-text-color-200">{extraDetails}</p>}
    </div>
  );
};

export default FormInput;
