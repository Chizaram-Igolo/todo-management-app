import React from "react";
import MainNav from "./MainNav";
import classes from "./Layout.module.css";

const Layout: React.FC = ({ children }): JSX.Element => {
  return (
    <div>
      <MainNav />
      <main className={classes.main}>{children}</main>
    </div>
  );
};

export default Layout;
