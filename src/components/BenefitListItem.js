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
`;

const BenefitHeader = styled.header`
  padding: 16px;
  display: flex;
  flex-direction: column;

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

  p {
    padding: 8px 0;
    display: flex;
    align-items: center;

    i {
      margin-right: 8px;
      font-size: 32px;
      color: ${(props) => props.theme.secondaryColor};
    }

    strong {
      margin-right: 4px;
    }

    span {
      text-align: center;
      color: ${(props) => props.theme.tertiaryColor};
    }
  }
`;

const BenefitFooter = styled.footer`
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-align: right;
  color: ${(props) => props.theme.primaryColor};
  
  i {
    margin-left: 8px;
    font-size: 16px;
  }
`;
function BenefitListItem({
  benefit: {
    name,
    description,
    slug,
    currentPeriod: { numberOfParticipants, remainingDaysBeforeEnd, remainingDaysBeforeStart },
  },
}) {
  return (
    <StyledBenefit>
      <BenefitHeader>
        <h1>{name}</h1>
        <p>{description}</p>
      </BenefitHeader>
      <BenefitInformation>
        <p>
          <i className="material-icons">people</i>
          <strong>{numberOfParticipants || 0}</strong> participant{numberOfParticipants > 0 ? 's' : ''}
        </p>
        <p>
          <i className="material-icons">update</i>
          <strong>{remainingDaysBeforeEnd || 0}</strong> remaining day{remainingDaysBeforeEnd > 0 ? 's' : ''} before end
        </p>
        <p>
          <i className="material-icons">date_range</i>
          <strong>{remainingDaysBeforeStart || 0}</strong> remaining day{remainingDaysBeforeStart > 0 ? 's' : ''} before start
        </p>
      </BenefitInformation>
      <BenefitFooter>
        <Link to={`/benefits/${slug}`}>See more information</Link>
        <i className="material-icons">arrow_forward</i>
      </BenefitFooter>
    </StyledBenefit>
  );
}

export default BenefitListItem;
