<template>
    <div class="callvoice padding10">
        <!-- 头部菜单 -->
        <div class="top_form">
            <div class="top_list">
                <!-- 时间查询 -->
                <datapicker2 v-on:dateValue="dateValue"></datapicker2>
                <!-- 时间查询 -->
            </div>
            <div class="top_list">
                <el-select v-model="department1" placeholder="选择部门">
                    <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                    </el-option>
                </el-select>
            </div>
            <div class="top_list list_search">
                <el-input placeholder="搜索员工姓名" v-model="thisname" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="search1"></el-button>
                </el-input>
            </div>
            <div class="clearfix"></div>
        </div>
        <!-- 头部菜单end -->
        <!-- 表格 -->
        <div class="table">
            <el-table stripe :data="userList" style="width: 100%">
                <el-table-column prop="day" label="日期" width="140"></el-table-column>
                <el-table-column prop="username" label="员工姓名">
                    <template scope="scope">
                        <a class="bule_color" @click="btn_names(scope.$index, scope.row)">{{ scope.row.username }}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="department" label="部门"></el-table-column>
                <el-table-column prop="department_big" label="角色" 
                :filters="[{ text: '顾问', value: '顾问' },{ text: '部门主管', value: '部门主管' },{ text: '负责人', value: '负责人' }]"
                :filter-method="filterTag"
                filter-placement="bottom-end"></el-table-column>
                <el-table-column label="呼出总数">
                    <template scope="scope">
                        <a class="bule_color" @click="btn_details(scope.$index, scope.row)">{{ scope.row.dialed }}</a>
                    </template>
                </el-table-column>
                <el-table-column label="呼出接通数">
                    <template scope="scope">
                        <a class="bule_color" @click="btn_details(scope.$index, scope.row)">{{ scope.row.dialed_valid }}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="breatheout3" label="呼出接通率"></el-table-column>
                <el-table-column prop="dialed_duration" label="呼出总时长"></el-table-column>
                <el-table-column prop="breatheout5" label="呼出平均时长"></el-table-column>
                <el-table-column label="呼入总数">
                    <template scope="scope">
                        <a class="bule_color" @click="btn_details(scope.$index, scope.row)">{{ scope.row.telegram }}</a>
                    </template>
                </el-table-column>
                <el-table-column label="呼入接通数">
                    <template scope="scope">
                        <a class="bule_color" @click="btn_details(scope.$index, scope.row)">{{ scope.row.telegram_valid }}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="inbound3" label="呼入接通率"></el-table-column>
                <el-table-column prop="telegram_duration" label="呼入总时长"></el-table-column>
                <el-table-column prop="inbound5" label="呼入平均时长"></el-table-column>
                <el-table-column label="通话总数">
                    <template scope="scope">
                        <a class="bule_color" @click="btn_details(scope.$index, scope.row)">{{ scope.row.all }}</a>
                    </template>
                </el-table-column>
                <el-table-column label="接通总数">
                    <template scope="scope">
                        <a class="bule_color" @click="btn_details(scope.$index, scope.row)">{{ scope.row.all_valid }}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="gailv" label="总接通率"></el-table-column>
                <el-table-column prop="duration_all" label="通话总时长"></el-table-column>
                <el-table-column prop="pingjun_time" label="总平均时长"></el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="this.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="this.total">
            </el-pagination>
            <!-- 分页end -->
        </div>
        <!-- 表格end -->
        <!--  个人详情弹层 -->
        <el-dialog title="呼出总数" :visible.sync="dialogTableVisible" width="90%">
            <breathebox></breathebox>
        </el-dialog>
        <!--  个人详情弹层end -->
    </div>
</template>
<script>
import breathebox from '@/views/call/callrecords/breathe_box/index'     // 个人详情弹层
import datapicker2 from '@/components/Datapicker2'
import { company,callRecords } from '@/api/user'
  export default {
    components: {datapicker2,breathebox},
    data() {
      return {
        dateValue1:'',//日期选择
        department1: '',//员工部门
        options: [{ value1: '部门一',label2: '部门一'}, {value1: '部门二',label2: '部门二'}],
        thisname:'',//搜索姓名
        total:100,//总条数
        pageSize:50,//每页条数
        currentPage:'',//选择跳页
        currentPage4: 1,//当前页数
        userList: [],//table数据
        // gridData: [{ date: '2016-05-02',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄'}],
        dialogTableVisible: false,

      };
    },
    created: function () {
        //部门渲染
        this.companys();
        //表格渲染
        this.handleUserList();
    },
    methods: {
        //日期选择
        dateValue: function (dateValue) {
            this.dateValue1 = dateValue;
        },
        //查询
        search1(){
          //表格渲染
            let json1 = {
                day_start:this.dateValue1,
                department:this.department1,
                username:this.thisname
            }
            console.log(json1)
            //表格渲染
            callRecords(json1).then(res => {
                console.log(res.data.total);
                this.userList = res.data.lists;
                this.total = res.data.total
            }).catch(() => {
                this.$message.error('请求错误！');
            })
        },
        //表导航筛选
        //角色
        filterTag(value, row) {
            return row.role === value;
        },
        //每页条数
        handleSizeChange(val) {
            this.pageSize = val;
            this.handleUserList();
        },
        //选择某个页面
        handleCurrentChange(val) {
            this.currentPage = val;
            this.handleUserList();
        },
        companys(){
            //部门渲染
            company().then(res => {
                console.log(res.data);
                this.options = res.data
            }).catch(() => {
                this.$message.error('请求错误！');
            })
        },
        handleUserList() {
            //表格渲染
            let json1 = {
                pageSize:this.pageSize, //每页条数
                page:this.currentPage//选择跳页
            }
            //表格渲染
            callRecords(json1).then(res => {
                console.log(res.data);
                this.userList = res.data.lists;
                this.total = res.data.total
            }).catch(() => {
                this.$message.error('请求错误！');
            })
        },
        //点击表格名字
        btn_names(index, row) {
            console.log(row.id);
           this.$router.push({ name:'records_detail', query: { id: row.user_id }})
        },
        //点击表格数字
        btn_details(index, row) {
            console.log(row);
            this.dialogTableVisible = true
        }
    }
  };
</script>
<style >
    .top_form .top_list{
        width: 220px;float: left;margin: 0 15px 10px 0;
    }
    .top_form .list_search{
        width: 300px;
    }
    .table{
        width: 100%;margin-top: 15px;display: inline-block
    }
    .el-pagination{text-align: center;margin-top: 15px;}
</style>