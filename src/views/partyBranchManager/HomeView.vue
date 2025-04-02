<template>
  <v-container fluid class="ma-0 fill-height bg-grey-lighten-3">
    <v-col class="d-flex fill-height flex-column">
      <v-row class="flex-shrink-0 flex-grow-0" style="flex-basis: 0; overflow: visible;">
        <v-col class="position-relative">
          <SubpageTitle text="支部概况" icon="mdi-home" @drawerToggle="$emit('drawerToggle')"></SubpageTitle>
          <RouterLink to="/partyBranchManager/edit-overview" class="edit-link">
            <v-icon small class="mr-1">mdi-pencil</v-icon>
            编辑支委概况
          </RouterLink>
        </v-col>
      </v-row>
      <v-row style="flex-basis: 0; overflow: visible;">
        <v-col class="fill-height d-flex" cols="12">
          <v-sheet rounded="lg" class="d-flex flex-column" style="width: 100%; height:180px; margin-bottom: 2px;">
            <div class="d-flex">
              <h1 class="ml-5 mt-4 mb-3 text-h5" style="color: red; font-weight:bold;">支部简介</h1>
            </div>
            <div class="d-flex">
              <p class="ml-5 mb-4 mr-4" style="line-height: 2;">计算机科学与技术学院和软件学院党委坚持以习近平新时代中国特色社会主义思想为指导，紧紧围绕立德树人根本任务，在"四个更加"的战略导向下，秉承着"人为本，和为贵，变则通"的学院文化理念，构建完善"开放、开环、联动、包容、共享"的学院治理体系，为建设世界一流的计算机科学与技术学院和软件学院提供坚强的政治保证和组织保证。</p>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row style="flex-basis: 0; overflow: visible; margin-top: 5px;">
        <v-col class="fill-height d-flex" cols="12">
          <v-sheet rounded="lg" class="d-flex flex-column" style="width: 100%; height:190px;">
            <div class="d-flex">
              <h1 class="ml-5 mt-4 mb-3 text-h5" style="color: red; font-weight:bold;">支部荣誉</h1>
            </div>
            <div class="d-flex flex-column">
              <p class="ml-5 mb-4 mr-4" style="display: block; overflow: hidden;">
                 <span style="float: left;">· 浙江大学计算机科学与技术学院和软件学院党委入选第三批全省高校党建"双创"培育创建对象</span>
                 <span style="float: right;">2023-09</span>
              </p>
              <p class="ml-5 mb-4 mr-4" style="display: block; overflow: hidden;">
                 <span style="float: left;">· 浙江大学xxxxxxx基地</span>
                 <span style="float: right;">2023-04</span>
              </p>
              <p class="ml-5 mb-4 mr-4" style="display: block; overflow: hidden;">
                 <span style="float: left;">· 浙江大学计算机科学与技术学院和软件学院第一党支部</span>
                 <span style="float: right;">2023-02</span>
              </p>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row style="flex-basis: 0; overflow: visible; margin-top: 10px;">
        <v-col class="fill-height d-flex flex-column" cols="12">
          <v-row class="flex-shrink-0 flex-grow-0" style="flex-basis: 0; overflow: visible;">
            <h1 class="ml-5 mt-3 text-h5" style="font-weight:bold;">支委中心</h1>
          </v-row>
          <v-row style="flex-basis: 0; overflow: visible;">
            <v-carousel height="100%" cycle hide-delimiter-background :show-arrows="false">
              <v-carousel-item>
                <div class="d-flex fill-height align-stretch pt-3 pb-10 ">
                  <v-sheet rounded="lg"
                    class="flex-grow-1 d-flex align-start flex-column ma-3 elevation-8 py-5 pl-5 pr-10" style="height:90%;">
                    <IconParty class="mt-n1 mb-5" style="height: 40px;"></IconParty>
                    <h1 class="text-h3 font-weight-bold ">000
                      <v-label>人</v-label>
                    </h1>
                    <h2 class="text-h6">入党申请数量</h2>
                    <h2 class="text-subtitle-1 text-blue">浙江大学软件学院党支部</h2>
                  </v-sheet>
                  <v-sheet rounded="lg" class="flex-grow-1 d-flex align-start flex-column ma-3 elevation-8 py-5 pl-5 pr-10" style="height:90%;">
                    <IconParty class="mt-n1 mb-5" style="height: 40px;"></IconParty>
                    <h1 class="text-h3 font-weight-bold ">000
                      <v-label>人</v-label>
                    </h1>
                    <h2 class="text-h6">积极分子数量</h2>
                    <h2 class="text-subtitle-1 text-blue">浙江大学软件学院党支部</h2>
                  </v-sheet>
                  <v-sheet rounded="lg"
                    class="flex-grow-1 d-flex align-start flex-column ma-3 elevation-8 py-5 pl-5 pr-10" style="height:90%;">
                    <IconParty class="mt-n1 mb-5" style="height: 40px;"></IconParty>
                    <h1 class="text-h3 font-weight-bold ">000
                      <v-label>人</v-label>
                    </h1>
                    <h2 class="text-h6">发展对象数量</h2>
                    <h2 class="text-subtitle-1 text-blue">浙江大学软件学院党支部</h2>
                  </v-sheet>
                  <v-sheet rounded="lg"
                    class="flex-grow-1 d-flex align-start flex-column ma-3 elevation-8 py-5 pl-5 pr-10" style="height:90%;">
                    <IconParty class="mt-n1 mb-5" style="height: 40px;"></IconParty>
                    <h1 class="text-h3 font-weight-bold ">000
                      <v-label>人</v-label>
                    </h1>
                    <h2 class="text-h6">预备党员数量</h2>
                    <h2 class="text-subtitle-1 text-blue">浙江大学软件学院党支部</h2>
                  </v-sheet>
                  <v-sheet rounded="lg"
                    class="flex-grow-1 d-flex align-start flex-column ma-3 elevation-8 py-5 pl-5 pr-10" style="height:90%;">
                    <IconParty class="mt-n1 mb-5" style="height: 50px;"></IconParty>
                    <h1 class="text-h3 font-weight-bold ">000
                      <v-label>人</v-label>
                    </h1>
                    <h2 class="text-h6">党员数量</h2>
                    <h2 class="text-subtitle-1 text-blue">浙江大学软件学院党支部</h2>
                  </v-sheet>
                </div>
              </v-carousel-item>
            </v-carousel>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: 'HomeView',
  components: {
  },
  props: {
  },
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
  },
  mounted() {
    this.$axios.get("/auth/branch/getBranchOverview").then((res) => {
      console.log(res.data);
    });

  }
}
</script>

<script setup>

import SubpageTitle from '@/components/SubpageTitle.vue';
import ListCard from '@/components/ListCard.vue';
import IconParty from '@/components/icons/IconParty.vue';

defineEmits(['drawerToggle']);

let xxyb = [
  {
    title: "凝心聚力 团结奋进——软件学院工会山溪山居团建活动",
    subtitle: "为进一步增进学院教职工间的交流，提升团队活力，增强团队凝聚力，活跃教职工精神文化生活。 5月24日，在学院党委副书记胡高权的带领下，学院教职工奔赴东吴镇山溪山居开展团建活动。",
    date: "2023-05-25"
  },
  {
    title: "学思践悟 牢记嘱托——软件教工党支部参观浙江大学党建馆、校史馆等主题展",
    subtitle: "为全面贯彻党的二十大精神，深入学习习近平新时代中国特色社会主义思想，贯彻习近平总书记对浙江大学的重要指示精神和浙江大学第十五次党代会精神，认真落实学校和学院党委关于高质量开展主题教育的相关部署要求。",
    date: "2023-05-24"
  },
  {
    title: "示范性软件学院二十周年建设成果交流大会在京召开",
    subtitle: "5月21日，示范性软件学院二十周年建设成果交流大会在京召开。会议主题为从示范性软件学院建设看新时代高等教育改革。教育部高等教育司副司长王启明、教育部高校学生司副司长吴爱华，教育部高等教育司理工处盛晓光，中国工程院院士、原教育部高等教育司司长张尧学，中国工程院院士、清华大学教授孙家广，中国工程院院士、国防科技大学教授廖湘科，中国软件行业协会副理事长兼秘书长、北京航空航天大学副校长吕卫锋，以及37所国家示范性软件学院师生代表及合作企业代表240余人参会。",
    date: "2023-05-22"
  },
  {
    title: "韶年涌动，梦想生辉浙江大学在甬研究生文艺汇演暨浙江大学研究生艺术团校庆专场演出顺利举行！",
    subtitle: "为庆祝浙江大学建校126周年华诞，加强异地校区间的沟通合作与交流，进一步感悟求是文化内涵。2023年5月7日下午，浙江大学宁波科创中心（宁波校区）联合浙江大学党委研究生工作部，以艺会友，共同举办韶年涌动，梦想生辉浙江大学在甬研究生文艺汇演暨浙江大学研究生艺术团校庆专场演出。",
    date: "2023-05-21"
  },
  {
    title: "院长下午茶第二期活动：拥抱开源，引领创新",
    subtitle: "2023年4月27日晚上，软件学院院长下午茶第二期活动在学院咖啡吧举办。学院常务副院长尹建伟、副院长陈丽出席活动，副研究员才振功、特聘研究员倪超以及20名研究生代表参加。活动由学院党委副书记胡高权主持。",
    date: "2023-04-27"
  },
  {
    title: "软件学院教工党支部召开学习贯彻习近平新时代中国特色社会主义思想主题教育动员会",
    subtitle: "4月25日，软件学院教工党支部在教学楼一楼展厅会议室召开学习贯彻习近平新时代中国特色社会主义思想主题教育动员会。会上，学院党委副书记胡高权带领全体党员深入学习了习近平总书记对浙江大学重要指示精神和浙江大学第十五次党代会精神，对深入开展学习贯彻习近平新时代中国特色社会主义思想主题教育工作进行传达和动员。",
    date: "2023-04-26"
  },
  {
    title: "党建引领、数智先行——宁波市大数据中心来我院开展党建共建活动",
    subtitle: "为进一步学习贯彻落实党的二十大精神，丰富党建形式，搭建党建平台，提升党建工作水平，促进经验交流与学习，4月14日，宁波市大数据管理服务中心主任、党支部书记陈剑波一行来软件学院交流研讨党建工作。市大数据管理服务中心相关科室负责人，软件学院副院长陈丽、党委副书记胡高权和教师学生代表参加了本次活动。",
    date: "2023-04-20"
  },
];
let xtgg = [
  {
    title: "关于公示2022-2023学年软件学院团内评奖评优初评结果的通知",
    subtitle: "根据《软件学院团委关于开展2022-2023学年团内评奖评优工作的通知》的相关要求，经学生自主申报、团支部推荐，学院团委审核决定，拟推荐34名团员参评浙江大学优秀团员荣誉称号；推荐22名团干部参评浙江大学优秀团干部荣誉称号；推荐3个团支部参评浙江大学先进团支部荣誉称号。26名团员被评为软件学院优秀团员称号， 17名团员被评为软件学院优秀团干部称号。",  
    date: "2023-04-18"
  },
  {
    title: "软件学院团委关于开展2022-2023学年团内评奖评优工作的通知",
    subtitle: "2022-2023学年，我校各基层团组织、全体团员青年和广大团干部坚持以习近平新时代中国特色社会主义思想为指导，认真学习贯彻党的二十大精神，认真贯彻习近平总书记关于青年工作的重要思想和团的十八大精神，紧密围绕学校双一流建设目标，秉承创新发展理念，在组织建设、思想引领、实践育人、以文化人、学生组织建设等多个方面取得了新突破，涌现出了一批工作扎实、成绩突出的优秀个人和先进集体。为总结经验，表彰先进，根据校团委《关于开展2022-2023学年团内评奖评优工作的通知》，现开展2022-2023学年团内评奖评优工作。",
    date: "2023-04-12"
  },
  {
    title: "关于召开中国共产主义青年团浙江大学第二十一次代表大会的预通知",
    subtitle: "根据《中国共产主义青年团章程》的有关规定及我校实际情况，拟于2021年12月上旬召开中国共产主义青年团浙江大学第二十一次代表大会。现将大会召开的有关事项预通知如下。",
    date: "2021-09-28"
  },
  {
    title: "关于组织开展2020年秋冬学期推荐优秀团员作入党积极分子的通知",
    subtitle: " 推荐优秀团员作党的发展对象（简称推优）是党赋予共青团的一项光荣任务。做好推优工作，是加强党员队伍建设，充实党的新生力量的需要，也是激发广大团员青年的政治热情，增强共青团组织吸引力和凝聚力的必然要求。现就2020年秋冬学期推优工作相关事宜说明如下。",
    date: "2020-10-13"
  },
  {
    title: "关于开展2018-2019学年团内评奖评优工作的通知",
    subtitle: "2018-2019学年，我校各基层团组织、全体团员青年和广大团干部深入学习宣传习近平新时代中国特色社会主义思想和党的十九大精神，认真贯彻习近平总书记关于青年工作的重要思想和团的十八大精神，紧紧围绕学校中心工作，为浙江大学双一流建设贡献力量，秉持不断开拓创新的理念，在团的思想引领、组织建设、社会实践、创新创业、志愿服务、校园文化建设等方面成效显著，涌现出了一批工作扎实、成绩突出的优秀个人和先进集体。为总结经验，表彰先进，现开展2018-2019学年团内评奖评优工作。",
    date: "2019-04-08"
  },
  {
    title: "关于组织开展2019年春夏学期推荐优秀团员作党的发展对象工作的通知",
    subtitle: "2018-2019学年，我校各基层团组织、全体团员青年和广大团干部深入学习宣传习近平新时代中国特色社会主义思想和党的十九大精神，认真贯彻习近平总书记关于青年工作的重要思想和团的十八大精神，紧紧围绕学校中心工作，为浙江大学双一流建设贡献力量，秉持不断开拓创新的理念，在团的思想引领、组织建设、社会实践、创新创业、志愿服务、校园文化建设等方面成效显著，涌现出了一批工作扎实、成绩突出的优秀个人和先进集体。为总结经验，表彰先进，现开展2018-2019学年团内评奖评优工作。", 
    date: "2019-03-12"
  },
  {
    title: "关于开展2018年度计算机学院和软件学院团情况统计与团费收缴工作的通知",
    subtitle: "根据上级团组织要求和实际工作需要，计算机学院和软件学院团委决定开展2018年度团情况统计及团费收缴工作，现将相关事宜通知如下：",
    date: "2018-12-10"
  },
];

</script>

<style>
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

<style scoped>
.position-relative {
  position: relative;
}

.edit-link {
  position: absolute;
  top: 10px;
  right: 20px;
  display: flex;
  align-items: center;
  color: #1976d2;
  font-size: 0.9rem;
  text-decoration: none;
}

.edit-link:hover {
  color: #1565c0;
  text-decoration: underline;
}
</style>