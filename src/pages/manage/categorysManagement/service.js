import request from '@/utils/request';


const BASE_PATH = '/api_v1';

const GET_CATEGORY = '/manage/category/get_category.do'
const UPDATE_CATEGORY = '/manage/category/update_category.do'
const ADD_CATEGORY = '/manage/category/add_category.do'


export async function getCategory(params){
  let {id,current}=params;
  return request(BASE_PATH + GET_CATEGORY,{
    method: 'GET',
    params: {
      ...params,
      categoryId: id?id:0,
      pageNum: current?current:1,
    },
  })
}
export async function addCategory(params){
  return request(BASE_PATH + ADD_CATEGORY,{
    method: 'post',
    data: {
      ...params
    },
  })
}
export async function updateCategory(params){
  return request(BASE_PATH + UPDATE_CATEGORY,{
    method: 'POST',
    data:{
      ...params
    }
  })
}