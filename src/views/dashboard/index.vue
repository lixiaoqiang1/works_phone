<style scoped>
.card_o{
  width: 100%;display: block;margin: 25px 0;
}
.card-panel-col{
  cursor: pointer;
}
.card-panel{
  font-size: 20px;
  text-align: center;
  line-height: 40px;
  border-left: 4px #fff solid;
}
.card-panel:hover{
  background: #eaf0fd;border-left: 4px #2d68ea solid;
}
.card-panel .card-panel-num{
  font-size: 30px;
  font-weight: bold;line-height: 60px;
}
.ve-line-o{
  margin-top: 10px
}
.clearfix{
  clear: both;
}
</style>
<template>
  <div class="">
    <div class="callvoice padding10">
      <!-- 时间查询 -->
      <datapicker v-on:dateValue="dateValue"></datapicker>
      <!-- 时间查询 -->
      <div class="card_o">
        <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
            <div class="card-panel-description">
              <div class="card-panel-text">新增微信好友</div>
              <count-to :start-val="0" :end-val="102" :duration="3600" class="card-panel-num" />
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('messages')">
            <div class="card-panel-description">
              <div class="card-panel-text">人均微信消息数</div>
              <count-to :start-val="0" :end-val="812" :duration="3600" class="card-panel-num" />
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('purchases')">
            <div class="card-panel-description">
              <div class="card-panel-text">人均通话时长</div>
              <count-to :start-val="0" :end-val="920" :duration="3600" class="card-panel-num" />
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('shoppings1')">
            <div class="card-panel-description">
              <div class="card-panel-text">人均通话次数</div>
              <count-to :start-val="0" :end-val="130" :duration="3600" class="card-panel-num" />
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('shoppings2')">
            <div class="card-panel-description">
              <div class="card-panel-text">通话接通率（%）</div>
              <count-to :start-val="0" :end-val="16" :duration="3600" class="card-panel-num" />
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('shoppings3')">
            <div class="card-panel-description">
              <div class="card-panel-text">敏感行为次数</div>
              <count-to :start-val="0" :end-val="13" :duration="3600" class="card-panel-num" />
            </div>
          </div>
        </el-col>
        <div class="clearfix"></div>
      </div>
    </div>
    <div class="ve-line-o callvoice padding10">
      <h5>{{title2}}</h5>
      <ve-line :data="chartData"></ve-line>
    </div>
  </div>
</template>

<script>
  import datapicker from '@/components/Datapicker'
  import countTo from 'vue-count-to';
  const chartData = {
    newVisitis: {
      title:'新增微信好友（最近一个月）',
      columns: ['日期', '访问用户', '下单用户', '下单率'],
      rows: [
              { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 322 },
              { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 226 },
              { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 762 },
              { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 492 },
              { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 3223 },
              { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 728 }
      ]
    },
    messages: {
      title:'人均微信消息数（最近7天）',
      columns: ['日期2', '访问用户2'],
      rows: [
              { '日期2': '1/1', '访问用户2': 1000},
              { '日期2': '1/2', '访问用户2': 2530},
              { '日期2': '1/3', '访问用户2': 2923},
              { '日期2': '1/4', '访问用户2': 2723},
              { '日期2': '1/5', '访问用户2': 2792},
              { '日期2': '1/6', '访问用户2': 2593}
      ]
    },
    purchases: {
      title:'人均微信消息数（最近7天）',columns: [],rows: []
    },
    shoppings1: {
      title:'人均通话时长（最近7天）',columns: [],rows: []
    },
    shoppings2: {
      title:'通话接通率（最近7天）',columns: [],rows: []
    },
    shoppings3: {
      title:'敏感行为次数（最近7天）',columns: [],rows: []
    },

  }
  export default {
    name:'ad',
    components: {datapicker, countTo },
    data(){
      return {
        
        startVal: 0,
        endVal: 2017,
        title2:chartData.newVisitis.title,
        chartData: chartData.newVisitis,
        // chartData: {
        //   title2:'新增微信好友',
        //   columns: ['日期', '访问用户', '下单用户', '下单率'],
        //   rows: [
        //     { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 322 },
        //     { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 226 },
        //     { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 762 },
        //     { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 492 },
        //     { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 3223 },
        //     { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 728 }
        //   ]
        // }
      }
    },
    methods:{
      dateValue: function (dateValue) {
        console.log(dateValue);
        console.log('1212')
      },
      handleSetLineChartData(type){
        console.log(type);
        this.chartData = chartData[type]
        this.title2 = chartData[type].title
        console.log(chartData[type])
      }
    }
  }
</script>