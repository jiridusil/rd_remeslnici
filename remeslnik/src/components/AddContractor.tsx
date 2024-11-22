import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Cascader,
    Checkbox,
    ColorPicker,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Rate,
    Select,
    Slider,
    Space,
    Switch,
    TreeSelect,
    Upload,
} from 'antd';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

export const AddContractor: React.FC = () => {

    return (
        <>
            <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 600 }}
            >
                <h2>
                    Registrace nového řemeslníka
                </h2>
                <Form.Item label="Jméno">
                    <Input />
                </Form.Item>
                <Form.Item label="Příjmení">
                    <Input />
                </Form.Item>
                <Form.Item label="Oblast" name="disabled" valuePropName="checked">
                    <Checkbox>Zednické práce</Checkbox>
                    <Checkbox>Stolařství</Checkbox>
                    <Checkbox>Malířství</Checkbox>
                    <Checkbox>Obkladačství</Checkbox>
                </Form.Item>
                <Form.Item label="Pracuji o víkendech" valuePropName="checked">
                    <Switch />
                </Form.Item>
                <Form.Item label="Ukázka prací" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload action="/upload.do" listType="picture-card">
                        <button style={{ border: 0, background: 'none' }} type="button">
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Nahrát</div>
                        </button>
                    </Upload>
                </Form.Item>
                <Form.Item label="Addresa">
                    <Space.Compact>
                        <Form.Item
                            name={['address', 'zip']}
                            noStyle
                            rules={[{ required: true, message: 'Město je povinné' }]}
                        >
                            <Input style={{ width: '60%' }} placeholder="Město" />
                        </Form.Item>
                        <Form.Item
                            name={['address', 'street']}
                            noStyle
                            rules={[{ required: true, message: 'PSČ je povinné' }]}
                        >
                            <Input style={{ width: '40%' }} placeholder="PSČ" />
                        </Form.Item>
                    </Space.Compact>
                </Form.Item>
                <Form.Item label="Pracuji v okolí (km)">
                    <Slider />
                </Form.Item>
                <Form.Item style={{ textAlign: 'right' }}>
                    <Button type="primary">Registrovat</Button>
                </Form.Item>
            </Form>
        </>
    );
};