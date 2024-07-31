import {Button, Modal, Table } from 'antd';
import React, { Fragment, useState } from 'react'
import { Loading } from '../LoadingComponent/Loading';

const TableComponent = (props) => {
  const { dataProductList = [], columns = [], isLoading = false, handleDeleteProducs, statusDelete = false,openModal,setOpenModal} = props
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
  console.log("statusDelete1111",statusDelete,openModal)
  const  handleDeleteAll =() => {
    setOpenModal(true)
  }
  const handleSubmitDeleteAll = () => {
    handleDeleteProducs(deleteList)
  }

  return (
    <Loading isLoading={isLoading} >
      <Fragment>
        <Button type="primary" style={{marginBottom:"20px"}} onClick={handleDeleteAll} disabled={deleteList.length <= 1}>Xóa tất cả</Button>
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
        <Modal title="Xóa tài khoản" open={openModal} onOk={handleSubmitDeleteAll} onCancel={() => setOpenModal(false)}>
        <Loading isLoading={false}>
          <div>Bạn có chắc muốn xóa toàn bộ ?</div>
        </Loading>
      </Modal>
      </Fragment>
    </Loading>
  )
}

export default TableComponent
