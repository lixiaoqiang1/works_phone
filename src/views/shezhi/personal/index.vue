<style scoped>
.callvoice2{
    margin-top: 10px;
}
.padding120{
    padding: 0 100px;
}
.padding120>>>.el-form-item__content{
    max-width: 400px;
}
.btn_right{
    float: right
}
</style>
<template>
    <div>
        <div class="callvoice padding10">
            <h4>个人信息</h4>
            <div class="padding120">
                <p>账号：17673110602</p>
                <p>姓名：超级管理员</p>
                <p>部门：无</p>
                <p>角色：超级管理员</p>
            </div>
        </div>
        <div class="callvoice padding10 callvoice2">
            
            <el-row :gutter="20">
                <el-col :span="16">
                    <h4>修改密码</h4>
                    <el-form class="padding120" :model="resetForm" status-icon :rules="resetFormRules" ref="resetForm" label-width="100px">
                    <el-form-item label="原密码" prop="newpwd1">
                        <el-input type="text" v-model="resetForm.newpwd1" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newpwd">
                        <el-input type="password" v-model="resetForm.newpwd" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="renewpwd">
                        <el-input type="password" v-model="resetForm.renewpwd" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                </el-col>
                <el-col :span="8">
                    <el-button class="btn_right" type="primary" round @click="btn_baocun">保存</el-button>
                </el-col>
            </el-row>
            
        </div>
    </div>
</template>
<script>
export default {
    data(){
        var validatePass = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入新密码'));
            } else if (value.toString().length < 6 || value.toString().length > 18) {
                callback(new Error('密码长度为6 - 18个字符'))
            } else {
                callback();
            }
        };
            var validatePass2 = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请再次输入密码'));
            } else if (value !== this.resetForm.newpwd) {
            callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        };
        return{
            resetForm: {
                newpwd1: '',
                newpwd: '',
                renewpwd: '',
            },
            resetFormRules: {
                newpwd: [
                    { required: true, validator: validatePass, trigger: 'blur' }
                ],
                renewpwd: [
                    { required: true, validator: validatePass2, trigger: 'blur' }
                ]
            },
            

        }
    },
    methods:{
        btn_baocun(){
            console.log('保存...')
        }
    }
}
</script>