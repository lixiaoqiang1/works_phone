<template>
    <div class="callvoice inner_template">
        <!-- 头部菜单 -->
        <div class="top_form">
            <div class="top_list">
                <el-date-picker
                v-model="data1"
                type="date"
                placeholder="选择日期">
                </el-date-picker>
            </div>
            <div class="top_list">
                <el-select v-model="bumen" placeholder="请选择员工部门">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="top_list">
                <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <div class="clearfix"></div>
        </div>
        <!-- 头部菜单end -->
        <!-- 表格 -->
        <div class="table">
            <el-table stripe  :data="userList.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
                <el-table-column prop="isdate" label="日期" width="180"></el-table-column>
                <el-table-column prop="beizhu" label="客户备注" width="180"></el-table-column>
                <el-table-column prop="phone" label="客户电话"></el-table-column>
                <el-table-column prop="type" label="通话类型"></el-table-column>
                <el-table-column prop="through" label="是否接通"></el-table-column>
                <el-table-column prop="start_time" label="通话开始时间"></el-table-column>
                <el-table-column prop="length_time" label="通话时长"></el-table-column>
                <el-table-column prop="isname" label="员工姓名"></el-table-column>
                <el-table-column prop="department" label="部门"></el-table-column>
                <el-table-column prop="role" label="角色"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <a>播放</a> <a>下载</a>
                        <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">下载</el-button> -->
                    </template>
                </el-table-column>
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
        data1:'',
        value2: '',
        options: [
            { value: '选项1',label: '黄金糕'}, 
            {value: '选项2',label: '双皮奶'}
        ],
        bumen: '',
        search:'',
        currentPage:1, //初始页
        pagesize:5,    //    每页的数据
        userList: []
      };
    },
    created: function () {
        //表格渲染
        this.handleUserList();
    },
    methods: {
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
    .table{
        width: 100%;margin-top: 15px;display: inline-block
    }
    .el-pagination{text-align: center;margin-top: 15px;}
</style>