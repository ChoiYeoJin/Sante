import styled from 'styled-components';
import React, { ChangeEvent, useState } from 'react';

type Option = {
  value: string;
  label: string;
};

interface SelectBoxProps {
  ageOptions: Option[];
  onChange: (selectedValue: string) => void;
  placeholder: string;
  width: string;
  height: string;
  // value: string;
  externalValue?: number;
}

const StyledSelect = styled.select<{
  width: string;
  height: string;
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 1px solid #bebebe;
  outline: none;
  border-radius: 10px;
  background: #fff;
  padding-left: 7px;
  margin-top: 12px;

  &:focus {
    border: 1px solid #81d8d0;
  }

  // @media screen and (min-width: 376px) {
  //   width: 349px;
  // }
`;

const SelectBox: React.FC<SelectBoxProps> = ({
  ageOptions,
  onChange,
  placeholder,
  width,
  height,
  externalValue,
}) => {
  const [selectedValue, setSelectedValue] = useState(externalValue || '');
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedValue(selectedValue);
    onChange(selectedValue);
  };

  return (
    <StyledSelect
      width={width}
      height={height}
      value={selectedValue}
      onChange={handleSelectChange}
    >
      <option value={selectedValue} disabled>
        {placeholder}
      </option>
      {ageOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
};

const RegisterSelectBox: React.FC<SelectBoxProps> = ({
  ageOptions,
  onChange,
  placeholder,
  width,
  height,
}) => {
  const [selectedValue, setSelectedValue] = useState('');
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedValue(selectedValue);
    onChange(selectedValue);
  };

  return (
    <StyledSelect
      width={width}
      height={height}
      value={selectedValue}
      onChange={handleSelectChange}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {ageOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
};

export { SelectBox, RegisterSelectBox };
export type { Option };
