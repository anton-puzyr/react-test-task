import React from 'react';
import * as PropTypes from 'prop-types';

import './InputField.scss';

const { string, object, func } = PropTypes;

const InputField = props => {
  const { placeholder, name, type, onChange } = props;

  return (
    <div className="input-wrapper">
      <input
        className="custom-input"
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

InputField.propTypes = {
  placeholder: string,
  name: string,
  type: string,
  input: object,
  onChange: func
};

export default InputField;
