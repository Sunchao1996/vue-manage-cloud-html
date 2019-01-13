import request from '@/utils/request';

//获取食物标签列表
export function foodTabList(data) {
  return request({
    method: 'get',
    url: '/wxfood/foodtab',
    params: data
  })
}
//无条件获取所有标签列表
export function foodTabAll(){
  return request({
    method:'get',
    url:'/wxfood/foodtab/all'
  });
}

//添加食物标签
export function addFoodTab(data) {
  return request({
    method: 'post',
    url: '/wxfood/foodtab',
    data
  });
}

//修改食物标签
export function updateFoodTab(data){
  return request({
    method:'put',
    url:'/wxfood/foodtab',
    data
  });
}
//根据id获取数据
export function  getFoodTab(id){
  return request({
    method:'get',
    url:'/wxfood/foodtab/'+id
  });
}
//删除食物标签
export function delFoodTab(id) {
  return request({
    method: 'delete',
    url: '/wxfood/foodtab/' + id
  })
}

