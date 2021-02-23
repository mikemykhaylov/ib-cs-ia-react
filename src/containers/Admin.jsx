/* eslint-disable react/jsx-props-no-spreading */
import { gql } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import ky from 'ky';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import { PrimaryButton } from '../components/general/Buttons';
import { FormContainer, FormRow, RadioInput, TextInput } from '../components/general/Form';
import { Heading2, Heading3 } from '../components/general/Headings';
import Navbar from '../components/general/Navbar';
import Home from '../components/icons/Home';
import Logo from '../components/icons/Logo';
import Upload from '../components/icons/Upload';
import { darkerGrayColor, lighterGrayColor, primaryColor } from '../constants/websiteColors';
import { validateCreateBarber } from '../utils/validateInput';

const Container = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: stretch;
`;

const SideBar = styled.aside`
  width: 100px;
  background-color: ${darkerGrayColor};
  box-sizing: border-box;
  padding: calc(100vw * 50 / 1920) 25px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > *:not(:last-child) {
    margin-bottom: 100px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > *:not(:last-child) {
    margin-bottom: 40px;
  }
`;

const SideNav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  & > *:not(:last-child) {
    margin-bottom: 40px;
  }
`;

const SideNavElement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 10px;
  transition-duration: 100ms;
  border-radius: 10px;
  & > svg > path {
    fill: ${(props) => (props.current ? primaryColor : lighterGrayColor)};
  }
  &:hover > svg > path {
    fill: ${primaryColor};
  }
`;

const HomePage = styled.section`
  width: 100%;
`;

const HomePageWrap = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0px calc(100vw * 50 / 1920);
  margin-top: calc(100vh * 72 / 1080);
`;

const HomePageGrid = styled.div`
  margin-top: calc(100vh * 72 / 1080 / 2);
  display: grid;
  grid-template-columns: 1fr;
  gap: calc(100vw * 50 / 1920);

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Box = styled.div`
  background-color: ${darkerGrayColor};
  border-radius: calc(100vw * 50 / 1920 / 2);
  box-sizing: border-box;
  padding: calc(100vh * 72 / 1080 / 2);
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  & > *:not(:last-child) {
    margin-bottom: 32px;
  }
`;

const DoubleBox = styled(Box)`
  @media (min-width: 768px) {
    grid-column: auto / span 2;
  }
`;

const NewBarberContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: calc(100vw * 50 / 1920);
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const BarberImage = styled.div`
  width: 150px;
  border: ${(props) => !props.profileImageURL && `1px solid ${primaryColor}`};
  border-radius: 50%;
  background-image: url(${(props) => props.profileImageURL});
  background-size: cover;
  background-position: center center;
  display: flex;
  align-items: center;
  justify-content: center;
  &:after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
  & > svg {
    display: ${(props) => (props.profileImageURL ? 'none' : 'initial')};
  }
`;

const SubmitButtonContainer = styled.div`
  flex-grow: 1;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

const EmptyBox = styled(Box)`
  background: none;
  border: 5px dashed ${darkerGrayColor};
  min-height: 300px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const CREATE_BARBER = gql`
  mutation createBarber($input: CreateBarberInput!) {
    createBarber(input: $input) {
      id
    }
  }
`;

const GET_SIGNED_URL = gql`
  query getSignedURL($fileExtension: String!, $barberID: ID!) {
    getSignedURL(barberID: $barberID, fileExtension: $fileExtension)
  }
`;

const Admin = () => {
  const { t } = useTranslation();
  const { user, getAccessTokenSilently } = useAuth0();

  // Object containing all validation errors
  const [validationErrors, setValidationErrors] = useState(null);

  const [newBarber, setNewBarber] = useState({
    email: '',
    firstName: '',
    lastName: '',
    profileImage: null,
    profileImageURL: '',
    specialisation: 'BEARDS',
    password: '',
  });

  // Form input handler
  const handleInput = (e) => {
    setNewBarber({ ...newBarber, [e.target.name]: e.target.value });
  };

  // Drag'n'drop handler
  const handleDrop = (acceptedFiles) => {
    setNewBarber({
      ...newBarber,
      profileImage: acceptedFiles[0],
      profileImageURL: URL.createObjectURL(acceptedFiles[0]),
    });
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, firstName, lastName, specialisation, password } = newBarber;
    const domain = 'https://u06740719i.execute-api.eu-central-1.amazonaws.com/dev/graphql';
    //! Only here we don't use Apollo for GraphQL requests
    // This is due to the incovenience of chaining apollo useMutation and useLazyQuery
    // Also, we already used ky to upload profileImage to signed URL, so why not use it?
    // Here we are creating a new ky instance with the required adress
    const api = ky.create({
      prefixUrl: domain,
      headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
    });

    // Validating inputs
    const errors = await validateCreateBarber({ email, firstName, lastName, password });
    if (!errors.valid) {
      setValidationErrors(errors);
      return;
    }

    // GraphQL mutation creating a barber in Mongo and Auth0
    const { data: createBarberData } = await api
      .post('', {
        json: {
          query: CREATE_BARBER.loc.source.body,
          variables: {
            input: {
              email,
              name: {
                first: firstName,
                last: lastName,
              },
              specialisation,
              password,
            },
          },
        },
      })
      .json();

    // GraphQL query getting a signed URL for barber to upload profileImage
    const { data: signedURLData } = await api
      .post('', {
        json: {
          query: GET_SIGNED_URL.loc.source.body,
          variables: {
            fileExtension: newBarber.profileImage.name.split('.').pop(),
            barberID: createBarberData.createBarber.id,
          },
        },
      })
      .json();

    // Uploading profileImage to signed URL
    await ky.put(signedURLData.getSignedURL, { body: newBarber.profileImage });

    // Resetting for values after submit
    setNewBarber({
      email: '',
      firstName: '',
      lastName: '',
      profileImage: null,
      profileImageURL: '',
      specialisation: 'BEARDS',
      password: '',
    });
  };

  // Drag'n'drop zone handler
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: 'image/jpeg, image/png, image/webp',
    maxFiles: 1,
  });

  // Getting Auth0 ACCESS token to allow sentitive API calls
  useEffect(() => {
    const getAccessToken = async () => {
      const accessToken = await getAccessTokenSilently({
        audience: `https://u06740719i.execute-api.eu-central-1.amazonaws.com/dev/graphql`,
      });
      sessionStorage.setItem('accessToken', accessToken);
    };

    getAccessToken();
  }, []);

  // Creating a timed greeting for the admin
  const getGreeting = () => {
    const time = new Date().getUTCHours();
    if (time >= 0 && time < 6) {
      return 'Good afternoon';
    }
    if (time >= 6 && time < 12) {
      return 'Good morning';
    }
    if (time >= 12 && time < 18) {
      return 'Good day';
    }
    return 'Good afternoon';
  };

  return (
    <Container>
      <SideBar>
        <LogoContainer>
          <Link aria-label="Go to the main page" to="/">
            <Logo color={primaryColor} height={60} />
          </Link>
        </LogoContainer>
        <SideNav>
          <SideNavElement current>
            <Home height={30} />
          </SideNavElement>
        </SideNav>
      </SideBar>
      <HomePage>
        <Navbar noLogo />
        <HomePageWrap>
          <Heading2>{`${t(getGreeting())}, ${user.name}`}</Heading2>
          <HomePageGrid>
            <DoubleBox>
              <Heading3>New barber info</Heading3>
              <NewBarberContainer>
                <FormContainer card>
                  <FormRow>
                    <TextInput
                      card
                      heading="First name"
                      placeholder="Enter first name"
                      onChange={handleInput}
                      value={newBarber.firstName}
                      errorsObj={validationErrors}
                    />
                    <TextInput
                      card
                      heading="Last name"
                      placeholder="Enter last name"
                      onChange={handleInput}
                      value={newBarber.lastName}
                      errorsObj={validationErrors}
                    />
                  </FormRow>
                  <FormRow>
                    <TextInput
                      card
                      heading="Email"
                      placeholder="Enter email"
                      type="email"
                      onChange={handleInput}
                      value={newBarber.email}
                      errorsObj={validationErrors}
                    />
                  </FormRow>
                  <FormRow>
                    <TextInput
                      card
                      heading="Password"
                      placeholder="Enter password"
                      type="password"
                      onChange={handleInput}
                      value={newBarber.password}
                      errorsObj={validationErrors}
                    />
                  </FormRow>
                </FormContainer>
                <FormContainer card>
                  <FormRow>
                    <BarberImage {...getRootProps()} profileImageURL={newBarber.profileImageURL}>
                      <input {...getInputProps()} />
                      <Upload height={40} />
                    </BarberImage>
                    <RadioInput
                      name="specialisation"
                      value="BEARDS"
                      checked={newBarber.specialisation === 'BEARDS'}
                      onChange={handleInput}
                    />
                    <RadioInput
                      name="specialisation"
                      value="HAIRCUTS"
                      checked={newBarber.specialisation === 'HAIRCUTS'}
                      onChange={handleInput}
                    />
                  </FormRow>
                  <SubmitButtonContainer>
                    <PrimaryButton onClick={handleSubmit}>Create Barber</PrimaryButton>
                  </SubmitButtonContainer>
                </FormContainer>
              </NewBarberContainer>
            </DoubleBox>
            <EmptyBox>
              <Heading3 color={darkerGrayColor}>Under construction</Heading3>
            </EmptyBox>
            <EmptyBox>
              <Heading3 color={darkerGrayColor}>Under construction</Heading3>
            </EmptyBox>
            <EmptyBox>
              <Heading3 color={darkerGrayColor}>Under construction</Heading3>
            </EmptyBox>
            <EmptyBox>
              <Heading3 color={darkerGrayColor}>Under construction</Heading3>
            </EmptyBox>
          </HomePageGrid>
        </HomePageWrap>
      </HomePage>
    </Container>
  );
};

export default Admin;
