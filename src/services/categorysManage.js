import request from '@/utils/request';

const BASE_PATH = '/api';

const GET_CATEGORY = '/manage/category/get_category.do?categoryId=100001'


export async function getCategory(params){
  return request(BASE_PATH + GET_CATEGORY,{
    method: 'GET',
    data: params
  })
}
