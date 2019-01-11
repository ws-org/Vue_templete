import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/

// 所有权限通用路由表
// 如首页和登录页和一些不用权限的公用页面

export const constantRouterMap = [
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () =>
        import('@/views/dashboard/index')
    }, {
      path: 'userinfo',
      name: 'UserInfo',
      component: () =>
        import('@/views/dashboard/userinfo')
    }]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRouterMap = [
  {
    path: '/auth',
    component: Layout,
    name: 'auth',
    meta: {
      resources: 'auth',
      title: '权限管理'
    },
    children: [
      {
        path: 'per',
        component: () => import('@/views/pre/perm/index'),
        name: 'per',
        meta: {
          resources: 'per'
        }
      },
      {
        path: 'user',
        component: () => import('@/views/pre/user/index'),
        name: 'user',
        meta: {
          resources: 'user'
        }
      },
      {
        path: 'role',
        component: () => import('@/views/pre/role/index'),
        name: 'role',
        meta: {
          resources: 'role'
        }
      }
    ]
  }
]
