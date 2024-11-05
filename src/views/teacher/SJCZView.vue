<template>
    <v-container fluid class="ma-0 fill-height bg-grey-lighten-3">
        <v-col class="d-flex fill-height flex-column">
            <v-row class="flex-shrink-1 flex-grow-0">
                <v-col>
                    <SubpageTitle text="实践成长录入" icon="mdi-book-open-variant" @drawerToggle="$emit('drawerToggle')">
                    </SubpageTitle>
                </v-col>
            </v-row>
            <v-row class="flex-shrink-1 flex-grow-0">
                <v-col class="d-flex">
                    <v-dialog width="50%" persistent>
                        <template v-slot:activator="{ props }">
                            <v-btn prepend-icon="mdi-plus" color="party-1" v-bind="props">添加活动信息</v-btn>
                        </template>
                        <template v-slot:default="{ isActive }">
                            <v-card>
                                <v-toolbar class="ml-5" color="white" title="添加活动信息"></v-toolbar>
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="5" class="d-flex flex-row align-center">
                                                活动名称
                                                <v-text-field class="ml-3" variant="outlined" density="compact"
                                                    hide-details="auto"></v-text-field>
                                            </v-col>
                                            <v-col cols="1"></v-col>
                                            <v-col cols="5" class="d-flex flex-row align-center">
                                                活动级别
                                                <v-select class="ml-3" :items="['国家级', '省级', '市级', '校级', '院级']"
                                                    variant="outlined" hide-details="auto" density="compact"></v-select>
                                            </v-col>
                                            <v-col cols="5" class="d-flex flex-row align-center">
                                                主办单位
                                                <v-text-field class="ml-3" variant="outlined" density="compact"
                                                    hide-details="auto"></v-text-field>
                                            </v-col>
                                            <v-col cols="1"></v-col>
                                            <v-col cols="5" class="d-flex flex-row align-center">
                                                活动时间
                                                <v-text-field class="ml-3" variant="outlined" density="compact"
                                                    hide-details="auto"></v-text-field>
                                            </v-col>
                                            <v-col cols="5" class="d-flex flex-row align-center">
                                                申请学时
                                                <v-text-field class="ml-3" variant="outlined" density="compact"
                                                    hide-details="auto"></v-text-field>
                                            </v-col>
                                            <v-col cols="1"></v-col>
                                            <v-col cols="5" class="d-flex flex-row align-center">
                                                参与人员
                                                <v-text-field class="ml-3" variant="outlined" density="compact"
                                                    hide-details="auto"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" class="d-flex flex-column justify-start">
                                                备注
                                                <v-textarea class="mt-3" variant="outlined" density="compact"
                                                    hide-details="auto"></v-textarea>
                                            </v-col>
                                            <v-col cols="6" class="d-flex flex-row align-center">
                                                活动图谱
                                                <v-btn class="ml-3">选取文件</v-btn>
                                            </v-col>
                                            <v-col cols="6" class="d-flex flex-row align-center">
                                                附加文件
                                                <v-btn class="ml-3">选取文件</v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions class="justify-start ml-5">
                                    <v-btn variant="text" @click="isActive.value = false">提交</v-btn>
                                    <v-btn variant="text" @click="isActive.value = false">取消</v-btn>
                                </v-card-actions>
                            </v-card>
                        </template>
                    </v-dialog>
                </v-col>
            </v-row>
            <v-row class="flex-grow-1">
                <v-col class="d-flex">
                    <v-sheet class="d-flex flex-grow-1" rounded="lg">
                        <v-col class="d-flex flex-grow-1 flex-column">
                            <v-row class="flex-shrink-1 flex-grow-0 ma-0">
                                <v-col class="d-flex justify-center">
                                    <v-label class="mr-2">审核状态</v-label>
                                    <v-select :items="['通过', '未通过', '待审批']" variant="outlined" hide-details="auto"
                                        density="compact"></v-select>
                                </v-col>
                                <v-col class="d-flex justify-center">
                                    <v-label class="mr-2">学年度</v-label>
                                    <v-select :items="['2019~2020', '2020~2021', '2021~2022']" variant="outlined"
                                        hide-details="auto" density="compact"></v-select>
                                </v-col>
                                <v-col class="d-flex justify-center">
                                    <v-label class="mr-2">活动名称</v-label>
                                    <v-text-field variant="outlined" density="compact" hide-details="auto"></v-text-field>
                                </v-col>
                                <v-col class="flex-shrink-1 flex-grow-0">
                                    <v-btn color="party-1">查询</v-btn>
                                </v-col>
                            </v-row>
                            <v-row id="data-table" class="flex-grow-1 flex-shrink-1 fill-height"
                                style="flex-basis: 0; min-height: 200px;">
                                <v-col class="pa-0 fill-height">
                                    <v-table class="fill-height" fixed-header>
                                        <thead>
                                            <tr class="text-center">
                                                <th>
                                                    <v-checkbox-btn value="Jacob"></v-checkbox-btn>
                                                </th>
                                                <th>
                                                    学工号
                                                </th>
                                                <th>
                                                    姓名
                                                </th>
                                                <th>
                                                    发展阶段
                                                </th>
                                                <th>
                                                    活动名称
                                                </th>
                                                <th>
                                                    主办单位
                                                </th>
                                                <th>
                                                    活动时间
                                                </th>
                                                <th>
                                                    活动类型
                                                </th>
                                                <th>
                                                    提交文件/申请学时
                                                </th>
                                                <th>
                                                    状态
                                                </th>
                                                <th>
                                                    操作
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="item in desserts" :key="item.name">
                                                <td>
                                                    <v-checkbox-btn value="Jacob"></v-checkbox-btn>
                                                </td>
                                                <td>{{ item.name }}</td>
                                                <td>{{ item.calories }}</td>
                                                <td>{{ item.calories }}</td>
                                                <td>{{ item.calories }}</td>
                                                <td>{{ item.calories }}</td>
                                                <td>{{ item.calories }}</td>
                                                <td>{{ item.calories }}</td>
                                                <td>{{ item.calories }}</td>
                                                <td>{{ item.calories }}</td>
                                                <td>
                                                    <v-btn density="comfortable" icon="mdi-pencil-outline" variant="text">
                                                    </v-btn>
                                                    <v-btn density="comfortable" icon="mdi-trash-can-outline"
                                                        variant="text">
                                                    </v-btn>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </v-table>
                                </v-col>
                            </v-row>
                            <v-row id="data-table-footer" class="flex-shrink-1 flex-grow-0 flex-row-reverse">
                                <v-row class="align-center ma-0">
                                    <v-col class="flex-shrink-0 flex-grow-1">
                                        <v-checkbox-btn style="padding-left: 4px;" label="全选"></v-checkbox-btn>
                                    </v-col>
                                    <v-col cols="2" class="pa-0" style="min-width: 135px;">
                                        <v-select class="ml-3" :items="['10条/页', '20条/页', '50条/页']" variant="outlined"
                                            model-value="10条/页" hide-details="auto" density="compact"></v-select>
                                    </v-col>
                                    <v-col cols="2" class="pa-0" style="min-width: 155px;">
                                        <v-pagination v-model="page" :length="6" total-visible="1"></v-pagination>
                                    </v-col>
                                    <v-col class="d-flex flex-row flex-grow-0 flex-shrink-1 align-center"
                                        style="white-space: nowrap;">
                                        <div>前往第</div>

                                        <div contenteditable class="mx-3"
                                            style="min-width: 50px;min-height: 40px;padding: 6px 8px; font-size:16px;border: 1px solid #ababab;border-radius: 4px;">
                                        </div>
                                        <div>页</div>
                                    </v-col>
                                </v-row>
                            </v-row>
                        </v-col>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-col>
    </v-container>
</template>

<script>
import SubpageTitle from '@/components/SubpageTitle.vue';

export default {
    components: {
        SubpageTitle
    },
    emits: ["drawerToggle"],
    data() {
        return {
            desserts: [
                {
                    name: 'Frozen Yogurt',
                    calories: 150,
                },
                {
                    name: 'Ice cream sandwich',
                    calories: 237,
                },
                {
                    name: 'Eclair',
                    calories: 262,
                },
                {
                    name: 'Cupcake',
                    calories: 305,
                },
                {
                    name: 'Gingerbread',
                    calories: 356,
                },
                {
                    name: 'Jelly bean',
                    calories: 375,
                },
                {
                    name: 'Lollipop',
                    calories: 392,
                },
                {
                    name: 'Honeycomb',
                    calories: 408,
                },
                {
                    name: 'Donut',
                    calories: 452,
                },
                {
                    name: 'KitKat',
                    calories: 518,
                }, {
                    name: 'KitKat',
                    calories: 518,
                }, {
                    name: 'KitKat',
                    calories: 518,
                }, {
                    name: 'KitKat',
                    calories: 518,
                },
            ],
            page: 1
        }
    },
}
</script>

<style lang="scss">
#data-table .v-table__wrapper {
    height: 100% !important;
}

#data-table .v-table .v-table__wrapper>table>tbody>tr:not(:last-child)>td,
.v-table .v-table__wrapper>table>tbody>tr:not(:last-child)>th {
    border: 0;
}

#data-table-footer {
    box-shadow: inset 0 1px 0 rgba(var(--v-border-color), var(--v-border-opacity))
}
</style>