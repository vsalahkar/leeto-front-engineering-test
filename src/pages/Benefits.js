import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Configuration from '../../configuration';

import UserContext from '../UserContext';

import Heading from '../components/Heading';
import BenefitListItem from '../components/BenefitListItem';

const BenefitsPage = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  & > header {
    padding: 16px 24px;
  }

  main {
    flex: 1;
    overflow: auto;
  }
`;

const BenefitsPageHeader = styled.header`
  background-color: ${(props) => props.theme.primaryColor};
`;

const BenefitsContainer = styled.main`
  padding: 24px;
`;

const BenefitList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Benefits() {
  const [benefits, setBenefits] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { headers, setHeaders } = useContext(UserContext);

  useEffect(() => {
    function fetchData() {
      setIsLoading(true);
      axios
        .get(`${Configuration.apiUrl}/api/v1/employee/${Configuration.organizationSlug}/benefits`, {
          headers,
        })
        .then((response) => {
          const benefitsData = response.data;
          const refreshedHeaders = response.config.headers;

          setBenefits(benefitsData);
          setHeaders(refreshedHeaders);
        })
        .catch((error) => {
          console.error('Fetching benefits list failed', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    fetchData();
  }, []);

  return (
    <BenefitsPage>
      <BenefitsPageHeader>
        <Heading primary>Benefits</Heading>
      </BenefitsPageHeader>
      <BenefitsContainer>
        {isLoading ? (
          <div>Benefits list is loading ...</div>
        ) : (
          <BenefitList>
            {benefits.map((item) => (
              <BenefitListItem key={item.name} benefit={item} />
            ))}
          </BenefitList>
        )}
      </BenefitsContainer>
    </BenefitsPage>
  );
}

export default Benefits;
