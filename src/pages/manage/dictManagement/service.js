import request from '@/utils/request';


const BASE_PATH = '/api_v1';

const GET_CATEGORY = '/manage/dict/list.do'


export async function getCategory(params){
  let {id,current}=params;
  return request(BASE_PATH + GET_CATEGORY,{
    method: 'POST',
    params: {
      ...params,
      categoryId: id?id:0,
      pageNum: current?current:1,
    },
  })
}
