import {Button, Modal, Table } from 'antd';
import React, { Fragment, useMemo, useState } from 'react'
import { Loading } from '../LoadingComponent/Loading';
import { Excel } from "antd-table-saveas-excel";
import './index.css'
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
  const columnExport = useMemo(() => {
    return columns.filter((col) => col.dataIndex !== "action")
  },[columns])
  console.log("collll", columnExport)

  const  handleDeleteAll =() => {
    setOpenModal(true)
  }
  const handleSubmitDeleteAll = () => {
    handleDeleteProducs(deleteList)
  }
  // handle export file excel
  const handleExportExcel= () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(columnExport)
      .addDataSource(dataProductList, {
        str2Percent: true
      })
      .saveAs("Excel.xlsx");
  };
  return (
    <Loading isLoading={isLoading} >
      <Fragment>
        <div className="btn_header">
          <Button type="primary" style={{ marginBottom: "20px" }} onClick={handleDeleteAll} disabled={deleteList.length <= 1}>Xóa tất cả</Button>
          <Button type="primary" style={{ marginBottom: "20px" }} onClick={handleExportExcel}>Export excel</Button>
        </div>
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
