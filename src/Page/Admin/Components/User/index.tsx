import React, { useEffect, useState } from "react";
import "./style.css";
import Admin from "../..";
import _chunk from "lodash/chunk";

interface UserData {
  index: number;
  id_login: number;
  name_user: string;
  phone_number: string;
  password: string;
}

const User: React.FC = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);
  const itemsPerPage = 5;

  const API_ENDPOINT = "https://649be5960480757192371734.mockapi.io/login";

  const fetchData = async () => {
    try {
      const response = await fetch(API_ENDPOINT);
      if (response.ok) {
        const users = await response.json();
        setData(users);
        setPages(Math.ceil(users.length / itemsPerPage));
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

  const handleDelete = async (index: number, idLogin: number) => {
    console.log(idLogin);

    console.log(index);

    try {
      const response = await fetch(`${API_ENDPOINT}/${index}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedData = data.filter((item) => item.id_login !== idLogin);
        console.log(updatedData);

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

  const paginatedData = _chunk(data, itemsPerPage)[currentPage - 1] || [];

  return (
    <Admin>
      <h1>Danh sách người dùng</h1>

      <table className="table" cellSpacing={20}>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên người dùng</th>
            <th>Số điện thoại</th>
            <th>Mật khẩu</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item: UserData, i: number) => (
            <tr key={item.id_login}>
              <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
              <td>{item.name_user}</td>
              <td>{item.phone_number}</td>
              <td>{item.password}</td>
              <td>
                <button>Thêm người dùng</button>
                <button onClick={() => handleDelete(item.index, item.id_login)}>
                  Xóa người dùng
                </button>
              </td>
            </tr>
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

export default User;
