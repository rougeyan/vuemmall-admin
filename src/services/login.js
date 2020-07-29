import request from '@/utils/request';

const BASE_PATH = '/api_v1';

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function accountLogin(params){
  return request(BASE_PATH + '/manage/user/login.do',{
    method: 'POST',
    data: params
  })
}
