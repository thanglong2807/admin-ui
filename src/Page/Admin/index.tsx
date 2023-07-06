import React from "react";
import "./style.css";
import Content from "./Components/Content";
import Header from "../../Layouts/Header";
import Sidebar from "./Components/Sidebar";
import Product from "./Components/Product";
const Admin: React.FC = () => {
  return (
    <div>
      <div className="wrapper">
        <Content />
        <main className="main_admin">
          <Sidebar />
          <Product />
        </main>
      </div>
    </div>
  );
};

export default Admin;
