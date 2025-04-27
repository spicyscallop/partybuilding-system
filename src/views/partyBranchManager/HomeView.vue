<template>
	<v-container fluid class="ma-0">
		<v-col style="height: 100%" class="d-flex flex-column justify-start">
      <v-row class="flex-shrink-0 flex-grow-0" style="flex-basis: 0; overflow: visible;">
        <v-col class="d-flex justify-space-between align-center">
          <SubpageTitle text="支部概况" icon="mdi-home" @drawerToggle="$emit('drawerToggle')"></SubpageTitle>
          <RouterLink to="/partyManager/edit-overview" class="edit-link mr-5">
            <v-icon small class="mr-1">mdi-pencil</v-icon>
            编辑支部概况
          </RouterLink>
        </v-col>
      </v-row>

      <v-row style="flex-basis: 0; overflow: visible;">
        <v-col class="fill-height d-flex flex-column justify-space-between" cols="12">
          <v-card
            class="mx-auto my-2"
            elevation="5"
            width="100%"
          >
            <div class="d-flex">
              <h1 class="ml-5 mt-4 mb-3 text-h5" style="color: red; font-weight:bold;">
                <v-icon class="icon-item">mdi-text-box-check-outline</v-icon>
                支部简介
              </h1>
            </div>
            <div class="d-flex">
              <p class="ml-5 mb-4 mr-4" style="line-height: 2;">{{ briefIntroduction }}</p>
            </div>
          </v-card>
          
          <v-card
            class="mx-auto my-2"
            elevation="5"
            width="100%"
          >
            <div class="d-flex justify-space-between align-center mt-4 mb-3">
              <h1 class="ml-5 text-h5" style="color: red; font-weight:bold;">
                <v-icon class="icon-item">mdi-seal-variant</v-icon>
                支部荣誉
              </h1>
              <div class="mr-3">更多></div>
            </div>
            <v-list lines="one" class="py-0 pl-1">
              <v-sheet v-for="(item, index) in dwry" :key="index">
                <v-list-item :title="item.title">
                  <template v-slot:append>
                    <v-label class="ml-5" :text="item.date"></v-label>
                  </template>
                </v-list-item>
                <v-divider thickness="2" style="border-style: dashed;"></v-divider>
              </v-sheet>
            </v-list>
          </v-card>
        </v-col>
      </v-row>

			<!-- 支部中心 -->
			<v-row cols="12">
				<v-sheet class="d-flex flex-column justify-start" style="margin: 0; width: 100%">
					<div class="d-flex justify-space-between align-center mt-4 mb-3">
						<h1 class="ml-5 text-h5" style="color: red; font-weight:bold;">
							<v-icon class="icon-item">mdi-home-account</v-icon>
							支部中心
						</h1>
						<RouterLink class="mr-3" to="/partyManager/zbzx">更多></RouterLink>
					</div>
					<el-scrollbar>
						<div class="d-flex mb-5">
							<v-card 
								v-for="(item, index) in zbzx" 
								:key="index" 
								class="scrollbar-demo-item"
								width="23%"
								height="23%"
								hover
								elevation="5"
							>
								<v-sheet rounded="lg">
									<v-card-title>
										<IconParty class="mt-n1" style="width: 23%; height: 23%;"></IconParty>
										<div class="text-h3 font-weight-bold ">
											{{ item.count }}
											<v-label>人</v-label>
										</div>
										<div style="font-size: 1rem;">{{ item.title }}</div>
										<div style="font-size: 1rem; color: #469bff">浙江大学软件学院党支部</div>
									</v-card-title>
								</v-sheet>
							</v-card>
						</div>
					</el-scrollbar>
				</v-sheet>
			</v-row>
		</v-col>
	</v-container>
</template>

<script setup>
import { onMounted, ref } from "vue"
import SubpageTitle from '@/components/SubpageTitle.vue';
import IconParty from '@/components/icons/IconParty.vue';
import { RouterLink } from "vue-router";
import { getBranchOverview } from "@/http/api"
defineEmits(['drawerToggle']);

let briefIntroduction = ref("计算机科学与技术学院和软件学院党委坚持以习近平新时代中国特色社会主义思想为指导，紧紧围绕立德树人根本任务，在“四个更加”的战略导向下，秉承着“人为本，和为贵，变则通”的学院文化理念，构建完善“开放、开环、联动、包容、共享”的学院治理体系，为建设世界一流的计算机科学与技术学院和软件学院提供坚强的政治保证和组织保证。");

let dwry = [
	{
		title: "浙江大学计算机科学与技术学院和软件学院党委入选第三批全省高校党建“双创”培育创建对象",
		date: "2024-09"
	},
	{
		title: "浙江大学xxxxxxx基地",
		date: "2024-09",
	},
];

let zbzx = ref([]);

onMounted(() => {
  getBranchOverview().then(res => {
		zbzx.value = res.data
		let totalCount = 0
		zbzx.value.forEach(x => {
			totalCount += x.count
		})
		zbzx.value.reverse()
		zbzx.value.unshift(
			{
				title: "总人员数量",
				subtitle: "浙江大学软件学院党支部",
				count: totalCount
			},
		);
	})
});

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
	width: 100%;
	height: 100%;
	margin: 10px;
	text-align: start;
	border-radius: 4px;
	color: var(--el-color-danger);
}

.icon-item {
	color: grey
}

a {
	text-decoration: none;
	color: #000;
}

.tab-title {
	color: red; 
	font-weight: bold;
	font-size: 1.2rem
}

</style>