import { DeleteOutlined, EditOutlined, PlusSquareOutlined, SearchOutlined, UploadOutlined, UserAddOutlined } from '@ant-design/icons'
import React, { useEffect, useRef, useState } from 'react'
import TableComponent from '../TableComponent/TableComponent'
import { Button, Drawer, Form, Input, Modal, Upload,TableColumnType, Space } from 'antd'
import { getBase64 } from '../../until'
import *  as ProductService from '../../services/ProductServices'
import * as UserService from '../../services/UserServices'
import { useMuttionHooksCreateUser, useMuttionHooksDeletedProduct, useMuttionHooksDeletedProductMany, useMuttionHooksDeletedUser, useMuttionHooksDeletedUserMany, useMuttionHooksUpdateProduct, useMuttionHooksUpdateUser } from '../../hook/useMutationHook';
import { Loading } from '../LoadingComponent/Loading'
import * as message from "../../component/Message/Message" 
import { useQuery } from 'react-query'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'
import moment from 'moment/moment'
import DrawerUser from './DrawerUser'

const AdminUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDeleted, setIsModalOpenDeleted] = useState(false);
  const [avatar, setAvatar] = useState()
  const [form] = Form.useForm();
  const [formCreate] = Form.useForm();
  const [rowSelected,setRowSelected] = useState('')
  const [isOpenDrawer, setOpenDrawer] = useState(false)
  const [isLoadingUpdate, setLoadingUpdate] = useState(false)
  const [typeModal, setTypeModal] = useState('')
  const user = useSelector((state) => state.user)
  // Filter ant 
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  

  const mutation = useMuttionHooksCreateUser(
    (data) =>  {  
      UserService.createUser(data)
    }
  )
  const mutationUpdate = useMuttionHooksUpdateUser(
    (data) => {
      UserService.updateUser(data)
    }
  )
  const mutationDeleted = useMuttionHooksDeletedUser(
    (data) => {
      UserService.deleteUser(data)
    }
  )
  const mutationDeletedMany = useMuttionHooksDeletedUserMany()

  const getAllUser = async() => {
    const res = await UserService.getAllUser()
    return res
  }
  const handleDeleteProducs = (_id) => {
    mutationDeletedMany.mutate({ids: _id, access_token: user?.access_token},{
      onSettled: () => {
        queryUsers.refetch()
      }
    })
  }
  // get allProduct
  const queryUsers = useQuery({queryKey:['users'],queryFn:getAllUser})
  const { data: dataUser, isFetching} = queryUsers
  // Mutation create product
  const { data, isSuccess, isError } = mutation
  // Mutation update user
  const {  data: isLoadingUpdateUser, isSuccess: isSuccessUpdateProduct, isError: isErrorUpdateProduct, status } = mutationUpdate

  const { data: dataDelected, isLoading: isLoadingUpdateDeleted, isSuccess: isSuccessUpdateDeletedt, isError: isErrorUpdateDeletedt } = mutationDeleted

  console.log("dataDelected",isLoadingUpdateUser)
  // UPDATE product
  useEffect(() => {
    if(isSuccessUpdateProduct && status === "success"  ) {
      message.success("Cập nhật tài khoản thành công")
      setRowSelected('')
      setAvatar('')
      setTimeout(() => {
        setOpenDrawer(false)
      },[700])
    } else if(isErrorUpdateProduct) {
      message.error("Cập nhật tài khoản thất bại")
    }
  },[isSuccessUpdateProduct,isErrorUpdateProduct])

  // ADD product
  useEffect(() => {
    if(isSuccess && data?.status === "OK") {
      message.success("Thêm tài khoản thành công")
      setIsModalOpen(false);  
      // reset value
      formCreate.resetFields();
      setAvatar(null);
    } else if(isSuccess && data?.status === "ERR") {
      message.error("Tên đã tồn tại")
    } else if(isError) {
      message.error("Thất bại kiểm tra lại thông tin tài khoản")
    }
  },[isSuccess,isError])

   // DELETED product
   useEffect(() => {
    if(isSuccessUpdateDeletedt && dataDelected?.status === "OK") {
      message.success("Đã xóa")
      setIsModalOpenDeleted(false);  
    } else if(isErrorUpdateDeletedt) {
      message.error("Xóa thất bại")
    }
  },[isSuccessUpdateDeletedt,isErrorUpdateDeletedt])

  // Open form
  const showModal = () => {
    setIsModalOpen(true);
    setTypeModal("ADD_USER")
  };
  // Close form
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setAvatar(null);
  };
  const handleCancelDeleted = () => {
    setIsModalOpenDeleted(false);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  // handle deleted product
  const handleOkDeleted = () => {
    mutationDeleted.mutate({id: rowSelected, access_token: user?.access_token},{
      onSettled: () => {
        queryUsers.refetch()
      }
    })
  };

  // handle ADD product
  const onFinish = (values) => {
    if (values.image && values.image.file) {
      values.image = values.image.file.preview
    }
    console.log("valueeee", values)
    // payload value 
    mutation.mutate(values, {
      onSettled: () => {
        queryUsers.refetch()
      }
    })
  };
  
  // handle change avatar
  const handleChangeImg = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview)
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // GET data for item product
  const fetchDataProductItem = async(rowSelected) => {
    const res = await UserService.getDetailsUser(rowSelected)
    console.log("2222",res)
    const data = {
      name: res?.data?.name,
      email: res?.data?.email,
      isAdmin: res?.data?.isAdmin,
      phone: res?.data?.phone,
      address: res?.data?.address,
    }
    form.setFieldsValue(data)
    setAvatar(data.image)
    setLoadingUpdate(false)
  }
  useEffect(() => {
    if(rowSelected) {
      fetchDataProductItem(rowSelected)
    }
  },[rowSelected])

  // PUT data for update product
  const fetchUpdateUser = async(values) => {
    console.log("kekeke", values)
    const data = {
      name: values?.name,
      email: values?.email,
      isAdmin: values?.isAdmin,
      phone: values?.phone,
      address: values?.address,
    }
    await mutationUpdate.mutate({id: rowSelected, access_token: user?.access_token, data}, {
      onSettled: () => {
        queryUsers.refetch()
      }
    }
  )
  }
  // submit form update
  const onSubmitUpdate = async (values) => {
    fetchUpdateUser(values)
  }


  const handlDetailProduct = () => {
    setLoadingUpdate(true)
    // rowSelected có khi user click vào icon Edit
    setOpenDrawer(true)
  }
  const handledDeletedProduct = () => {
    setIsModalOpenDeleted(true)
  }

  const renderAction = () => {
    return (<div>
      <DeleteOutlined style={{color: "red", marginRight:"10px", fontSize:"20px", cursor:"pointer"}}  onClick={handledDeletedProduct}/>
      <EditOutlined style={{ fontSize:"20px", cursor:"pointer",color: "#3b96f3"}} onClick={handlDetailProduct} />
    </div>)
  }

  // add id for list product
  const dataUserList = dataUser?.data.length && dataUser?.data.map((item) => {
    return {...item, key: item._id}
  })
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });
    const columns = [
    {
      title: 'Tên tài khoản',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
      sorter: (a,b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (text) => <a>{text}</a>,
      sorter: (a,b) => a.email.length - b.email.length,
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Quyền Admin',
      dataIndex: 'isAdmin',
      render: (isAdmin) => <a>{isAdmin ? "Có" : "Không"}</a>,
      filters: [
        {
          text: 'Có',
          value: true,
        },
        {
          text: 'Không',
          value: false,
        },
      ],
      onFilter: (value, record) =>{
        if(value) {
          return record.isAdmin === true
        }
        return record.isAdmin === false
      },
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      ...getColumnSearchProps('phone'),
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      sorter: (a,b) => a.address.length - b.address.length,
      ...getColumnSearchProps('address'),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      render: (dateCreate) => <a>{moment(dateCreate).format('DD-MM-YYYY HH:mm:ss')}</a>,
      ...getColumnSearchProps('createdAt'),
    },
    {
      title: 'Ngày sửa thông tin',
      dataIndex: 'updatedAt',
      render: (dateUpdate) => <a>{moment(dateUpdate).format('DD-MM-YYYY HH:mm:ss')}</a>,
      ...getColumnSearchProps('updatedAt'),
    },
    {
      title: '',
      dataIndex: 'action',
      render:() => renderAction()
    },
  ];

  return (
    <div class="wrapContent">
      <div className='flex mb-5'>
        <p class="tilePage">Quản lý tài khoản</p>
        <UserAddOutlined style={{ fontSize: "24px", cursor: "pointer" }} onClick={showModal} />
      </div>
      <TableComponent handleDeleteProducs = {handleDeleteProducs} isLoading = {isFetching} dataProductList = {dataUserList} columns={columns} 
      onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {
            setRowSelected(record._id)
          }, // click row
          onDoubleClick: (event) => {}, // double click row
          onContextMenu: (event) => {}, // right button click row
          onMouseEnter: (event) => {}, // mouse enter row
          onMouseLeave: (event) => {}, // mouse leave row
        };
      }}
      />
      <DrawerComponent
        title='Chi tiết tài khoản'
        isOpen={isOpenDrawer}
        onClose={() => {
          setAvatar('')
          setRowSelected('')
          setOpenDrawer(false)
        }}> 
        <DrawerUser 
          form = {form}
          isLoading = { isLoadingUpdate}
          handleChangeImg ={handleChangeImg}
          onSubmitUpdate = {onSubmitUpdate}
          onFinishFailed = {onFinishFailed}
          avatar = {avatar} 
          />
      </DrawerComponent>
      
      {/* Modal */}
      <Modal title="Thêm tài khoản" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <DrawerUser 
          typeModal={typeModal}
          form = {formCreate} 
          isLoading= {false}
          handleChangeImg ={handleChangeImg}
          onFinish = {onFinish}
          onFinishFailed = {onFinishFailed}
          avatar = {avatar} 
          />
      </Modal>
      <Modal title="Xóa tài khoản" open={isModalOpenDeleted} onOk={handleOkDeleted} onCancel={handleCancelDeleted}>
        <Loading isLoading={isLoadingUpdateDeleted}>
          <div>Bạn có chắc muốn xóa tài khoản này này không?</div>
        </Loading>
      </Modal>
    </div>
  )
}

export default AdminUser
