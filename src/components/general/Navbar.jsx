import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import { lightGrayColor, primaryColor } from '../../constants/websiteColors';
import useWindowWidth from '../../hooks/useWindowWidth';
import Login from '../icons/Login';
import Logo from '../icons/Logo';
// import Logout from '../icons/Logout';
import Menu from '../icons/Menu';
import { Heading4, Heading5 } from './Headings';

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

const NavbarLink = styled(Link)`
  text-decoration: none;
`;

const NavbarMobileTopMenu = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const NavbarButton = styled.button`
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

// const UserActions = styled.div`
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   flex-direction: row;
//   & > *:not(:last-child) {
//     margin-right: 20px;
//   }
//   @media (min-width: 1520px) {
//     & > *:not(:last-child) {
//       margin-right: 40px;
//     }
//   }
// `;

// const UserImage = styled.img`
//   width: 40px;
//   height: 40px;
//   object-fit: cover;
//   object-position: center;
//   border-radius: 50%;
// `;

const CenteredLink = styled(Link)`
  display: flex;
  align-items: center;
`;

// const LogoutButton = styled.button`
//   padding: 0;
//   margin: 0;
//   border: none;
//   background: none;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
// `;

function Navbar() {
  const width = useWindowWidth();
  const { t, i18n } = useTranslation();
  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
  };
  const [showMobileNav, setShowMobileNav] = useState(false);

  // Showing the user login or logout button and a photo
  // let userActionButton;
  // if (loggedIn !== null) {
  //   userActionButton = loggedIn ? (
  //     <UserActions>
  //       <CenteredLink to="/dashboard">
  //         <UserImage src={firebase.auth().currentUser.photoURL} />
  //       </CenteredLink>
  //       <LogoutButton onClick={handleLogout}>
  //         <Logout firstColor={primaryColor} secondColor={lightGrayColor} height={40} />
  //       </LogoutButton>
  //     </UserActions>
  //   ) : (
  //     <CenteredLink to="/login">
  //       <Login firstColor={primaryColor} secondColor={lightGrayColor} height={40} />
  //     </CenteredLink>
  //   );
  // }

  return (
    <NavbarContainer>
      {width >= 992 ? (
        <>
          <NavbarMenu>
            <Link aria-label="Go to the main page" to="/">
              <Logo color={primaryColor} height={40} />
            </Link>
            <Heading5>{t('BARBERS')}</Heading5>
            <NavbarLink to="/works">
              <Heading5>{t('SERVICES')}</Heading5>
            </NavbarLink>
            <Heading5>{t('LOCATIONS')}</Heading5>
            <Heading5>{t('CAREERS')}</Heading5>
          </NavbarMenu>
          <NavbarMenu>
            <NavbarButton onClick={() => handleLanguageChange('pl')}>
              <Heading5>PL</Heading5>
            </NavbarButton>
            <NavbarButton onClick={() => handleLanguageChange('en')}>
              <Heading5>EN</Heading5>
            </NavbarButton>
            <NavbarButton onClick={() => handleLanguageChange('ru')}>
              <Heading5>RU</Heading5>
            </NavbarButton>
            <CenteredLink to="/login">
              <Login firstColor={primaryColor} secondColor={lightGrayColor} height={40} />
            </CenteredLink>
          </NavbarMenu>
        </>
      ) : (
        <>
          <NavbarMobileTopMenu>
            <Link aria-label="Go to the main page" to="/">
              <Logo color={primaryColor} height={40} />
            </Link>
            <NavbarButton
              aria-label="Show Mobile Navigation"
              onClick={() => setShowMobileNav(!showMobileNav)}
            >
              <Menu color={lightGrayColor} height={40} />
            </NavbarButton>
          </NavbarMobileTopMenu>
          {showMobileNav ? (
            <>
              <NavbarMenu>
                <Heading5>{t('BARBERS')}</Heading5>
                <NavbarLink to="/works">
                  <Heading5>{t('SERVICES')}</Heading5>
                </NavbarLink>
                <Heading5>{t('LOCATIONS')}</Heading5>
                <Heading5>{t('CAREERS')}</Heading5>
              </NavbarMenu>
              <NavbarMenu>
                <NavbarButton onClick={() => handleLanguageChange('pl')}>
                  <Heading4>PL</Heading4>
                </NavbarButton>
                <NavbarButton onClick={() => handleLanguageChange('en')}>
                  <Heading4>EN</Heading4>
                </NavbarButton>
                <NavbarButton onClick={() => handleLanguageChange('ru')}>
                  <Heading4>RU</Heading4>
                </NavbarButton>
                <CenteredLink to="/login">
                  <Login firstColor={primaryColor} secondColor={lightGrayColor} height={40} />
                </CenteredLink>
              </NavbarMenu>
            </>
          ) : null}
        </>
      )}
    </NavbarContainer>
  );
}

export default Navbar;
