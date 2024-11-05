<template>
    <v-navigation-drawer app v-model="isDrawerOpen" class="bg-party-1" :width="290">
        <template v-slot:prepend>
            <div class="bg-party-2" style="height: 120px;">
                <IconParty style="height: 70px;display: inline-block;margin: 20px 0px 20px 14px;"></IconParty>
                <div
                    style="display: inline-block;margin: 16px 26px;vertical-align: top;line-height: 40px;color: white;font-weight: 550;">
                    <label style="font-size: 36px;display: block;">ZJU-CST</label>
                    <label style="font-size: 24px;display: block;">智慧党建系统</label>
                </div>
            </div>
        </template>

        <template v-slot:append>
            <v-menu content-class="nav-menu" top left offset-y transition="slide-y-reverse-transition" eager>
                <template v-slot:activator="{ props }">
                    <v-list-item height="53" theme="navBarTheme" prepend-icon="mdi-account" title="个人中心"
                        v-bind="props"></v-list-item>
                </template>

                <v-list>
                    <v-list-item prepend-icon="mdi-message-bookmark-outline" title="消息通知"
                        to="/teacher/message"></v-list-item>
                    <v-list-item prepend-icon="mdi-cog-outline" title="个人设置" to="/teacher/setting"></v-list-item>
                    <v-list-item prepend-icon="mdi-lock-open-outline" title="权限管理" to="/teacher/permission"></v-list-item>
                    <v-list-item prepend-icon="mdi-exit-to-app" title="注销" @click="logoutBtnClick()"
                        to="/login"></v-list-item>
                </v-list>
            </v-menu>
        </template>

        <v-list theme="navBarTheme">
            <v-list-item prepend-icon="mdi-home" title="首页" to="/teacher/home"></v-list-item>
            <v-list-group value="1">
                <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" prepend-icon="mdi-book-open-variant" title="自主学习"></v-list-item>
                </template>
                <v-list-item title="理论学习录入" to="/teacher/zzxx/llxx"></v-list-item>
                <v-list-item title="实践成长录入" to="/teacher/zzxx/sjcz"></v-list-item>
                <v-list-item title="结对帮扶录入" to="/teacher/zzxx/jdbf"></v-list-item>
                <v-list-item title="志愿服务录入" to="/teacher/zzxx/zyfw"></v-list-item>
            </v-list-group>
            <v-list-group value="2">
                <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" prepend-icon="mdi-account-check" title="发展管理"></v-list-item>
                </template>
                <v-list-item title="入党申请人阶段" to="/teacher/fzgl/rdsq"></v-list-item>
                <v-list-item title="积极分子阶段" to="/teacher/fzgl/jjfz"></v-list-item>
                <v-list-item title="发展对象阶段" to="/teacher/fzgl/fzdx"></v-list-item>
                <v-list-item title="预备党员阶段" to="/teacher/fzgl/ybdy"></v-list-item>
                <v-list-item title="正式党员阶段" to="/teacher/fzgl/zsdy"></v-list-item>
            </v-list-group>
            <!-- <v-list-item title="活动信息管理" to="/teacher/fzgl/hdxx"></v-list-item> -->
            <v-list-item prepend-icon="mdi-account-multiple-outline" title="支部结对" to="/teacher/multiple"></v-list-item>
            <v-list-item prepend-icon="mdi-calendar-range" title="活动安排" to="/teacher/calendar"></v-list-item>
            <v-list-item prepend-icon="mdi-notebook-edit" title="三会一课" to="/teacher/notebook"></v-list-item>
            <v-list-item prepend-icon="mdi-image-album" title="风采记录" to="/teacher/album"></v-list-item>
            <v-list-item prepend-icon="mdi-image-album" title="测试界面" to="/teacher/test"></v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-main class="overflow-hidden">
        <RouterView class="d-none d-sm-block" @drawerToggle="isDrawerOpen = !isDrawerOpen" style="overflow-y: hidden;">
        </RouterView>
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
import { RouterView } from 'vue-router'
import { authentication } from '@/stores/authentication'
import IconParty from '@/components/icons/IconParty.vue';
import IconZJU from '@/components/icons/IconZJU.vue';

const auth = authentication();

export default {
    components: {
        IconParty,
        IconZJU
    },
    data: () => ({
        isDrawerOpen: null,
        items: [
            { title: 'Click Me' },
            { title: 'Click Me' },
            { title: 'Click Me' },
            { title: 'Click Me 2' },
        ],
    }),
    methods: {
        logoutBtnClick() {
            auth.logout();
        }
    }
}

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