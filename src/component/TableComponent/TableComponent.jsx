import {Button, Table } from 'antd';
import React, { Fragment, useState } from 'react'
import { Loading } from '../LoadingComponent/Loading';

const TableComponent = (props) => {
  const { dataProductList = [], columns = [], isLoading = false, handleDeleteProducs } = props
  const [selectionType, setSelectionType] = useState('checkbox');
  const [deleteList, setDeleteList] = useState([])

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setDeleteList(selectedRowKeys)
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  console.log("props",props)
  const  handleDeleteAll =() => {
    handleDeleteProducs(deleteList)
  }

  return (
    <Loading isLoading={isLoading} >
      <Fragment>
        <Button type="primary" onClick={handleDeleteAll} disabled={deleteList.length <= 1}>Xóa tất cả</Button>
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={dataProductList}
          {...props}
        // pagination={{ pageSize: 5 }}
        />
      </Fragment>
    </Loading>
  )
}

export default TableComponent
