import React, { useEffect, useState } from "react";
import "./style.css";
import Admin from "../..";
interface ProductData {
  id: number;
  idProduct: string;
  imgProduct: string;
  titleProduct: string;
  titleItem: string;
  titlePrice: string;
}
const UserBill: React.FC = () => {
  const [data, setData] = useState<ProductData[]>([]);
  const getData = () => {
    fetch("https://649be5960480757192371734.mockapi.io/product", {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // handle error
      })
      .then((tasks: ProductData[]) => {
        setData(tasks);
      })
      .catch((error) => {
        // handle error
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Admin>
      <h1>Danh sách sản phẩm</h1>

      <table className="table" cellSpacing={20}>
        <tr>
          <td>#</td>
          <td>Tên sản phẩm</td>
          <td>Loại sản phẩm</td>
          <td>Giá tiền</td>
          <td>Ảnh sản phẩm</td>
          <td>Action</td>
        </tr>
        {data.map((item, i) => (
          <tr key={item.idProduct}>
            <td>{i + 1}</td>
            <td>{item.titleProduct}</td>
            <td>{item.titleItem}</td>
            <td>{item.titlePrice}</td>
            <td>
              <img className="image_product" src={item.imgProduct} alt="" />
            </td>
            <td>
              <button>Thêm sản phẩm</button>
              <button>xóa sản phẩm</button>
            </td>
          </tr>
        ))}
      </table>
    </Admin>
  );
};

export default UserBill;
