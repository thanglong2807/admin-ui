import React, { useState } from "react";
import Admin from "../..";
import Input from "../../../../Components/Input";
import "./style.css";
import Button from "../../../../Components/Button";
import { v4 as uuidv4 } from "uuid";
const AddProduct = () => {
  const [value, setValue] = useState({
    idProduct: "",
    imgProduct: "",
    titleProduct: "",
    titleItem: "",
    titlePrice: "",
  });
  const API_ENDPOINT = "https://649be5960480757192371734.mockapi.io/product";
  const handleChangeValue = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setValue({
      ...value,
      [name]: value,
    });
  };
  const handleSubmit = async () => {
    try {
      const data = {
        idProduct: uuidv4(),
        imgProduct: value.imgProduct,
        titleProduct: value.titleProduct,
        titleItem: value.titleItem,
        titlePrice: value.titlePrice,
      };
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // New product added successfully
        console.log("Product added successfully");
        // Reset the form fields
        setValue({
          idProduct: "",
          imgProduct: "",
          titleProduct: "",
          titleItem: "",
          titlePrice: "",
        });
      } else {
        throw new Error("Add product request failed");
      }
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };

  return (
    <Admin>
      <div>
        <h1>Thêm sản phẩm</h1>
        <div className="form_add">
          <Input
            name="titleProduct"
            type="text"
            label="Loại sản phẩm"
            value={value.titleProduct}
            onChange={handleChangeValue}
          />
          <Input
            name="imgProduct"
            type="text"
            label="Hình ảnh (URL)"
            value={value.imgProduct}
            onChange={handleChangeValue}
          />
          <Input
            name="titleProduct"
            type="text"
            label="Tên sản phẩm"
            value={value.titleItem}
            onChange={handleChangeValue}
          />
          <Input
            name="titlePrice"
            type="text"
            label="Giá sản phẩm"
            value={value.titlePrice}
            onChange={handleChangeValue}
          />
          <Button title="Submit" style="btn_submit" onClick={handleSubmit} />
        </div>
      </div>
    </Admin>
  );
};

export default AddProduct;
