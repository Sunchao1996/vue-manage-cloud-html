import Layout from '@/views/layout/Layout'

const wxMap = {
  path: '/wx',
  component: Layout,
  meta: {title: 'wxManage', icon: 'list', noCache: true},
  children: [
    {
      path: 'foodtab/index',
      name: 'FoodTab',
      component: () => import('@/views/users/index'),
      //permissionName为该资源的代码，如果不需要进行权限控制则为空或者不设置meta
      meta: {title: 'foodTabManage', icon: 'tab', noCache: true, role: []}
    },
    {
      path: 'foods/index',
      name: 'Foods',
      component: () => import('@/views/users/index'),
      //permissionName为该资源的代码，如果不需要进行权限控制则为空或者不设置meta
      meta: {title: 'foodsManage', icon: 'food', noCache: true, role: []}
    }
  ]
};
export default wxMap;
