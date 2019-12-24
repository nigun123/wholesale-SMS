<template>
    <div class="contractmanage">
        <el-card class="box-card">
            <!-- 内容标题 -->
            <div slot="header" class="clearfix">
                <span>合同管理</span>               
            </div>

            <!-- 模糊查询 -->
            <div style="text-align:left">
                <!-- 搜索框 -->
                    <el-form :inline="true" :model="searchForm" class="demo-form-inline">                            
                        <el-form-item label="关键字">
                            <el-input v-model="searchForm.keyWord" placeholder="合同名称"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="searchC">查询</el-button>
                        </el-form-item>
                    </el-form>
            </div>   
            
            <!-- 表格内容 -->
            <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"             
                style="width: 100%"
                stripe>
                <el-table-column                    
                    width="5">
                </el-table-column>
                
                <el-table-column
                    prop="contractname"
                    label="合同名称">
                </el-table-column>

                <el-table-column
                    prop="partyA"
                    label="甲方">
                </el-table-column>

                <el-table-column
                    prop="contractamount"
                    label="合同金额(元)">
                </el-table-column>

                <el-table-column                    
                    label="签订日期">
                     <!-- 日期处理 momentJs -->
                    <template slot-scope="scope">{{ scope.row.ctime | filterCtime}}</template>
                </el-table-column>               
                
                <el-table-column                    
                    label="编辑附件">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="handleEdit(scope.row.id)">查看</el-button>
                        <el-button
                            size="mini"
                            type="success"
                            @click="handleAdd(scope.row.id)">添加</el-button>
                     </template>
                </el-table-column>

                <el-table-column  
                    fixed="right"                  
                    label="编辑合同">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handledel(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页 -->
            <div class="block">                
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="this.currentPage"
                    :page-sizes="[1, 3, 5, 7]"
                    :page-size="this.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="this.total">
                </el-pagination>
            </div>


            <!-- 查看附件 -->
            <el-dialog title="查看附件" :visible.sync="fj_Flag" width="500px">

                <a v-for="item in fileArr" :key="item.id" @click="aClick(item.filename,item.f_url)">
                    {{ item.filename }}                    
                </a>
                
            </el-dialog>


            <!-- 编辑-->
            <el-dialog title="添加附件" :visible.sync="ec_Flag" width="500px">
                <el-upload
                    class="upload-demo"
                    action="http://127.0.0.1:666/file/uploadfiles" 
                    multiple
                    :limit="2"
                    ref="upload"   
                    :on-remove="removef"
                    :on-exceed="handleExceed" 
                    :on-success="successf"
                    :on-change="changef"                     	                        
                    :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary" >选择附件</el-button>
                </el-upload>
                
                <el-button  size="small"  @click="submitForm()">确定</el-button>
                <el-button  size="small"  @click="exitForm()">取消</el-button>
            </el-dialog>
            
        </el-card>
    </div>
</template>
<script>
import moment from 'moment';//引入时间处理模块

export default {
    created() {//生命周期的钩子函数  自动触发 组件实例创建完成 dom还没有绑定
       this.getContractByPage();//获取数据
    },
    data() {
      return {
        fj_Flag:false,
        ec_Flag:false,
        tableData:[],
        selectData:[],
        searchForm:{
            keyWord:'',
        },
        currentPage:1,
        pageSize:3,
        total:0,
        keyWord:'',
        fileArr:[  ],
        fileList:[],
        fsn:0,
        cid:-1,
        filesnum:0,
      }
    },
    methods:{
        // 批量删除
        handledel(index){ 

            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let delId = index;             
                let params ={ delId }                
                this.requset.post('/contract/delectFileByCid',params )
                    .then(res=>{
                        let {res_code,msg} = res;
                        if (res_code === 1) {
                            this.$message({
                                message: '删除成功！',
                                type: 'success'
                            });
                            this.getContractByPage();//获取数据
                        } else {
                            this.$message({
                                message: '删除失败！',
                                type: 'error'
                            });
                            
                        }
                    })
                    .catch(err=>{
                        console.log(err);                    
                    })   
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });


            
           
        },
        //查看附件
        handleEdit(index, row) {
            this.fj_Flag = true;
            // 获取附件列表
            this.getFileByCid(index);
            console.log(index);
        },
        //点击附件
        aClick(fname,furl){
            this.fj_Flag = false;
            let ftype = fname.substring(fname.lastIndexOf('.')+1);
            console.log(fname,furl);
            
            window.open(furl);
            
        },
        //添加附件
        handleAdd(index, row){
            this.ec_Flag = true;  
            this.cid = index;
                      
        },
        //取消添加附件
        exitForm(){
            this.ec_Flag = false;
        },
        //确定添加附件
        submitForm(){
            if(this.fileList.length > 0) { 
                this.filesnum = this.fileList.length; 
                          
                let params = { cid:this.cid };
                this.requset.post('file/editfile',params)
                    .then(res=>{
                        let{res_code} =res;
                        if (res_code === 1) {                       
                            this.$refs.upload.submit();   
                        }                         
                    })
                    .catch(err=>{
                        console.log(err);                    
                    })   
            }else{
                this.$message({
                    message: '先选择文件！',
                    type: 'error'
                });
            }
            
        },
        //按关键字搜索
        searchC(){
            this.keyWord = this.searchForm.keyWord ;            
            this.getContractByPage();            
        },
        //每页条数
        handleSizeChange(val) {
            this.pageSize = val;
            this.getContractByPage();
            // console.log(`每页 ${val} 条`);
        },
        //当前页码
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getContractByPage();
        },
        //获取所有合同
        getContractByPage(){
            let params = {
                pageSize: this.pageSize,
                currentPage: this.currentPage,
                keyWord: this.keyWord       
            }
            this.requset.post('/contract/getContractByPage',params)
                .then(res=>{
                    let {total,data } = res;
                    //判断当前也是否为第一页 或者 当前页是否无数据(显示前一页数据) 
                    if(data.length == 0 &&  this.currentPage != 1){
                        this.currentPage -= 1;                       
                        this.getContractByPage();
                    }else{
                        this.total = total;
                        this.tableData = data;
                    }              
                })
                .catch(err=>{
                    console.log(err);                    
                })   
        },
        //获取附件列表
        getFileByCid(cid){
            console.log(cid);
            let params = {
               cid      
            }
            this.requset.post('/contract/getFileByCid',params)
                .then(res=>{
                   this.fileArr = res;   
                })
                .catch(err=>{
                    console.log(err);                    
                })   
        },
        //限制
        handleExceed(files, fileList) {
            this.$message.warning('当前限制选择 2 个文件!');
        }, 
        //删除文件
        removef(file){
            let pos = this.fileList.indexOf(file.name);
            this.fileList.splice(pos,1);
        },
        //上传成功 
        successf(response){
            ++this.fsn;
            if (this.fsn===this.filesnum) {                
                //重新获取合同列表
                this.getContractByPage();
                this.$message({
                    message: '添加附件成功',
                    type: 'success'
                });
                this.ec_Flag = false;  
            }                               
        },  
        //选择文件
        changef(file){     
            if (this.fileList.length) {
                let pos = this.fileList.indexOf(file.name);
                if (pos < 0){
                    this.fileList.push(file.name)
                }                 
            } else {
                this.fileList.push(file.name);  
            }            
        },    

    },
    filters:{//过滤器
        filterCtime(ctime){
            return moment(ctime).format('YYYY-MM-DD');
        },

    }
}
</script>
<style lang="less">
.contractmanage{
    .delete_div{
        .el-input{
            width: 200px;
            margin-left: 10px;
        }
    }
    .el-table{
        margin-top: 20px;
    }
    .el-dialog__body{
        a{
            color: goldenrod;
            font-size: large;
            line-height: 30px;
            width: 460px;
            display:inline-block;
            margin-bottom: 10px;
        }
    }
    .upload-demo{
        margin-bottom: 20px;
    }

}
    
</style>


