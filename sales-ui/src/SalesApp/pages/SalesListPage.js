import React, { useEffect, useState } from "react";
import { Card, Select, Button, Row, Col, message, Breadcrumb } from "antd";
import { useNavigate } from "react-router-dom";

import { fetchUsers, fetchSales } from "../services/salesService";
import SalesTable from "../components/SalesTable";

const { Option } = Select;

function SalesListPage() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUsers();
    loadSales();
  }, []);

  // Load Users
  const loadUsers = async () => {
    try {
      const res = await fetchUsers();
      setUsers(res.data);
    } catch {
      message.error("Failed to load users");
    }
  };

  // Load Sales
  const loadSales = async (userId = null) => {
    try {
      setLoading(true);

      const res = await fetchSales(userId);

      // Flatten nested API response
      const formatted = res.data.flatMap((sale) =>
        sale.details.map((d, index) => ({
          key: `${sale.sales_master_id}-${index}`,
          sales_date: sale.sales_date,
          user_name: sale.user_name,
          country_name: d.country_name,
          city_name: d.city_name,
          product_name: d.product_name,
          qty_sold: d.qty_sold,
          amount: d.amount,
        }))
      );

      setSales(formatted);
    } catch {
      message.error("Failed to load sales");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title={
        <Breadcrumb>
          <Breadcrumb.Item>Sales</Breadcrumb.Item>
          <Breadcrumb.Item>Sales List</Breadcrumb.Item>
        </Breadcrumb>
      }
      extra={
        <Button type="primary" onClick={() => navigate("/sales-form")}>
          Add New Sales
        </Button>
      }
      style={{
        maxWidth: 1100,
        margin: "auto",
        borderRadius: 12,
        boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
      }}
    >
      {/* User filter */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col xs={24} md={8}>
          <Select
            placeholder="Filter by User"
            allowClear
            style={{ width: "100%" }}
            onChange={(val) => loadSales(val)}
          >
            {users.map((u) => (
              <Option key={u.user_id} value={u.user_id}>
                {u.user_name}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>

      {/* Sales Table */}
      <SalesTable data={sales} loading={loading} />
    </Card>
  );
}

export default SalesListPage;
