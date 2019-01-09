import request from '@/utils/request';

export function groupRoleList(data) {
  return request({
    url: '/sys/roles',
    method: 'get',
    params: data
  });
}
