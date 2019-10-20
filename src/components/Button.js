import React from 'react'
import styled from 'styled-components';
import {darken} from 'polished'

const StyledButton = styled.button`
  border-radius: 4px;
  padding: 12px 16px;
  background-color: ${(props) => props.theme.primaryColor};
  color: ${(props) => props.theme.baseColorLight};

  &:hover {
    background-color: ${props => darken(0.1, props.theme.primaryColor)};
  }
`;

function Button(props) {
  return (
    <StyledButton>
      {props.buttonLabel}
    </StyledButton>
  )
}

export default Button
