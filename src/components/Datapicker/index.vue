<template>
    <div>
        <!-- 时间查询 -->
        <el-date-picker
        v-model="datepicker1"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期" 
        format="yyyy-MM-dd" value-format="yyyy-MM-dd"
        @change="dataSearch"
        :picker-options="pickerOptions">
        </el-date-picker>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        datepicker1: '',
      };
    },
    methods:{
        dataSearch(){
            // console.log(this.datepicker1)
             this.$emit('dateValue', this.datepicker1)
        }
    }
  };
</script>