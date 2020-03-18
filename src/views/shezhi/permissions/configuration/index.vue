<style scoped>
.list{
    padding: 10px 0;
}
.list .item-list{
    padding: 10px 0;font-size: 14px;font-weight: normal;margin-bottom: 15px;
}
.list h4{
    margin-bottom: 20px;
}
.list .item-list label{
    font-weight: normal;font-size: 14px
}
.list>>>.el-checkbox-group{
    padding-left: 40px
}
</style>
<template>
    <div class="callvoice padding10">
        <div class="list">
            <p>{{route_id}}</p>
            <h4>PC端管理后台全局设置</h4>
            <div class="item-list">
                <label>可视数据范围：</label>
                <el-radio v-model="radio1" label="1">只能看本人数据</el-radio>
                <el-radio v-model="radio1" label="2">可查看所属部门（含子部门）数据</el-radio>
                <el-radio v-model="radio1" label="3">可查看所有人数据</el-radio>
            </div>
            <div class="item-list">
                <label>是否隐藏手机号：</label>
                <el-radio v-model="radio2" label="1">显示手机号</el-radio>
                <el-radio v-model="radio2" label="2">隐藏手机号</el-radio>
            </div>
        </div>
        <div class="list">
            <h4>PC端管理后台权限设置</h4>
            <div class="item-list">
                <el-checkbox v-model="checkAll0">概括</el-checkbox>
            </div>
            <div class="item-list">
                <el-checkbox :indeterminate="isIndeterminate1" v-model="checkAll1" @change="handleCheckAllChange1">微信管理</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedCities1" @change="handleCheckedCitiesChange1">
                    <el-checkbox v-for="city1 in cities1" :label="city1" :key="city1">{{city1}}</el-checkbox>
                </el-checkbox-group>
            </div>
            <div class="item-list">
                <el-checkbox :indeterminate="isIndeterminate2" v-model="checkAll2" @change="handleCheckAllChange2">通话与短信</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedCities2" @change="handleCheckedCitiesChange2">
                    <el-checkbox v-for="city2 in cities2" :label="city2" :key="city2">{{city2}}</el-checkbox>
                </el-checkbox-group>
            </div>
            <div class="item-list">
                <el-checkbox :indeterminate="isIndeterminate3" v-model="checkAll3" @change="handleCheckAllChange3">敏感行为管理</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedCities3" @change="handleCheckedCitiesChange3">
                    <el-checkbox v-for="city3 in cities3" :label="city3" :key="city3">{{city3}}</el-checkbox>
                </el-checkbox-group>
            </div>
            <div class="item-list">
                <el-checkbox :indeterminate="isIndeterminate4" v-model="checkAll4" @change="handleCheckAllChange4">设置</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedCities4" @change="handleCheckedCitiesChange4">
                    <el-checkbox v-for="city4 in cities4" :label="city4" :key="city4">{{city4}}</el-checkbox>
                </el-checkbox-group>
            </div>
        </div>
        <div>
            <el-button type="primary" round>保存</el-button>
        </div>
    </div>
</template>
<script>
import { huoquroles } from '@/api/user'
export default {
    data(){
        return{
            route_id:this.$route.query.id,//上级传参id

            radio1: '1',
            radio2: '1',

            checkAll0:false,

            checkAll1: false,
            checkedCities1: ['员工微信列表', '好友列表'],
            cities1: ['员工微信列表', '好友列表', '重复好友列表'],
            isIndeterminate1: true,

            checkAll2: false,
            checkedCities2: ['通话记录', '通话录音'],
            cities2: ['通话记录', '通话录音', '手机短信'],
            isIndeterminate2: true,

            checkAll3: false,
            checkedCities3: ['敏感行为'],
            cities3: ['敏感行为', '敏感行为设置'],
            isIndeterminate3: true,

            checkAll4: false,
            checkedCities4: ['设备管理'],
            cities4: ['设备管理', '员工管理', '权限设置', '高级设置'],
            isIndeterminate4: true,
        }
    },
    created: function () {
        //表格渲染
        this.handleUserList();
    },
    methods: {
        //渲染
        handleUserList() {
            let json1 = {
                id:this.$route.query.id,
                is_menu:1
            }
            huoquroles(json1).then(res => {
                console.log(res)
                let _that = this;
                let result = res.data.lists;
                console.log(result)
                _that.userList = result;

            }).catch(() => {
                this.$message.error('请求错误！');
            })
      },
      //全选1
      handleCheckAllChange1(val) {
        this.checkedCities1 = val ? this.cities1 : [];
        this.isIndeterminate1 = false;
      },
      //单个选择1
      handleCheckedCitiesChange1(value) {
        let checkedCount = value.length;
        this.checkAll1 = checkedCount === this.cities1.length;
        this.isIndeterminate1 = checkedCount > 0 && checkedCount < this.cities1.length;
      },
      //全选2
      handleCheckAllChange2(val) {
        this.checkedCities2 = val ? this.cities2 : [];
        this.isIndeterminate2 = false;
      },
      //单个选择2
      handleCheckedCitiesChange2(value) {
        let checkedCount = value.length;
        this.checkAll2 = checkedCount === this.cities2.length;
        this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.cities2.length;
      },
      //全选3
      handleCheckAllChange3(val) {
        this.checkedCities3 = val ? this.cities3 : [];
        this.isIndeterminate3 = false;
      },
      //单个选择3
      handleCheckedCitiesChange3(value) {
        let checkedCount = value.length;
        this.checkAll3 = checkedCount === this.cities3.length;
        this.isIndeterminate3 = checkedCount > 0 && checkedCount < this.cities3.length;
      },
      //全选4
      handleCheckAllChange4(val) {
        this.checkedCities4 = val ? this.cities4 : [];
        this.isIndeterminate4 = false;
      },
      //单个选择4
      handleCheckedCitiesChange4(value) {
        let checkedCount = value.length;
        this.checkAll4 = checkedCount === this.cities4.length;
        this.isIndeterminate4 = checkedCount > 0 && checkedCount < this.cities4.length;
      },
    }
}
</script>