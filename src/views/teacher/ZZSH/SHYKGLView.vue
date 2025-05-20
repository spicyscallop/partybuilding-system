

<template>

  <v-container style="padding-bottom: 45px">
    <v-row><SubpageTitle text="三会一课管理" svg="/src/img/FZJD/发展党员.svg" :width=43 :height=43></SubpageTitle></v-row>
  </v-container>
  <v-row style="padding-left: 20px;padding-bottom: 25px">
    <el-button type="danger" @click="addclick">添加</el-button>
    <el-button type="danger" @click="delclick">删除勾选</el-button>
  </v-row>
  <v-row >
    <el-table  style="border-radius: 15px;background-color: #F7F7F7;"
               ref="multipleTable" :data="this.tableData"  @selection-change="handleSelectionChange"
               :header-cell-style="headerRowStyle" :cell-style="headerRowStyle">
      <el-table-column type="selection" width="55" />

        <el-table-column v-for="tcolumn in this.columnList" :property="tcolumn.prop" :label="tcolumn.label"  >

        </el-table-column>

    </el-table>
  </v-row>
</template>

<style scoped>

</style>
<script>
import SubpageTitle from '@/components/SubpageTitle.vue';
import { toRaw } from 'vue'
export default {
  components: {
    SubpageTitle
  },
  data() {
    return {
      headerRowStyle:{
        backgroundColor: '#F7F7F7',
        color: '#3E3E3E',
      },
      columnList:
      [
        {
          label: '标题',
          prop: 'topic',
        },
        {
          label: '分类',
          prop: 'classification',
        },
        {
          label: '人数',
          prop: 'memberCount',
        },
        {
          label: '时长',
          prop: 'lessonTime',
        },
        {
          label: '位置',
          prop: 'location',
        },
        {
          label: '费用',
          prop: 'fee',
        },
        {
          label: '支部编号',
          prop: 'branchId',
        },
      ],
      pageData:{
        pageSize:20,
        pageNumber:1,
        searchCount:true,
      },
      totalNum:0,
      totalPage:0,
      tableData:[],
      selectData:[]
    }


  },
  methods:{
    getFirstPage()
    {
      console.log(1111)
      const requestData={
        page:this.pageData
      }
      this.$axios.post("/meeting/page",requestData)
          .then(response => {
            const tdata=response.data
            //console.log(tdata.records)
            this.tableData=tdata.records
            this.totalNum=tdata.total
            this.totalPage=parseInt((tdata.total-1)/this.pageData.pageSize)+1
            //this.pageData.totalNum=response.data
            //console.log(this.totalNum,this.totalPage)
            //console.log(this.tabledata)
          })
          .catch(error => {
            console.error('请求失败:', error);
          });
    },
    handleSelectionChange(val)
    {
      const rawData = val
      this.selectData=rawData
    },
    delclick()
    {
        const delList=[]
        for(var i=0;i<this.selectData.length;i++)
        {
          delList.push(this.selectData[i].id)
        }
        //console.log(delList)
        alert(this.$axios.post("/meeting/deleteByBatch",delList).msg)
        window.location.reload();
    }

  },
  mounted(){
    this.getFirstPage()

  }

}


</script>