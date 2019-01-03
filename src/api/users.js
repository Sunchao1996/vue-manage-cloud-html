import request from '@/utils/request';

export function usersList(data) {
  console.log(data);
  return request({
    url: '/sys/users',
    method: 'get',
    params:data
  });
}

export function usersStatusUpdate(data) {
  return request({
    url: '/sys/users/status/'+data.usid,
    method: 'put'
  });
}

export function usersResetPwd(data) {
  return request({
    url: '/sys/users/password/'+data.usid,
    method: 'put'
  });
}

export function checkUserName(data) {
  return request({
    url: '/sys/users/code/'+data,
    method: 'get'
  });
}

export function saveUser(data) {
  return request({
    url: '/sys/users',
    method: 'post',
    data
  });
}

export function deleteUser(id) {
  return request({
    url: '/sys/users/'+id,
    method: 'delete'
  });
}

export function getUserById(id) {
  return request({
    url: '/sys/users/'+id,
    method: 'get'
  });
}

export function updateUser(data) {
  return request({
    url: '/sys/users',
    method: 'put',
    data: data
  });
}

export function updateUserPwd(data) {
  return request({
    url: '/sys/users/password',
    method: 'put',
    data: data
  });
}
