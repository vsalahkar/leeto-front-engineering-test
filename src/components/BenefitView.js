import React from 'react';
import styled from 'styled-components';
import { transparentize } from 'polished';
import { Link } from 'react-router-dom';

const StyledBenefit = styled.li`
  margin-bottom: 24px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.07);
  border-radius: 8px;
  background-color: ${(props) => props.theme.baseColorLight};
  width: 100%;
  max-width: 700px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => transparentize(0.8, props.theme.tertiaryColor)};
  }
`;

const BenefitHeader = styled.header`
  padding: 16px;
  display: flex;
  align-items: center;
`;

const BenefitHeading = styled.div`
  flex: 1;

  h1 {
    margin-bottom: 16px;
    font-size: 20px;
    padding-right: 24px;
  }

  p {
    color: ${(props) => transparentize(0.5, props.theme.secondaryColor)};
  }
`;

const BenefitInformation = styled.div`
  padding: 16px;
`;

function BenefitView({ benefit: { name, description, slug, currentPeriod: {numberOfParticipant} } }) {
  return (
    <StyledBenefit>
      <BenefitHeader>
        <BenefitHeading>
          <Link to={`/benefits/${slug}`}>
            <h1>{name}</h1>
          </Link>
          <p>{description}</p>
        </BenefitHeading>
        <button>
          <i className="material-icons">keyboard_arrow_down</i>
        </button>
      </BenefitHeader>
      <BenefitInformation>
        <p>{numberOfParticipant}</p>
      </BenefitInformation>
    </StyledBenefit>
  );
}

export default BenefitView;
