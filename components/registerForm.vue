<template>
    <el-form 
        :model="form" 
        ref="form" 
        :rules="rules" 
        class="form">
            <el-form-item class="form-item" prop="username">
                <el-input 
                placeholder="用户名手机"
                
                v-model="form.username"
                >
                </el-input>
            </el-form-item>

            <el-form-item class="form-item">
                <el-input 
                placeholder="验证码" v-model="form.captcha">
                    <template slot="append">
                        <el-button @click="handleSendCaptcha">
                            发送验证码
                        </el-button>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="nickname">
                <el-input 
                placeholder="你的名字" v-model="form.nickname">
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="password">
                <el-input 
                placeholder="密码" 
                type="password"
                v-model="form.password"
                ></el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="passwordto">
                <el-input 
                placeholder="确认密码" 
                type="password" v-model="form.passwordto">
                </el-input>
            </el-form-item>

            <el-button 
            class="submit" 
            type="primary" 
            @click="handleRegSubmit">
                注册
            </el-button>
        </el-form>
</template>

<script>
export default {
    data(){
       var username = (rule, value, callback)=>{
        if (value === '') {
          callback(new Error('请输入手机号'));
        } else {
            var reg = /^1[3-9]\d{9}$/
            console.log(reg.test(value))
            console.log(value)
          if (reg.test(value)) {
             callback();
          }else{
            callback(new Error('请输入正确的手机号'));
          }
        }
      };
      //确定密码
      var passwordto = (rule, value, callback) => {
          
          console.log("asdasd",this.form.password,value)
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
        return {
            // 表单数据
            
            form: {
                username:'',
                nickname:'',
                captcha:'',
                password:'',
                passwordto:''
            },
            // 表单规则
            rules: {
                username: [
                    { validator: username, trigger: 'blur' }
                ],
                nickname:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 2, max: 16, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                passwordto:[
                    { validator: passwordto, trigger: 'change' }
                ]

            },
        }
    },
    methods: {
        // 发送验证码
        handleSendCaptcha(){
            var reg = /^1[3-9]\d{9}$/
            if(reg.test(this.form.username)){
                this.$axios({
                    method:'post',
                    url:'/captchas',
                    data:{tel:this.form.username}
                }).then(res=>{
                    console.log(res)
                    this.$alert(`您的验证码是：${res.data.code}`, '验证码', {
                        confirmButtonText: '确定',
                    });
                })
            }else{
                this.$message.error("请输入正确的手机号")
            }
        },


        // 注册
        handleRegSubmit(){
           console.log(this.form)
           var {passwordto,...data} = this.form
           console.log(data)
           this.$refs["form"].validate(valid=>{
               if(valid){
                   this.$store.dispatch("user/registered",data).then(res=>{
                       if(res){
                            this.$message.success("注册成功")
                       }
                       
                   })
               }else{
                   this.$message.success("请输入正确的内容")
               }
           })
        }
    }
}
</script>

<style scoped lang="less">
    .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
</style>