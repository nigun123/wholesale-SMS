<template>
    <div class="top">
        <el-row >
            <el-col :span="16">
                <div class="title">
                    <i class="el-icon-menu"></i>
                    合同管理系统
                </div>
            </el-col>
            <el-col :span="8">
                <el-row>
                   <el-col :span="8">                        
                        <div  class="userinfo">
                            <el-dropdown @command="handleCommand">                                
                            <span class="el-dropdown-link">
                                <i class="el-icon-user-solid"></i>
                                <span>{{this.userinfo.name}}</span>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="a">{{this.userinfo.name}}</el-dropdown-item>
                                <el-dropdown-item command="b">{{this.userinfo.username}}</el-dropdown-item>                                
                            </el-dropdown-menu>
                        </el-dropdown>
                        </div> 

                   </el-col>
                   <el-col :span="8">
                        <div  class="question" @click="questionClick" >
                            <i class="el-icon-question"></i>
                        </div>   
                    </el-col>
                   <el-col :span="8">  
                       <div class="exit" @click="exitClick">
                             <i class="el-icon-s-grid"></i>
                        </div>   
                    </el-col>
                </el-row>
                
            </el-col>
        </el-row>
        
    </div>
    

</template>
<script>
export default {
      data(){
          return{
             imgUrl:"http://127.0.0.1:8082/favicon.ico" ,
             userinfo:{
                name:"admin",
                username:"tom"
             }
          }
      },
      methods:{
        handleCommand(command) {
            this.$message('click on item ' + command);
        },
        questionClick(){
            this.$message('click on item question');
        },
        exitClick(){
            this.$confirm('此操作将退出登录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                localStorage.removeItem('token');
                this.$message({
                    type: 'success',
                    message: '退出成功!'                     
                });
                setTimeout(()=>{
                    //使用路由router跳转至登录页面
                    this.$router.push('/login')
                },1000)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });          
            });
        }
      }
}
</script>
<style lang="less">
    .top{
        .title{
            text-align: left;
            font-size:large;
            font-weight: bolder;
        }
        .el-col{ 
            font-size: 30px;       
            .el-dropdown{                  
                height: 55px;           
                .el-dropdown-link {
                    cursor: pointer; 
                    i{
                        margin-right: 6px;
                        font-size: 30px; 
                    }
                    span{
                        // display: inline-block;
                        color: rgb(124, 21, 21);
                        font-size: 20px;
                    }
                }                
            }
            
            .userinfo,.exit,.question{
                width: 100%;
                height: 60px;
            }
             .userinfo:hover,.exit:hover,.question:hover{
                  background-color: rgba(0, 0, 0, 0.2);
             }
        }
    }
</style>


