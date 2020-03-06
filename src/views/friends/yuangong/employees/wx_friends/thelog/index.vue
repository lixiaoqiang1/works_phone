<template>
    <div class="callvoice padding10">
        <!-- 表格 -->
        <div class="table">
            <el-table stripe :data="userList.slice((page_index-1)*page_size,page_index*page_size)" style="width: 100%">
                <el-table-column prop="type1" label="类型"></el-table-column>
                <el-table-column prop="imei" label="IMEI"></el-table-column>
                <el-table-column prop="isip" label="IP"  ></el-table-column>
                <el-table-column prop="weizhi" label="位置信息"></el-table-column>
                <el-table-column prop="times1" label="操作时间"></el-table-column>
                <el-table-column prop="yuangong" label="设备绑定员工"></el-table-column>
            </el-table>
            <!-- 分页 -->
            <page-nation :total="userList.length" @pageChange="pageChange"></page-nation>
            <!-- 分页end -->
        </div>
        <!-- 表格end -->
    </div>
</template>
<script>
import pageNation from '@/components/pageNation/index'     // 引入分页
  export default {
    data() {
      return {
        selectdata1:'',//日期选择
        department: '',//员工部门
        options: [{ value: '部门一',label: '部门一'}, {value: '部门二',label: '部门二'}],
        search:'',//搜索
        page_index: 1, // 初始页
	      page_total: 200, // 总数据条数
        page_size: 8,//每页数量
        userList: []//table数据
      };
    },
    created: function () {
        //表格渲染
        this.handleUserList();
    },
    components: {
      pageNation
    },
    methods: {
        //表导航筛选
        //通话类型
        filterTtype(value, row) {
            return row.type === value;
        },
        //角色
        filterTag(value, row) {
            return row.role === value;
        },
        //是否接通
        filterjt(value, row) {
            return row.through === value;
        },
        // 初始页page_index、初始每页数据数page_size和数据data
        pageChange (item) {
          console.log(item)
          this.page_index = item.page_index;
          this.page_size = item.page_limit;
          // this.initData() //改变页码，重新渲染页面
        },
        handleUserList() {
            //表格渲染
            let _this = this;
            _this.axios.get('/api/ruzhi1').then((res)=>{
                console.log(res.data.data);
                _this.userList = res.data.data
            }).catch((err)=>{
                console.log(err);
            })
        }
    }
  };
</script>
<style >
    .wxid img{
      width: 48px;height: 48px;
    }
    .wx_list{
      width: 100%;margin-left: 5px
    }
    .table{
        width: 100%;margin-top: 15px;display: inline-block
    }
    .el-pagination{text-align: center;margin-top: 15px;}
    .through_primary{color:#666}
    .through_danger{color:#f56c6c}
</style>