import { DeleteOutlined, EditOutlined, PlusSquareOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons'
import React, { useEffect, useRef, useState } from 'react'
import TableComponent from '../TableComponent/TableComponent'
import { Button, Drawer, Form, Input, Modal, Upload,TableColumnType, Space } from 'antd'
import { getBase64 } from '../../until'
import *  as ProductService from '../../services/ProductServices'
import { useMuttionHooksCreateProduct, useMuttionHooksDeletedProduct, useMuttionHooksDeletedProductMany, useMuttionHooksUpdateProduct } from '../../hook/useMutationHook';
import { Loading } from '../LoadingComponent/Loading'
import * as message from "../../component/Message/Message" 
import { useQuery } from 'react-query'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'
import DrawerProduct from './DrawerProduct'

const AdminProduct = () => {
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
  

  const mutation = useMuttionHooksCreateProduct(
    (data) =>  {  
      const {
        name,
        image,
        type,
        price,
        rating,
        description,
        countInStock: countInStock,
      } = data
      console.log("name",name)
      ProductService.createProduct({
        name,
        image,
        type,
        price,
        rating,
        description,
        countInStock, 
      })
    }
  )
  const mutationUpdate = useMuttionHooksUpdateProduct(
    (data) => {
      ProductService.updateProduct(data)
    }
  )
  const mutationDeleted = useMuttionHooksDeletedProduct()
  const mutationDeletedMany = useMuttionHooksDeletedProductMany()

  const getAllProducts = async() => {
    const res = await ProductService.getAllProduct()
    return res
  }
  const handleDeleteProducs = (_id) => {
    mutationDeletedMany.mutate({ids: _id, access_token: user?.access_token},{
      onSettled: () => {
        queryProducts.refetch()
      }
    })
  }
  // get allProduct
  const queryProducts = useQuery({queryKey:['products'],queryFn:getAllProducts})
  const {data: dataProduct,isFetching} = queryProducts

  // Mutation create product
  const { data, isSuccess, isError } = mutation
 
  // Mutation update product
  const {  isLoading: isLoadingUpdateProduc, isSuccess: isSuccessUpdateProduct, isError: isErrorUpdateProduct, status } = mutationUpdate
  const { data: dataDelected, isLoading: isLoadingUpdateDeleted, isSuccess: isSuccessUpdateDeletedt, isError: isErrorUpdateDeletedt } = mutationDeleted

  console.log("dataDelected",dataDelected)
  // UPDATE product
  useEffect(() => {
    if(isSuccessUpdateProduct && status === "success"  ) {
      message.success("Cập nhật sản phẩm thành công")
      setRowSelected('')
      setAvatar('')
      setTimeout(() => {
        setOpenDrawer(false)
      },[700])
    } else if(isErrorUpdateProduct) {
      message.error("Cập nhật sản phẩm thất bại")
    }
  },[isSuccessUpdateProduct,isErrorUpdateProduct])

  // ADD product
  useEffect(() => {
    if(isSuccess && data?.status === "OK") {
      message.success("Thêm sản phẩm thành công")
      setIsModalOpen(false);  
      // reset value
      formCreate.resetFields();
      setAvatar(null);
    } else if(isSuccess && data?.status === "ERR") {
      message.error("Tên đã tồn tại")
    } else if(isError) {
      message.error("Thất bại kiểm tra lại thông tin sản phẩm")
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
    setTypeModal("ADD_PRODUCT")
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
        queryProducts.refetch()
      }
    })
  };

  // handle ADD product
  const onFinish = (values) => {
    if (values.image && values.image.file) {
      values.image = values.image.file.preview
    }
    // payload value 
    mutation.mutate(values, {
      onSettled: () => {
        queryProducts.refetch()
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
    const res = await ProductService.getDetailProduct(rowSelected)
    const data = {
      name: res?.data?.name,
      price: res?.data?.price,
      image: res?.data?.image,
      description: res?.data?.description,
      countInStock: res?.data?.countInStock,
      type: res?.data?.type,
      rating: res?.data?.rating,
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
  const fetchUpdateProduct = async(values) => {
    const data = {
      name: values.name,
      price: values.price,
      image: avatar,
      description: values.description,
      countInStock: values.countInStock,
      type: values.type,
      rating: values.rating,
    }
    await mutationUpdate.mutate({id: rowSelected, access_token: user?.access_token, data},{
      onSettled: () => {
        queryProducts.refetch()
      }
    })
  }
  // submit form update
  const onSubmitUpdate = async (values) => {
    fetchUpdateProduct(values)
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
  const dataProductList = dataProduct?.data.length && dataProduct?.data.map((item) => {
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
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });
    const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
      sorter: (a,b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      sorter: (a,b) => a.price - b.price,
      filters: [
        {
          text: '>= 10',
          value: '>=',
        },
        {
          text: '<= 10',
          value: '<=',
        },
      ],
      onFilter: (value, record) =>{
        if(value === ">=") {
          return record.price >= 10
        }
        return record.price <= 10
      },
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rating',
      sorter: (a,b) => a.rating - b.rating,
      filters: [
        {
          text: '>= 3 sao',
          value: '>=',
        },
        {
          text: '<= 3 sao',
          value: '<=',
        },
      ],
      onFilter: (value, record) =>{
        if(value === ">=") {
          return record.rating >= 3
        }
        return record.rating <= 3
      },
    },
    {
      title: 'Kiểu sản phẩm',
      dataIndex: 'type',
      ...getColumnSearchProps('type'),

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
          <p class="tilePage">Quản lý sản phẩm</p>
          <PlusSquareOutlined style={{ fontSize: "24px", cursor: "pointer" }} onClick={showModal} />
        </div>
        <TableComponent handleDeleteProducs = {handleDeleteProducs} isLoading={isFetching} dataProductList={dataProductList} columns={columns}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record._id)
              }, // click row
              onDoubleClick: (event) => { }, // double click row
              onContextMenu: (event) => { }, // right button click row
              onMouseEnter: (event) => { }, // mouse enter row
              onMouseLeave: (event) => { }, // mouse leave row
            };
          }}
        />
        <DrawerComponent
          title='Chi tiết sản phẩm'
          isOpen={isOpenDrawer}
          onClose={() => {
            setAvatar('')
            setRowSelected('')
            setOpenDrawer(false)
          }}>
          <DrawerProduct
            form={form}
            isLoading={isLoadingUpdateProduc || isLoadingUpdate}
            handleChangeImg={handleChangeImg}
            onSubmitUpdate={onSubmitUpdate}
            onFinishFailed={onFinishFailed}
            avatar={avatar}
          />
        </DrawerComponent>

        {/* Modal */}
        <Modal title="Thêm sản phẩm" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
          <DrawerProduct
            typeModal={typeModal}
            form={formCreate}
            isLoading={false}
            handleChangeImg={handleChangeImg}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            avatar={avatar}
          />
        </Modal>
        <Modal title="Xóa sản phẩm" open={isModalOpenDeleted} onOk={handleOkDeleted} onCancel={handleCancelDeleted}>
          <Loading isLoading={isLoadingUpdateDeleted}>
            <div>Bạn có chắc muốn xóa sản phẩm này không?</div>
          </Loading>
        </Modal>
      </div>
  )
}

export default AdminProduct
