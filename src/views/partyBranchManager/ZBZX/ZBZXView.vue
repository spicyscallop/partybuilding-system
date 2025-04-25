<template>
    <v-container fluid class="ma-0 fill-height">
        <v-col class="d-flex fill-height flex-column">
            <v-row
                class="flex-shrink-0 flex-grow-0"
                style="flex-basis: 0; overflow: visible"
            >
                <v-col>
                    <SubpageTitle
                        text="支部中心"
                        :width="43"
                        :height="43"
                    ></SubpageTitle>
                </v-col>
            </v-row>
            <v-row no-gutters>
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
import { getBranchOverview } from "@/http/api.js"

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
        getBranchOverview().then(res => {
            this.dwzx = res.data
            this.dwzx.forEach(x => {
                x.subtitle = "浙江大学软件学院党支部"
                x.buttonText = "人员列表"
                x.viewLink = "/partyManager/zbzx/personlist"
                x.phase = x.title.split("数量")[0]
            })
        })
    },
    methods: {
        goToRoute(item) {
            this.$router.push({
                path: item.viewLink,
                query: {
                    phase: item.phase,
                },
            });
        }
    }
};
</script>

<style scoped lang="scss">
</style>