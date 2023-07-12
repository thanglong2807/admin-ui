import React, { ReactNode } from "react";
import "./style.css";
import Content from "./Components/Content";
import Sidebar from "./Components/Sidebar";
import { Link, Route, Routes } from "react-router-dom";
import Product from "../Product";

type AdminProps = {
  children?: ReactNode;
};

const Admin: React.FC<AdminProps> = ({ children }) => {
  return (
    <div>
      <div className="wrapper">
        <Content />
        <main className="main_admin">
          <Sidebar />
          <div className="admin--content">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
