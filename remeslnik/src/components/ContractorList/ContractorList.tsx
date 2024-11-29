import React, { useEffect } from "react";
import { Button, Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import {
  ContractorContextType,
  ContractorFields,
} from "../types/ContractorContextType";
import { get, getDatabase, ref, remove, set } from "firebase/database";
import { app } from "../../firebaseConfig";
import { tableStyle } from "../../styles";
import { readData } from "../Dto";

export const ContractorList: React.FC = () => {
  const [data, setData] = React.useState<ContractorContextType[]>([]);

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
      render: (_, record) => (
        <Button
          color="danger"
          variant="filled"
          onClick={() => deleteData(record.id)}
        >
          <a>Delete</a>
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
    <>
      <h1>Seznam řemeslníků</h1>
      <Table<ContractorFields>
        className={styles.customTable}
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 10, position: ["bottomRight"] }}
        scroll={{ y: 55 * 40, x: 1000 }}
      />
    </>
  );
};
