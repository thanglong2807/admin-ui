import React, { useEffect, useState } from "react";
import _chunk from "lodash/chunk";
import Admin from "../..";

interface UserData {
  index: number;
  id_login: string;
  name_user: string;
  phone_number: string;
  password: string;
}

const API_ENDPOINT = "https://649be5960480757192371734.mockapi.io/login";
const ITEMS_PER_PAGE = 5;

const User: React.FC = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [editingIndex, setEditingIndex] = useState(-1);

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchData();
    console.log("change" + editingIndex);
  }, [editingIndex]);

  const fetchData = async () => {
    try {
      const response = await fetch(API_ENDPOINT);
      if (response.ok) {
        const users = await response.json();
        console.log(users);

        setData(users);
        setPages(Math.ceil(users.length / ITEMS_PER_PAGE));
      } else {
        throw new Error("Fetch request failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (index: number, idLogin: string) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/${index}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedData = data.filter((item) => item.id_login !== idLogin);
        setData(updatedData);
        alert("Deleted successfully");
      } else {
        throw new Error("Delete request failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    console.log(editingIndex);
  };

  const handleSave = async (updatedItem: UserData) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/${updatedItem.index}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      });

      if (response.ok) {
        const updatedData = [...data];
        updatedData[updatedItem.index] = updatedItem;
        console.log("data", updatedData);

        setData(updatedData);
        setEditingIndex(-1);
        console.log("Saved successfully");
        console.log("index", editingIndex);
      } else {
        throw new Error("Update request failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setEditingIndex(-1);
  };

  const paginatedData = _chunk(data, ITEMS_PER_PAGE)[currentPage - 1] || [];

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
          {paginatedData.map((item: UserData, i: number) =>
            editingIndex === item.index ? (
              <EditUser
                key={item.id_login}
                item={item}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            ) : (
              <UserRow
                key={item.id_login}
                item={item}
                i={(currentPage - 1) * ITEMS_PER_PAGE + i}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            )
          )}
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

interface UserRowProps {
  item: UserData;
  i: number;
  onDelete: (index: number, idLogin: string) => void;
  onEdit: (index: number) => void;
}

const UserRow: React.FC<UserRowProps> = ({ item, i, onDelete, onEdit }) => {
  const { index, name_user, phone_number, password, id_login } = item;

  return (
    <tr>
      <td>{i + 1}</td>
      <td>{name_user}</td>
      <td>{phone_number}</td>
      <td>{password}</td>
      <td>
        <button onClick={() => onEdit(index)}>Sửa</button>
        <button onClick={() => onDelete(index, id_login)}>
          Xóa người dùng
        </button>
      </td>
    </tr>
  );
};

interface EditUserProps {
  item: UserData;
  onSave: (updatedItem: UserData) => void;
  onCancel: () => void;
}

const EditUser: React.FC<EditUserProps> = ({ item, onSave, onCancel }) => {
  const [editedItem, setEditedItem] = useState<UserData>(item);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedItem);
  };

  return (
    <tr>
      <td>{editedItem.index}</td>
      <td>
        <input
          type="text"
          name="name_user"
          value={editedItem.name_user}
          onChange={handleInputChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="phone_number"
          value={editedItem.phone_number}
          onChange={handleInputChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="password"
          value={editedItem.password}
          onChange={handleInputChange}
        />
      </td>
      <td>
        <button onClick={handleSave}>Lưu</button>
        <button onClick={onCancel}>Hủy</button>
      </td>
    </tr>
  );
};

export default User;
