<style scoped>
    .top_form .top_list{
        width: 220px;float: left;margin: 0 15px 10px 0;
    }
    .top_form .idbtn{
        width: 100px;
    }
    .top_form .list_search{
        width: 300px;
    }
    .table{
        width: 100%;margin-top: 0;display: inline-block
    }
    .audio_o{
        text-align: right;
    }
    .el-pagination{text-align: center;margin-top: 15px;}
    .through_primary{color:#666}
    .through_danger{color:#f56c6c}
</style>
<template>
    <div class="callvoice padding10">
        <!-- 头部菜单 -->
            <el-form class="top_form" ref="form">
                <div class="top_list">
                    <!-- 时间查询 -->
                    <datapicker2 v-on:dateValue="dateValue"></datapicker2>
                    <!-- 时间查询 -->
                </div>
                <div class="top_list">
                    <el-select v-model="department1" placeholder="选择员工部门">
                        <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                        </el-option>
                    </el-select>
                </div>
                <el-input class="top_list" placeholder="请输入微信号" v-model="weixin">
                    <template slot="prepend">微信号</template>
                </el-input>
                <el-input class="top_list" placeholder="请输入昵称" v-model="name">
                    <template slot="prepend">昵称</template>
                </el-input>
                <el-input class="top_list" placeholder="请输入备注" v-model="beizhu">
                    <template slot="prepend">备注</template>
                </el-input>
                <el-button class="top_list idbtn" type="primary" @click="search1">查询</el-button>
            <div class="clearfix"></div>
          </el-form>
        <!-- 头部菜单end -->
        <div class="audio_o">
            <audio ref="audio" style="width: 178px;height: 34px;" :src="url1" title="你好" autoplay controls="controls" preload></audio>
        </div>
        <!-- 表格 -->
        <div class="table">
            <el-table stripe :data="userList" style="width: 100%">
                <el-table-column prop="day" label="日期"></el-table-column>
                <el-table-column prop="remark" label="客户备注" width="180"></el-table-column>
                <el-table-column prop="number" label="客户电话"></el-table-column>
                <el-table-column prop="type" label="通话类型" :formatter="case_type"
                :filters="[{ text: '呼入', value: 1 },{ text: '呼出', value: 2 }]"
                :filter-method="filterTtype"
                filter-placement="bottom-end"></el-table-column>
                <el-table-column prop="type" label="是否接通" :formatter="case_type1"
                :filters="[{ text: '未接通', value: '未接通'},{ text: '已接通', value: '已接通'}]"
                :filter-method="filterTtype"
                filter-placement="bottom-end"></el-table-column>
                <el-table-column prop="call_time" label="通话开始时间">
                    <template slot-scope="scope">
                        <span>{{parseTimeStr(scope.row.call_time)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="duration" label="通话时长"></el-table-column>
                <el-table-column prop="username" label="员工姓名"></el-table-column>
                <el-table-column prop="department" label="部门"></el-table-column>
                <el-table-column prop="Position" label="角色" 
                :filters="[{ text: '顾问', value: '顾问' },{ text: '部门主管', value: '部门主管' },{ text: '分公司负责人', value: '分公司负责人' }]"
                :filter-method="filterTag"
                filter-placement="bottom-end"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <a class="bule_color" @click="btn_bofang(scope.$index, scope.row)">播放</a>
                        <a class="danger_color" @click="btn_download(scope.$index, scope.row)">下载</a>
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
  import datapicker2 from '@/components/Datapicker2'
  import {company, records } from '@/api/user'
  import { parseTime } from '@/utils/index'
  export default {
    components: {datapicker2},//别忘了引入组件
    data() {
      return {
        url1:'',
        dateValue1:'',//日期选择
        department1: '',//员工部门
        weixin:'',//微信号
        name:'',//昵称
        beizhu:'',//备注
        search:'',//搜索
        options: [
            { value: '部门一',label: '部门一'}, 
            {value: '部门二',label: '部门二'}
        ],
        total:100,//总条数
        pageSize:50,//每页条数
        currentPage:'',//选择跳页
        currentPage4: 1,//当前页数
        userList: []//table数据
      };
    },
    created: function () {
        //部门渲染
        this.companys();
        //表格渲染
        this.handleUserList();
    },
    methods: {
        //时间戳转化
        parseTimeStr (val){
            return parseTime(val)
        },
        //日期选择
        dateValue: function (dateValue) {
            this.dateValue1 = dateValue;
        },
        //表导航筛选
        //通话类型
        filterTtype(value, row) {
            return row.type === value;
        },
        //角色
        filterTag(value, row) {
            return row.position === value;
        },
        //是否接通
        filterjt(value, row) {
            return row.through === value;
        },
      //查询
      search1(){
        this.handleUserList();
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
            page:this.currentPage,//选择跳页
            day_start:this.dateValue1,

            department:this.department1,
            loan_id:this.weixin,
            username:this.name,
            department:this.department1,
            beizhu:this.beizhu
          }
          //表格渲染
            records(json1).then(res => {
                this.userList = res.data.lists;
                this.total = res.data.total;    
                }).catch(() => {
                    this.$message.error('请求错误！');
            })
      },
      //播放音频
      btn_bofang(index,row){
          console.log('111')
          this.url1 = 'https://'+ row.recording_path
          this.$refs.audio.play()
      },
      //下载音频
      btn_download(index,row){
          let url2 = 'https://'+ row.recording_path
          console.log(url2);
      },
      //状态筛选
        case_type(val){
            let _type = val.type;
            switch(_type) {
                case 1:
                    return "呼入";break;
                case 2:
                    return "呼出";break;
            } 
        },
        case_type1(val){
            let _type = val.type;
            switch(_type) {
                case 3:
                    return "未接通";break;
                case 5:
                    return "未接通";break;
                default:
                    return "已接通";break; 
            } 
        },
    }
  };
</script>