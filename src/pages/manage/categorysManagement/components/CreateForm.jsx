import React, { useEffect } from 'react';
import { Modal,Form,Input,Button } from 'antd';
import moment from 'moment';


const CreateForm = props => {
  const { modalVisible, onCancel,title,formColumns=[],formSubmit,initialValues={}} = props;
  // form 预设的方法;
  const [form] = Form.useForm();
  
  // 重置表单
  const resetFormFields = ()=>{
    // 使用name属性被接管  form.setFieldsValue
    // 对于简单的输入框表单使用 form.resetFields();
    // 复杂的表单需要使用 form.setFieldsValue 数据需要被格式化
    form.setFieldsValue({
      ...initialValues,
      createTime: initialValues.createTime?moment(initialValues.createTime):'', // 格式化时间
      updateTime: initialValues.updateTime?moment(initialValues.updateTime):'',  // 格式化时间
      status: !!initialValues.status?'check':'' // 格式化status
    })
  }

  useEffect(()=>{
    resetFormFields()
  })

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      console.log('Success:', values);
      return values
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
      return errorInfo
    }
  };

  //这里创建form的数据 gutter 
  const makeFrom = ()=>{
    return (
      <Form
        form={form}
        initialValues={initialValues} // 这里选择rowValue
        // 提交表单且数据验证成功后回调事件
        onFinish={(fieldsValue)=>{
          // todo
          debugger
          console.log("this is onFinish")
        }}
        {...formItemLayout}
      >
        {formColumns.map((item)=>{
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
                    form.getFieldValue(item.name),
                    form.getFieldsValue()
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
              required={item.required}>
                <Input placeholder={item.placeholder} disabled={item.noUpdate || item.noCreate}/>
              </Form.Item>
          )
        } 
        )}
    </Form>    
    )
  }

  // const makeFooter = ()=>{
  //   return (
  //   <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
  //     <Button onClick={onReset}>
  //       取消
  //     </Button>
  //     <Button type="primary" onClick={onCheck}>
  //       提交
  //     </Button>
  //   </Form.Item>)
  // }

  return (
    <Modal
      destroyOnClose
      title={title}
      visible={modalVisible}
      onOk={()=>{
        onCheck() // 检查
        formSubmit()
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
