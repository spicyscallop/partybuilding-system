<template>
    <v-container fluid class="ma-0 fill-height bg-grey-lighten-5">
        <v-col class="d-flex flex-column">
            <v-row class="flex-shrink-0 flex-grow-0" style="flex-basis: 0; overflow: visible;">
                <v-col>
                    <SubpageTitle text="组织生活" svg="/src/img/风采记录/record.png" width="43" height="43"></SubpageTitle>
                </v-col>
            </v-row>
            <v-row><h3>支部组织生活</h3></v-row>

            <v-row>
                <v-col cols="6" v-for="branch in data" :key="branch.branchId">
                    <v-card width="100%" height="100%" style="background-color: #e9e9e9;">
                        <v-row>
                            <v-col cols="4">
                                <v-chart :option="getDonutChartOptions(branch)" autoresize style="height: 200px;"></v-chart>
                            </v-col>
                            <v-col cols="8">
                                <v-chart :option="getBarChartOptions(branch)" autoresize style="height: 200px;"></v-chart>
                            </v-col>
                        </v-row>
                    </v-card>
                    <div class="text-center mt-2">{{ branch.branchName }}</div>
                </v-col>
            </v-row>
        </v-col>
    </v-container>
</template>

<script setup>
import SubpageTitle from '@/components/SubpageTitle.vue';
import { ref, onMounted } from 'vue';
import { meetingOverview } from "@/http/party.js"

onMounted(() => {
    meetingOverview().then(res => {
        // 后端数据暂时有点问题
        console.log(res.data);
        // data.value = res.data
    })
});

let data = ref([
    {
        branchId: "1",
        branchName: "第1党支部",
        totalMeetings: 18,
        actualMeetings: 17,
        meetingTypeStats: [
            {
                classification: "党员大会",
                meetingCount: 3,
                attendanceRate: 0.96,
            },
            {
                classification: "支部委员会",
                meetingCount: 5,
                attendanceRate: 0.91
            },
            {
                classification: "党课",
                meetingCount: 3,
                attendanceRate: 0.92
            },
            {
                classification: "主题党日",
                meetingCount: 4,
                attendanceRate: 0.98
            },
            {
                classification: "党小组会",
                meetingCount: 2,
                attendanceRate: 0.99
            }
        ]
    },
    {
        branchId: "8",
        branchName: "第八党支部",
        totalMeetings: 18,
        actualMeetings: 17,
        meetingTypeStats: [
            {
                classification: "党员大会",
                meetingCount: 3,
                attendanceRate: 0.8,
            },
            {
                classification: "支部委员会",
                meetingCount: 5,
                attendanceRate: 0.5
            },
            {
                classification: "党课",
                meetingCount: 3,
                attendanceRate: 0.92
            },
            {
                classification: "主题党日",
                meetingCount: 4,
                attendanceRate: 0.3
            },
            {
                classification: "党小组会",
                meetingCount: 2,
                attendanceRate: 0.2
            }
        ]
    },
])

const getDonutChartOptions = (branch) => {
    return {
        title: {
            subtext: "三会一课数量",
            subtextStyle: {
                fontWeight: "bold",
            },
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            bottom: '0',
            orient: "horizontal",
        },
        graphic: [
            {
                type: 'group', // 使用 group 来组合圆形和文本
                left: 'center', // 水平居中
                top: 'center', // 垂直居中
                children: [
                {
                    type: 'circle', // 绘制圆形
                    shape: {    
                        r: 30 // 圆形的半径
                    },
                    style: {
                        fill: 'none', // 不填充颜色
                        stroke: 'red', // 边框颜色
                        lineWidth: 3, // 边框宽度
                    },
                },
                {
                    type: 'text', // 绘制文本
                    left: "center", // 相对于 group 的中心
                    top: "center", // 相对于 group 的中心
                    style: {
                        text: branch.totalMeetings, // 显示的数字
                        fontSize: "20", // 字体大小
                        fontWeight: 'bold', // 字体加粗
                        fill: 'red', // 字体颜色
                        textAlign: 'center', // 文本居中
                        textVerticalAlign: 'middle' // 文本垂直居中
                    }
                }
                ]
            }
        ],
        color: ["red", "#fff"],
        series: [
            {
                name: '三会一课',
                type: 'pie',
                radius: ['50%', '70%'],
                startAngle: 10,
                data: [
                    { value: branch.actualMeetings, name: '已完成', label: { color: "#fff" } },
                    { value: branch.totalMeetings - branch.actualMeetings, name: '未完成', label: { color: "red" } }
                ],
                label: {
                    show: true,
                    position: 'inside', // 将标签显示在环内
                    formatter: '{c}', // 只显示数值
                    fontSize: 14 // 设置字体大小
                },
                labelLine: {
                    show: false // 不显示引导线
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '20',
                        fontWeight: 'bold'
                    }
                },
            }
        ]
    };
};

const getBarChartOptions = (branch) => {
    const meetingType = branch.meetingTypeStats.map(item => item.classification);
    const meetingCount = branch.meetingTypeStats.map(item => item.meetingCount);
    const attendanceRate = branch.meetingTypeStats.map(item => item.attendanceRate);

    return {
        tooltip: {
            trigger: 'item',
            axisPointer: {
                type: 'shadow'
            },
            formatter: (params) => {
                console.log(params)
                const index = params.dataIndex; // 获取当前柱子的索引
                const count = meetingCount[index]; // 获取当前的 meetingCount
                const rate = attendanceRate[index]; // 获取当前的 attendanceRate
                const attended = Math.round(count * rate); // 到会人数
                const notAttended = Math.round(count * (1 - rate)); // 未到会人数

                return `
                    会议类型: ${meetingType[index]}<br>
                    会议数量: ${count}<br>
                    到会率: ${(rate * 100).toFixed(0)}%<br>
                `;
            }
        },
        title: {
            subtext: "各类型会议数量",
            subtextStyle: {
                fontWeight: "bold"
            },
        },
        xAxis: {
            type: 'category',
            data: meetingType,
            axisLine: {
                lineStyle: {
                    width: 8,
                    color: "#fff"
                }
            },
            axisLabel: {
                margin: 20,
                color: "black",
                interval: 0,
            },
            axisTick: { show: false }, // 不显示刻度线
        },
        yAxis: {
            type: 'value',
            axisLine: { show: false }, // 不显示坐标轴线
            axisTick: { show: false }, // 不显示刻度线
            axisLabel: { show: false }, // 不显示坐标轴标签
            splitLine: { show: false } // 不显示网格线
        },
        series: [
            {
                name: '到会率',
                type: 'bar',
                stack: "total",
                barWidth: 20,
                data: meetingCount.map((count, index) => ({
                    value: count * attendanceRate[index],
                    itemStyle: { color: 'red' }
                })),
                label: {
                    show: false, // 不显示标签
                },
            },
            {
                name: '未到会率',
                type: 'bar',
                stack: "total",
                barWidth: 20,
                data: meetingCount.map((count, index) => ({
                    value: count * (1 - attendanceRate[index]),
                    itemStyle: { color: '#fff' }
                })),
                label: {
                    show: true,
                    position: 'top', // 标签位置在柱子顶部
                    formatter: (params) => meetingCount[params.dataIndex], // 显示 meetingCount
                    color: '#000', // 标签颜色
                    fontSize: 12 // 标签字体大小
                },
            },
        ],
        legend: {
            show: false,
        },
        grid: {
            show: false,
        },
    };
};

</script>

<style>
</style>