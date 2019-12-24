<template>
    <div id="login">
        <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="80px" class="demo-loginForm">
          <el-form-item label="用户名" prop="account">
            <el-input v-model.number="loginForm.account"></el-input>
          </el-form-item>
          
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="loginForm.pass" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="loginForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
  data() {
      var checkAccount = (rule, value, callback) => {
        // var uPattern = /^[a-zA-Z0-9_]{4,16}$/;
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        setTimeout(() => {
          // if (!uPattern.test(value)) {
          //   callback(new Error('请输入字母，数字，下划线'));
          // } else {  
              callback();
          // }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        //密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，
        // var pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/;
       
        if (value === '') {
          callback(new Error('请输入密码'));
        }
        // else if(!pPattern.test(value)){
        //   callback(new Error('6位，包括至少1个大写字母，1个小写字母，1个数字'));
        // } 
        else {
          //判断两次密码是否一样
          if (this.loginForm.checkPass !== '') {
            this.$refs.loginForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.loginForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          pass: '',
          checkPass: '',
          account: ''
        },
        rules: {
          pass: [
            {required: true, validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            {required: true, validator: validatePass2, trigger: 'blur' }
          ],
          account: [
            {required: true, validator: checkAccount, trigger: 'blur' }
          ]
        }
      };
  },
  methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //将收集的用户名密码 一起发送给后端
            let params = {
              username:this.loginForm.account,
              pwd:this.loginForm.pass, 
            }
            console.log(params);
            //发送请求给服务端
            this.requset.post('/login',params)
                .then(response=>{
                    // console.log(response);
                    let { res_code,msg,token } = response;
                    window.localStorage.setItem('token',token);
                    if(res_code === 1){
                      this.$message({
                        message: msg,
                        type: 'success'
                      });
                      setTimeout(()=>{
                          //使用路由router跳转至后端主页面
                          this.$router.push('/contractmanage"');
                      },1000)
                    }else{
                      this.$message({
                        message: '登录失败！',
                        type: 'error'
                      });
                    }                    
                })
                .catch(err=>{
                  console.log(err)                  
                })
          } else {           
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style lang="less">

  #login{
    width: 100%;
    height: 100%;
    position:relative;    
    .el-form{
          width: 380px;
          height: 300px;
          border-radius:8px;
          background: rgba(0, 0, 0, 0.2);
          //form垂直水平居中
          position:fixed;
          top:0;
          right:0;
          bottom:0;
          left:0;
          margin: auto;
          .el-form-item{
            margin: 30px 10px 0 10px;
            .el-form-item__label{
              color: #fff;
            }
          }
          
    }
  }

</style>