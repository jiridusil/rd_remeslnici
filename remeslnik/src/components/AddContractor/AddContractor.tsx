import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
    Button, Checkbox, Form, Input, message, Slider, Space, Switch, Upload
} from 'antd';
import type { FormProps } from 'antd';
import { getDatabase, ref, set, push } from "firebase/database";
import { app } from "../../firebaseConfig";
import { ToastContainer } from 'react-toastify';
import { ContractorContextType, ContractorFields } from '../types/ContractorContextType';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};


const defaultValues: ContractorFields = {
    id: '',
    firstName: '',
    lastName: '',
    fields: [],
    weekends: false,
    city: '',
    zip: '',
    range: 0
}

export const AddContractor: React.FC = () => {
    const [formData, setFormData] = useState<ContractorFields>(defaultValues);
    const [form] = Form.useForm();
    const [formSubmitting, setFormSubmitting] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();
    const key = 'updatable';

    const openMessage = () => {
        messageApi.open({
            key,
            type: 'success',
            content: 'Registrace proběhla úspěšně',
        });
    }

    const saveData = async () => {
        setFormSubmitting(true);
        const db = getDatabase(app);
        console.log('db', db);
        const newPostKey = push(ref(db, 'remeslnik/'));
        const contractorData: ContractorFields = {
            id: newPostKey.key!,
            firstName: formData.firstName,
            lastName: formData.lastName,
            fields: formData.fields,
            weekends: formData.weekends,
            city: formData.city,
            zip: formData.zip,
            range: formData.range
        };
        await set(newPostKey, contractorData);
        setFormData(defaultValues);
        console.log('jaka jsou default data ted? ', defaultValues);
        setFormSubmitting(false);
    }

    const onFinish: FormProps<ContractorContextType>['onFinish'] = (values) => {
        console.log('Success:', values);
        saveData();
        form.resetFields();
        openMessage();
        // notify();
    };

    const onFinishFailed: FormProps<ContractorContextType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleChecked = (e: CheckboxChangeEvent) => {
        const { checked, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            fields: checked ? [...prevState.fields, value] : prevState.fields.filter(f => f !== value)
        }));
        console.log('field', checked, value);
    }

    const handleSliderChange = (value: number) => {
        setFormData({ ...formData, range: value });
    }

    return (
        <>
            <Form
                form={form}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <h2>
                    Registrace nového řemeslníka
                </h2>

                <Form.Item label="Jméno" name="firstName" rules={[{ required: true, message: 'Jméno je povinné' }]}>
                    <Input name="firstName" value={formData.firstName} onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Příjmení" name="lastName" rules={[{ required: true, message: 'Příjmení je povinné' }]}>
                    <Input name="lastName" onChange={handleChange} />
                </Form.Item>
                {/* <Form.Item label="Oblast" name="fields" rules={[{ required: true, message: 'Oblast je povinná' }]} valuePropName="checked">
                    <Checkbox value="Zednicke prace" onChange={handleChecked}>
                        Zednické práce
                    </Checkbox>
                    <Checkbox value="Stolarstvi" onChange={handleChecked}>
                        Stolařství
                    </Checkbox>
                    <Checkbox value="Malirstvi" onChange={handleChecked}>
                        Malířství
                    </Checkbox>
                    <Checkbox value="Obkladacstvi" onChange={handleChecked}>
                        Obkladačství
                    </Checkbox>
                </Form.Item> */}
                <Form.Item label="Oblast" shouldUpdate>
                    {() => (
                        <Form.Item
                            name="fields"
                            rules={[
                                {
                                    validator: (_, value) =>
                                        formData.fields.length > 0
                                            ? Promise.resolve()
                                            : Promise.reject(new Error('Vyberte alespoň jednu oblast')),
                                },
                            ]}
                        >
                            <Checkbox.Group>
                                <Checkbox value="Zednicke prace" onChange={handleChecked}>
                                    Zednické práce
                                </Checkbox>
                                <Checkbox value="Stolarstvi" onChange={handleChecked}>
                                    Stolařství
                                </Checkbox>
                                <Checkbox value="Malirstvi" onChange={handleChecked}>
                                    Malířství
                                </Checkbox>
                                <Checkbox value="Obkladacstvi" onChange={handleChecked}>
                                    Obkladačství
                                </Checkbox>
                            </Checkbox.Group>
                        </Form.Item>
                    )}
                </Form.Item>
                <Form.Item label="Pracuji o víkendech" valuePropName="checked">
                    <Switch onChange={(checked) => setFormData({ ...formData, weekends: checked })} />
                </Form.Item>
                {/* <Form.Item label="Ukázka prací" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload action="/upload.do" listType="picture-card">
                        <button style={{ border: 0, background: 'none' }} type="button">
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Nahrát</div>
                        </button>
                    </Upload>
                </Form.Item> */}
                <Form.Item label="Addresa" required={true}>
                    <Space.Compact>
                        <Form.Item
                            name={'city'}
                            rules={[{ required: true, message: 'Město je povinné' }]}
                        >
                            <Input placeholder="Město" name="city" onChange={handleChange} />
                        </Form.Item>
                        <Form.Item
                            name={'zip'}
                            rules={[{ required: true, message: 'PSČ je povinné' }]}
                        >
                            <Input placeholder="PSČ" name="zip" onChange={handleChange} />
                        </Form.Item>
                    </Space.Compact>
                </Form.Item>
                <Form.Item label="Pracuji v okolí (km)" name="range" rules={[{ required: true, message: 'Posuvníkem vyberte hodnotu' }]}>
                    <Slider value={formData.range} onChange={handleSliderChange} />
                </Form.Item>
                <Form.Item style={{ textAlign: 'right' }}>
                    {contextHolder}
                    <Button type="primary" htmlType="submit"
                        // onClick={(e) => { saveData(e); notify(); }} 
                        disabled={formSubmitting}>
                        Registrovat</Button>
                    <ToastContainer />
                </Form.Item>
            </Form>
        </>
    );
};