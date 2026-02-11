import React from "react";
import { Table, Form, Select, InputNumber } from "antd";
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

function SalesFormTable({
  form,
  countries,
  products,
  handleCountryChange,
  fields,
  add,
  remove,
}) {
  const columns = [
    {
      title: "Country",
      render: (_, field) => (
        <Form.Item
          name={[field.name, "country"]}
          rules={[{ required: true, message: "" }]}
        >
          <Select
            placeholder="Country"
            onChange={(val) => handleCountryChange(val, field.name)}
          >
            {countries.map((c) => (
              <Option key={c.country_id} value={c.country_id}>
                {c.country_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
    },
    {
      title: "City",
      render: (_, field) => {
        const cities =
          form.getFieldValue(["details", field.name, "cities"]) || [];

        return (
          <Form.Item
            name={[field.name, "city"]}
            rules={[{ required: true, message: "" }]}
          >
            <Select placeholder="City">
              {cities.map((c) => (
                <Option key={c.city_id} value={c.city_id}>
                  {c.city_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        );
      },
    },
    {
      title: "Product",
      render: (_, field) => (
        <Form.Item
          name={[field.name, "product"]}
          rules={[{ required: true, message: "" }]}
        >
          <Select placeholder="Product">
            {products.map((p) => (
              <Option key={p.product_id} value={p.product_id}>
                {p.product_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
    },
    {
      title: "Qty Sold",
      render: (_, field) => (
        <Form.Item
  name={[field.name, "qty_sold"]}
  rules={[
    { required: true, message: "Qty required" },
    {
      validator: (_, value) => {
        if (!value) return Promise.reject();
        if (!Number.isInteger(value))
          return Promise.reject("Only integers allowed");
        if (value <= 0)
          return Promise.reject("Must be positive");
        return Promise.resolve();
      },
    },
  ]}
>
  <InputNumber min={1} precision={0} style={{ width: "100%" }} />
</Form.Item>

      ),
    },
    {
      title: "Amount",
      render: (_, field) => (
        <Form.Item
  name={[field.name, "amount"]}
  rules={[
    { required: true, message: "Amount required" },
    {
      validator: (_, value) => {
        if (!value) return Promise.reject();
        if (value <= 0)
          return Promise.reject("Must be positive amount");
        return Promise.resolve();
      },
    },
  ]}
>
  <InputNumber
    min={0}
    step={0.01}
    precision={2}
    style={{ width: "100%" }}
  />
</Form.Item>
      ),
    },
    {
      title: "",
      align: "center",
      width: 60,
      render: (_, field) => (
        <DeleteOutlined
          style={{ color: "red", fontSize: 18, cursor: "pointer" }}
          onClick={() => remove(field.name)}
        />
      ),
    },
  ];

  return (
    <>
      {/* Add row icon top right */}
      <div style={{ textAlign: "right", marginBottom: 10 }}>
        <PlusCircleOutlined
          style={{ fontSize: 22, color: "#1677ff", cursor: "pointer" }}
          onClick={() => add({})}
        />
      </div>

      <Table
        dataSource={fields}
        columns={columns}
        pagination={false}
        bordered
        rowKey="key"
        scroll={{ x: "max-content" }}
      />
    </>
  );
}

export default SalesFormTable;
