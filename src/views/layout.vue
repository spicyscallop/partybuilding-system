<template>
  <v-navigation-drawer app v-model="isDrawerOpen" class="bg-party-1" :width="290">
    <template v-slot:prepend>
      <div class="bg-party-2" style="height: 120px;">
        <IconParty style="height: 70px; display: inline-block; margin: 20px 0px 20px 14px;"></IconParty>
        <div style="display: inline-block; margin: 16px 26px; vertical-align: top; line-height: 40px; color: white; font-weight: 550;">
          <label style="font-size: 36px; display: block;">ZJU-CST</label>
          <label style="font-size: 24px; display: block;">智慧党建系统</label>
        </div>
      </div>
    </template>

    <template v-slot:append>
      <v-menu content-class="nav-menu" top left offset-y transition="slide-y-reverse-transition" eager>
        <template v-slot:activator="{ props }">
          <v-list-item height="53" theme="navBarTheme" prepend-icon="mdi-account" title="个人中心" v-bind="props"></v-list-item>
        </template>
        <v-list>
          <v-list-item prepend-icon="mdi-message-bookmark-outline" title="消息通知" :to="menuLinks.message"></v-list-item>
          <v-list-item prepend-icon="mdi-cog-outline" title="个人设置" :to="menuLinks.setting"></v-list-item>
          <!-- 根据角色显示权限管理菜单 -->
          <v-list-item v-if="userRole === '学校党委' || userRole === '系统管理员'" prepend-icon="mdi-lock-open-outline" title="权限管理" :to="menuLinks.permission"></v-list-item>
          <v-list-item prepend-icon="mdi-exit-to-app" title="注销" @click="logoutBtnClick" to="/login"></v-list-item>
        </v-list>
      </v-menu>
    </template>

    <v-list theme="navBarTheme">
      <!-- 动态渲染菜单项 -->
      <template v-for="item in sidebarItems" :key="item.title">
        <v-list-group v-if="item.children" :value="true">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" :prepend-icon="item.icon" :title="item.title"></v-list-item>
          </template>
          <v-list-item v-for="child in item.children" :key="child.title" :title="child.title" :to="child.link"></v-list-item>
        </v-list-group>
        <v-list-item v-else :prepend-icon="item.icon" :title="item.title" :to="item.link"></v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>

  <v-main class="overflow-hidden">
    <RouterView class="d-none d-sm-block" @drawerToggle="isDrawerOpen = !isDrawerOpen" style="overflow-y: hidden;"></RouterView>
    <v-container class="d-flex d-sm-none flex-column fill-height" style="height:65%;">
      <v-row class="align-center">
        <div class="mx-5">
          <h1 class="text-h4">请使用桌面设备访问</h1>
          <h1 class="text-h5 text-grey">或将移动设备横置使用</h1>
        </div>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { getCurrentUser, logout } from '@/utils/auth';
import IconParty from '@/components/icons/IconParty.vue';

export default {
  components: {
    IconParty
  },
  data() {
    return {
      isDrawerOpen: null,
      userRole: '',
      menuLinks: {},
      sidebarItems: []
    };
  },
  created() {
    const user = getCurrentUser();
    if (!user) {
      this.$router.push('/login');
    } else {
      this.userRole = user.role;
      this.setupMenu();
    }
  },
  methods: {
    logoutBtnClick() {
      logout();
      this.$router.push('/login');
    },
    setupMenu() {
      // 根据用户角色设置菜单链接和侧边栏项
      if (this.userRole === '学生') {
        this.menuLinks = {
          message: '/student/message',
          setting: '/student/setting',
        };
        this.sidebarItems = [
          { title: '首页', icon: 'mdi-home', link: '/student/home' },
          { title: '发展阶段', icon: 'mdi-account-check', link: '/student/fzjd' },
          { title: '支部活动', icon: 'mdi-calendar', link: '/student/zbhd' },
        ];
      } else if (this.userRole === '支部书记') {
          this.menuLinks = {
            message: '/partyManager/message',
            setting: '/partyManager/setting',
            permission: '/partyManager/permission',
          };
          this.sidebarItems = [
            { title: '支委概况', icon: 'mdi-home', link: '/partyManager/home' },
            {
              title: '发展管理',
              icon: 'mdi-account-check',
              action: () => this.$router.push('/partyManager/fzgl/fzgl'),
              children: [
                { title: '入党申请人阶段', link: '/partyManager/fzgl/rdsq' },
                { title: '积极分子阶段', link: '/partyManager/fzgl/jjfz' },
                { title: '发展对象阶段', link: '/partyManager/fzgl/fzdx' },
                { title: '预备党员阶段', link: '/partyManager/fzgl/ybdy' },
                { title: '正式党员阶段', link: '/partyManager/fzgl/zsdy' },
              ],
            },
            { title: '组织生活', icon: 'mdi-notebook-edit', link: '/partyManager/zzsh' },
            { title: '活动安排', icon: 'mdi-calendar-range', link: '/partyManager/arrange' },
            { title: '风采记录', icon: 'mdi-folder-multiple-image', link: '/partyManager/album' },
            { title: '荣誉奖项', icon: 'mdi-medal', link: '/partyManager/award' },
            { title: '档案管理', icon: 'mdi-file-cog', link: '/partyManager/file' },
          ];
      } else if (this.userRole === '学校党委' || this.userRole === '系统管理员') {
          this.menuLinks = {
            message: '/teacher/message',
            setting: '/teacher/setting',
          };
          this.sidebarItems = [
            { title: '党委概况', icon: 'mdi-home', link: '/teacher/home' },
            {
              title: '发展管理',
              icon: 'mdi-account-check',
              action: () => this.$router.push('/teacher/fzgl/fzgl'),
              children: [
                { title: '入党申请人阶段', link: '/teacher/fzgl/rdsq' },
                { title: '积极分子阶段', link: '/teacher/fzgl/jjfz' },
                { title: '发展对象阶段', link: '/teacher/fzgl/fzdx' },
                { title: '预备党员阶段', link: '/teacher/fzgl/ybdy' },
                { title: '正式党员阶段', link: '/teacher/fzgl/zsdy' },
              ],
            },
            { title: '组织生活', icon: 'mdi-calendar-range', link: '/teacher/calendar' },
            { title: '活动安排', icon: 'mdi-calendar-range', link: '/teacher/calendar' },
            { title: '更多内容', icon: 'mdi-notebook-edit', link: '/teacher/notebook' },
            { title: '党委中心', icon: 'mdi-home', link: '/teacher/dwzx' },
          ];
      } else {
        // 未知角色，跳转到登录页面
        this.$router.push('/login');
      }
    },
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.cn/css?family=Noto+Sans+SC&display=swap');

::-webkit-scrollbar{
  width: 0 !important;
}

.nav-menu {
  left: 0 !important;
  padding: 5px;
  padding-right: 8px;
}

.v-navigation-drawer {
  border-right: 0;

  .v-list-item[aria-expanded="true"] {
    .v-list-item-title {
      color: rgba(var(--v-theme-party-1));
    }

    .v-list-item__prepend {
      color: #949494;
    }

    .v-list-item__overlay {
      z-index: -1;
    }
  }

  .v-list-item.v-list-item--active:not(.v-list-group__header) {
    .v-list-item-title {
      color: rgba(var(--v-theme-party-1));
    }

    .v-list-item__prepend {
      color: #949494;
    }

    .v-list-item__overlay {
      z-index: -1;
    }
  }

  .v-list-item__prepend>.v-icon {
    opacity: 1;
  }

  .v-list-item-title {
    font-size: 18px;
    line-height: 20px;
  }

  .v-list-item--nav {
    padding-inline-start: 14px;
    padding-inline-end: 14px;
  }

  .v-list .v-list-item:not(:only-child) {
    margin-bottom: 10px;
  }

  .v-list-item--density-default.v-list-item--one-line {
    padding-top: 14px;
    padding-bottom: 14px;
  }

  .v-list-item__prepend>.v-icon {
    margin-inline-end: 20px;
  }
}
</style>
