<template>
    <div class="callvoice_box">
        <!-- 表格 -->
        <div class="table" style="margin-top:0">
            <el-table stripe :data="userList" style="width: 100%">
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
    </div>
</template>
<script>
  export default {
    data() {
      return {
       total:100,//总条数
        pageSize:50,//每页条数
        currentPage:'',//选择跳页
        currentPage4: 1,//当前页数
        userList: []//table数据
      };
    },
    created: function () {
        //表格渲染
        this.handleUserList();
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
        handleUserList() {
            //表格渲染
            let json2 = {
                limit:this.pageSize, //每页条数
                page:this.currentPage//选择跳页
            }
            //表格渲染
            let _this = this;
            _this.axios.get('/api/tonghua').then((res)=>{
                console.log(res.data.data);
                _this.userList = res.data.data
            }).catch((err)=>{
                console.log(err);
            })
            //表格渲染
            // let _this = this;
            // _this.axios.get('/api/tonghuajilu').then((res)=>{
            //     console.log(res.data.data);
            //     _this.userList = res.data.data
            // }).catch((err)=>{
            //     console.log(err);
            // })
        }
    }
  };
</script>
<style scoped>
.el-pagination{text-align: center;margin-top: 15px;}
.through_primary{color:#666}
.through_danger{color:#f56c6c}
.el-dialog__body{padding: 0 20px 20px;}
</style>