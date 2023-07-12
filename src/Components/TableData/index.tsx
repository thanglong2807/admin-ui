import React from "react";

const TableData = (props: any) => {
  const { title, data } = props;
  return (
    <table className="table" cellSpacing={20}>
      <tr>
        {title.map((item: any) => (
          <td key={item.id}>{item.name}</td>
        ))}
      </tr>
      {data.map((item: any, i: number) => (
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
  );
};

export default TableData;
