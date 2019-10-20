import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Configuration from '../../configuration';
import UserContext from '../UserContext';

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
          const benefitData = response.data
          const refreshedHeaders = response.config.headers

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

  return <div>{isLoading ? <div>Loading ...</div> : <span>{JSON.stringify(benefit, 0, 2)}</span>}</div>;
}

export default Benefit;
