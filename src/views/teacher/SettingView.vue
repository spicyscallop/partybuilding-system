<template>
    <v-container fluid class="ma-0 fill-height bg-grey-lighten-3">
        <v-col class="d-flex fill-height flex-column">
            <v-row class="flex-shrink-1 flex-grow-0">
                <v-col>
                    <SubpageTitle text="个人设置" icon="mdi-cog" @drawerToggle="$emit('drawerToggle')">
                    </SubpageTitle>
                </v-col>
            </v-row>

            <v-row class="flex-shrink-1 flex-grow-0">
                <v-col class="d-flex">
                    <v-sheet class="d-flex flex-grow-1 py-10" rounded="lg">
                        <v-container>
                            <v-row>
                                <v-col cols="2" class="d-flex flex-row align-center">
                                    姓名
                                    <v-text-field class="ml-3" variant="outlined" density="compact"
                                        hide-details="auto"></v-text-field>
                                </v-col>
                                <v-col cols="2" class="d-flex flex-row align-center">
                                    性别
                                    <v-text-field class="ml-3" variant="outlined" density="compact"
                                        hide-details="auto"></v-text-field>
                                </v-col>
                                <v-col cols="1"></v-col>
                                <v-col cols="4" class="d-flex flex-row align-center">
                                    学号
                                    <v-text-field class="ml-3" variant="outlined" density="compact"
                                        hide-details="auto"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="2" class="d-flex flex-row align-center">
                                    民族
                                    <v-text-field class="ml-3" variant="outlined" density="compact"
                                        hide-details="auto"></v-text-field>
                                </v-col>
                                <v-col cols="2" class="d-flex flex-row align-center">
                                    职业
                                    <v-text-field class="ml-3" variant="outlined" density="compact"
                                        hide-details="auto"></v-text-field>
                                </v-col>
                                <v-col cols="1"></v-col>
                                <v-col cols="4" class="d-flex flex-row align-center">
                                    身份证
                                    <v-text-field class="ml-3" variant="outlined" density="compact"
                                        hide-details="auto"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="2" class="d-flex flex-row align-center">
                                    学历
                                    <v-text-field class="ml-3" variant="outlined" density="compact"
                                        hide-details="auto"></v-text-field>
                                </v-col>
                                <v-col cols="2" class="d-flex flex-row align-center">
                                    政治面貌
                                    <v-text-field class="ml-3" variant="outlined" density="compact"
                                        hide-details="auto"></v-text-field>
                                </v-col>
                                <v-col cols="1"></v-col>
                                <v-col cols="4" class="d-flex flex-row align-center">
                                    手机号
                                    <v-text-field class="ml-3" variant="outlined" density="compact"
                                        hide-details="auto"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="2" class="d-flex flex-row align-center">
                                    在读状况
                                    <v-select class="ml-3" :items="['0-17', '18-29', '30-54', '54+']" variant="outlined"
                                        hide-details="auto" density="compact"></v-select>
                                </v-col>
                                <v-col cols="2" class="d-flex flex-row align-center">
                                    权限
                                    <v-select class="ml-3" :items="['0-17', '18-29', '30-54', '54+']" variant="outlined"
                                        hide-details="auto" density="compact"></v-select>
                                </v-col>

                                <v-col cols="1"></v-col>
                                <v-col cols="4" class="d-flex flex-row align-center">
                                    电子邮箱
                                    <v-text-field class="ml-3" variant="outlined" density="compact"
                                        hide-details="auto"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="4" class="d-flex flex-row align-center">
                                    户籍地址
                                    <v-text-field class="ml-3" variant="outlined" density="compact"
                                        hide-details="auto"></v-text-field>
                                </v-col>

                                <v-col cols="1"></v-col>
                                <v-col cols="4" class="d-flex flex-row align-center">
                                    团员编号
                                    <v-text-field class="ml-3" variant="outlined" density="compact"
                                        hide-details="auto"></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-btn class="mt-10">更新</v-btn>
                            </v-row>
                        </v-container>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-col>
    </v-container>
</template>

<script setup>

import SubpageTitle from '@/components/SubpageTitle.vue';

defineEmits(['drawerToggle']);

</script>