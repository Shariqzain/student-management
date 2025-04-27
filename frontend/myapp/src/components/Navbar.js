import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { School as SchoolIcon, Home as HomeIcon, PeopleAlt as StudentsIcon, PersonAdd as AddStudentIcon, Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState } from 'react';

const StyledAppBar = styled(AppBar)`
  background-color: var(--darker-bg);
  box-shadow: 0 0 10px var(--neon-blue);
`;

const NavButton = styled(Link)`
  margin: 0 10px;
  color: white;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;

  &:hover {
    color: var(--neon-blue);
    &:before {
      opacity: 1;
    }
  }

  &:before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(0, 243, 255, 0.1) 0%,
      rgba(0, 0, 0, 0) 70%
    );
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
    transform: translate(-50%, -50%);
  }

  svg {
    font-size: 1.2rem;
    color: var(--neon-blue);
  }
`;

const Logo = styled(motion.div)`
  color: var(--neon-blue);
  font-weight: bold;
  font-size: 1.5rem;
  margin-right: auto;
  text-shadow: 0 0 10px var(--neon-blue);
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    font-size: 2rem;
  }
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuButton = styled(IconButton)`
  display: none;
  color: white;
  margin-left: auto;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileNavLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  width: 100%;
`;

const MobileDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    width: 240px;
    background-color: var(--darker-bg);
    color: white;
  }
`;

const DrawerContainer = styled.div`
  width: 240px;
  padding: 20px;
  
  .MuiListItemIcon-root {
    min-width: 40px;
    color: var(--neon-blue);
  }
  
  .MuiListItemText-root {
    color: white;
  }
  
  .MuiListItem-root:hover {
    background-color: rgba(0, 243, 255, 0.1);
  }
`;

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'Students', path: '/students', icon: <StudentsIcon /> },
    { text: 'Add Student', path: '/add-student', icon: <AddStudentIcon /> }
  ];

  const drawer = (
    <DrawerContainer>
      <List>
        {menuItems.map((item) => (
          <MobileNavLink to={item.path} key={item.text} onClick={handleDrawerToggle}>
            <ListItem button>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          </MobileNavLink>
        ))}
      </List>
    </DrawerContainer>
  );

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Logo whileHover={{ scale: 1.1 }}>
            <SchoolIcon /> Student Portal
          </Logo>
        </Link>

        <NavContainer>
          <NavButton to="/">
            <HomeIcon /> Home
          </NavButton>

          <NavButton to="/students">
            <StudentsIcon /> Students
          </NavButton>

          <NavButton to="/add-student">
            <AddStudentIcon /> Add Student
          </NavButton>
        </NavContainer>

        <MenuButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerToggle}
        >
          <MenuIcon />
        </MenuButton>

        <MobileDrawer
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </MobileDrawer>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;