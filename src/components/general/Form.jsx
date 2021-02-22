import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

import {
  darkerGrayColor,
  darkestGrayColor,
  grayColor,
  lighterGrayColor,
  primaryColor,
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

const InputGroup = styled.div`
  flex-grow: 1;
  text-align: left;
  & > *:not(:last-child) {
    margin-bottom: 16px;
  }
`;

const ReactiveInput = styled.input`
  background-color: ${(props) => (props.card ? darkestGrayColor : darkerGrayColor)};
  border: ${(props) => (props.card ? `1px solid ${primaryColor}` : 'none')};
  border-radius: 5px;
  box-sizing: border-box;
  margin: 0;
  padding: 9px 12px;
  width: 100%;
  font-family: SpaceGrotesk, sans-serif;
  font-size: 16px;
  line-height: 24px;
  color: ${lighterGrayColor};
  &::placeholder {
    color: ${grayColor};
  }
`;

const toCamelCase = (str) =>
  str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase(),
    )
    .replace(/\s+/g, '');

export const Input = ({ heading, value, type, onChange, errorsObj, placeholder, card }) => {
  const { t } = useTranslation();
  return (
    <InputGroup>
      <Heading4>{`${t(heading)}:`}</Heading4>
      <ReactiveInput
        card={card}
        name={toCamelCase(heading)}
        onChange={onChange}
        value={value}
        type={type}
        placeholder={placeholder}
      />
      {errorsObj && !errorsObj.valid && errorsObj.errors[toCamelCase(heading)] && (
        <Heading5 color={primaryColor}>{errorsObj.errors[toCamelCase(heading)]}</Heading5>
      )}
    </InputGroup>
  );
};

Input.propTypes = {
  heading: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  errorsObj: PropTypes.shape({
    valid: PropTypes.bool,
    errors: PropTypes.objectOf(PropTypes.string),
  }),
  card: PropTypes.bool,
};

Input.defaultProps = {
  type: 'text',
  errorsObj: {
    valid: true,
    errors: {},
  },
  card: false,
};
