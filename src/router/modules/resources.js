import Layout from '@/views/layout/Layout'

const resourcesMap = {
  path: '/sys',
  component: Layout,
  meta: {title: 'sysManage', icon: 'peoples', noCache: true},
  children: [
    {
      path: 'users/index',
      name: 'Users',
      component: () => import('@/views/users/index'),
      //permissionName为该资源的代码，如果不需要进行权限控制则为空或者不设置meta
      meta: {title: 'users', icon: 'user', noCache: true, role: ['users']}
    },
    {
      path: 'roles/index',
      name: 'Roles',
      component: () => import('@/views/roles/index'),
      //permissionName为该资源的代码，如果不需要进行权限控制则为空或者不设置meta
      meta: {title: 'roles', icon: 'role', noCache: true, role: ['roles']}
    },
    {
      hidden: true,
      path: 'roles/add',
      component: () => import('@/views/roles/components/add'),
      name: 'RolesAdd',
      meta: {role: ['rolesadd'], title: 'rolesAdd'}
    },
    {
      hidden: true,
      path: 'users/add',
      component: () => import('@/views/users/components/add'),
      name: 'UsersAdd',
      meta: {role: ['usersadd'], title: 'usersAdd'}
    },
    {
      hidden: true,
      path: 'roles/update',
      component: () => import('@/views/roles/components/update'),
      name: 'RolesUpdate',
      meta: {role: ['rolesupdate'], title: 'rolesUpdate'}
    },
    {
      hidden: true,
      path: 'users/update',
      component: () => import('@/views/users/components/update'),
      name: 'UsersUpdate',
      meta: {role: ['usersupdate'], title: 'usersUpdate'}
    },
    {
      hidden: true,
      path: 'users/updatePwd',
      component: () => import('@/views/users/components/updatePwd'),
      name: 'UsersUpdatePwd',
      meta: {title: 'usersUpdatePwd'}
    },
    {
      path: 'grouprole/index',
      component: () => import('@/views/grouprole/index'),
      name: 'GroupRole',
      meta: {title: 'groupRole', icon: 'peoples', role: ['grouprole']}
    },
    {
      hidden: true,
      path: 'grouprole/add',
      component: () => import('@/views/grouprole/components/add'),
      name: 'GroupRoleAdd',
      meta: {title: 'groupRoleAdd', role: ['grouproleadd']}
    },
    {
      hidden: true,
      path: 'grouprole/update',
      component: () => import('@/views/grouprole/components/update'),
      name: 'GroupRoleUpdate',
      meta: {title: 'groupRoleUpdate', role: ['grouproleupdate']}
    }
  ]
};
export default resourcesMap;
