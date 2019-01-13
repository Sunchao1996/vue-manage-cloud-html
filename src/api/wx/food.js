import request from '@/utils/request';

//获取食物列表
export function listFood(data){
  return request({
    method:'get',
    url:'/wxfood/food',
    params:data
  })
}
//添加食物
export function addFood(data){
  return request({
    method:'post',
    url:'/wxfood/food',
    data
  });
}
//根据id获取数据
export function getFood(id){
  return request({
    method:'get',
    url:'/wxfood/food/'+id
  })
}
//修改食物
export function updateFood(data){
  return request({
    method:'put',
    url:'/wxfood/food/',
    data
  });
}
//删除食物
export function delFood(id){
  return request({
    method:'delete',
    url:'/wxfood/food/'+id
  })
}

