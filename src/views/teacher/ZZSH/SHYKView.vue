<template>
    <v-container fluid class="ma-0 fill-height bg-grey-lighten-5">
        <v-col class="d-flex fill-height flex-column">
            <v-row class="flex-shrink-0 flex-grow-0" style="flex-basis: 0; overflow: visible;">
                <v-col>
                <SubpageTitle text="组织生活" svg="/src/img/风采记录/record.png" width="43" height=43></SubpageTitle>
                </v-col>
            </v-row>
            <v-row><h3>支部组织生活</h3></v-row>

            <v-card>
                <v-card-title>三会一课数量</v-card-title>
                <v-card-subtitle>第一党支部</v-card-subtitle>
                <v-card-text>
                    <v-row>
                    <v-col cols="6">
                        <v-chart :options="donutChartOptions"></v-chart>
                    </v-col>
                    <v-col cols="6">
                        <v-chart :options="barChartOptions"></v-chart>
                    </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
            <div class="Echarts">
                <div id="main" style="width: 600px;height:400px;"></div>
            </div>
        </v-col>
    </v-container>
</template>

<script>
import SubpageTitle from '@/components/SubpageTitle.vue';
import "https://cdn.staticfile.org/echarts/4.3.0/echarts.min.js";

export default {
    components: {
        SubpageTitle
    },
    methods:{
	  myEcharts(){
		  // 基于准备好的dom，初始化echarts实例
		  var myChart = this.$echarts.init(document.getElementById('main'));

		  // 指定图表的配置项和数据
		  var option = {
			  title: {
				  text: 'ECharts 入门示例'
			  },
			  tooltip: {},
			  legend: {
				  data:['销量']
			  },
			  xAxis: {
				  data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
			  },
			  yAxis: {},
			  series: [{
				  name: '销量',
				  type: 'bar',
				  data: [5, 20, 36, 10, 10, 20]
			  }]
		  };

		  // 使用刚指定的配置项和数据显示图表。
		  myChart.setOption(option);
		  }
    },
    mounted() {
        this.myEcharts();
    }
}
</script>

<style>

</style>