import React, { useEffect, useState } from "react";
import "./style.css";
import Admin from "../..";
import _chunk from "lodash/chunk";

interface ProductData {
  index: number;
  idProduct: string;
  imgProduct: string;
  titleProduct: string;
  titleItem: string;
  titlePrice: string;
}

const API_ENDPOINT = "https://649be5960480757192371734.mockapi.io/product";
const ITEMS_PER_PAGE = 5;

const Product: React.FC = () => {
  const [data, setData] = useState<ProductData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);

  const fetchData = async () => {
    try {
      const response = await fetch(API_ENDPOINT);
      if (response.ok) {
        const tasks = await response.json();
        setData(tasks);
        setPages(Math.ceil(tasks.length / ITEMS_PER_PAGE));
      } else {
        throw new Error("Fetch request failed");
      }
    } catch (error) {
      // handle error
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (index: number, idProduct: string) => {
    console.log(index);

    try {
      const response = await fetch(`${API_ENDPOINT}/${index}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedData = data.filter((item) => item.idProduct !== idProduct);
        setData(updatedData);
        alert("Deleted successfully");
      } else {
        throw new Error("Delete request failed");
      }
    } catch (error) {
      // handle error
      console.log(error);
    }
  };

  const paginatedData = _chunk(data, ITEMS_PER_PAGE)[currentPage - 1] || [];
  const handleEdit = (data: any) => {
    console.log(data);
  };

  return (
    <Admin>
      <h1>Danh sách sản phẩm</h1>

      <table className="table" cellSpacing={20}>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên sản phẩm</th>
            <th>Loại sản phẩm</th>
            <th>Giá tiền</th>
            <th>Ảnh sản phẩm</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item: ProductData, i: number) => (
            <ProductRow
              key={item.idProduct}
              item={item}
              i={(currentPage - 1) * ITEMS_PER_PAGE + i}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: pages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`pagination_btn ${
              currentPage === index + 1 ? "active" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </Admin>
  );
};

interface ProductRowProps {
  item: ProductData;
  i: number;
  onDelete: (index: number, idProduct: string) => void;
  onEdit: (item: any) => void;
}

const ProductRow: React.FC<ProductRowProps> = ({
  item,
  i,
  onDelete,
  onEdit,
}) => {
  const { index, titleProduct, titleItem, titlePrice, imgProduct, idProduct } =
    item;

  return (
    <tr>
      <td>{i + 1}</td>
      <td>{titleProduct}</td>
      <td>{titleItem}</td>
      <td>{titlePrice}</td>
      <td>
        <img className="image_product" src={imgProduct} alt="" />
      </td>
      <td>
        <button onClick={() => onEdit(item)}> edit</button>
        <button onClick={() => onDelete(index, idProduct)}>xóa sản phẩm</button>
      </td>
    </tr>
  );
};

export default Product;
