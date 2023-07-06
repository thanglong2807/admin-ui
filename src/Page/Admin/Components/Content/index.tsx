import React, { useState } from "react";
import Button from "../../../../Components/Button";
import Input from "../../../../Components/Input";
import { useNavigate } from "react-router-dom";

const Content = () => {
  const [searchText, setSearchText] = useState("");
  const navigator = useNavigate();
  return (
    <header className="header ">
      <div className="container">
        <div className="header_content">
          <h1 className="header_logo">Admin</h1>
          <div className="header_search">
            <Input
              name="search"
              type="text"
              value={searchText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchText(e.target.value)
              }
              styleInput="header-input fs-18"
            />
            <Button style="btn_search" title="Tìm kiếm" />
          </div>
          <div className="header_handle">
            <Button title="avata" />
            <span
              onClick={() => {
                localStorage.removeItem("tokens");

                navigator("/");
              }}
              className="handle_text"
            >
              Log out
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Content;
