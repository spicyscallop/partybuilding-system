

<template>
  <v-container>
    <v-row><SubpageTitle text="三会一课管理" svg="/src/img/FZJD/发展党员.svg" :width=43 :height=43></SubpageTitle></v-row>
  </v-container>

  <v-row>
    <el-table :data="tabledata">
      <el-table-column type="selection" width="55" />
      <div v-for="tcolumn in columnList">
        <el-table-column :property="tcolumn.prop" :label="tcolumn.label"  />
      </div>
    </el-table>
  </v-row>
</template>

<style scoped>

</style>
<script>
import SubpageTitle from '@/components/SubpageTitle.vue';
export default {
  components: {
    SubpageTitle
  },
  data() {
    return {
      columnList:
      [
        {
          label: '学工号',
          prop: 'userNumber',
        },
        {
          label: '学工号',
          prop: 'userNumber',
        },
        {
          label: '学工号',
          prop: 'userNumber',
        },
        {
          label: '学工号',
          prop: 'userNumber',
        },
        {
          label: '学工号',
          prop: 'userNumber',
        },

      ],
      page:{
        pageSize:20,
        pageNumber:1,
        searchCount:true,
e      },

      tabledata:[],

    }
  }
}
this.$axios.post("/meeting/page")
</script>