import request from '@/utils/request';

export function rolesList(data) {
  return request({
    url: '/sys/roles/list/1',
    method: 'get',
    params: data
  });
}
export function groupRolesList(data) {
  return request({
    url: '/sys/roles/list/2',
    method: 'get',
    params: data
  });
}
export function addRole(data) {
  return request({
    url: '/sys/roles',
    method: 'post',
    data
  });
}

export function checkRoleCode(roleCode) {
  return request({
    url: '/sys/roles/code/'+roleCode,
    method: 'get'
  });
}

export function delRole(roleId) {
  return request({
    url: '/sys/roles/'+roleId,
    method: 'delete'
  });
}

export function getRole(roleId) {
  return request({
    url: '/sys/roles/'+roleId,
    method: 'get'
  });
}

export function updateRole(data) {
  return request({
    url: '/sys/roles',
    method: 'put',
    data
  });
}
