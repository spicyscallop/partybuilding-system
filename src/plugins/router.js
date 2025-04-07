import { createRouter, createWebHashHistory } from 'vue-router'
import { getCurrentUser } from '@/utils/auth';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/common/LoginView/LoginView.vue')
    },
    {
      path: '/teacher',
      name: 'TeacherMain',
      component: () => import('@/views/layout.vue'),
      children: [
        {
          path: '/teacher/home',
          name: 'TeacherHome',
          component: () => import('@/views/teacher/HomeView.vue')
        },
        // 编辑党委概况 
        {
          path: '/teacher/edit-overview',
          name: 'EditOverview',
          component: () => import('@/views/teacher/EditOverview.vue')
        },
        //自主学习
        {
          path: '/teacher/zzxx/llxx',
          name: 'T_LLXX',
          component: () => import('@/views/teacher/LLXXView.vue')
        },
        {
          path: '/teacher/zzxx/sjcz',
          name: 'T_SJCZ',
          component: () => import('@/views/teacher/SJCZView.vue')
        },
        {
          path: '/teacher/zzxx/jdbf',
          name: 'T_JDBF',
          component: () => import('@/views/teacher/JDBFView.vue')
        },
        {
          path: '/teacher/zzxx/zyfw',
          name: 'T_ZYFW',
          component: () => import('@/views/teacher/ZYFWView.vue')
        },
        {
          path: '/teacher/zzxx/sjcz/edit/:id?',
          name: 'EditSJCZT',
          component: () => import('@/views/teacher/AddAndEditActivityView.vue')
        },
        
        // 发展阶段
        {
          path: '/teacher/fzgl/rdsq',
          name: 'T_RDSQ',
          component: () => import('@/views/teacher/FZGLViews/RDSQ/RDSQView.vue'),
        },
        {
          path: '/teacher/fzgl/jjfz',
          name: 'T_JJFZ',
          component: () => import('@/views/teacher/FZGLViews/JJFZ/JJFZView.vue')
        },
        {
          path: '/teacher/fzgl/fzdx',
          name: 'T_FZDX',
          component: () => import('@/views/teacher/FZGLViews/FZDX/FZDXView.vue')
        },
        {
          path: '/teacher/fzgl/ybdy',
          name: 'T_YBDY',
          component: () => import('@/views/teacher/FZGLViews/YBDY/YBDYView.vue')
        },
        {
          path: '/teacher/fzgl/zsdy',
          name: 'T_ZSDY',
          component: () => import('@/views/teacher/FZGLViews/ZSDY/ZSDYView.vue')
        },
        {
          path: '/teacher/fzgl/hdxx',
          name: 'T_HDXX',
          component: () => import('@/views/teacher/FZGLViews/HDXX/HDXXView.vue')
        },
        {
          path: '/teacher/setting',
          name: 'T_Setting',
          component: () => import('@/views/teacher/SettingView.vue')
        },
        {
          path: '/teacher/message',
          name: 'T_Message',
          component: () => import('@/views/common/MessageView.vue')
        },
        //风采记录
        {
          path: '/teacher/album',
          name: 'T_FCJL',
          component: () => import('@/views/teacher/FCJL/FCJLView.vue')
        },
        // 党委中心
        {
          path: '/teacher/dwzx',
          name: 'DWZX',
          component: () => import('@/views/teacher/DWZXViews/DWZXView.vue')
        },
        {
          path: '/teacher/dwzx/branchlist',
          name: 'BranchList',
          component: () => import('@/views/teacher/DWZXViews/BranchListView.vue')
        },
        // 党委中心
        {
          path: '/teacher/dwfc',
          name: 'DWFC',
          component: () => import('@/views/teacher/DWFCViews/DWFCView.vue')
        },
        {
          path: '/teacher/rdsq/edit-person/:id?',
          name: 'EditPersonViewRDSQT',
          component: () => import('@/views/teacher/FZGLViews/RDSQ/subPage/AddAndEditPersonView.vue')
        },
        {
          path: '/teacher/jjfz/edit-person/:id?',
          name: 'EditPersonViewJJFZT',
          component: () => import('@/views/teacher/FZGLViews/JJFZ/subPage/AddAndEditPersonView.vue')
        },
        {
          path: '/teacher/fzdx/edit-person/:id?',
          name: 'EditPersonViewFZDXT',
          component: () => import('@/views/teacher/FZGLViews/FZDX/subPage/AddAndEditPersonView.vue')
        },
        {
          path: '/teacher/ybdy/edit-person/:id?',
          name: 'EditPersonViewYBDYT',
          component: () => import('@/views/teacher/FZGLViews/YBDY/subPage/AddAndEditPersonView.vue')
        },
        {
          path: '/teacher/zsdy/edit-person/:id?',
          name: 'EditPersonViewZSDYT',
          component: () => import('@/views/teacher/FZGLViews/ZSDY/subPage/AddAndEditPersonView.vue')
        },
        {
          path: '/teacher/dwzx/personlist',
          name: 'PersonList',
          component: () => import('@/views/teacher/DWZXViews/PersonListView.vue')
        },
        // 权限管理
        {
          path: '/teacher/permission',
          name: 'Permission',
          component: () => import('@/views/teacher/Permission.vue')
        },
        // 组织生活
        {
          path: '/teacher/zzsh/shyk',
          name: 'SHYK',
          component: () => import('@/views/teacher/ZZSH/SHYKView.vue')
        },
        // 发布管理
        {
          path: '/teacher/xtgg',
          name: 'XTGG',
          component: () => import('@/views/teacher/FBGL/XTGGView.vue')
        },
        {
          path: '/teacher/xxyb',
          name: 'XXYB',
          component: () => import('@/views/teacher/FBGL/XXYBView.vue')
        },
        {
          path: '/teacher/reminder/index',
          name: 'reminder',
          component: () => import('@/views/teacher/Reminder/index.vue')
        },
        {
          path: '/teacher/partyMemberRules/index',
          name: 'partyMemberRules',
          component: () => import('@/views/teacher/PartyMemberRules/index.vue')
        },
        {
          path: '/teacher/userList/index',
          name: 'userList',
          component: () => import('@/views/userList/index.vue')
        },
      ]
    },
    {
      path: '/student',
      name: 'StudentMain',
      component: () => import('@/views/layout.vue'),
      children: [
        {
          path: '/student/home',
          name: 'StudentHome',
          component: () => import('@/views/student/HomeView/HomeView.vue')
        },
        {
          path: '/student/fzjd',
          name: '发展阶段',
          component: () => import('@/views/student/FZJDView/FZJDView.vue')
        },
        {
          path: '/student/zbhd',
          name: '支部活动',
          component: () => import('@/views/student/ZBHDView/ZBHDView.vue')
        },
        {
          path: '/student/setting',
          name: '个人设置',
          component: () => import('@/views/student/PersonSetting/SettingView.vue')
        },
        {
          path: '/student/message',
          name: '消息通知',
          component: () => import('@/views/student/MessageNotice/MessageNotice.vue')
        }
      ]
    },
    {
      path: '/partyManager',
      name: 'PartyManagerMain',
      component: () => import('@/views/layout.vue'),
      children: [
        {
          path: '/partyManager/home',
          name: 'PartyManagerHome',
          component: () => import('@/views/partyBranchManager/HomeView.vue')
        },
        // 发展阶段
        {
          path: '/partyManager/fzgl/fzgl',
          name: 'P_FZGL',
          component: () => import('@/views/partyBranchManager/FZGLViews/indexView.vue')
        },
        {
          path: '/partyManager/fzgl/rdsq',
          name: 'P_RDSQ',
          component: () => import('@/views/partyBranchManager/FZGLViews/RDSQ/RDSQView.vue')
        },
        {
          path: '/partyManager/fzgl/jjfz',
          name: 'P_JJFZ',
          component: () => import('@/views/partyBranchManager/FZGLViews/JJFZ/JJFZView.vue')
        },
        {
          path: '/partyManager/fzgl/fzdx',
          name: 'P_FZDX',
          component: () => import('@/views/partyBranchManager/FZGLViews/FZDX/FZDXView.vue')
        },
        {
          path: '/partyManager/fzgl/ybdy',
          name: 'P_YBDY',
          component: () => import('@/views/partyBranchManager/FZGLViews/YBDY/YBDYView.vue')
        },
        {
          path: '/partyManager/fzgl/zsdy',
          name: 'P_ZSDY',
          component: () => import('@/views/partyBranchManager/FZGLViews/ZSDY/ZSDYView.vue')
        },
        {
          path: '/partyManager/fzgl/hdxx',
          name: 'P_HDXX',
          component: () => import('@/views/partyBranchManager/FZGLViews/HDXX/HDXXView.vue')
        },
        {
          path: '/partyManager/zzsh',
          name: 'P_ZZSH',
          component: () => import('@/views/partyBranchManager/ZZSH/ZZSHView.vue')
        },
        {
          path: '/partyManager/arrange',
          name: 'P_HDAP',
          component: () => import('@/views/partyBranchManager/HDAP/HDAPView.vue')
        },
        {
          path: '/partyManager/album',
          name: 'P_FCJL',
          component: () => import('@/views/partyBranchManager/FCJL/FCJLView.vue')
        },
        {
          path: '/partyManager/award',
          name: 'P_RYJX',
          component: () => import('@/views/partyBranchManager/RYJX/RYJXView.vue')
        },
        {
          path: '/partyManager/file',
          name: 'P_DAGL',
          component: () => import('@/views/partyBranchManager/DAGL/DAGLView.vue')
        },
        {
          path: '/teacher/setting',
          name: 'P_Setting',
          component: () => import('@/views/teacher/SettingView.vue')
        },
        {
          path: '/teacher/message',
          name: 'P_Message',
          component: () => import('@/views/common/MessageView.vue')
        },
        {
          path: '/partyManager/rdsq/edit-person/:id?',
          name: 'EditPersonViewRDSQP',
          component: () => import('@/views/partyBranchManager/FZGLViews/RDSQ/subPage/AddAndEditPersonView.vue')
        },
        {
          path: 'partyManager/jjfz/edit-person/:id?',
          name: 'EditPersonViewJJFZP',
          component: () => import('@/views/partyBranchManager/FZGLViews/JJFZ/subPage/AddAndEditPersonView.vue')
        },
        {
          path: 'partyManager/fzdx/edit-person/:id?',
          name: 'EditPersonViewFZDXP',
          component: () => import('@/views/partyBranchManager/FZGLViews/FZDX/subPage/AddAndEditPersonView.vue')
        },
        {
          path: 'partyManager/ybdy/edit-person/:id?',
          name: 'EditPersonViewYBDYP',
          component: () => import('@/views/partyBranchManager/FZGLViews/YBDY/subPage/AddAndEditPersonView.vue')
        },
        {
          path: 'partyManager/zsdy/edit-person/:id?',
          name: 'EditPersonViewZSDYP',
          component: () => import('@/views/partyBranchManager/FZGLViews/ZSDY/subPage/AddAndEditPersonView.vue')
        },

      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    // 根据用户身份动态跳转
    const user = getCurrentUser();
    if (!user) {
      next('/login');
    } else if (user.role === '学生') {
      next('/student/home');
    } else if (user.role === '支部书记') {
      next('/partyManager/home'); // 默认跳转登录页
    } else if(user.role === '学校党委' || user.role === '系统管理员'){
      next('/teacher/home');
    } else {
      next('/login');
    }
  } else {
    next();
  }
});


export default router
