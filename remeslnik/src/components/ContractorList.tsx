import React, { useEffect } from 'react';
import { Button, Table, Tag } from 'antd';
import type { TableColumnsType } from 'antd';
import { createStyles } from 'antd-style';
import { ContractorContextType, ContractorFields } from './types/ContractorContextType';
import { get, getDatabase, ref, remove } from 'firebase/database';
import { app } from '../firebaseConfig';

const useStyle = createStyles(({ css }) => {
  return {
    customTable: css`
      .ant-table {
        .ant-table-container {
          .ant-table-body,
          .ant-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});



export const ContractorList: React.FC = () => {
  const [data, setData] = React.useState<ContractorContextType[]>([]);

  const columns: TableColumnsType<ContractorFields> = [
    {
      title: 'Jméno',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Příjmení',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Oblasti',
      dataIndex: 'fields',
      key: 'fields',
      render: (fields) => (
        <>
          {fields.map((field: string) => (
            <Tag color="blue" key={field}>
              {field.toUpperCase()}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Pracuji o víkendech',
      dataIndex: 'weekends',
      key: 'weekends',
      render: (weekends) => (weekends ? 'Ano' : 'Ne'),
    },
    {
      title: 'Město',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'PSČ',
      dataIndex: 'zip',
      key: 'zip',
    },
    {
      title: 'Pracuji v okolí (km)',
      dataIndex: 'range',
      key: 'range',
    },
    {
      title: 'Akce',
      key: 'id',
      render: (_, record) => (
        <Button color="danger" variant="filled" onClick={() => deleteData(record.id)} >
          <a>Delete</a>
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const contractorsRaw = await readData();
      if (contractorsRaw) {
        setData(contractorsRaw as ContractorContextType[]);
      }
    };

    fetchData();
  }, []);

  const dataSource = data.map((contractor) => ({
    id: contractor.id,
    firstName: contractor.firstName,
    lastName: contractor.lastName,
    fields: contractor.fields ? contractor.fields : [],
    weekends: contractor.weekends,
    city: contractor.city,
    zip: contractor.zip,
    range: contractor.range,
  }));

  const readData = async () => {
    const db = getDatabase(app);
    const contractorRef = ref(db, 'remeslnik/');
    const snapshot = await get(contractorRef);
    if (snapshot.exists()) {
      const val = snapshot.val();
      const jsonData = Object.values(val);
      console.log('jsonData', jsonData);
      return jsonData;
    } else {
      console.log('No data available');
    }
  }

  const deleteData = async (id: string) => {
    const db = getDatabase(app);
    await remove(ref(db, `remeslnik/${id}`));
    const contractorsRaw = await readData();
    if (contractorsRaw) {
      setData(contractorsRaw as ContractorContextType[]);
    }
  }

  const { styles } = useStyle();
  return (
    <>
      <h1>Seznam řemeslníků</h1>
      <Table<ContractorFields>
        className={styles.customTable}
        columns={columns}
        dataSource={dataSource}

        pagination={{ pageSize: 10, position: ['bottomRight'] }}
      // scroll={{ y: 55 * 5 }}
      />
    </>

  );
};

