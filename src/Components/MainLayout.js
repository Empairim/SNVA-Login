// MainLayout.js
import React from "react";
import NavBar from "./NavBar";

const MainLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
