import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

import Logo from '../Icons/Logo';
import Login from '../Icons/Login';
import Menu from '../Icons/Menu';

import { Heading4, Heading5 } from './Headings';
import { primaryColor, lightGrayColor } from '../../constants/websiteColors';
import useWindowWidth from '../../hooks/useWindowWidth';

const NavbarContainer = styled.header`
  display: flex;
  justify-content: space-between;
  width: calc(100vw - 2 * 100vw * 100 / 1920);
  margin: calc(100vw * 100 / 1920);
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

function Navbar() {
  const width = useWindowWidth();
  const [showMobileNav, setShowMobileNav] = useState(false);
  return (
    <NavbarContainer>
      {width >= 992 ? (
        <>
          <NavbarMenu>
            <Link to="/">
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
            <Login firstColor={primaryColor} secondColor={lightGrayColor} height={40} />
          </NavbarMenu>
        </>
      ) : (
        <>
          <NavbarMobileTopMenu>
            <Link to="/">
              <Logo color={primaryColor} height={40} />
            </Link>
            <NavbarMobileButton aria-label="Show Mobile Navigation" onClick={() => setShowMobileNav(!showMobileNav)}>
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
                <Login firstColor={primaryColor} secondColor={lightGrayColor} height={40} />
              </NavbarMenu>
            </>
          ) : null}
        </>
      )}
    </NavbarContainer>
  );
}

export default Navbar;
