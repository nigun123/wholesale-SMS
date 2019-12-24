<template>
    <div class="contractadd">
        <el-card class="box-card">
            <!-- 内容标题 -->
            <div slot="header" class="clearfix">
                <span>添加合同</span>               
            </div>

            <!-- 表格列表 -->
            <el-form :model="contractForm" :rules="rules" ref="contractForm" label-width="100px" class="demo-contractForm">
                <el-form-item label="合同名称" prop="contractname">
                    <el-input v-model="contractForm.contractname"></el-input>
                </el-form-item>

                <el-form-item label="合同甲方" prop="partyA">
                    <el-input v-model="contractForm.partyA"></el-input>
                </el-form-item>

                <el-form-item label="合同乙方" prop="partyB" >
                    <el-input v-model="contractForm.partyB"></el-input>
                </el-form-item>
                
                <el-form-item label="合同金额" prop="contractamount">
                   <el-input  v-model="contractForm.contractamount"></el-input>
                </el-form-item>

                 <el-form-item required label="签订日期" >
                    <el-date-picker
                        v-model="contractForm.time"
                        type="date"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>

                <el-form-item required label="上传附件" > 
                    <el-upload
                        class="upload-demo"
                        action="http://127.0.0.1:666/file/uploadfiles" 
                        multiple
                        :limit="4"
                        ref="upload"   
                        :on-remove="removef"
                        :on-exceed="handleExceed" 
                        :on-success="successf"
                        :on-change="changef"                     	                        
                        :auto-upload="false">
                        <el-button slot="trigger" size="small" type="primary" >选择附件</el-button>
                        <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->                       
                    </el-upload>
                </el-form-item>
                
                <el-form-item label="备注" prop="notice">
                    <el-input type="textarea" v-model="contractForm.notice"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('contractForm')">确定</el-button>
                    <el-button @click="resetForm('contractForm')">重置</el-button>
                </el-form-item>
            </el-form>

        </el-card>
    </div>
</template>
<script>
export default {
    
    data(){
        return{
            contractForm: {
                contractname: '',
                partyA: '',
                partyB: '',
                contractamount: '',
                notice: '',
                time:'',              
            },
            rules: {
                contractname: [
                    { required: true, message: '请输入合同名称', trigger: 'blur' }                 
                ],
                partyA: [
                    { required: true, message: '请输入甲方公司', trigger: 'blur' }
                ],
                partyB: [
                    {required: true, message: '请输入乙方公司', trigger: 'blur' }
                ],
                contractamount: [
                    {required: true,  message: '请输入合同金额', trigger: 'blur' }
                ]
            },
            filesnum:0,
            fsn:0,
            fileList:[],
        }
    },
    methods: {
      //提交
      submitForm(formName) {
        if(this.fileList.length > 0) { 
            this.filesnum = this.fileList.length;       
            this.$refs[formName].validate((valid) => {                    
            if (valid) {
                //发axios请求
                let params = {
                    contractname: this.contractForm.contractname,
                    partyA: this.contractForm.partyA,
                    partyB: this.contractForm.partyB,
                    contractamount: this.contractForm.contractamount,
                    notice: this.contractForm.notice,
                    time:this.contractForm.time,                    
                }
                this.requset.post('/file/contractup',params)    
                .then(res=>{
                    let {res_code } = res;
                    if(res_code === 1){
                        this.$refs.upload.submit();   
                    }
                })  
                .catch(err=>{

                })
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        }else{
            this.$message({
                message: '先选择文件！',
                type: 'error'
            });
        }
      },
      //重置
      resetForm(formName) {
        this.$refs[formName].resetFields();         
      },    
      handleExceed(files, fileList) {
        this.$message.warning('当前限制选择 4 个文件!');
      }, 
      removef(file){//删除文件
          let pos = this.fileList.indexOf(file.name);
          this.fileList.splice(pos,1);
      },     
      successf(response){//上传成功
        ++this.fsn;
        if (this.fsn===this.filesnum) {
            this.$message({
                message: '添加成功',
                type: 'success'
            });
            setTimeout(()=>{
                //使用路由router跳转至合同管理
                this.$router.push('/contractmanage');
            },1000)
        }
                    
      },  
      changef(file){ //选择文件     
            if (this.fileList.length) {
                let pos = this.fileList.indexOf(file.name);
                if (pos < 0){
                    this.fileList.push(file.name)
                }                 
            } else {
                this.fileList.push(file.name);  
            }            
      },
    //   submitUpload(){ 
    //     this.$refs.upload.submit();   
    //   }
    }
}
</script>
<style lang="less">
    .contractadd{
        .el-card__body{
            .el-form-item{
                width:400px;
                padding: 5px;
                .el-date-editor--date{
                     width: 300px;
                }
                           
                
            }
        }
    }
</style>


