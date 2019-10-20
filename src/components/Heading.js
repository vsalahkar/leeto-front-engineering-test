import styled from 'styled-components';

const StyledHeading = styled.h1`
  color: ${(props) => (props.primary ? props.theme.baseColorLight : props.theme.secondaryColor)};
`;

export default StyledHeading;
