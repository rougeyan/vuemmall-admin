import React, { useEffect,useRef } from 'react';
import { Modal,Form,Input,Button } from 'antd';
import moment from 'moment';


const CreateForm = props => {
  const { modalVisible, 
    onCancel,
    title,
    modalType,
    formColumns=[],
    formSubmit,
    initialValues={
      status: 1
    }
  } = props;
  // 获取form实例 调用instance方法
  const [form] = Form.useForm();
  // form 预设的方法; 通过其他组件调用
  const formRef = useRef(null);
  // 重置表单
  const resetFormFields = ()=>{
    // 使用name属性被接管  form.setFieldsValue
    // 对于简单的输入框表单使用 form.resetFields();
    // 复杂的表单需要使用 form.setFieldsValue 数据需要被格式化
    form.setFieldsValue({
      ...initialValues,
      createTime: initialValues.createTime?moment(initialValues[`createTime`]):'', // 格式化时间
      updateTime: initialValues.updateTime?moment(initialValues[`updateTime`]):'',  // 格式化时间
      status: initialValues.status>0?'check':'' // 格式化status
    })
  }
  // 还原提交参数
  const transferFormFields = (fields)=>{
    console.log(fields.updateTime)
    return {
      ...fields,
      createTime: fields.createTime?fields.createTime._i:initialValues.createTime,
      updateTime: fields.updateTime?fields.updateTime._i:initialValues.updateTime,
      status: fields.status =='check'?1: 0
    }
  }
  // useEffect 通常用于请求数据，事件处理，订阅等相关操作
  useEffect(()=>{
    console.log("清除表格内容")
    form.resetFields()
    resetFormFields()
  })

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  
  //这里创建form的数据 gutter 
  const makeFrom = ()=>{
    return (
      <Form
        form={form}
        ref={formRef}
        initialValues={initialValues} // 这里选择rowValue
        // 提交表单且数据验证成功后回调事件
        onFinish={(fieldsValue)=>{
          // 这里还需要处理一下时间 使他变成时间戳;
          let params = transferFormFields(fieldsValue)
          formSubmit(params)
        }}
        {...formItemLayout}
      >
        {formColumns.map((item)=>{
          if(!modalType && item.noCreate){
            return 
          }
          if(!!item.reRender){
            return (
              <Form.Item
                label={item.label}
                name={item.name}
                key={item.label}
                rules={item.rules}
                valuePropName={item.valuePropName?item.valuePropName:'value'}
                onChange={item.onChange}
                required={item.required}
                >
                  {
                  item.reRender(
                    form.getFieldValue(item.name), // 值
                    form.getFieldsValue(), // 整个数
                    item // 自身参数
                  )}
              </Form.Item>
            )
          }
          return (
            <Form.Item
              name={item.name}
              label={item.label} 
              key={item.label}
              rules={item.rules}
              // valuePropName={item.type?item.type:'value'}
              onChange={item.onChange}
              required={item.required}
              hidden={!modalType && item.noCreate}
              >
                <Input 
                  placeholder={item.placeholder} 
                  disabled={(!!modalType&& item.noUpdate)}/>
              </Form.Item>
          )
        } 
        )}
    </Form>    
    )
  }
  return (
    <Modal
      destroyOnClose
      getContainer={false}
      title={title}
      visible={modalVisible}
      onOk={()=>{
        formRef.current.submit()
      }}
      onCancel={() =>{
        resetFormFields()
        onCancel()
      }}
      // footer与onOk onCancel 是对等的
      // footer={makeFooter()}  
    >
      {makeFrom()}
    </Modal>
  );
};

export default CreateForm;
