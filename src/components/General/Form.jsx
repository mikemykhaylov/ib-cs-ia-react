/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import {
  primaryColor,
  darkerGrayColor,
  lightGrayColor,
  grayColor,
} from '../../constants/websiteColors';
import { Heading4, Heading5 } from './Headings';

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > *:not(:last-child) {
    margin-bottom: 16px;
  }
  @media (min-width: 576px) {
    width: 400px;
  }
`;

export const FormRow = styled.div`
  width: 100%;
  display: flex;
  & > *:not(:last-child) {
    margin-right: 16px;
  }
`;

const GetDetailsInputGroup = styled.div`
  flex-grow: 1;
  text-align: left;
  & > *:not(:last-child) {
    margin-bottom: 8px;
  }
`;

const GetDetailsInput = styled.input`
  background-color: ${darkerGrayColor};
  border: none;
  border-radius: 5px;
  box-sizing: border-box;
  margin: 0;
  padding: 9px 12px;
  width: 100%;
  font-family: Montserrat;
  font-size: 16px;
  line-height: 24px;
  color: ${lightGrayColor};
  &::placeholder {
    color: ${grayColor};
  }
`;

const toCamelCase = (str) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
};

export const Input = ({ heading, value, type, onChange, errorsObj }) => {
  return (
    <GetDetailsInputGroup>
      <Heading4>{heading}:</Heading4>
      <GetDetailsInput
        name={toCamelCase(heading)}
        onChange={onChange}
        value={value}
        type={type}
        placeholder={`Enter ${heading.toLowerCase()}:`}
      />
      {errorsObj && !errorsObj.valid && errorsObj.errors[toCamelCase(heading)] && (
        <Heading5 color={primaryColor}>{errorsObj.errors[toCamelCase(heading)]}</Heading5>
      )}
    </GetDetailsInputGroup>
  );
};

Input.propTypes = {
  heading: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  errorsObj: PropTypes.shape({
    valid: PropTypes.bool,
    errors: PropTypes.object,
  }),
};

Input.defaultProps = {
  type: 'text',
  errorsObj: {
    valid: true,
    errors: {},
  },
};
