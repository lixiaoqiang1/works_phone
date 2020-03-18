import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  //注册页
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '概括', icon: 'dashboard' }
    }]
  },
  {
    path: '/friends',
    component: Layout,
    redirect: '/friends/yuangong',
    name: 'Nested',
    meta: {
      title: '微信管理',
      icon: 'wecheat'
    },
    children: [
      {
        path: 'yuangong',
        component: () => import('@/views/friends/yuangong/index'),
        meta: { title: '员工微信列表', icon: 'example' }
      },
      {                                                                                                                             
        path: 'wechatlist2',
        name: 'wechatlist2',
        component: () => import('@/views/friends/yuangong/wechatlist2/index'),
        // meta: { title: '微信聊天', icon: 'example' }
      },
      {
        path: 'friends_list',
        component: () => import('@/views/friends/friends_list/index'),
        meta: { title: '好友列表', icon: 'example' }
      },
      // {
      //   path: 'repeatlist',
      //   component: () => import('@/views/friends/repeatlist/index'),
      //   meta: { title: '重复好友列表', icon: 'example' }
      // },
      // {
      //   path: 'wechatgroup',
      //   component: () => import('@/views/friends/wechatgroup/index'),
      //   meta: { title: '微信群列表', icon: 'example' }
      // },
      // {
      //   path: 'hyperlinks',
      //   component: () => import('@/views/friends/hyperlinks/index'),
      //   meta: { title: '群超链接', icon: 'example' }
      // },
      // {
      //   path: 'hyperlinks2',
      //   component: () => import('@/views/friends/hyperlinks2/index'),
      //   meta: { title: '群超链接', icon: 'example' }
      // },

    ]
  },
  {
    path: '/call',
    component: Layout,
    redirect: '/call/callrecords',
    name: 'Call',
    meta: {
      title: '通话与短信',
      icon: 'tonghua_sms'
    },
    children:[
      {
        path: 'callrecords',
        component: () => import('@/views/call/callrecords/index'),
        meta: { title: '通话记录', icon: 'example' },
      },
      { //需要跳转的页面，
        path: 'records_detail_index',
        component: () => import('@/views/call/callrecords/records_detail/index'),
        name: 'records_detail',
        meta: { title: '查看某人详细通话记录', icon: 'example', noCache: true, activeMenu: '@/views/call/callrecords/records_detail/index'},
        hidden: true   //是否显示在菜单
      },
      {
        path: 'callvoice',
        component: () => import('@/views/call/callvoice/index'),
        meta: { title: '通话录音', icon: 'example' }
      },
      // {
      //   path: 'mobile_sms',
      //   component: () => import('@/views/call/mobile_sms/index'),
      //   meta: { title: '手机短信', icon: 'example' }
      // },
    ]
  },
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/sensitive',
  //   name: 'Example',
  //   meta: { title: '敏感行为管理', icon: 'table' },
  //   children: [
  //     {
  //       path: 'behavior',
  //       name: 'Table',
  //       component: () => import('@/views/sensitive/behavior/index'),
  //       meta: { title: '敏感性为', icon: 'example' }
  //     },
  //     {
  //       path: 'behavior_shezhi',
  //       name: 'Table',
  //       component: () => import('@/views/sensitive/behavior_shezhi/index'),
  //       meta: { title: '敏感性为设置', icon: 'example' }
  //     },
  //   ]
  // },


  {
    path: '/shezhi',
    component: Layout,
    redirect: '/shezhi/menu1',
    name: 'Nested',
    meta: {
      title: '设置',
      icon: 'wecheat'
    },
    children: [
      {
        path: 'management',
        component: () => import('@/views/shezhi/management/index'),
        meta: { title: '设备管理', icon: 'example' }
      },
      {
        path: 'weifenpei',
        component: () => import('@/views/shezhi/staff/weifenpei/index'),
        meta: { title: '员工管理', icon: 'example' }
      },
      {
        path: 'bindinglog',
        component: () => import('@/views/shezhi/bindinglog/index'),
        // meta: { title: '设备绑定日志', icon: 'example' }
      },
      
      {
        path: 'jurisdiction',
        component: () => import('@/views/shezhi/permissions/jurisdiction/index'),
        meta: { title: '权限设置', icon: 'example' }
      },
      {
        path: 'personal',
        component: () => import('@/views/shezhi/personal/index'),
        meta: { title: '个人设置', icon: 'example' }
      },
      {
        path: 'configuration',
        component: () => import('@/views/shezhi/permissions/configuration/index'),
        // meta: { title: '权限配置', icon: 'example' }
      },
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
  mode: 'hash',  //去掉url中的#
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
