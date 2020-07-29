import React, { useState, useRef,useEffect } from 'react';
import { Link, connect } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { Button, Divider, message, Input, Form } from 'antd';
import ProTable from '@ant-design/pro-table';

import { getCategory,queryRule, updateRule, addRule, removeRule } from './service';
import moment from 'moment';


// hooks写法


const categorysManagement = props =>{

  const actionRef = useRef();
  const [selectedRowsState, setSelectedRows] = useState([]);
  // 默认的categoryId
  const [categoryId,setCategoryId] = useState(0);
  const [tableData,setTableData] = useState({});
  
  const handleQuery = (fields)=>async (params, sorter, filter)=>{
    console.log({ ...params, sorter, filter,...fields});
    const result = await getCategory({ ...params, sorter, filter,...fields});
    console.log(result)
    setTableData(result)
    return result
  }
  
  
  // (params, sorter, filter) => {
  //   return getCategory({ ...params, sorter, filter})
  // }

  const [form] = Form.useForm();

  useEffect(() => {
    // console.log("useEffect更新啦")
  })

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
      title: '状态',
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
                id:record.id
              })()
              // setCategoryId();
              // console.log(_)
              // console.log(record)
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
              // setStepFormValues(record);
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <a href="">删除</a>
        </>
      ),
    },
  ];
  
  
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
          <Button type="primary" onClick={() => ''}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={handleQuery()}
        // dataSource={tableData}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}

        // form={}
        onSubmit ={
          // 提交表单时触发
          ()=>{
            console.log("提交表单");
          }
        }
      />
      {props.children}
    </PageContainer>
  )
}
export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(categorysManagement);