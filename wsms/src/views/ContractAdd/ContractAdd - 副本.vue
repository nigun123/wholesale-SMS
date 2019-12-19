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
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="上传附件" > 
                        <!-- 
                            :on-change="addFile"                             
                            :auto-upload="false"                            
                            ref="upload"
                            :on-success="onSuccess"
                         -->
                    <el-upload
                        class="upload-demo"
                        action="http://127.0.0.1:666/contract/savefile"          
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        :limit="1"
                        :on-exceed="handleExceed"                      	                        
                        >
                        <el-button slot="trigger" size="small" type="primary" >上传文件</el-button>
                        <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
                        <!-- <div slot="tip" class="el-upload__tip">提示</div> -->
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
            files:'',
        }
    },
    methods: {
      //提交
      submitForm(formName) {
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
            console.log(params);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //重置
      resetForm(formName) {
        this.$refs[formName].resetFields();       
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },     
      handleExceed(files, fileList) {
        this.$message.warning('当前限制选择 1 个文件!');
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
    //   addFile(file, fileList){//上传前的钩子，添加文件、上传成功和上传失败时都会被调用
    //       this.files = file;
    //       console.log("666666file",file); 
    //   },
    //   onSuccess(res,file,fileList){ //上传成功时
    //       console.log("onSuccess:",file);          
    //   },
    //  submitUpload(){ 
    //      console.log(this.files); 
    //      if(this.files){    
    //          this.$refs.upload.submit();   
    //      }
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


