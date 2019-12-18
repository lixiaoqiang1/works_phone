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
                <el-table-column prop="isdate" label="日期" width="140"></el-table-column>
                <el-table-column prop="isname" label="员工姓名">
                    <template scope="scope">
                        <a class="bule_color" @click="btn_names(scope.$index, scope.row)">{{ scope.row.isname }}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="department" label="部门"></el-table-column>
                <el-table-column prop="role" label="角色" 
                :filters="[{ text: '顾问', value: '顾问' },{ text: '部门主管', value: '部门主管' },{ text: '负责人', value: '负责人' }]"
                :filter-method="filterTag"
                filter-placement="bottom-end"></el-table-column>
                <el-table-column label="呼出总数">
                    <template scope="scope">
                        <a class="bule_color" @click="btn_details(scope.$index, scope.row)">{{ scope.row.breatheout1 }}</a>
                    </template>
                </el-table-column>
                <el-table-column label="呼出接通数">
                    <template scope="scope">
                        <a class="bule_color" @click="btn_details(scope.$index, scope.row)">{{ scope.row.breatheout2 }}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="breatheout3" label="呼出接通率"></el-table-column>
                <el-table-column prop="breatheout4" label="呼出总时长"></el-table-column>
                <el-table-column prop="breatheout5" label="呼出平均时长"></el-table-column>
                <el-table-column label="呼入总数">
                    <template scope="scope">
                        <a class="bule_color" @click="btn_details(scope.$index, scope.row)">{{ scope.row.inbound1 }}</a>
                    </template>
                </el-table-column>
                <el-table-column label="呼入接通数">
                    <template scope="scope">
                        <a class="bule_color" @click="btn_details(scope.$index, scope.row)">{{ scope.row.inbound2 }}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="inbound3" label="呼入接通率"></el-table-column>
                <el-table-column prop="inbound4" label="呼入总时长"></el-table-column>
                <el-table-column prop="inbound5" label="呼入平均时长"></el-table-column>
                <el-table-column label="通话总数">
                    <template scope="scope">
                        <a class="bule_color" @click="btn_details(scope.$index, scope.row)">{{ scope.row.callz }}</a>
                    </template>
                </el-table-column>
                <el-table-column label="接通总数">
                    <template scope="scope">
                        <a class="bule_color" @click="btn_details(scope.$index, scope.row)">{{ scope.row.jietongz }}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="gailv" label="总接通率"></el-table-column>
                <el-table-column prop="stonghua_time" label="通话总时长"></el-table-column>
                <el-table-column prop="pingjun_time" label="总平均时长"></el-table-column>
            </el-table>
            <!-- 分页 -->
            <page-nation :total="userList.length" @pageChange="pageChange"></page-nation>
            <!-- 分页end -->
        </div>
        <!-- 表格end -->
        <!-- 呼出总数 -->
        <el-dialog title="呼出总数" :visible.sync="dialogTableVisible">
            <el-table :data="gridData">
                <el-table-column property="date" label="日期"></el-table-column>
                <el-table-column property="name" label="姓名"></el-table-column>
                <el-table-column property="address" label="地址"></el-table-column>
            </el-table>
        </el-dialog>
        <!-- 呼出总数end -->
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
        userList: [],//table数据
        gridData: [{ date: '2016-05-02',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄'}],
        dialogTableVisible: false,

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
            _this.axios.get('/api/tonghuajilu2').then((res)=>{
                console.log(res.data.data);
                _this.userList = res.data.data
            }).catch((err)=>{
                console.log(err);
            })
        },
        //点击表格名字
        btn_names(index, row) {
            console.log(row.id);
           this.$router.push({ name:'records_detail', query: { id: row.id }})
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