<template>
  <v-container fluid class="ma-0 fill-height">
    <v-col style="height: 100%;">
      <v-row class="flex-shrink-0 flex-grow-0" style="flex-basis: 0; overflow: visible;">
        <v-col>
          <SubpageTitle text="党委概况" icon="mdi-home" @drawerToggle="$emit('drawerToggle')"></SubpageTitle>
        </v-col>
      </v-row>
      <!-- 党委简介 -->
      <v-row style="flex-basis: 0; overflow: visible;">
        <v-col class="fill-height d-flex" cols="12">
          <v-sheet rounded="lg" class="d-flex flex-column" style="width: 100%; height:180px; margin-bottom: 2px;">
            <div class="d-flex">
                <h1 class="ml-5 mt-4 mb-3 text-h5" style="color: red; font-weight:bold;">
                  <v-icon class="icon-item">mdi-text-box-check-outline</v-icon>
                  党委简介
                </h1>
            </div>
            <div class="d-flex">
              <p class="ml-5 mb-4 mr-4" style="line-height: 2;">计算机科学与技术学院和软件学院党委坚持以习近平新时代中国特色社会主义思想为指导，紧紧围绕立德树人根本任务，在“四个更加”的战略导向下，秉承着“人为本，和为贵，变则通”的学院文化理念，构建完善“开放、开环、联动、包容、共享”的学院治理体系，为建设世界一流的计算机科学与技术学院和软件学院提供坚强的政治保证和组织保证。</p>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
      <!-- 这里指明第二个row的高度为70% -->
      <v-row style="flex-basis: 0; overflow: visible; height: 65%;" class="d-flex align-start align-stretch justify-space-between">
        <!-- 系统公告 -->
        <v-col class="fill-height d-flex flex-column justify-stretch" cols="4" style="height: 100%;">
          <v-card
            class="mx-auto my-2"
            elevation="5"
            width="100%"
            height="100%"
          >
            <v-sheet rounded="lg" class="d-flex flex-column pb-5" style="overflow: hidden; width: 100%;">
              <v-sheet class="d-flex justify-space-between align-center mt-4 mb-3">
                <h1 class="ml-5 text-h5" style="color: red; font-weight:bold;">
                  <v-icon class="icon-item">mdi-bell-outline</v-icon>
                  系统公告
                </h1>
                <RouterLink to="/teacher/xtgg" class="mr-3">更多></RouterLink>
              </v-sheet>
              <v-list lines="one" class="py-0 pl-1">
                <v-sheet v-for="(item, index) in xtgg" :key="index">
                  <v-list-item  :title="item.title">
                    <template v-slot:append>
                      <v-label class="ml-5" :text="item.date"></v-label>
                    </template>
                  </v-list-item>
                  <v-divider thickness="2" style="border-style: dashed;"></v-divider>
                </v-sheet>
              </v-list>
            </v-sheet>
          </v-card>
        </v-col>

        <v-col class="fill-height d-flex flex-column justify-stretch" cols="4" style="height: 100%">
          <v-card
            class="mx-auto my-2"
            elevation="5"
            width="100%"
            height="100%"
          >
            <v-sheet rounded="lg" class="d-flex flex-column pb-5" style="overflow: auto; width: 100%;">
              <v-sheet class="d-flex justify-space-between align-center mt-4 mb-3">
                <h1 class="ml-5 text-h5" style="color: red; font-weight:bold;">
                  <v-icon class="icon-item">mdi-file-outline</v-icon>
                  学习样板
                </h1>
                <v-sheet class="mr-3">更多></v-sheet>
              </v-sheet>
              <v-list lines="one" class="py-0 pl-1">
                <v-sheet v-for="(item, index) in xxyb" :key="index">
                  <v-list-item  :title="item.title">
                      <template v-slot:append>
                          <v-label class="ml-5" :text="item.date"></v-label>
                      </template>
                  </v-list-item>
                  <v-divider thickness="2" style="border-style: dashed;"></v-divider>
                </v-sheet>
              </v-list>
            </v-sheet>
          </v-card>
        </v-col>
        
        <v-col cols="4" class="fill-height d-flex flex-column justify-start">
            <!-- 党委荣誉 -->
            <v-row cols="12" style="margin: 0; padding: 0;">
              <v-sheet class="d-flex flex-column">
                <v-card
                  class="mx-auto my-2"
                  elevation="5"
                  width="100%"
                  height="100%"
                  >
                  <div class="d-flex justify-space-between align-center mt-4 mb-3">
                    <h1 class="ml-5 text-h5" style="color: red; font-weight:bold;">
                      <v-icon class="icon-item">mdi-seal-variant</v-icon>
                      党委荣誉
                    </h1>
                    <div class="mr-3">更多></div>
                  </div>
                  <v-list lines="one" class="py-0 pl-1">
                    <v-sheet v-for="(item, index) in dwry" :key="index">
                      <v-list-item  :title="item.title">
                          <template v-slot:append>
                              <v-label class="ml-5" :text="item.date"></v-label>
                          </template>
                      </v-list-item>
                      <v-divider thickness="2" style="border-style: dashed;"></v-divider>
                    </v-sheet>
                  </v-list>
                </v-card>
              </v-sheet>
            </v-row>

            <!-- 党委中心 -->
            <v-row cols="12" class="" style="margin: 0; padding: 0;">
              <v-sheet class="d-flex flex-column justify-start" style="margin: 0">
                <v-card
                  class="mx-auto my-2"
                  elevation="5"
                  width="100%"
                  height="100%"
                  >
                  <div class="d-flex justify-space-between align-center mt-4 mb-3">
                    <h1 class="ml-5 text-h5" style="color: red; font-weight:bold;">
                      <v-icon class="icon-item">mdi-home-account</v-icon>
                      党委中心
                    </h1>
                    <RouterLink class="mr-3" to="/teacher/dwzx">更多></RouterLink>
                  </div>
                  <div style="margin-left: 0;">
                    <el-scrollbar class="flex-fill">
                      <div class="d-flex" style="height: 92%; width: 92%;">
                        <div v-for="(item, index) in dwzx" :key="index" class="scrollbar-demo-item">
                          <v-sheet rounded="lg">
                            <IconParty class="mt-n1" style="width: 23%; height: 23%;"></IconParty>
                            <div class="text-h3 font-weight-bold ">
                              {{ item.count }}
                              <v-label>人</v-label>
                            </div>
                            <span style="font-size: 14px;">{{ item.title }}</span>
                          </v-sheet>
                        </div>
                      </div>
                    </el-scrollbar>
                  </div>
                </v-card>
              </v-sheet>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { getPartyOverview } from "@/http/api"
import { getXtggInfo } from "@/http/api"
import SubpageTitle from '@/components/SubpageTitle.vue';
import IconParty from '@/components/icons/IconParty.vue';
import { RouterLink } from "vue-router";

defineEmits(['drawerToggle']);

let xtgg = ref([
{
    title: "系统公告",
    url: "",
    content: "",
    date: "2024-09"
  },
]);

let xxyb = [
  {
    title: "学习样板",
    date: "2024-09"
  },
  {
    title: "学习样板",
    date: "2024-09",
  },
  {
    title: "学习样板",
    date: "2024-09"
  },
];

let dwry = [
  {
    title: "浙江大学计算机科学与技术学院和软件学院党委入选第三批全省高校党建“双创”培育创建对象",
    date: "2024-09"
  },
  {
    title: "浙江大学xxxxxxx基地",
    date: "2024-09",
  },
  {
    title: "浙江大学计算机科学与技术学院和软件学院党委",
    date: "2024-09"
  },
];

let dwzx = ref([]);

onMounted(() => {
  // 获取党委中心人员数量
	getPartyOverview().then(res => {
		dwzx.value = res.data
    // console.log(res.data)
	})

  // 获取系统公告信息
  getXtggInfo().then(res => {
      xtgg.value = res.data.records.map(item => ({
          title: item.title,
          url: item.url,
          content: item.content,
          date: item.createTime.split(' ')[0],
      }));
  });
})

</script>


<style scoped>
.el-scrollbar__wrap {
  border-bottom: none !important;
}
.scrollbar-demo-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  height: 100%;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-danger-light-9);
  color: var(--el-color-danger);
}

.icon-item {
  color: grey
}

a {
  text-decoration: none;
  color: #000;
}

</style>