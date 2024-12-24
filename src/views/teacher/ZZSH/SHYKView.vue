<template>
    <v-container fluid class="ma-0 fill-height bg-grey-lighten-5">
        <v-col class="d-flex flex-column">
            <v-row class="flex-shrink-0 flex-grow-0" style="flex-basis: 0; overflow: visible;">
                <v-col>
                    <SubpageTitle text="组织生活" svg="/src/img/风采记录/record.png" :width="43" :height="43"></SubpageTitle>
                </v-col>
            </v-row>
            <v-row><h3>支部组织生活</h3></v-row>

            <v-row>
                <v-col cols="6" v-for="branch in data" :key="branch.branchId" class="mt-5">
                    <v-card width="100%" height="100%" style="background-color: #e9e9e9;">
                        <v-row>
                            <v-col cols="4">
                                <v-chart :option="getDonutChartOptions(branch)" autoresize style="height: 240px;"></v-chart>
                            </v-col>
                            <v-col cols="8" class="d-flex flex-column justify-space-around">
                                <v-chart :option="getBarChartOptions(branch)" autoresize style="height: 270px;"></v-chart>
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
        branchName: "第一党支部",
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
                attendanceRate: 0.6
            }
        ]
    },
    {
        branchId: "9",
        branchName: "第九党支部",
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
                attendanceRate: 0.6
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
                type: 'group',
                left: 'center',
                top: 'center',
                children: [
                {
                    type: 'circle',
                    shape: {    
                        r: 30
                    },
                    style: {
                        fill: 'none',
                        stroke: 'red',
                        lineWidth: 3,
                    },
                },
                {
                    type: 'text',
                    left: "center",
                    top: "center",
                    style: {
                        text: branch.totalMeetings,
                        fontSize: "20",
                        fontWeight: 'bold',
                        fill: 'red',
                        textAlign: 'center',
                        textVerticalAlign: 'middle'
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
                    position: 'inside',
                    formatter: '{c}',
                    fontSize: 14
                },
                labelLine: {
                    show: false
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
    const BARWIDTH = 25;
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
                const index = params.dataIndex;
                const count = meetingCount[index];
                const rate = attendanceRate[index];
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
            axisTick: { show: false },
        },
        yAxis: {
            type: 'value',
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: false },
            splitLine: { show: false }
        },
        series: [
            {
                name: '到会率',
                type: 'bar',
                stack: "total",
                barWidth: BARWIDTH,
                data: meetingCount.map((count, index) => ({
                    value: count * attendanceRate[index],
                    itemStyle: { color: 'red' }
                })),
                label: {
                    show: true,
                    position: 'inside',
                    formatter: (params) => (attendanceRate[params.dataIndex] * 100).toFixed(0) + '%',
                    color: '#fff',
                    fontSize: 12
                },
            },
            {
                name: '未到会率',
                type: 'bar',
                stack: "total",
                barWidth: BARWIDTH,
                data: meetingCount.map((count, index) => ({
                    value: count * (1 - attendanceRate[index]),
                    itemStyle: { color: '#fff' }
                })),
                label: {
                    show: true,
                    position: 'top',
                    formatter: (params) => meetingCount[params.dataIndex],
                    color: 'red',
                    fontWeight: "bold",
                    fontSize: 12
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