import React, { useContext, useEffect, useState } from "react";
import { Button, ConfigProvider, Table, Tag, theme } from "antd";
import type { TableColumnsType } from "antd";
import {
  ContractorContextType,
  ContractorFields,
} from "../types/ContractorContextType";
import { getDatabase, ref, remove, set } from "firebase/database";
import { app } from "../../firebaseConfig";
import { tableStyle } from "../../styles";
import { readData } from "../Dto";
import { ThemeContext } from "../ThemeContext";

export const ContractorList: React.FC = () => {
  const [data, setData] = React.useState<ContractorContextType[]>([]);
  const { themeWrapper } = useContext(ThemeContext);
  const [hover, setHover] = useState<string | null>(null);

  const columns: TableColumnsType<ContractorFields> = [
    {
      title: "Jméno",
      dataIndex: "firstName",
      key: "firstName",
      ellipsis: true,
    },
    {
      title: "Příjmení",
      dataIndex: "lastName",
      key: "lastName",
      ellipsis: true,
    },
    {
      title: "Oblasti",
      dataIndex: "fields",
      key: "fields",
      render: (fields) => (
        <>
          {fields.map((field: string) => {
            let color = "blue";
            if (field === "Zednicke prace") {
              color = "green";
            } else if (field === "Stolarstvi") {
              color = "gold";
            } else if (field === "Obkladacstvi") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={field}>
                {field.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Pracuji o víkendech",
      dataIndex: "weekends",
      key: "weekends",
      render: (weekends) => (weekends ? "Ano" : "Ne"),
    },
    {
      title: "Město",
      dataIndex: "city",
      key: "city",
      ellipsis: true,
    },
    {
      title: "PSČ",
      dataIndex: "zip",
      key: "zip",
      ellipsis: true,
    },
    {
      title: "Pracuji v okolí (km)",
      dataIndex: "range",
      key: "range",
    },
    {
      title: "Akce",
      key: "id",
      render: (_, data) => (
        <Button
          color="danger"
          style={{
            background: themeWrapper === "dark" ? "darkred" : "#ff4d4f",
            color: themeWrapper === "dark" ? "white" : "black",
            transform: hover === data.id ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={() => setHover(data.id)}
          onMouseLeave={() => setHover(null)}
          variant="filled"
          onClick={() => deleteData(data.id)}
        >
          Smazat
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const refreshedData = await readData();
        if (refreshedData) {
          setData(refreshedData as ContractorContextType[]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const dataSource = data.map((contractor) => ({
    key: contractor.id,
    id: contractor.id,
    firstName: contractor.firstName,
    lastName: contractor.lastName,
    fields: contractor.fields ? contractor.fields : [],
    weekends: contractor.weekends,
    city: contractor.city,
    zip: contractor.zip,
    range: contractor.range,
  }));

  const deleteData = async (id: string) => {
    const db = getDatabase(app);
    await remove(ref(db, `remeslnik/${id}`));
    const contractorsRaw = await readData();
    if (contractorsRaw) {
      setData(contractorsRaw as ContractorContextType[]);
    }
  };

  const { styles } = tableStyle();
  return (
    <ConfigProvider
      theme={{
        algorithm:
          themeWrapper === "dark"
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
      }}
    >
      <h1>Seznam řemeslníků</h1>
      <Table<ContractorFields>
        className={styles.customTable}
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 10, position: ["bottomRight"] }}
        scroll={{ y: 55 * 40, x: 1000 }}
      />
    </ConfigProvider>
  );
};
