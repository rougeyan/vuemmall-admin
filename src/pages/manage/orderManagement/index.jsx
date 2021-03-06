import React, { useState, useRef,useEffect } from 'react';
import { Link, connect } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { Button, Divider, message, Input, Form,Select,Switch, DatePicker } from 'antd';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm'

import { getOrders} from './service';
import { render } from 'enzyme';


// hooks写法


const productsManagement = props =>{

  const actionRef = useRef();

  const [selectedRowsState, setSelectedRows] = useState([]);
  // 默认的categoryId
  const [categoryId,setCategoryId] = useState(0);
  // 表格数据
  const [tableData,setTableData] = useState({
    list:[],
    pageNum: 1,
    pageSize: 10
  });
  // 窗口显示
  const [modalVisible,setModalVisible] = useState(false);
  // 单点行数
  const [selectIndexRow,setSelectIndexRow] = useState({})
  // ModalType
  const [modalType,setModalType] = useState('') // 默认是new 若不改则是revise
  
  const handleQuery = async (params)=>{
    const result = await getOrders({ ...params});
    if(result.status === 0){
      setTableData(result.data)
    }
  }
  
  // request
  const handleRequest =async (params, sorter, filter)=>{
    const result = await getOrders({ ...params, sorter, filter});
    // setTableData(result)
    if(result.status ===0){
      return {
        data: result.data.list,
        total: result.data.total,
        success: true,
        pageSize: params.pageSize,
        current: params.current || 1,
      }
    }
  }

  const handleSubmit = async (params)=>{
    console.log(params)
    if(!modalType){
      const result = await addCategory({
        ...params
      })
      if(result.status === 0){
        setModalVisible(false)
        actionRef.current.reload()
      }
    }else{
      const result = await updateCategory({
        ...params
      })
      if(result.status === 0){
        setModalVisible(false);
        actionRef.current.reload()
      }
    }
  }
  
  
  // (params, sorter, filter) => {
  //   return getCategory({ ...params, sorter, filter})
  // }
  
  useEffect(() => {
    console.log("只会执行一次,相当于created")
  },[]) 

  useEffect(() => {
    console.log("监听到status发生变化")
  })
  // 依赖变量执行
  useEffect(() => {
    console.log("categoryId:更新了")
  },[categoryId])
  

  // 一个是 add中inputType的Model
  // 一个是table的行列 及其seach部分的内容
  const columns = [
    {
      title: '订单编号',
      dataIndex: 'orderNo',
      width: 150,
      rules: [
        {
          required: true,
          message: '规则名称为必填项',
        },
      ],
    },
    {
      title: '总价',
      dataIndex: 'payment',
      hideInSearch:true,
      width: 100,
    },
    {
      title: '支付渠道',
      dataIndex: 'paymentType',
      width: 100,
      // valueType: 'option',
      // 行显示 枚举
      valueEnum: {
        0: { text: '微信'},
        1: { text: '支付宝'},
      },
      // render: (_,record)=>{
      //   return [<a>操作a</a>,<a>操作b</a>]
      // }
    },
    {
      title: '在线支付',
      dataIndex: 'paymentTypeDesc',
      hideInSearch:true,
      width: 100,
    },
    {
      title: '支付时间',
      dataIndex: 'paymentTime',
      hideInSearch:true,
      width: 100,
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      width: 100,
      valueEnum: {
        10: { text: '未支付'},
        20: { text: '已支付'},
      }
    },
    {
      title: '订单状态(描述)临时',
      dataIndex: 'statusDesc',
      hideInSearch:true,
      width: 100,
    },
    {
      title: '收件人信息',
      // dataIndex: 'shippingVo',
      children:[{
        title: '收件人名称',
        dataIndex: ['shippingVo','receiverName'],
        width: 100,
      },{
        title: '收件人电话',
        dataIndex: ['shippingVo','receiverPhone'],
        width: 100,
      },{
        title: '收件人手机',
        dataIndex: ['shippingVo','receiverMobile'],
        width: 100,
      },{
      },{
        title: '邮政编码',
        dataIndex: ['shippingVo','receiverZip'],
        width: 100,
      },{
        title: '收件人地址',
        render: (_,record)=>{
          // 解耦默认值
          const init = {
            receiverAddress:'',
            receiverCity: '',
            receiverDistrict:'',
            receiverProvince:''
          }
          let {shippingVo = init} = record;
          // 参考ES6
          // 默认值生效的条件是，对象的属性值严格等于undefined。
          if(record.shippingVo == null) shippingVo = init
          const {
            receiverAddress,
            receiverCity,
            receiverDistrict,
            receiverProvince} = shippingVo
          return `${receiverProvince}${receiverCity}${receiverDistrict}${receiverAddress}` || ''
        }
      }]
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch:true,
      width: 100,
    },
    {
      title: '收件人',
      hideInTable: true,
      dataIndex: ['shippingVo','receiverName'],
      width: 100,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              // handleUpdateModalVisible(true);
              setModalType('revise')
              setSelectIndexRow(record);
              setModalVisible(true);
            }}
          >
            订单明细
          </a>
          <Divider type="vertical" />
          <a  disabled onClick={
            ()=>{
              // todo
              console.log(record)
            }
          }>修改</a>
          <Divider type="vertical" />
          <a onClick={
            ()=>{
              // todo
              console.log(record)
            }
          }>订单发货</a>
        </>
      ),
    }
  ];

  /**
   * 默认创建UpdataFrom / CreatedForm时 的配置 与columns差不多 有一点区别,详细看配置 而且有左右(必填 选填之分)
    colums 的排序跟那个不一样
   */

  const formColumns = [
    {
      label: '品类编码',
      name: 'id',
    }
  ]
  
  
  return (
    <PageContainer>
      <ProTable
        headerTitle="订单管理"
        actionRef={actionRef}
        rowKey="id"
        scroll={{
          x:true
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() =>{
            setSelectIndexRow({});
            setModalType('');
            setModalVisible(true);
          }}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={handleRequest} // 绑定查询,
        pagination={{
          defaultPageSize: 10,
          }
        }
        // pagination={{
        //   ...tableData,
        //   onChange: function(page, pageSize){
        //     handleQuery({
        //       pageNum: page,
        //       pageSize: pageSize
        //     })
        //   },
        //   // onShowSizeChange: function(current, size){
        //   //   handleQuery({
        //   //     pageNum: current,
        //   //     pageSize: size
        //   //   })
        //   // }
        // }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}

        // form={} form, 参数? https://protable.ant.design/api
        // onSubmit ={// 提交表单时触发}
      />
      
      <CreateForm 
        modalType={modalType}
        modalVisible={modalVisible} 
        title={!modalType?"新建品类":'修改品类'}
        formColumns={formColumns}
        onCancel={() => {
          setModalVisible(false);
        }}
        formSubmit={handleSubmit}
        initialValues={selectIndexRow}
        >
      </CreateForm>
      {props.children}
    </PageContainer>
  )
}
export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(productsManagement);