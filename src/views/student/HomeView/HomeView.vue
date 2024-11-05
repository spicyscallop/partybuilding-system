<template>
    <v-container fluid class="ma-0 fill-height bg-white-lighten-3" style="padding:0 20px 0 20px">
        <v-col class="d-flex fill-height flex-column">
            <v-row class="flex-shrink-0 flex-grow-0" style="flex-basis: 0; overflow: visible;">
                <v-col>
                    <SubpageTitle text="我的首页" icon="mdi-home" @drawerToggle="$emit('drawerToggle')">
                    
                    </SubpageTitle>
                </v-col>
            </v-row>
            <v-row class="flex-shrink-0 flex-grow-0" style="flex-basis: 0; overflow: visible; white-space: nowrap;">
                <v-col class="d-flex flex-shrink-0 flex-grow-1 " cols="8">
                    <v-sheet rounded="lg" class="d-flex flex-column justify-space-between bg-grey-lighten-4" style="width: 100%;">
                        <div class="d-flex justify-space-between">
                            <h1 class="ml-5 mt-4 mb-3 text-h5">个人信息</h1>
                            <v-btn class="mr-0 mt-4 justify-end" append-icon="mdi-chevron-right" variant="plain" @click="" style="font-size: 16px;">
                                设置
                            </v-btn>
                        </div>
                        <v-container class="d-flex flex-column flex-grow-1 justify-space-between"
                            style="font-size: 18px;padding:30px 16px">
                            <v-row>
                                <v-col class="d-flex flex-row align-center">
                                    姓名
                                    <v-label class="ml-3" variant="outlined" density="compact" hide-details="auto"
                                        style="white-space: normal;font-size: 18px;">{{ userInfo.userName }}</v-label>
                                </v-col>
                                <v-col class="d-flex flex-row align-center">
                                    性别
                                    <v-label class="ml-3" variant="outlined" density="compact" hide-details="auto"
                                        style="white-space: normal;font-size: 18px;">{{ sexMap[userInfo.sex] }}</v-label>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col class="d-flex flex-row align-center">
                                    学号
                                    <v-label class="ml-3" variant="outlined" density="compact" hide-details="auto"
                                        style="white-space: normal;font-size: 18px;">{{ userInfo.userId }}</v-label>
                                </v-col>
                                <v-col class="d-flex flex-row align-center">
                                    政治面貌
                                    <v-label class="ml-3" variant="outlined" density="compact" hide-details="auto"
                                        style="white-space: normal;font-size: 18px;">{{ userInfo.politicsStatus }}</v-label>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col class="d-flex flex-row align-center">
                                    发展阶段
                                    <v-label class="ml-3" variant="outlined" density="compact" hide-details="auto"
                                        style="white-space: normal;font-size: 18px;">{{ userInfo.developmentPhase
                                        }}</v-label>
                                </v-col>
                                <v-col class="d-flex flex-row align-center">
                                    所在党组织
                                    <v-label class="ml-3" variant="outlined" density="compact" hide-details="auto"
                                        style="white-space: normal;font-size: 18px;">{{ userInfo.partyBranch }}</v-label>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-sheet>
                </v-col>
                <v-col class="d-flex" cols="4">
                    <v-sheet rounded="lg" class="d-flex flex-column bg-grey-lighten-4" style="width: 100%;">
                        <div class="d-flex flex-row justify-space-between">
                            <h1 class="ml-5 mt-4 text-h5"></h1>
                            <v-btn class="mt-4 mr-5" append-icon="mdi-chevron-right" variant="plain" rounded
                                style="font-size: 16px;">
                                查看
                            </v-btn>
                        </div>
                        <v-container class="fill-height">
                            <v-row class="fill-height">
                                <v-col class="d-flex flex-column justify-center align-center pb-5">
                                    <div class="d-flex justify-center align-center mb-5"
                                        style="background-color: #eeeeee;border-radius: 55px; height: 110px; width: 110px; text-align: center;vertical-align: center;">
                                        <div
                                            style="background-color: #d9d9d9;border-radius: 40px; height: 80px; width: 80px;line-height: 80px;font-weight: 800;font-size: 24px;">
                                            {{ centerNumber.unReadNumber }}
                                        </div>
                                    </div>
                                    <label style="font-size:18px">培训总时长</label>
                                </v-col>
                                <v-col class="d-flex flex-column justify-center align-center pb-5">
                                    <div class="d-flex justify-center align-center mb-6"
                                        style="background-color: #eeeeee;border-radius: 55px; height: 110px; width: 110px; text-align: center;vertical-align: center;">
                                        <div
                                            style="background-color: #d9d9d9;border-radius: 40px; height: 80px; width: 80px;line-height: 80px;font-weight: 800;font-size: 24px;">
                                            {{ centerNumber.todoNum }}
                                        </div>
                                    </div>
                                    <label style="font-size:18px">当前阶段培训时长</label>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-sheet>
                </v-col>
            </v-row>
            <v-row style="flex-basis: 0;">
                    <UnReadListCard title="未读消息" :list="xtgg"></UnReadListCard>
            </v-row>
        </v-col>
    </v-container>
</template>
  
<script src="./HomeView.js"></script>

<style src="./HomeView.css"></style>