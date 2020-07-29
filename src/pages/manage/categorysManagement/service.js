import request from '@/utils/request';


const BASE_PATH = '/api_v1';

const GET_CATEGORY = '/manage/category/get_category.do'


export async function getCategory(params){
  let {id} = params;
  return request(BASE_PATH + GET_CATEGORY,{
    method: 'GET',
    params: {
      categoryId: id?id:0
    },
  })
}

export async function queryRule(params) {
  return request('/api/rule', {
    params,
  });
}
export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}
export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}