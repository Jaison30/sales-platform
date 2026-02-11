import React, { useEffect, useState } from "react";
import {
  Form,
  Card,
  DatePicker,
  Select,
  Row,
  Col,
  Button,
  message,
  Breadcrumb,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import {
  fetchUsers,
  fetchCountries,
  fetchProducts,
  fetchCities,
  createSales,
} from "../services/salesService";

import SalesFormTable from "../components/SalesFormTable";

const { Option } = Select;

function SalesFormPage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [countries, setCountries] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadDropdowns();
    form.setFieldsValue({ details: [{}] });
  }, []);

  // Load dropdown data
  const loadDropdowns = async () => {
    try {
      const [u, c, p] = await Promise.all([
        fetchUsers(),
        fetchCountries(),
        fetchProducts(),
      ]);

      setUsers(u.data);
      setCountries(c.data);
      setProducts(p.data);
    } catch {
      message.error("Failed to load dropdown data");
    }
  };

  // Country -> City cascading
  const handleCountryChange = async (countryId, index) => {
    try {
      const res = await fetchCities(countryId);
      const details = form.getFieldValue("details");
      details[index].cities = res.data;
      form.setFieldsValue({ details });
    } catch {
      message.error("Failed to load cities");
    }
  };

  // Submit form
  const onFinish = async (values) => {
    try {
      const payload = {
        sales_date: values.sales_date.format("YYYY-MM-DD"),
        user: values.user,
        details: values.details,
      };

      await createSales(payload);

      message.success("Sales saved successfully");

      form.resetFields();
      form.setFieldsValue({ details: [{}] });
    } catch {
      message.error("Failed to save sales");
    }
  };

  return (
    <Card
      title={
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <ArrowLeftOutlined
            style={{ fontSize: 18, cursor: "pointer" }}
            onClick={() => navigate("/")}
          />

          <Breadcrumb>
            <Breadcrumb.Item
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            >
              Sales
            </Breadcrumb.Item>
            <Breadcrumb.Item>Create Sales</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      }
      style={{
        maxWidth: 1100,
        margin: "auto",
        borderRadius: 12,
        boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
      }}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {/* Header fields */}
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Date"
              name="sales_date"
              rules={[{ required: true, message: "Date required" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="User"
              name="user"
              rules={[{ required: true, message: "User required" }]}
            >
              <Select placeholder="Select user">
                {users.map((u) => (
                  <Option key={u.user_id} value={u.user_id}>
                    {u.user_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Table rows */}
        <Form.List name="details">
          {(fields, { add, remove }) => (
            <SalesFormTable
              form={form}
              countries={countries}
              products={products}
              handleCountryChange={handleCountryChange}
              fields={fields}
              add={add}
              remove={remove}
            />
          )}
        </Form.List>

        {/* Submit */}
        <div style={{ textAlign: "right", marginTop: 20 }}>
          <Button type="primary" htmlType="submit" size="large">
            Submit
          </Button>
        </div>
      </Form>
    </Card>
  );
}

export default SalesFormPage;
