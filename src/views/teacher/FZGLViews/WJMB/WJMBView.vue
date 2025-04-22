<style>

</style>
<template>
  <v-container>
  <v-row>
    <SubpageTitle text="文件模板管理" svg="/src/img/FZJD/发展党员.svg" :width=43 :height=43></SubpageTitle>
  </v-row>
<!--    <div v-for="tdata in tableData">{{ tdata.phase }}</div>-->
  <v-row style="flax">

    <v-col>
      <div>
        <el-tabs class="navmenu" type="border-card" stretch="true" no-gutters>
          <div v-for="tdata in tableData">
          <el-tab-pane :label="tdata.phase">
            <div style="height:40px"></div>
            <table style="width:100%;border-radius: 15px;background-color: #F7F7F7;">
              <thead>
              <tr>
                <th style="width:40%"><h4>具体环节</h4></th>
                <th style="width:20%">文件模板名称</th>
                <th style="width:20%">文件模板上传</th>
                <th style="width:20%">操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="rdata in tdata.data">
                <td>
                  {{rdata.huanjie}}
                </td>
                <td style="text-align: center">{{rdata.name}}</td>
                <td style="text-align: center">上传</td>
                <td style="text-align: center"><text>查看</text>/<text>删除</text>/<text>下载</text></td>
              </tr>
              </tbody>

            </table>

          </el-tab-pane>
          </div>
        </el-tabs>

      </div>

    </v-col>

  </v-row>
  </v-container>




</template>
<script>
import SubpageTitle from '@/components/SubpageTitle.vue';
export default
{
  components:{
    SubpageTitle
  },
  data: function () {
    return{
      tableData:[
        {
          phase: "入党申请人",
          data: [
            {
              huanjie:"temp",
              name:"入党申请书"
            },
          ]

        },
        {
          phase: "入党积极分子",
          data: {}
        },
        {
          phase: "发展对象",
          data: {}
        },
        {
          phase: "预备党员",
          data: {}
        },
        {
          phase: "正式党员",
          data: {}
        }
      ]
    }
  }
}


</script>
