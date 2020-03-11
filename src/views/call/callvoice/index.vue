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
        width: 100%;margin-top: 15px;display: inline-block
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
                <el-input class="top_list" placeholder="请输入微信号" v-model="loan_id">
                    <template slot="prepend">微信号</template>
                </el-input>
                <el-input class="top_list" placeholder="请输入昵称" v-model="name">
                    <template slot="prepend">昵称</template>
                </el-input>
                <el-input class="top_list" placeholder="请输入备注" v-model="beizhu">
                    <template slot="prepend">备注</template>
                </el-input>
                <el-button class="top_list idbtn" type="primary" @click="search">查询</el-button>
            <div class="clearfix"></div>
          </el-form>
        <!-- 头部菜单end -->
        <!-- 播放器 -->
            <!-- <aplayer
            autoplay
            :music="musicList"
            :narrow="false"
            ></aplayer> -->
            <aplayer autoplay :music="musicList"></aplayer>
        <!-- 播放器 end-->

        <!-- 表格 -->
        <div class="table">
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
                        <a class="bule_color" @click="btn_bofang(scope.$index, scope.row)">播放</a> <a class="danger_color">下载</a>
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
  import aplayer from "vue-aplayer";
  export default {
    props: ["pdfurl"],
    components: {aplayer: aplayer},//别忘了引入组件
    data() {
      return {
        musicList: {
            title: "youkao100",
            author: "youkao100",
            url: 'http://localhost:1122/static/ceshi.mp3',
            pic: "",
            lrc: "[00:00.00]lrc here\n[00:01.00]aplayer"
        },
        selectdata1:'',//日期选择
        department: '',//员工部门
        loan_id:'',//微信号
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
    computed: {
        url() {
        return this.pdfurl;
        }
    },
    mounted() {
        //录音播放
        this.musicList = {
        title: "youkao100",
        author: "youkao100",
        //   url: this.url,
        url: 'https://win-web-ra01-sycdn.kuwo.cn/66b7771eabcd5be60f1730b01d935114/5e688d88/resource/n2/128/2/41/686946241.mp3',
        pic: "",
        lrc: "[00:00.00]lrc here\n[00:01.00]aplayer"
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
      //查询
      search1(){
          if(this.name =='' & this.mobile=='' & this.loan_id==''){
              this.$message({message: '请输入搜索条件',type: 'warning'});
          }else{
              //表格渲染
              let json1 = {
                  loan_id:this.loan_id,
                  name:this.name,
                  beizhu:this.beizhu
              }
              console.log(json1)
              // MyLoans(json1).then(res => {
              //     let result = res.data.lists;
              //     let mess;
              //     let self = [];
              //     for(let key in result){
              //         mess = result[key];
              //         self.push(mess);
              //     }
              //     this.userList = self;

                // musicList.title = this.musicList[i].songname; 
                // musicList.author = this.musicList[i].singername; 
                // musicList.url = this.musicList[i].url; 
                // musicList.pic = this.musicList[i].albumpic_small; 
                // musicList.lrc = this.musicList[i].irl; 

              // }).catch(() => {
              //     this.$message.error('请求错误！');
              // })
          }
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

          // userList(json2).then(res => {
          //     let _that = this;
          //     let result = res.data.lists;
          //     console.log(res.data)

          //     let mess;
          //     let self = [];
          //     for(let key in result){
          //         mess = result[key];
          //         self.push(mess);
          //     }
          //     _that.total = res.data.total;
          //     _that.pageSize = res.data.per_page
          //     _that.userList = self;

          // }).catch(() => {
          //     this.$message.error('请求错误！');
          // })
      },
      btn_bofang(index,row){
          console.log(index,row);
      }
    }
  };
</script>