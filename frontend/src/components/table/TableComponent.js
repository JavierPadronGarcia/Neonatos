import React from 'react';
import { DeleteOutlined, EditOutlined, InfoCircleOutlined } from '@ant-design/icons';
import './TableComponent.css';
import { Table, Popconfirm, Button } from 'antd';

function TableComponent({ tableHeader, tableContent, notifyUpdate, notifyDelete, notifyDetails, showDetails, showEdit, showDelete, showOptions, title, textButton }) {

  const addOptionsToTableHeader = () => {
    if (tableHeader[tableHeader.length - 1].key !== 'options' && showOptions) {
      tableHeader.push({
        title: 'Opciones',
        key: 'options',
        align: 'center',
        render: (_, record) => {
          return (
            <div className='custom-options'>
              {showDetails && <InfoCircleOutlined onClick={() => notifyDetails(record)} />}
              {showEdit && <EditOutlined onClick={() => notifyUpdate(record)} />}
              {showDelete && <Popconfirm
                title="¿Eliminar este registro?"
                onConfirm={() => notifyDelete(record)}
                okText="Sí"
                cancelText="No"
              >
                <DeleteOutlined />
              </Popconfirm>}
              {textButton &&
                <Button onClick={() => notifyUpdate(record)}>{textButton}</Button>
              }
            </div>
          );
        }
      })
    }
  }

  addOptionsToTableHeader();

  if (title) {
    return <Table
      className='table'
      columns={tableHeader}
      dataSource={tableContent}
      pagination={false}
      title={() => title}
    />;
  }

  return <Table
    className='table'
    columns={tableHeader}
    dataSource={tableContent}
    pagination={false}
  />;
}

export default TableComponent;
