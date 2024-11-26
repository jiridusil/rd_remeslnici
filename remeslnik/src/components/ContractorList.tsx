import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';

interface DataType {
  key: string;
  name: string;
  address: string;
  range: number;
  tags: string[];
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Range (km)',
    dataIndex: 'range',
    key: 'range',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'zednickePrace') {
            color = 'volcano';
          }
          else if (tag === 'malirstvi') {
            color = 'green';
          } else if (tag === 'stolarskePrace') {
            color = 'yellow';
          }
          else if (tag === 'obkladacstvi') {
            color = 'cyan';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    range: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['zednickePrace'],
  },
  {
    key: '2',
    name: 'Jim Green',
    range: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    range: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['stolarskePrace', 'teacher'],
  },
];

export const ContractorList: React.FC = () => <Table<DataType> columns={columns} dataSource={data} />;
