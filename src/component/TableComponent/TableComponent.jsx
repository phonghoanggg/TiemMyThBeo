import {Table } from 'antd';
import React, { useState } from 'react'
import { Loading } from '../LoadingComponent/Loading';

  
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };
const TableComponent = (props) => {
    const [selectionType, setSelectionType] = useState('checkbox');
    const {dataProductList = [],columns = [], isLoading = false} = props
    return (
      <Loading isLoading={isLoading} >
        <Table
          // rowSelection={{
          //   type: selectionType,
          //   ...rowSelection,
          // }}
          columns={columns}
          dataSource={dataProductList}
          {...props}
          // pagination={{ pageSize: 5 }}
        />
      </Loading>
    )
}

export default TableComponent
