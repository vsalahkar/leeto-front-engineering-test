import React, { useContext, useState, useEffect } from 'react';
import Heading from '../components/Heading';
import styled, { ThemeProvider } from 'styled-components';
import appTheme from '../theme/colors';
import axios from 'axios';
import Configuration from '../../configuration';
import UserContext from '../UserContext';
import Benefit from '../components/Benefit';

const BenefitsPage = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  & > header,
  & > main {
    padding: 16px 24px;
  }

  main {
    flex: 1;
    overflow: auto;
  }
`;

const BenefitsContainer = styled.main`
  padding: 16px 24px;
`;

const BenefitList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Benefits() {
  const [benefits, setBenefits] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { headers } = useContext(UserContext);

  useEffect(() => {
    function fetchData() {
      setIsLoading(true);
      axios
        .get(`${Configuration.apiUrl}/api/v1/employee/${Configuration.organizationSlug}/benefits`, {
          headers,
        })
        .then((response) => {
          setBenefits(response.data);
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
    <ThemeProvider theme={appTheme}>
      <BenefitsPage>
        <header>
          <Heading>Benefits</Heading>
        </header>
        <BenefitsContainer>
          {isLoading ? (
            <div>Loading ...</div>
          ) : (
            <BenefitList>
              {benefits.map((item) => (
                <Benefit key={item.name} title={item.name} description={item.description} />
              ))}
            </BenefitList>
          )}
        </BenefitsContainer>
      </BenefitsPage>
    </ThemeProvider>
  );
}

export default Benefits;
