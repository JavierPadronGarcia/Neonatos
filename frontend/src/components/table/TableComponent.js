import React from 'react';
import { DeleteOutlined, EditOutlined, InfoCircleOutlined } from '@ant-design/icons';
import './TableComponent.css';
import { Table, Popconfirm } from 'antd';

function TableComponent({ tableHeader, tableContent, notifyUpdate, notifyDelete, notifyDetails, showDetails }) {


  const addOptionsToTableHeader = () => {
    if (tableHeader[tableHeader.length - 1].key !== 'options') {
      tableHeader.push({
        title: 'Opciones',
        key: 'options',
        render: (_, record) => {
          return (
            <div className='custom-options'>
              {showDetails && <InfoCircleOutlined onClick={() => notifyDetails(record)} />}
              <EditOutlined onClick={() => notifyUpdate(record)} />
              <Popconfirm
                title="¿Eliminar este registro?"
                onConfirm={() => notifyDelete(record)}
                okText="Sí"
                cancelText="No"
              >
                <DeleteOutlined />
              </Popconfirm>
            </div>
          );
        }
      })
    }
  }

  addOptionsToTableHeader();

  return <Table
    className='table'
    columns={tableHeader}
    dataSource={tableContent}
    pagination={false}
  />;
}

export default TableComponent;
