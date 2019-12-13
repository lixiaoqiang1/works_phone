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
            <el-table stripe  :data="userList.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
                <el-table-column prop="isdate" label="日期"></el-table-column>
                <el-table-column prop="isphone" label="客户电话"></el-table-column>
                <el-table-column prop="sendtimes" label="发送/接收时间"></el-table-column>
                <el-table-column prop="smstype" label="短信类型"
                :filters="[{ text: '接收', value: '接收' },{ text: '发送', value: '发送' },]"
                :filter-method="filterTtype"
                filter-placement="bottom-end"></el-table-column>
                <el-table-column prop="sms_content" label="短信内容" width="300"></el-table-column>
                <el-table-column prop="isname" label="员工姓名"></el-table-column>
                <el-table-column prop="department" label="部门"></el-table-column>
                <el-table-column prop="role" label="角色" 
                :filters="[{ text: '顾问', value: '顾问' },{ text: '部门主管', value: '部门主管' },{ text: '负责人', value: '负责人' }]"
                :filter-method="filterTag"
                filter-placement="bottom-end"></el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 20, 40]" 
                :page-size="pagesize"         
                layout="total, sizes, prev, pager, next, jumper"
                :total="userList.length">   
            </el-pagination>
        </div>
        <!-- 表格end -->
    </div>
</template>
<script>
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
        currentPage:1, //初始页
        pagesize:5,    //    每页的数据
        userList: []//table数据
      };
    },
    created: function () {
        //表格渲染
        this.handleUserList();
    },
    methods: {
        //表导航筛选
        //短信类型
        filterTtype(value, row) {
            return row.smstype === value;
        },
        //角色
        filterTag(value, row) {
            return row.role === value;
        },
        //是否接通
        filterjt(value, row) {
            return row.through === value;
        },
        // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange: function (size) {
            this.pagesize = size;
            console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange: function(currentPage){
            this.currentPage = currentPage;
            console.log(this.currentPage)  //点击第几页
        },
        handleUserList() {
            //表格渲染
            let _this = this;
            _this.axios.get('/api/duanxin').then((res)=>{
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
</style>