import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavDropdown } from 'react-bootstrap';
import styled from 'styled-components';

const Theme = {
  fontPrimary: "'Poppins', sans-serif",
  fontSecondary: "'Playfair Display', serif",
  primary: '#C9A86A', // Muted gold
  secondary: '#8A7968', // Warm taupe
  accent: '#D64C31', // Deep coral
  background: '#0F1419', // Rich dark blue-gray
  surface: '#1E2328', // Slightly lighter blue-gray
  text: '#F2F2F2', // Off-white
  textDark: '#A0A0A0', // Medium gray
};

const NavbarContainer = styled.nav`
  background-color: ${Theme.surface};
  padding: 15px 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50px;
  z-index: 1000;
  width: 95%;
  max-width: 1200px;
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: ${Theme.primary};
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  padding-left:3px;
  font-family: ${Theme.fontSecondary};
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${Theme.primary};
  font-size: 24px;
  cursor: pointer;

  @media (max-width: 991px) {
    display: block;
  }
`;

const MenuItems = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 991px) {
    display: ${props => (props.isOpen ? 'flex' : 'none')};
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: ${Theme.surface};
    padding: 20px;
    border-radius: 0 0 20px 20px;
  }
`;

const NavLink = styled(Link)`
  color: ${Theme.text};
  text-decoration: none;
  padding: 10px 15px;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.3s;
  font-family: ${Theme.fontPrimary};

  &:hover {
    color: ${Theme.primary};
  }
`;

const StyledNavDropdown = styled(NavDropdown)`
  .dropdown-toggle {
    color: ${Theme.text} !important;
    padding: 10px 15px;
    font-size: 16px;
    font-weight: 500;
    transition: color 0.3s;
    font-family: ${Theme.fontPrimary};

    &:hover {
      color: ${Theme.primary} !important;
    }
  }

  .dropdown-menu {
    background-color: ${Theme.surface};
    border: none;
    border-radius: 10px;
    padding: 10px 0;
  }

  .dropdown-item {
    color: ${Theme.text};
    font-family: ${Theme.fontPrimary};
    transition: background-color 0.3s, color 0.3s;

    &:hover {
      background-color: ${Theme.primary};
      color: ${Theme.background};
    }
  }
`;

const ContactButton = styled(Link)`
  background-color: ${Theme.primary};
  color: ${Theme.background};
  padding: 10px 20px;
  border-radius: 25px;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;
  font-family: ${Theme.fontPrimary};

  &:hover {
    background-color: ${Theme.accent};
    color: ${Theme.text};
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const updateWidth = () => {
    const newWidth = window.innerWidth;
    setWidth(newWidth);
    if (isOpen && newWidth > 991) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const toggleNav = () => setIsOpen(!isOpen);

  return (
    <NavbarContainer>
      <NavContent>
        <Logo to="/">DONATION</Logo>
        <MenuButton onClick={toggleNav}>☰</MenuButton>
        <MenuItems isOpen={isOpen}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/createCampaign">Start a Fundraiser</NavLink>
          <NavLink to="/donateform">Donate</NavLink>
          <NavLink to="/News">News</NavLink>
          <StyledNavDropdown title="Charity Search" id="charity-nav-dropdown">
            <NavDropdown.Item as={Link} to="/Map">By Map</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/Search">By Name</NavDropdown.Item>
          </StyledNavDropdown>
          <StyledNavDropdown title="Account" id="account-nav-dropdown">
            <NavDropdown.Item as={Link} to="/portal">Sign Up</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/staff">Members</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/staff">Portal</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/portal">Logout</NavDropdown.Item>
          </StyledNavDropdown>
          <ContactButton to="/contact">Contact Us</ContactButton>
        </MenuItems>
      </NavContent>
    </NavbarContainer>
  );
};

export default Navbar;
