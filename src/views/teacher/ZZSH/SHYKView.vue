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
                <v-col cols="6" v-for="branch in branches" :key="branch.branchId">
                    <v-card width="100%" height="100%" style="background-color: #e9e9e9;">
                        <v-row>
                            <v-col cols="4">
                                <v-chart :option="getDonutChartOptions(branch)" autoresize style="height: 200px;"></v-chart>
                            </v-col>
                            <v-col cols="8">
                                <v-chart :option="getBarChartOptions(branch)" autoresize style="height: 200px;"></v-chart>
                            </v-col>
                        </v-row>
                        <!-- <v-card-actions class="justify-center">
                            <v-btn text>{{ branch.branchName }}</v-btn>
                        </v-card-actions> -->
                    </v-card>
                    <!-- 将 branch.branchName 放在 card 的外部底部 -->
                    <div class="text-center mt-2">{{ branch.branchName }}</div>
                </v-col>
            </v-row>
        </v-col>
    </v-container>
</template>

<script setup>
import SubpageTitle from '@/components/SubpageTitle.vue';
import { ref, onMounted } from 'vue';

onMounted(() => {
});

let branches = ref([
    {
        branchId: "1",
        branchName: "2024第一党支部",
        totalAttendance : 18,
        actualAttendance : 17,
        meetingTypeActualCount: {
            "支部委员会": 3,
            "党课": 5,
            "党员大会": 3,
            "主题党日": 4,
            "党小组会": 2,
        },
        meetingTypeTotalCount: {
            "支部委员会": 3,
            "党课": 6,
            "党员大会": 3,
            "主题党日": 4,
            "党小组会": 2,
        },
        meetingType: [
            {
                type: "支部委员会",
                total: 3,
                actual: 3,
            },
            {
                type: "党课",
                total: 6,
                actual: 5,
            },
            {
                type: "党员大会",
                total: 3,
                actual: 3,
            },
            {
                type: "主题党日",
                total: 4,
                actual: 3,
            },
            {
                type: "党小组会",
                total: 2,
                actual: 1,
            },
        ]
    },
    {
        branchId: "2",
        branchName: "第二党支部",
        totalAttendance : 18,
        actualAttendance : 17,
        meetingTypeActualCount: {
            "支部委员会": 3,
            "党课": 5,
            "党员大会": 3,
            "主题党日": 4,
            "党小组会": 2,
        },
        meetingTypeTotalCount: {
            "支部委员会": 3,
            "党课": 6,
            "党员大会": 3,
            "主题党日": 4,
            "党小组会": 2,
        },
        meetingType: [
            {
                type: "支部委员会",
                total: 3,
                actual: 3,
            },
            {
                type: "党课",
                total: 6,
                actual: 5,
            },
            {
                type: "党员大会",
                total: 3,
                actual: 3,
            },
            {
                type: "主题党日",
                total: 4,
                actual: 3,
            },
            {
                type: "党小组会",
                total: 2,
                actual: 1,
            },
        ]
    },
]);
 
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
            itemGap: 100,
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
                        text: branch.totalAttendance, // 显示的数字
                        fontSize: 29, // 字体大小
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
                data: [
                    { value: branch.actualAttendance, name: '已完成', label: { color: "#fff" } },
                    { value: branch.totalAttendance - branch.actualAttendance, name: '未完成', label: { color: "red" } }
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
    const meetingType = branch.meetingType.map(item => item.type)
    // 未完成的数据
    const uncompletedData = branch.meetingType.map(item => {
        return item.total - item.actual;
    });
    // 已完成的数据
    const completedData = branch.meetingType.map(item => item.actual)

    return {
        tooltip: {
            trigger: 'item',
            axisPointer: {
                type: 'shadow'
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
                name: '已完成',
                type: 'bar',
                stack: 'total',
                barWidth: 20,
                data: completedData, // 已完成的数据
                itemStyle: {
                    color: '#f00'
                },
                label: {
                    show: true,
                    position: 'top', // 标签位置在柱子顶部
                    formatter: '{c}', // 显示数值
                    color: '#000', // 标签颜色
                    fontSize: 12 // 标签字体大小
                },
            },
            {
                name: '未完成',
                type: 'bar',
                stack: 'total', // 堆叠在同一组
                barWidth: 20,
                itemStyle: {
                    color: '#fff' // 白色
                },
                label: {
                    show: false,
                },
                data: uncompletedData, // 未完成的数据
            },
        ],
        legend: {
            show: false,
        },
        grid: {
            show: false,
        },
        label: {
            show: true, // 显示数值
            position: 'top', // 设置显示位置为柱状图内部
            distance: 15,
            textStyle: {
                color: 'red', // 顶部数据的颜色
                fontSize: 14     // 顶部数据的字体大小
            },
        }
    };
};

</script>

<style>
</style>