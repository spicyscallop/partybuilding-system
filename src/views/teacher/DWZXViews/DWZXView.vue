<template>
    <v-container fluid class="ma-0 fill-height bg-grey-lighten-3">
        <v-col class="d-flex fill-height flex-column">
            <v-row
                class="flex-shrink-0 flex-grow-0"
                style="flex-basis: 0; overflow: visible"
            >
                <v-col>
                    <SubpageTitle
                        text="党委中心"
                        width="43"
                        height="43"
                    ></SubpageTitle>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col
                    cols="12"
                    sm="4"
                >
                    <div class="d-flex fill-height align-stretch pt-3 pb-10">
                        <v-sheet
                            rounded="lg"
                            class="flex-grow-1 flex-column ma-3 elevation-8 py-5 pl-5 pr-10"
                            >
                            <v-row class="mb-0  ">
                                <v-col cols="auto">
                                    <IconParty
                                        class="mt-n1"
                                        style="height: 80px"
                                    ></IconParty>
                                </v-col>
                                <v-col>
                                    <h1 class="text-h3 font-weight-bold">
                                        18<v-label>个</v-label>
                                    </h1>
                                    <h2 class="text-h6">党支部数量</h2>
                                    <h2 class="text-subtitle-1 text-blue">
                                        浙江大学软件学院党支部
                                    </h2>
                                </v-col>
                            </v-row>
                            <v-row class="mb-0">
                                <v-col cols="3"></v-col>
                                <v-col cols="6">
                                    <v-btn block style="background-color: red; color: white"
                                    to="/teacher/dwzx/branchlist">
                                        支部列表
                                    </v-btn>
                                </v-col>
                                <v-col cols="3"></v-col>
                            </v-row>
                        </v-sheet>
                    </div>
                </v-col>
                <v-col
                    v-for="(item, index) in dwzx"
                    :key="index"
                    cols="12"
                    sm="4"
                >
                    <div class="d-flex fill-height align-stretch pt-3 pb-10">
                        <v-sheet
                            rounded="lg"
                            class="flex-grow-1 flex-column ma-3 elevation-8 py-5 pl-5 pr-10"
                            >
                            <v-row class="mb-0  ">
                                <v-col cols="auto">
                                    <IconParty
                                        class="mt-n1"
                                        style="height: 80px"
                                    ></IconParty>
                                </v-col>
                                <v-col>
                                    <h1 class="text-h3 font-weight-bold">
                                        {{ item.count }}
                                        <v-label>人</v-label>
                                    </h1>
                                    <h2 class="text-h6">{{ item.title }}</h2>
                                    <h2 class="text-subtitle-1 text-blue">
                                        {{ item.subtitle }}
                                    </h2>
                                </v-col>
                            </v-row>
                            <v-row class="mb-0">
                                <v-col cols="3"></v-col>
                                <v-col cols="6">
                                    <v-btn block style="background-color: red; color: white" @click="goToRoute(item)">
                                        {{ item.buttonText }}
                                    </v-btn>
                                </v-col>
                                <v-col cols="3"></v-col>
                            </v-row>
                        </v-sheet>
                    </div>
                </v-col>
            </v-row>
        </v-col>
    </v-container>
</template>

<script>
import SubpageTitle from "@/components/SubpageTitle.vue";
import IconParty from "@/components/icons/IconParty.vue";
import { getPartyOverview } from "@/http/party"

export default {
    components: {
        SubpageTitle,
        IconParty,
    },
    data() {
        return {
            dwzx: [
                {
                    count: 0,
                    title: "",
                    subtitle: "",
                    buttonText: "",
                    viewLink: "",
                    requestParam: "",
                },
            ],
        };
    },
    mounted() {
        getPartyOverview().then(res => {
            this.dwzx = res.data
            console.log(this.dwzx)
            this.dwzx.forEach(x => {
                x.subtitle = "浙江大学软件学院党支部"
                x.buttonText = "人员列表"
                x.viewLink = "/teacher/dwzx/personlist"
                x.requestParam = x.title.split("数量")[0]
            })
        })
    },
    methods: {
        goToRoute(item) {
            this.$router.push({
                path: item.viewLink,
                query: {
                    phase: item.requestParam,
                },
            });
        }
    }
};
</script>

<style scoped lang="scss">
</style>