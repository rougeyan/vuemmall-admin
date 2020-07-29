import React, { useState } from 'react';
import { Link, connect } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';

// 是用hooks写法
const manageWrapper = props =>{
  return (
    <>{props.children}</>
  )
}
// 组合状态
export default manageWrapper