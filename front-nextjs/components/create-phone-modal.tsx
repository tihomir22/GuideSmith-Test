import { Button, Form, Input, Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Component, PropsWithChildren, useEffect, useState } from "react";

export default function CreatePhoneModal(props: { display: boolean; close: (value) => void; onSubmitForm: Function }) {
  let ParsedModal: any = Modal;
  useEffect(() => {}, [props]);

  return (
    <ParsedModal
      title="Create phone"
      visible={props.display}
      onOk={() => props.close(false)}
      onCancel={() => props.close(false)}
      footer={null}
    >
      <Form
        name="basic"
        layout="horizontal"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={(form) => {
          props.close(false);
          form.price = Number(form.price);
          props.onSubmitForm(form);
        }}
        onFinishFailed={(form) => console.log(form)}
        autoComplete="off"
      >
        <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input phone's name!" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Manufacturer" name="manufacturer" rules={[{ required: true, message: "Please input phone's Manufacturer!" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description" rules={[{ required: true, message: "Please input phone's Description!" }]}>
          <TextArea />
        </Form.Item>
        <Form.Item label="Color" name="color" rules={[{ required: true, message: "Please input phone's Color!" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Price" name="price" rules={[{ required: true, message: "Please input phone's price!" }]}>
          <Input type={"number"} />
        </Form.Item>
        <Form.Item
          label="Image URL"
          name="imageUrl"
          rules={[{ required: true }, { type: "url", warningOnly: true }, { type: "string", min: 6 }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Screen" name="screen" rules={[{ required: true, message: "Please input phone's screen!" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Processor" name="processor" rules={[{ required: true, message: "Please input phone's processor!" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="RAM" name="ram" rules={[{ required: true, message: "Please input phone's RAM!" }]}>
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" className="submit-create-phone-modal">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </ParsedModal>
  );
}
