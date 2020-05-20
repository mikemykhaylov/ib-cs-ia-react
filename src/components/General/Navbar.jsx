import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';

import Logo from '../Icons/Logo';
import Login from '../Icons/Login';
import Logout from '../Icons/Logout';
import Menu from '../Icons/Menu';

import { Heading4, Heading5 } from './Headings';

import { primaryColor, lightGrayColor } from '../../constants/websiteColors';
import firebase from '../../utils/firebaseSetup';
import useWindowWidth from '../../hooks/useWindowWidth';

const NavbarContainer = styled.header`
  display: flex;
  justify-content: space-between;
  width: calc(100vw - 2 * 100vw * 50 / 1920);
  margin: calc(100vw * 50 / 1920);
  margin-bottom: 0;
  flex-direction: column;
  align-items: center;
  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
  @media (min-width: 992px) {
    flex-direction: row;
    & > *:not(:last-child) {
      margin-bottom: 0px;
    }
  }
`;

const NavbarMenu = styled.nav`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
  @media (min-width: 992px) {
    flex-direction: row;
    & > *:not(:last-child) {
      margin-bottom: 0px;
      margin-right: 20px;
    }
  }
  @media (min-width: 1520px) {
    & > *:not(:last-child) {
      margin-right: 40px;
    }
  }
`;

const NavbarMobileTopMenu = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const NavbarMobileButton = styled.button`
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

const UserActions = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  & > *:not(:last-child) {
    margin-right: 20px;
  }
  @media (min-width: 1520px) {
    & > *:not(:last-child) {
      margin-right: 40px;
    }
  }
`;

const UserImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
`;

const CenteredLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const LogoutButton = styled.button`
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

function Navbar({ loginPage }) {
  const width = useWindowWidth();
  const history = useHistory();
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [loggedIn, setLoggedIn] = useState(null);

  // Logout handler
  const handleLogout = async () => {
    setLoggedIn(false);
    await firebase.auth().signOut();
    history.push('/');
  };

  // Showing the user login or logout button and a photo
  let userActionButton;
  if (loggedIn !== null) {
    userActionButton = loggedIn ? (
      <UserActions>
        <CenteredLink to="/dashboard">
          <UserImage src={firebase.auth().currentUser.photoURL} />
        </CenteredLink>
        <LogoutButton onClick={handleLogout}>
          <Logout firstColor={primaryColor} secondColor={lightGrayColor} height={40} />
        </LogoutButton>
      </UserActions>
    ) : (
      <CenteredLink to="/login">
        <Login firstColor={primaryColor} secondColor={lightGrayColor} height={40} />
      </CenteredLink>
    );
  }

  // Subscribing to auth change to display proper user actions
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <NavbarContainer>
      {width >= 992 ? (
        <>
          <NavbarMenu>
            <Link aria-label="Go to the main page" to="/">
              <Logo color={primaryColor} height={40} />
            </Link>
            <Heading5>BARBERS</Heading5>
            <Heading5>WORKS</Heading5>
            <Heading5>LOCATIONS</Heading5>
            <Heading5>CAREERS</Heading5>
          </NavbarMenu>
          <NavbarMenu>
            <Heading5>RU</Heading5>
            <Heading5>PL</Heading5>
            {loginPage ? null : userActionButton}
          </NavbarMenu>
        </>
      ) : (
        <>
          <NavbarMobileTopMenu>
            <Link aria-label="Go to the main page" to="/">
              <Logo color={primaryColor} height={40} />
            </Link>
            <NavbarMobileButton
              aria-label="Show Mobile Navigation"
              onClick={() => setShowMobileNav(!showMobileNav)}
            >
              <Menu color={lightGrayColor} height={40} />
            </NavbarMobileButton>
          </NavbarMobileTopMenu>
          {showMobileNav ? (
            <>
              <NavbarMenu>
                <Heading4>BARBERS</Heading4>
                <Heading4>WORKS</Heading4>
                <Heading4>LOCATIONS</Heading4>
                <Heading4>CAREERS</Heading4>
              </NavbarMenu>
              <NavbarMenu>
                <Heading4>RU</Heading4>
                <Heading4>PL</Heading4>
                {loginPage ? null : userActionButton}
              </NavbarMenu>
            </>
          ) : null}
        </>
      )}
    </NavbarContainer>
  );
}

Navbar.propTypes = {
  loginPage: PropTypes.bool,
};

Navbar.defaultProps = {
  loginPage: false,
};

export default Navbar;
