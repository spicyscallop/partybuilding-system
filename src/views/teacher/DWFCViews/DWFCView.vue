<template>
	<v-container fluid class="ma-0">
		<v-col style="height: 100%" class="d-flex flex-column justify-start">
			<v-row class="flex-shrink-0 flex-grow-0" style="flex-basis: 0; overflow: visible;">
				<v-col>
					<SubpageTitle text="党委风采" icon="mdi-home" @drawerToggle="$emit('drawerToggle')"></SubpageTitle>
				</v-col>
			</v-row>
			<v-row style="flex-basis: 0; overflow: visible;">
				<v-col class="fill-height d-flex flex-column justify-space-between" cols="12">
					<!-- 活动风采 -->
					<v-card class="mx-auto my-2" elevation="5" width="100%">
						<div class="d-flex justify-space-between align-center">
							<h1 class="ml-5 mt-4 mb-3 text-h5" style="color: #d32f2f; font-weight:bold;">
								<v-icon class="icon-item">mdi-calendar-text</v-icon>
								活动风采
							</h1>
							<div class="mr-3">更多>></div>
						</div>
						<v-list lines="one" class="py-0 pl-1">
							<v-sheet v-for="(item, index) in hdfc" :key="index">
								<v-list-item :title="item.title">
									<template v-slot:append>
										<v-label class="ml-5" :text="item.date"></v-label>
									</template>
								</v-list-item>
								<v-divider thickness="1" style="border-style: dashed;"></v-divider>
							</v-sheet>
						</v-list>
					</v-card>

					<!-- 荣誉奖项 -->
					<v-card class="mx-auto my-2" elevation="5" width="100%">
						<div class="d-flex justify-space-between align-center">
							<h1 class="ml-5 mt-4 mb-3 text-h5" style="color: #d32f2f; font-weight:bold;">
								<v-icon class="icon-item">mdi-trophy-variant</v-icon>
								荣誉奖项
							</h1>
							<div class="mr-3">更多>></div>
						</div>
						<v-table>
							<thead>
								<tr>
									<th>时间</th>
									<th>奖项名称</th>
									<th>荣誉等级</th>
									<th>获奖人</th>
									<th>获奖时间</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item, index) in ryjx" :key="index">
									<td>{{ item.time }}</td>
									<td>{{ item.name }}</td>
									<td>{{ item.level }}</td>
									<td>{{ item.winner }}</td>
									<td>{{ item.awardTime }}</td>
								</tr>
							</tbody>
						</v-table>
					</v-card>
				</v-col>
			</v-row>
		</v-col>
	</v-container>
</template>

<script setup>
import { ref } from "vue"
import SubpageTitle from '@/components/SubpageTitle.vue'

defineEmits(['drawerToggle'])

// 活动风采数据
const hdfc = ref([
	{ title: "第三批全省高校党建双创培育创建对象", date: "2023-09" },
	{ title: "浙江大学xxxxxxx基地", date: "2023-04" },
	{ title: "浙江大学计算机科学与技术学院和软件学院党委", date: "2023-02" },
	{ title: "第三批全省高校党建双创培育创建对象", date: "2023-09" },
	{ title: "浙江大学xxxxxxx基地", date: "2023-04" },
	{ title: "浙江大学计算机科学与技术学院和软件学院党委", date: "2023-02" }
])

// 荣誉奖项数据
const ryjx = ref([
	{ time: "2024.03", name: "IF", level: "国家级", winner: "软件学院团队", awardTime: "2024-12" },
	{ time: "2023.12", name: "ACM", level: "国家级", winner: "软件学院团队", awardTime: "2024-12" },
	{ time: "2023.10", name: "ACM", level: "国家级", winner: "软件学院团队", awardTime: "2024-12" },
	{ time: "2023.09", name: "ACM", level: "国家级", winner: "软件学院团队", awardTime: "2024-12" }
])
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

.v-table {
	width: 100%;
}

th {
	background-color: #f5f5f5;
	color: #333;
	font-weight: bold;
	text-align: center !important;
}

td {
	text-align: center;
}

.v-table >>> .v-table__wrapper > table {
	width: 100%;
	border-spacing: 0;
}
</style>