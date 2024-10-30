import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/common/LoginView/LoginView.vue')
    },
    {
      name: 'LOGIN_PLACEHOLDER',
    },
    {
      path: '/teacher',
      name: 'TeacherMain',
      component: () => import('@/views/TeacherMain.vue'),
      children: [
        {
          path: '/teacher/home',
          name: 'TeacherHome',
          component: () => import('@/views/teacher/HomeView.vue')
        },
        {
          path: '/teacher/zzxx/sjcz',
          name: 'T_SJCZ',
          component: () => import('@/views/teacher/SJCZView.vue')
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
          component: () => import('@/views/teacher/FZGLViews/HDXXView.vue')
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
        //测试
        {
          path: '/teacher/test',
          name: 'TeacherTest',
          component: () => import('@/views/test.vue')
        }
      ]
    },
    {
      path: '/student',
      name: 'StudentMain',
      component: () => import('@/views/StudentMain.vue'),
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
      component: () => import('@/views/PartyManagerMain.vue'),
      children: [
        {
          path: '/partyManager/home',
          name: 'PartyManagerHome',
          component: () => import('@/views/partyBranchManager/HomeView.vue')
        },
        // 发展阶段
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
        }
      ]
    },
  ]
})

import { authentication } from '@/stores/authentication'

router.beforeEach((to, from) => {
  const auth = authentication();
  // console.log("-------------------------------")
  // console.log("类型为：",auth.type,"前往界面为",to)
  // console.log("前往界面为",to.name)
  // type 是否合法
  if (auth.isAuthenticated && (auth.type !== 'student' && auth.type !== 'teacher' && auth.type !== 'associateTeacher')) {
    auth.logout()
  }

  // 跳转鉴权
  if (!auth.isAuthenticated && to.name !== 'Login')
    return { name: 'Login' };
  if (to.matched.length > 0) {
    if (to.matched[0].name == 'StudentHome' && auth.type == 'student') {
      return { name: 'StudentMain', replace: true };
    }
    else if (to.matched[0].name == 'TeacherHome' && auth.type == 'teacher') {
      return { name: 'TeacherMain', replace: true };
    }
    else if (to.matched[0].name == 'PartyManagerHome' && auth.type == 'associateTeacher') {
      return { name: 'PartyManagerMain', replace: true };
    }
  }

  if (
    (to.name === 'LOGIN_PLACEHOLDER') || // 登陆跳转
    (to.name === 'Login' && auth.isAuthenticated) ||
    (to.matched.length == 0) || // 空路由返回主页
    (to.name === 'TeacherMain' || to.name === 'StudentMain' || to.name === 'PartyManagerMain'))// Main 返回主页
  { 
    if (auth.type == 'student')
      return { name: 'StudentHome', replace: true };
    else if (auth.type == 'teacher') {
      console.log("+++++",to.name)
      return { name: 'TeacherHome', replace: true };
    }
    else if (auth.type == 'associateTeacher') {
      console.log("=====",to.name)
      return { name: 'PartyManagerHome', replace: true };
    }
  }

})

export default router
