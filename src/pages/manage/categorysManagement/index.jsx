import React, { useState, useRef,useEffect } from 'react';
import { Link, connect } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { Button, Divider, message, Input, Form,Select,Switch, DatePicker } from 'antd';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm'

import { getCategory,addCategory,updateCategory} from './service';
import moment from 'moment';


// hooks写法


const categorysManagement = props =>{

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
  const [modalType,setModalType] = useState('revise') // 默认是new 若不改则是revise
  
  const handleQuery = async (params)=>{
    const result = await getCategory({ ...params});
    if(result.status === 0){
      setTableData(result.data)
    }
  }
  // const handleRequest = (fields)=>async (params, sorter, filter)=>{
  //   const result = await getCategory({ ...params, sorter, filter,...fields});
  //   setTableData(result)
  //   return result
  // }

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
        setModalVisible(false)
        actionRef.current.reload()
      }
    }
    // setModalVisible(false)
  }
  
  
  // (params, sorter, filter) => {
  //   return getCategory({ ...params, sorter, filter})
  // }
  useEffect(() => {
    console.log("useEffect更新啦")
    handleQuery();
  },[])
  

  // 一个是 add中inputType的Model
  // 一个是table的行列 及其seach部分的内容
  const columns = [
    {
      title: '品类ID',
      dataIndex: 'id',
      rules: [
        {
          required: true,
          message: '规则名称为必填项',
        },
      ],
    },
    {
      title: '父级品类ID',
      dataIndex: 'parentId',
      hideInSearch:true,
    },
    {
      title: '品类名称',
      dataIndex: 'name',
      valueType: 'textarea',
      hideInSearch:true,
    },
    {
      title: '启用状态',
      dataIndex: 'status',
      hideInSearch:true,
      renderText: (val) =>{
        return  !!val?"启用":"停用";
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch:true,
      renderText: val => moment(val).format('YYYY-MM-DD hh:mm:ss')
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      hideInSearch:true,
      renderText: val => moment(val).format('YYYY-MM-DD hh:mm:ss')
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          {/* <LoadChildCategory _={_} record={record} /> */}
          <a
            onClick={() => {
              handleQuery({
                categoryId:record.id
              })
              
              // console.log()
              // handleUpdateModalVisible(true);
              // setStepFormValues(record);
            }}
            >
              查看子品类
            </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              // handleUpdateModalVisible(true);
              setModalType('revise')
              setSelectIndexRow(record);
              setModalVisible(true);
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <a onClick={
            ()=>{
              // todo
              console.log("点击删除")
              console.log(record)
            }
          }>删除</a>
        </>
      ),
    },
  ];

  /**
   * 默认创建UpdataFrom / CreatedForm时 的配置 与columns差不多 有一点区别,详细看配置 而且有左右(必填 选填之分)
    colums 的排序跟那个不一样
   */

  const formColumns = [
    {
      label: '品类ID',
      name: 'id',
      onChange:()=>{
        console.log('changing')
      },
      required: true,
      noCreate:true, // 新建框先不显示
      noUpdate: true // 在更新框下不显示
    },
    {
      label: '品类名称',
      name: 'name',
      valueType: 'textarea',
      rules:[
        {
          required: true,
          message: '请填写品类名称',
        },
      ]
    },
    // {
    //   label: '其他选项',
    //   name: 'other',
    //   required: true,
    //   rules:[
    //     {
    //       required: true,
    //       message: '必选项,请选择',
    //     },
    //   ],
    //   reRender: (val,record)=>{

    //     // console.log(record);
    //     return (<Select allowClear >
    //       <Select.Option value="red">Red</Select.Option>
    //       <Select.Option value="green">Green</Select.Option>
    //       <Select.Option value="blue">Blue</Select.Option>
    //     </Select>)
    //   },
    //   noCreate:true // 新建框先不显示
    // },
    {
      label: '启用状态',
      name: 'status',
      valuePropName: "checked",
      reRender:(val,record)=>(<Switch />)
    },
    
    {
      label: '父级品类ID',
      name: 'parentId',
      rules:[
        {
          required: true,
          message: '请填写父级品类ID',
        },
      ]
    },
    {
      label: '创建时间',
      name: 'createTime',
      valueType: 'date',
      noCreate: true, // 新建框先不显示
      noUpdate: true, // 不允许修改
      rules:[
        {
          required: true,
          message: '时间必须要填啊',
        },
      ],
      reRender: (val,record,opts)=>{
        return (<DatePicker format={'YYYY-MM-DD'} disabled={(!!modalType&& opts.noUpdate)}/>)
      }
    },
    {
      label: '更新时间',
      name: 'updateTime',
      noCreate: true, // 新建框先不显示
      noUpdate: true, // 不允许修改
      reRender: (val,record,opts)=>{
        return (<DatePicker format={'YYYY-MM-DD'} disabled={(!!modalType&& opts.noUpdate)}/>)
      }
    },
  ]
  
  
  return (
    <PageContainer>
      {/* {console.log("DOM节点更新")} */}
      <p>年轻人要学习管理情绪,控制情绪</p>
      <p>当前的categoryID是{categoryId}</p>
      <ProTable
        headerTitle="品类管理"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button type="primary" onClick={() =>{
            setSelectIndexRow({});
            setModalType('');
            setModalVisible(true);
          }}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        // request={handleQuery()}
        dataSource={tableData.list}
        pagination={{
          ...tableData,
          onChange: function(page, pageSize){
            handleQuery({
              pageNum: page,
              pageSize: pageSize
            })
          }
        }}
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
        title="新建品类"
        formColumns={formColumns}
        onCancel={() => {
          setModalVisible(false)
        }}
        formSubmit={handleSubmit}
        // initialValues={{}}
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
}))(categorysManagement);