<template>
  <v-container fluid class="ma-0 fill-height bg-grey-lighten-3">
    <v-col class="d-flex fill-height flex-column">
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
              <h1 class="ml-5 mt-4 mb-3 text-h5" style="color: red; font-weight:bold;">党委简介</h1>
            </div>
            <div class="d-flex">
              <p class="ml-5 mb-4 mr-4" style="line-height: 2;">计算机科学与技术学院和软件学院党委坚持以习近平新时代中国特色社会主义思想为指导，紧紧围绕立德树人根本任务，在“四个更加”的战略导向下，秉承着“人为本，和为贵，变则通”的学院文化理念，构建完善“开放、开环、联动、包容、共享”的学院治理体系，为建设世界一流的计算机科学与技术学院和软件学院提供坚强的政治保证和组织保证。</p>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
      <!-- 党委荣誉 -->
      <v-row style="flex-basis: 0; overflow: visible;">
        <v-col class="fill-height d-flex" cols="12">
          <v-sheet rounded="lg" class="d-flex flex-column pb-5" style="overflow: auto; width: 100%;">
            <div class="d-flex">
              <h1 class="ml-5 mt-4 mb-3 text-h5" style="color: red; font-weight:bold;">党委荣誉</h1>
            </div>
            <v-list lines="one" class="py-0 pl-1">
                <v-list-item v-for="(item, index) in dwry" :title="item.title" :key="index">
                    <template v-slot:append>
                        <v-label class="ml-5" :text="item.date"></v-label>
                    </template>
                </v-list-item>
            </v-list>
          </v-sheet>
        </v-col>
      </v-row>
      <!-- 党委中心 -->
      <v-row style="flex-basis: 0; overflow: visible; margin-top: 10px;">
        <v-col class="fill-height d-flex flex-column" cols="12">
          <v-row class="flex-shrink-0 flex-grow-0" style="flex-basis: 0; overflow: visible;">
            <h1 class="ml-5 mt-3 text-h5" style="font-weight:bold;">党委中心</h1>
          </v-row>
          <v-row style="flex-basis: 0; overflow: visible;">
            <v-carousel height="100%" cycle hide-delimiter-background :show-arrows="false">
              <v-carousel-item>
                <div class="d-flex fill-height align-stretch pt-3 pb-10 ">
                  <v-sheet 
                    v-for="(item, index) in dwzx"
                    :key="index"
                    rounded="lg"
                    class="flex-grow-1 d-flex align-start flex-column ma-3 elevation-8 py-5 pl-5 pr-10" style="height:90%;">
                    <IconParty class="mt-n1 mb-5" style="height: 40px;"></IconParty>
                    <h1 class="text-h3 font-weight-bold ">
                      {{ item.count }}
                      <v-label>人</v-label>
                    </h1>
                    <h2 class="text-h6">{{ item.title }}</h2>
                    <h2 class="text-subtitle-2 text-blue">浙江大学软件学院党支部</h2>
                  </v-sheet>
                </div>
              </v-carousel-item>
            </v-carousel>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { getPartyOverview } from "@/http/api"
import SubpageTitle from '@/components/SubpageTitle.vue';
import IconParty from '@/components/icons/IconParty.vue';

defineEmits(['drawerToggle']);

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
  }
];

let dwzx = ref([]);

onMounted(() => {
	getPartyOverview().then(res => {
		dwzx.value = res.data
	})
})

</script>