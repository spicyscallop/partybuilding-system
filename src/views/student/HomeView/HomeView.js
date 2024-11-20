
import SubpageTitle from '@/components/SubpageTitle.vue';
import ListCard from '@/components/ListCard.vue';
import UnReadListCard from '@/components/homepage/UnReadListCard.vue';
import IconParty from '@/components/icons/IconParty.vue';
import IconPhases from '@/views/student/FZJDView/components/IconPhases.vue'
import { authentication } from '@/stores/authentication';
import { getUserInfo, getCenterNumber1, getCenterNumber2, getUnreadMessages } from '@/http/api';
import axios from "axios";
import dayjs from "dayjs";
import qs from 'qs';
import { toPre0String } from '@/utils/StringUtils.js'



export default {
    components: {
        IconParty,
        SubpageTitle,
        ListCard,
        UnReadListCard,
        IconPhases
    },
    emits: ["drawerToggle"],
    data() {
        return {
            messages: null,
            userInfo: {
                userName:"郭宗豪",
                sex:1,
                userId:"22351006",
                politicsStatus:"共青团员",
                developmentPhase:"积极分子",
                partyBranch:"电子信息2306党支部"
            },
            sexMap: ["未知", "男", "女"],
            centerNumber:{
                nowStudyHour:toPre0String(0,2),
                allStudyHour:toPre0String(0,2)
            },
            xxyb: [
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
                    subtitle: "5月21日，示范性软件学院二十周年建设成果交流大会在京召开。会议主题为“从示范性软件学院建设看新时代高等教育改革”。教育部高等教育司副司长王启明、教育部高校学生司副司长吴爱华，教育部高等教育司理工处盛晓光，中国工程院院士、原教育部高等教育司司长张尧学，中国工程院院士、清华大学教授孙家广，中国工程院院士、国防科技大学教授廖湘科，中国软件行业协会副理事长兼秘书长、北京航空航天大学副校长吕卫锋，以及37所国家示范性软件学院师生代表及合作企业代表240余人参会。",
                    date: "2023-05-22"
                },
                {
                    title: "“韶年涌动，梦想生辉”|浙江大学在甬研究生文艺汇演暨浙江大学研究生艺术团校庆专场演出顺利举行！",
                    subtitle: "为庆祝浙江大学建校126周年华诞，加强异地校区间的沟通合作与交流，进一步感悟求是文化内涵。2023年5月7日下午，浙江大学宁波科创中心（宁波校区）联合浙江大学党委研究生工作部，以“艺”会友，共同举办“韶年涌动，梦想生辉”浙江大学在甬研究生文艺汇演暨浙江大学研究生艺术团校庆专场演出。",
                    date: "2023-05-21"
                },
                {
                    title: "院长下午茶”第二期活动：拥抱开源，引领创新",
                    subtitle: "2023年4月27日晚上，软件学院“院长下午茶”第二期活动在学院咖啡吧举办。学院常务副院长尹建伟、副院长陈丽出席活动，副研究员才振功、特聘研究员倪超以及20名研究生代表参加。活动由学院党委副书记胡高权主持。",
                    date: "2023-04-27"
                },
                {
                    title: "软件学院教工党支部召开学习贯彻习近平新时代中国特色社会主义思想主题教育动员会",
                    subtitle: "4月25日，软件学院教工党支部在教学楼一楼展厅会议室召开学习贯彻习近平新时代中国特色社会主义思想主题教育动员会。会上，学院党委副书记胡高权带领全体党员深入学习了习近平总书记对浙江大学重要指示精神和浙江大学第十五次党代会精神，对深入开展学习贯彻习近平新时代中国特色社会主义思想主题教育工作进行传达和动员。",
                    date: "2023-04-26"
                },
                {
                    title: "“党建引领、数智先行”——宁波市大数据中心来我院开展党建共建活动",
                    subtitle: "为进一步学习贯彻落实党的二十大精神，丰富党建形式，搭建党建平台，提升党建工作水平，促进经验交流与学习，4月14日，宁波市大数据管理服务中心主任、党支部书记陈剑波一行来软件学院交流研讨党建工作。市大数据管理服务中心相关科室负责人，软件学院副院长陈丽、党委副书记胡高权和教师学生代表参加了本次活动。",
                    date: "2023-04-20"
                },
                {
                    title: "浙江大学软件学院举行2022级研究生新生党员大会",
                    subtitle: "2022年9月20日下午，软件学院2022级研究生新生党员大会在教学楼N312举行。计算机学院和软件学院党委书记彭列平、副书记胡高权，2022级研究生新生党员参加会议。会议由党委副书记胡高权主持。",
                    date: "2023-04-11"
                },
                {
                    title: "喜报 | 首个互联网医疗健康服务ISO国际标准获批立项",
                    subtitle: "近日，由我院尹建伟教授、邓水光教授团队主导的两项国际标准提案ISO/TS 5777 Health Informatics—The architecture of Internet healthcare service network及ISO/TS 5788 Health Informatics—Internet healthcare service pattern经过为期两个月的立项投票，获得了来自中国、美国、德国、英国、日本、韩国、印度、伊朗、尼日利亚等多国家的专家支持，成功满足立项条件，正式获批立项。",
                    date: "2023-04-09"
                }
            ],
            xtgg: [
                {
                    title: "关于公示2022-2023学年软件学院团内评奖评优初评结果的通知",
                    subtitle: "根据《软件学院团委关于开展2022-2023学年团内评奖评优工作的通知》的相关要求，经学生自主申报、团支部推荐，学院团委审核决定，拟推荐34名团员参评浙江大学“优秀团员”荣誉称号；推荐22名团干部参评浙江大学“优秀团干部”荣誉称号；推荐3个团支部参评浙江大学“先进团支部”荣誉称号。26名团员被评为软件学院“优秀团员”称号， 17名团员被评为软件学院“优秀团干部”称号。",
                    date: "2023-04-18"
                },
                {
                    title: "软件学院团委关于开展2022-2023学年团内评奖评优工作的通知",
                    subtitle: "2022-2023学年，我校各基层团组织、全体团员青年和广大团干部坚持以习近平新时代中国特色社会主义思想为指导，认真学习贯彻党的二十大精神，认真贯彻习近平总书记关于青年工作的重要思想和团的十八大精神，紧密围绕学校“双一流”建设目标，秉承创新发展理念，在组织建设、思想引领、实践育人、以文化人、学生组织建设等多个方面取得了新突破，涌现出了一批工作扎实、成绩突出的优秀个人和先进集体。为总结经验，表彰先进，根据校团委《关于开展2022-2023学年团内评奖评优工作的通知》，现开展2022-2023学年团内评奖评优工作。",
                    date: "2023-04-12"
                },
                {
                    title: "关于组织开展浙江大学2022-2023学年“学习贯彻二十大 踔厉奋发新征程” 寒假大学生社会实践活动的通知",
                    subtitle: "为深入贯彻中共中央关于认真学习宣传贯彻党的二十大精神的决定，紧密结合我校“双一流”建设和人才培养目标，充分发挥社会实践在加强和改进大学生思想政治教育中的重要作用，积极构建扎根铸魂实践育人的长效机制，引导广大青年学生心怀“国之大者”，奋力“走在前列”，深入基层、认识国情、接受锻炼、磨练意志，在学思践悟中服务人民、奉献社会、报效祖国，将党的二十大精神内化于心、外化于行。结合浙江大学大学生社会实践领导小组办公室决定今年寒假继续开展大学生社会实践活动的相关指导，学院社会实践工作领导小组现将有关事项通知如下：",
                    date: "2023-04-10"
                },
                {
                    title: "关于组织开展首届浙江大学十佳志愿者之星评选的通知",
                    subtitle: "为深入学习贯彻党的二十大精神，以习近平新时代中国特色社会主义思想为统领，弘扬“奉献、友爱、互助、进步”的志愿精神，充分发挥志愿服务在加强和改进大学生思想政治教育中的重要作用，发挥先进典型示范引领作用，积极营造“志愿者，大学生活新风尚”的校园文化氛围。经研究决定，开展首届浙江大学青年志愿者之星评选，现将有关事宜通知如下：",
                    date: "2023-04-06"
                },
                {
                    title: "关于2022-2023学年冬学期第二课堂、第三课堂申报和审核的通知",
                    subtitle: "学院团委将在2022-2023学年冬学期第六周启动第二课堂、第三课堂记点审核工作，请各位同学提前准备好证明材料。现将有关事项通知如下：",
                    date: "2023-04-01"
                },
                {
                    title: "关于开展2022年团支部“对标定级”工作通知",
                    subtitle: "根据团中央工作安排，为推进全团基层组织标准化、规范化建设，建立基层团组织规范运行、对标定级的常态化机制和适应团员流动性的基层组织体系，进一步加强我校我院共青团的基层组织建设，学院团委决定组织开展2022年基层团（总）支部“对标定级”工作，具体通知如下。",
                    date: "2023-03-12"
                },
                {
                    title: "关于召开中国共产主义青年团浙江大学第二十一次代表大会的预通知",
                    subtitle: "根据《中国共产主义青年团章程》的有关规定及我校实际情况，拟于2021年12月上旬召开中国共产主义青年团浙江大学第二十一次代表大会。现将大会召开的有关事项预通知如下。",
                    date: "2021-09-28"
                },
                {
                    title: "关于组织开展2020年秋冬学期推荐优秀团员作入党积极分子的通知",
                    subtitle: " 推荐优秀团员作党的发展对象（简称“推优”）是党赋予共青团的一项光荣任务。做好“推优”工作，是加强党员队伍建设，充实党的新生力量的需要，也是激发广大团员青年的政治热情，增强共青团组织吸引力和凝聚力的必然要求。现就2020年秋冬学期“推优”工作相关事宜说明如下。",
                    date: "2020-10-13"
                },
                {
                    title: "关于开展2018-2019学年团内评奖评优工作的通知",
                    subtitle: "2018-2019学年，我校各基层团组织、全体团员青年和广大团干部深入学习宣传习近平新时代中国特色社会主义思想和党的十九大精神，认真贯彻习近平总书记关于青年工作的重要思想和团的十八大精神，紧紧围绕学校中心工作，为浙江大学“双一流”建设贡献力量，秉持不断开拓创新的理念，在团的思想引领、组织建设、社会实践、创新创业、志愿服务、校园文化建设等方面成效显著，涌现出了一批工作扎实、成绩突出的优秀个人和先进集体。为总结经验，表彰先进，现开展2018-2019学年团内评奖评优工作。",
                    date: "2019-04-08"
                },
                {
                    title: "关于组织开展2019年春夏学期推荐优秀团员作党的发展对象工作的通知",
                    subtitle: "2018-2019学年，我校各基层团组织、全体团员青年和广大团干部深入学习宣传习近平新时代中国特色社会主义思想和党的十九大精神，认真贯彻习近平总书记关于青年工作的重要思想和团的十八大精神，紧紧围绕学校中心工作，为浙江大学“双一流”建设贡献力量，秉持不断开拓创新的理念，在团的思想引领、组织建设、社会实践、创新创业、志愿服务、校园文化建设等方面成效显著，涌现出了一批工作扎实、成绩突出的优秀个人和先进集体。为总结经验，表彰先进，现开展2018-2019学年团内评奖评优工作。",
                    date: "2019-03-12"
                },
                {
                    title: "关于开展2018年度计算机学院和软件学院团情况统计与团费收缴工作的通知",
                    subtitle: "根据上级团组织要求和实际工作需要，计算机学院和软件学院团委决定开展2018年度团情况统计及团费收缴工作，现将相关事宜通知如下：",
                    date: "2018-12-10"
                },
            ],
        }
    },
    methods:{
        getUserInfoV(userNumber) { // 根据学号获取个人信息
            getUserInfo(userNumber).then(res=>{
                // console.log(res)
                this.code = res.code
                if(res.success){
                    console.log('getUserInfo success')
                    this.userInfo.userName = res.data.userName
                    this.userInfo.sex = Number(res.data.sex)
                    this.userInfo.userId = res.data.userNumber 
                    this.userInfo.politicsStatus = res.data.politicsStatus
                    this.userInfo.developmentPhase = res.data.developmentPhase
                    this.userInfo.partyBranch = res.data.partyBranch
                    this.messages = res.messages
                }
                else{
                    console.log('getUserInfo fail')
                    this.userInfo.userName = ""
                    this.userInfo.sex = 0
                    this.userInfo.userId = 
                    this.userInfo.politicsStatus = ""
                    this.userInfo.developmentPhase = ""
                    this.userInfo.partyBranch = ""
                }
            })
        },
        getCenterNumberV(userNumber){ // 根据学号获取培训总时长、当前阶段培训时长 接口待完善，请勿删
            getCenterNumber1(userNumber).then(res=>{
                this.code = res.code
                if(res.success){
                    this.centerNumber.nowStudyHour = toPre0String(res.data, 2)
                    this.messages = res.messages
                }
                else{
                    this.centerNumber.nowStudyHour = toPre0String(1, 2)
                }
            })
            getCenterNumber2(userNumber).then(res=>{
                this.code = res.code
                if(res.success){
                    this.centerNumber.allStudyHour = toPre0String(res.data, 2)
                    this.messages = res.messages
                }
                else{
                    this.centerNumber.allStudyHour = toPre0String(2, 2)
                }
            })
        },
        getUnreadMessagesV(userId){ // 获取未读消息
            getUnreadMessages(userId).then(res=>{
                // console.log(res)
                this.code = res.code
                if(res.success){
                    console.log('getUnreadMessages success')
                    this.xtgg = res.data
                    for (const item of this.xtgg) {
                        item.date = item.createTime;
                    }
                }
                else{
                    console.log('getUnreadMessages fail')
                    this.xtgg = [
                        {
                            title: "关于公示2022-2023学年软件学院团内评奖评优初评结果的通知",
                            subtitle: "根据《软件学院团委关于开展2022-2023学年团内评奖评优工作的通知》的相关要求，经学生自主申报、团支部推荐，学院团委审核决定，拟推荐34名团员参评浙江大学“优秀团员”荣誉称号；推荐22名团干部参评浙江大学“优秀团干部”荣誉称号；推荐3个团支部参评浙江大学“先进团支部”荣誉称号。26名团员被评为软件学院“优秀团员”称号， 17名团员被评为软件学院“优秀团干部”称号。",
                            date: "2023-04-18"
                        },
                    ]
                }
            })
        }
    },
    mounted: function () {
        const auth = authentication();
        this.getUserInfoV(auth.userNumber)
        this.getCenterNumberV(auth.userNumber)
        this.getUnreadMessagesV(auth.userId)
        
    },
}