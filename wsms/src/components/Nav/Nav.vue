<template>
     <!-- 导航 el-menu：
        default-active == 当前激活菜单的 index  
                this.$route.path === 当前路由的路径
        unique-opened ==  保持一个选项打开                   
        router == 使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
    -->
    <el-menu
        :default-active="this.$route.path"
        unique-opened
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        >
        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-menu"></i>
                <span>合同管理</span>
            </template>
            <el-menu-item-group>                        
                <el-menu-item index="/">合同管理</el-menu-item>
                <el-menu-item index="/contractadd">添加合同</el-menu-item>      
                <el-menu-item index="/contractborrow">借还记录</el-menu-item>      
            </el-menu-item-group>
        </el-submenu>
        
    </el-menu>
</template>
<script>
export default {
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
      
    }
}
</script>
<style lang="less">
    .el-menu{
        height: 100%;
        border:none;
        .el-menu-item{
            border-right: 0px;
        }
    }
</style>


