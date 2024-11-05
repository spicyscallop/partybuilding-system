import SubpageTitle from '@/components/SubpageTitle.vue'
import DropDownBox from '@/components/dropDown/DropDownBox.vue'
import AttributeSelection from '@/components/dropDown/AttributeSelection.vue'
import { ArrowDown } from '@element-plus/icons-vue'
export default {
    components: {
        SubpageTitle,
        DropDownBox,
        AttributeSelection,
        ArrowDown,
    },
    data() {
        return {
            applyTime: '',
            tableBottom:{
                totalNum: 100,
                pageSizeList: [10,20,30,40]
            },
            queryItems:{
                userId:"",
                name:"",
                applyTime:"",
                branchSelect:"",
                pageIndex:1,
                pageSize:10,
            },
            checkedCols: ['学工号', '姓名', '联系培养人', '思想汇报提交时间', '积极分子确认时间', '《入党积极分子-考察登记表》提交时间', '党校参与培训时间'],
            colNames: ['学工号', '姓名', '联系培养人', '思想汇报提交时间', '积极分子确认时间', '《入党积极分子-考察登记表》提交时间','党校参与培训时间'],
            visList: [true, true, true, true, true, true],
            selectedOption: '请选择党支部',
            options: [
                { label: '第一党支部', value: '第一党支部' },
                { label: '第二党支部', value: '第二党支部' },
                { label: '第三党支部', value: '第三党支部' },
                { label: '第四党支部', value: '第四党支部' }
            ],
            tableData: [
                {
                    userId: '22351006',
                    name: '郭宗豪',
                    contactTrainer: 'fawef',
                    reportSubmissionTime: '2023-01-30',
                    confirmationTime: '2023-01-30',
                    tableSubmissionTime: '2023-01-30',
                    participationTime: '2023-01-30'
                },
            ],
        }
    },
    methods: {
        queryList(){
            console.log("执行了查询列表的请求")
        },
        clearInputMessage(){
            this.queryItems.userId=""
            this.queryItems.name=""
            this.queryItems.applyTime=""
        },
        changeCheckCols(indexList) {
            console.log("cols变化")
            let checkedCols = []
            for (let i = 0; i < indexList.length; i++) {
                checkedCols.push(this.colNames[indexList[i]])
            }
            this.checkedCols = checkedCols
            this.handleCheckChange()
        },
        handleOptionChange(newOption) {
            // 处理选项变化的逻辑，例如更新父组件的数据
            console.log('选项变化：', newOption);
            this.selectedOption = newOption

        },
        handleCheckChange() {
            console.log(this.checkedCols)
            for (var i = 0; i < this.colNames.length; i++) {
                var flag = false
                for (var j = 0; j < this.checkedCols.length; j++) {
                    if (this.colNames[i] == this.checkedCols[j]) {
                        flag = true
                        break;
                    }
                }
                this.visList[i] = flag
            }
        },
        handleCommand(command) {
            console.log(command)
            this.selectedOption = command
        },
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.queryItems.pageSize=val
            this.queryList()
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.queryItems.pageIndex=val
            this.queryList()
        },
        rowStyle({ row, rowIndex }) {
            // 在这里根据每一行的数据返回样式对象
            return {
                color: '#3E3E3E', // 设置字体颜色为红色
                backgroundColor: '#F7F7F7',
                border: '#2E2E2E'
            };
        },
        headerRowStyle() {
            return {
                backgroundColor: '#F7F7F7',
                color: '#3E3E3E', // 设置字体颜色为红色
            }
        }

    },
    computed: {

    },
    mounted: function () {
    },
    destroyed() {
        this.event()
    }
}