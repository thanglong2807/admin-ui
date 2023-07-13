import React, { useState } from "react";
import Admin from "../..";
import Input from "../../../../Components/Input";
import Button from "../../../../Components/Button";
import { v4 as uuidv4 } from "uuid";

const AddUser = () => {
  const [user, setUser] = useState({
    name: "",
    password: "",
    phoneNumber: "",
  });

  const API_ENDPOINT = "https://649be5960480757192371734.mockapi.io/login";

  const handleChangeValue = (e: any) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const newUser = {
        id_login: uuidv4(),
        name_user: user.name,
        password: user.password,
        phone_number: user.phoneNumber,
      };

      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        console.log("User added successfully");
        setUser({
          name: "",
          password: "",
          phoneNumber: "",
        });
      } else {
        throw new Error("Add user request failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Admin>
      <div>
        <h1>Thêm người dùng</h1>
        <div className="form_add">
          <Input
            name="phoneNumber"
            type="text"
            label="Số điện thoại"
            value={user.phoneNumber}
            onChange={handleChangeValue}
          />
          <Input
            name="password"
            type="text"
            label="Mật khẩu"
            value={user.password}
            onChange={handleChangeValue}
          />
          <Input
            name="name"
            type="text"
            label="Tên người dùng"
            value={user.name}
            onChange={handleChangeValue}
          />

          <Button title="Submit" style="btn_submit" onClick={handleSubmit} />
        </div>
      </div>
    </Admin>
  );
};

export default AddUser;
