<template>
    <v-container fluid class="ma-0" style="background-color: #ffffff;">
      <v-col class="d-flex fill-height flex-column justify-start">
        <!-- 公共部分：标题和导航标签 -->
        <v-row class="d-flex align-center">
          <v-col cols="12">
            <SubpageTitle text="荣誉风采" :width="43" :height="43"></SubpageTitle>
          </v-col>
        </v-row>
        <v-row class="mb-2" style="margin-top: 0">
          <v-col>
            <span
              class="tab-label"
              :class="{ 'tab-active': $route.name === 'HDGL' }"
              @click="goTo('/teacher/zbgl/ryfc/hdgl')"
            >
              活动管理
            </span>
            <span class="tab-divider">/</span>
            <span
              class="tab-label"
              :class="{ 'tab-active': $route.name === 'RYJX' }"
              @click="goTo('/teacher/zbgl/ryfc/ryjx')"
            >
              荣誉奖项
            </span>
          </v-col>
        </v-row>
        <router-view :key="$route.fullPath"></router-view>
    </v-col>
    </v-container>
  </template>
  
  <script>
  import SubpageTitle from '@/components/SubpageTitle.vue';
  
  export default {
    components: {
        SubpageTitle,
    },
    methods: {
        goTo(route) {
            if (this.$route.path !== route) {
                this.$router.push(route).catch(err => {
                    console.error('路由跳转失败:', err);
                });
            }
        },
    },
  };
  </script>
  
  <style scoped>
  .tab-label {
    cursor: pointer;
    padding: 5px 10px;
    font-size: 16px;
    color: #606266;
  }
  .tab-label:hover {
    color: #F35339;
  }
  .tab-active {
    color: #F35339;
    font-weight: bold;
    border-bottom: 2px solid #F35339;
  }
  .tab-divider {
    margin: 0 5px;
    color: #606266;
  }
  </style>