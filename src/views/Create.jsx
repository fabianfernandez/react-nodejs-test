import { Button, Card, DatePicker, Form, Input, Typography } from "antd";
import React, { useState } from "react";
import { createLanguages } from "../api/languages";
import moment from "moment/moment";

const { Title } = Typography;

function Create() {
  const [form] = Form.useForm();
  const [dateSelected, setDateSelected] = useState("");
  const onClick = () => {
    const dataToSend = form.getFieldsValue();
    dataToSend["publish_date"] = moment(dateSelected).format(
      "YYYY-MM-DDTHH:mm:ss.sssZ"
    );
    createLanguages(dataToSend)
      .then(({ data }) => console.log(data))
      .catch((error) => console.log(error));
  };

  const onChange = (_, date) => {
    setDateSelected(date);
  };

  return (
    <Card>
      <Title>Creación de Lenguaje</Title>
      <Form layout="vertical" style={{ width: "600px" }} form={form}>
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
    </Card>
  );
}

export default Create;
