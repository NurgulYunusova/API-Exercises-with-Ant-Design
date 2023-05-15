import { Button, Form, Input, Modal, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const submitSupplierForm = (values) => {
    axios
      .post("https://northwind.vercel.app/api/suppliers", values)
      .then(() => {
        setSuppliers([...suppliers, values]);
      });
    isModalOpen(false);
  };

  const getData = () => {
    axios.get("https://northwind.vercel.app/api/suppliers").then((res) => {
      setSuppliers(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteSupplier = (id) => {
    axios
      .delete(`https://northwind.vercel.app/api/suppliers/${id}`)
      .then(() => {
        getData();
      });
  };

  let columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
      sorter: (a, b) => a.companyName.localeCompare(b.companyName),
    },
    {
      title: "Contact Name",
      dataIndex: "contactName",
      key: "contactName",
      sorter: (a, b) => a.contactName.localeCompare(b.contactName),
    },
    {
      title: "City",
      dataIndex: "city",
      key: "address.city",
      render: (text, record) => <span>{record.address?.city}</span>,
    },
    {
      title: "Delete",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <Button onClick={() => deleteSupplier(id)} type="primary" danger>
          Delete
        </Button>
      ),
    },
  ];

  const rowClassName = (record) => {
    if (record.address?.city === "Ann Arbor") {
      return "tomato-row";
    }

    return "";
  };

  return (
    <>
      <Table
        dataSource={suppliers}
        columns={columns}
        loading={loading}
        rowClassName={rowClassName}
      />

      <Button type="primary" onClick={showModal}>
        Add Supplier
      </Button>

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          initialValues={{ companyName: "", contactName: "", city: "" }}
          onFinish={submitSupplierForm}
        >
          <Form.Item
            label="Company Name"
            name="companyName"
            rules={[{ required: true, message: "Please input Company Name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Contact Name"
            name="contactName"
            rules={[{ required: true, message: "Please input Contact Name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="City"
            name={["address", "city"]}
            rules={[{ required: false, message: "Please input City!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Suppliers;
