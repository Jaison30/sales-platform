import React from "react";
import { Table } from "antd";

function SalesTable({ data, loading }) {
  const columns = [
    { title: "Date", dataIndex: "sales_date" },
    { title: "User", dataIndex: "user_name" },
    { title: "Country", dataIndex: "country_name" },
    { title: "City", dataIndex: "city_name" },
    { title: "Product", dataIndex: "product_name" },
    { title: "Qty", dataIndex: "qty_sold" },
    { title: "Amount", dataIndex: "amount" },
  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
      loading={loading}
      pagination={false}
      bordered
      scroll={{ x: "max-content" }}
    />
  );
}

export default SalesTable;
