import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Modal,
  Space,
  Table,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  deleteLanguages,
  getLanguages,
  updateLanguages,
} from "../api/languages";
import moment from "moment";

const { Title } = Typography;

function List() {
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [form] = Form.useForm();
  const [dateSelected, setDateSelected] = useState("");
  const onClick = () => {
    const dataToSend = form.getFieldsValue();
    dataToSend["publish_date"] = moment(dateSelected).format(
      "YYYY-MM-DDTHH:mm:ss.sssZ"
    );
    updateLanguages(selectedId, dataToSend)
      .then(() => setReload(!reload))
      .catch((error) => console.log(error))
      .then(() => {
        setIsOpen(false);
        setSelectedId(null);
      });
  };

  const onChange = (_, date) => {
    setDateSelected(date);
  };

  const onDeleteMessage = (record) => {
    deleteLanguages(record.id)
      .then(() => setReload(!reload))
      .catch((error) => console.log(error));
  };
  const onEditClick = (record) => {
    setIsOpen(true);
    form.setFieldsValue({ ...record, publish_date: null });
    setSelectedId(record.id);
  };
  const columns = [
    { title: "Nombre", dataIndex: "name" },
    { title: "Fecha de publicación", dataIndex: "publish_date" },
    { title: "Descripción", dataIndex: "description" },
    {
      title: "Acciones",
      dataIndex: "actions",
      render: (_, record) => (
        <Space size="middle">
          <DeleteOutlined onClick={() => onDeleteMessage(record)} />
          <EditOutlined onClick={() => onEditClick(record)} />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getLanguages().then(({ data }) => {
      setData(data);
    });
  }, [reload]);

  return (
    <Card>
      <Title>Lista de Lenguajes</Title>
      <Table dataSource={data} columns={columns} />
      <Modal
        open={isOpen}
        onCancel={() => {
          setIsOpen(false);
          setSelectedId(null);
        }}
        title={<Title>Edición de Lenguaje</Title>}
        footer={null}
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="name" label="Nombre">
            <Input />
          </Form.Item>
          <Form.Item name="publish_date" label="Fecha de Publicación">
            <DatePicker picker="year" onChange={onChange} />
          </Form.Item>
          <Form.Item name="description" label="Decripción">
            <Input.TextArea minLength={10} />
          </Form.Item>
          <Button onClick={onClick} type="primary">
            Guardar
          </Button>
        </Form>
      </Modal>
    </Card>
  );
}

export default List;
