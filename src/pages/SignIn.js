import React, { useState, useContext, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import appTheme from '../theme/colors';
import axios from 'axios';

import Configuration from '../../configuration';

import UserContext from '../UserContext';

import Heading from '../components/Heading';
import Button from '../components/Button';

const SignInPage = styled.main`
  height: 100vh;
  width: 100vw;
`;

const SignInFormSection = styled.section`
  padding: 10vh 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;

const SignInForm = styled.form`
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: ${(props) => props.theme.baseColorLight};
  padding: 24px;
  max-width: 300px;
  width: 100%;
`;

const SignInFormLabel = styled.label`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;

  input {
    border: 1px solid ${(props) => props.theme.tertiaryColor};
    border-radius: 4px;
    margin-top: 8px;
    padding: 10px 12px;
    color: ${(props) => props.theme.secondaryColor};
    
    &:focus {
      border-color: ${(props) => props.theme.primaryColor};
    }
  }
`;

const SignInButton = styled(Button)`
  margin-top: 16px;
  width: 100%;
`;

function SignIn() {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const { setUser, setHeaders } = useContext(UserContext);

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post(`${Configuration.apiUrl}/auth/sign_in`, {
        email: emailInput,
        password: passwordInput,
      });

      setUser(result.data.data);
      setHeaders(result.headers);

      history.push('/benefits');
    } catch (error) {
      console.error('Authentication failed', error);
    }
  };

  return (
    <Fragment>
      <ThemeProvider theme={appTheme}>
        <SignInPage>
          <SignInFormSection>
            <Heading>Sign in</Heading>
            <SignInForm onSubmit={handleSubmit}>
              <SignInFormLabel>
                Email
                <input
                  type="email"
                  placeholder="Work email"
                  value={emailInput}
                  name="email"
                  onChange={(event) => setEmailInput(event.target.value)}
                />
              </SignInFormLabel>
              <SignInFormLabel>
                Password
                <input
                  type="password"
                  placeholder="Your password"
                  value={passwordInput}
                  name="password"
                  onChange={(event) => setPasswordInput(event.target.value)}
                />
              </SignInFormLabel>
              <SignInButton type="submit" onClick={handleSubmit} buttonLabel="Sign in" />
            </SignInForm>
          </SignInFormSection>
        </SignInPage>
      </ThemeProvider>
    </Fragment>
  );
}

export default SignIn;
