import Layout from '@/views/layout/Layout'

const wxMap = {
  path: '/wx',
  component: Layout,
  meta: {title: 'wxManage', icon: 'list', noCache: true},
  children: [
    {
      path: 'foodtab/index',
      name: 'FoodTab',
      component: () => import('@/views/wx/foodtab'),
      //permissionName为该资源的代码，如果不需要进行权限控制则为空或者不设置meta
      meta: {title: 'foodTabManage', icon: 'tab', noCache: true, role: []}
    },
    {
      hidden:true,
      path: 'foodtab/add',
      name: 'FoodTabAdd',
      component: () => import('@/views/wx/foodtab/components/add'),
      //permissionName为该资源的代码，如果不需要进行权限控制则为空或者不设置meta
      meta: {title: 'foodTabAdd', noCache: true, role: []}
    },
    {
      hidden:true,
      path: 'foodtab/update',
      name: 'FoodTabUpdate',
      component: () => import('@/views/wx/foodtab/components/update'),
      //permissionName为该资源的代码，如果不需要进行权限控制则为空或者不设置meta
      meta: {title: 'foodTabUpdate', noCache: true, role: []}
    },
    {
      path: 'foods/index',
      name: 'Foods',
      component: () => import('@/views/wx/food/index'),
      //permissionName为该资源的代码，如果不需要进行权限控制则为空或者不设置meta
      meta: {title: 'foodsManage', icon: 'food', noCache: true, role: []}
    }
    ,{
    hidden:true,
      path: 'foods/add',
      name: 'FoodsAdd',
      component: () => import('@/views/wx/food/components/add'),
      //permissionName为该资源的代码，如果不需要进行权限控制则为空或者不设置meta
      meta: {title: 'foodsAdd', noCache: true, role: []}
    }
  ]
};
export default wxMap;
