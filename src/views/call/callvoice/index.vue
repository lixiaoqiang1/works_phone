<template>
    <div class="callvoice padding10">
        <!-- 头部菜单 -->
        <div class="top_form">
            <div class="top_list">
                <el-date-picker
                v-model="selectdata1"
                type="date"
                placeholder="选择日期">
                </el-date-picker>
            </div>
            <div class="top_list">
                <el-select v-model="department" placeholder="选择员工部门">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="top_list list_search">
                <el-input placeholder="搜索客户备注、电话、员工姓名" v-model="search" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <div class="clearfix"></div>
        </div>
        <!-- 头部菜单end -->
        <!-- 表格 -->
        <div class="table">
            <el-table stripe :data="userList.slice((page_index-1)*page_size,page_index*page_size)" style="width: 100%">
                <el-table-column prop="isdate" label="日期" width="180"></el-table-column>
                <el-table-column prop="beizhu" label="客户备注" width="180"></el-table-column>
                <el-table-column prop="isphone" label="客户电话"></el-table-column>
                <el-table-column prop="type" label="通话类型"
                :filters="[{ text: '呼出', value: '呼出' },{ text: '呼入', value: '呼入' },]"
                :filter-method="filterTtype"
                filter-placement="bottom-end"></el-table-column>
                <el-table-column prop="through" label="是否接通"
                :filters="[{ text: '已接通', value: '已接通' },{ text: '未接通', value: '未接通' },]"
                :filter-method="filterjt"
                filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <span :class="scope.row.through === '已接通' ? 'through_primary' : 'through_danger'">{{scope.row.through}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="start_time" label="通话开始时间"></el-table-column>
                <el-table-column prop="length_time" label="通话时长"></el-table-column>
                <el-table-column prop="isname" label="员工姓名"></el-table-column>
                <el-table-column prop="department" label="部门"></el-table-column>
                <el-table-column prop="role" label="角色" 
                :filters="[{ text: '顾问', value: '顾问' },{ text: '部门主管', value: '部门主管' },{ text: '负责人', value: '负责人' }]"
                :filter-method="filterTag"
                filter-placement="bottom-end"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <a class="bule_color">播放</a> <a class="danger_color">下载</a>
                        <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">下载</el-button> -->
                    </template>
                </el-table-column>
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
        options: [
            { value: '部门一',label: '部门一'}, 
            {value: '部门二',label: '部门二'}
        ],
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
            _this.axios.get('/api/tonghua').then((res)=>{
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
    .top_form .top_list{
        width: 220px;float: left;margin-right: 15px;
    }
    .top_form .list_search{
        width: 300px;
    }
    .table{
        width: 100%;margin-top: 15px;display: inline-block
    }
    .el-pagination{text-align: center;margin-top: 15px;}
    .through_primary{color:#666}
    .through_danger{color:#f56c6c}
</style>