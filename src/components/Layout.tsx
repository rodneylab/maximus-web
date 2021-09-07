import React from 'react';
import { NavBar } from './NavBar';

const Layout = ({ children }) => (
  <>
    <NavBar />
    {children}
  </>
);

export { Layout as default };
