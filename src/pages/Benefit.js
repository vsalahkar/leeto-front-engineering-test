import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { transparentize } from 'polished';
import axios from 'axios';

import Configuration from '../../configuration';

import UserContext from '../UserContext';

import Heading from '../components/Heading';
import Button from '../components/Button';

const BenefitPage = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  & > header {
    padding: 16px 24px;
  }

  & > main {
    flex: 1;
    overflow: auto;
  }
`;

const BenefitPageHeader = styled.header`
  background-color: ${(props) => props.theme.primaryColor};
`;

const BenefitPageContainer = styled.main`
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const BenefitDetails = styled.article`
  padding: 24px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.07);
  border-radius: 8px;
  background-color: ${(props) => props.theme.baseColorLight};
  width: 100%;
  max-width: 900px;
`;

const BenefitDetailsHeader = styled.header`
  border-bottom: 1px solid ${(props) => props.theme.tertiaryColor};
`;

const BenefitDetailsHeading = styled.div`
  h1 {
    margin-bottom: 8px;
    font-size: 32px;
  }

  p {
    color: ${(props) => transparentize(0.5, props.theme.secondaryColor)};
  }
`;

const BenefitDetailsTime = styled.div`
  margin: 24px 0 16px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const BenefitDetailsState = styled.div`
  margin: 8px 0;
  border-radius: 4px;
  background-color: ${(props) => props.theme.primaryColor};
  padding: 4px 8px;
  color: ${(props) => props.theme.baseColorLight};
  font-size: 14px;
`;

const BenefitDetailsDate = styled.div`
  padding: 0 8px;
  display: flex;
  align-items: center;

  i {
    margin-right: 8px;
    font-size: 18px;
  }
`;

const BenefitDetailsInformation = styled.main`
  padding: 32px 0;
`;

const BenefitDetailsInformationSection = styled.section`
  margin-bottom: 32px;

  h4 {
    margin-bottom: 16px;
    font-size: 20px;
    color: ${(props) => transparentize(0.3, props.theme.secondaryColor)};
  }
`;

const BenefitDetailsQuota = styled.ul``;

const BenefitDetailsQuotaItem = styled.li`
  border-bottom: 1px solid ${(props) => props.theme.tertiaryColor};
  padding: 16px 0;
`;

const BenefitDetailsQuotaItemLeft = styled.p`
  font-size: 20px;
  color: ${(props) => props.theme.primaryColor};
`;

const BenefitDetailsQuotaItemUsed = styled.p`
  font-size: 14px;
  font-style: italic;
  color: ${(props) => transparentize(0.2, props.theme.secondaryColor)};
`;

const BenefitDetailsFooter = styled.footer`
  text-align: right;
`;

function Benefit({
  match: {
    params: { slug },
  },
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [benefit, setBenefit] = useState(null);

  const { headers, setHeaders } = useContext(UserContext);

  useEffect(() => {
    function fetchData() {
      setIsLoading(true);
      axios
        .get(`${Configuration.apiUrl}/api/v1/employee/${Configuration.organizationSlug}/${slug}`, {
          headers,
        })
        .then((response) => {
          const benefitData = response.data;
          const refreshedHeaders = response.config.headers;

          setBenefit(benefitData);
          setHeaders(refreshedHeaders);
        })
        .catch((error) => {
          console.error('Fetching benefit page failed', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    fetchData();
  }, []);

  return (
    <BenefitPage>
      <BenefitPageHeader>
        <Heading primary>Benefit</Heading>
      </BenefitPageHeader>
      <BenefitPageContainer>
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          <BenefitDetails>
            <BenefitDetailsHeader>
              <BenefitDetailsHeading>
                <h1>{benefit.name}</h1>
                <p>{benefit.description}</p>
              </BenefitDetailsHeading>
              <BenefitDetailsTime>
                <BenefitDetailsState>{benefit.currentPeriod.state}</BenefitDetailsState>
                <BenefitDetailsDate>
                  <i className="material-icons">play_arrow</i>
                  Opening date: {benefit.currentPeriod.openingDateFormatted}
                </BenefitDetailsDate>
                <BenefitDetailsDate>
                  <i className="material-icons">pause</i>
                  Closing date: {benefit.currentPeriod.closingDateFormatted}
                </BenefitDetailsDate>
              </BenefitDetailsTime>
            </BenefitDetailsHeader>
            <BenefitDetailsInformation>
              <BenefitDetailsInformationSection>
                <h4>General Information</h4>
                <p>{benefit.currentPeriod.numberOfParticipants} participants</p>
              </BenefitDetailsInformationSection>
              <BenefitDetailsInformationSection>
                <h4>Remaining quota</h4>
                <BenefitDetailsQuota>
                  {benefit.currentPeriod.notExhaustedQuota.map((item) => (
                    <BenefitDetailsQuotaItem key={item.id}>
                      <BenefitDetailsQuotaItemLeft>{item.remainingAmount}€ left</BenefitDetailsQuotaItemLeft>
                      <BenefitDetailsQuotaItemUsed>
                        {item.consumedAmount}/{item.totalPrice}€ used
                      </BenefitDetailsQuotaItemUsed>
                    </BenefitDetailsQuotaItem>
                  ))}
                </BenefitDetailsQuota>
              </BenefitDetailsInformationSection>
            </BenefitDetailsInformation>
            <BenefitDetailsFooter>
              <Button buttonLabel="Subscribe" />
            </BenefitDetailsFooter>
          </BenefitDetails>
        )}
      </BenefitPageContainer>
    </BenefitPage>
  );
}

export default Benefit;
