import { Card, Typography, Space } from "antd";
import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";

export const Contact = () => {
  const { Text } = Typography;

  return (
    <Card title="Contact Us" style={{ width: 400 }}>
      <Space direction="vertical" size="middle">
        <Space>
          <UserOutlined />
          <Text>Majitel: Karel Vomáčka</Text>
        </Space>
        <Space>
          <PhoneOutlined />
          <Text>Telefon: (+420) 123-456-789</Text>
        </Space>
        <Space>
          <MailOutlined />
          <Text>Email: karel@example.com</Text>
        </Space>
        <Space>
          <EnvironmentOutlined />
          <Text>Adresa: Průmyslová 226, 674 01 Třebíč</Text>
        </Space>
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2606.5047228071735!2d15.893869077492917!3d49.20995297138188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470d4237aab88cf1%3A0xff2dc5889db6460!2sOKNOLAND!5e0!3m2!1scs!2scz!4v1732871409298!5m2!1scs!2scz"
          width="100%"
          height="200"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen={true}
          aria-hidden="false"
          tabIndex={0}
        ></iframe>
      </Space>
    </Card>
  );
};
