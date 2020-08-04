import request from '@/utils/request';


const BASE_PATH = '/api_v1';

const GET_ORDERLIST = '/manage/order/list.do'
const UPDATE_CATEGORY = '/manage/category/update_category.do'
const ADD_CATEGORY = '/manage/category/add_category.do'


export async function getOrders(params){
  let {id,current}=params;
  return request(BASE_PATH + GET_ORDERLIST,{
    method: 'GET',
    params: {
      ...params,
      categoryId: id?id:0,
      pageNum: current?current:1,
    },
  })
}