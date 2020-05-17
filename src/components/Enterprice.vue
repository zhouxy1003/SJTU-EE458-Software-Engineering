<template>
  <div>
    <el-container direction="vertical">
      
    <el-row class="top-bar">
       <img src="../assets/ijob.png" class="image" />
      <el-col :span="3" :offset="2">
        <div class="headText1" @click="backToMain">
          <h4>校园招聘系统</h4>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="headText2">
          <h6>by 软件工程1.2组</h6>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="headText2">
          <h6>Welcome: {{loginid}}</h6>
        </div>
      </el-col>
      <el-col :span="1" :offset="10">
        <el-button id="exit" type="primary" @click="backToLogin">退出登录</el-button>
      </el-col>
    </el-row>
    
    <div class="line"></div>
    <el-menu
      :default-active="$route.path"
        class="menu"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router>   
      <el-submenu index="1" >
        <template slot="title"><i class="el-icon-setting"></i>资料完善</template>
        <el-menu-item index="/Enterprice">个人信息</el-menu-item>
        <el-menu-item index="/Company">公司信息</el-menu-item>
      </el-submenu> 
       
      <el-submenu index="2" >
        <template slot="title"><i class="el-icon-location"></i>职位管理</template>
        <el-menu-item index="/NewPos">发布职位</el-menu-item>
        <el-menu-item index="2-2">管理职位</el-menu-item>
      </el-submenu>
      <el-submenu index="3" >
        
        <template slot="title">
          <i class="el-icon-menu"></i>宣讲会管理</template>
        
        <el-menu-item index="/NewTalk">发布宣讲会</el-menu-item>
        <el-menu-item index="3-2">管理宣讲会</el-menu-item>
      </el-submenu>
      <el-submenu index="4" >
        <template slot="title" class="el-icon-document"><i class="el-icon-document"></i>简历管理</template>
        <el-menu-item index="/ResRec">简历收件箱</el-menu-item>
        <el-menu-item index="4-2">已处理简历</el-menu-item>
        <el-menu-item index="4-3">面试管理</el-menu-item>
        <el-submenu index="4-4">
          <template slot="title">简历库</template>
          <el-menu-item index="/ResSer">搜索简历</el-menu-item>
          <el-menu-item index="4-4-2">已邀请简历</el-menu-item>
        </el-submenu>
      </el-submenu>   

    </el-menu>
    <el-row class="tac">  
      
       
    
      
    </el-row>

    <el-dialog title="个人基本资料" :visible.sync="personalDialogFormVisible">
      
        <el-form ref="personalForm" :model="personalForm" :rules="rules">
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="personalForm.pname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="职位" :label-width="formLabelWidth">
            <el-input v-model="personalForm.position" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="公司全称" :label-width="formLabelWidth">
            <el-input v-model="personalForm.cname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="tel"   :label-width="formLabelWidth">
            <el-input v-model="personalForm.tel" autocomplete="off"></el-input>
          </el-form-item>
          <!-- <el-form-item label="活动内容" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item> -->
          <el-form-item label="工作邮箱" :label-width="formLabelWidth">
            <el-input v-model="personalForm.email" autocomplete="off"></el-input>
          </el-form-item>

        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="personalDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="personalDialogFormVisible = false">确 定</el-button>
        </div>
    </el-dialog>
   
     <el-card class="basic">
      <p id="title">
        个人基本资料
      </p>
   
      
      <el-divider></el-divider>
      <p id="content">姓名：{{personalForm.pname}}</p>
      <p id="content">职位{{personalForm.position}}</p>
      <p id="content">公司名称：{{personalForm.cname}}</p>
      <p id="content">手机：{{personalForm.tel}}</p>
      <p id="content">工作邮箱：{{personalForm.email}}</p>
    </el-card>
  <el-row color:transparent class="button" >
    <el-col :span="1" :offset="0">
        <el-button   round   icon="el-icon-edit" @click="personalDialogFormVisible = true"></el-button> 
       </el-col>  
       </el-row>
</el-container> 
      </div>
  
</template>

<script>
export default {
  name: "personalForm",
    data() {
      return {
        activeIndex: '/Enterprice',
        personalDialogFormVisible: false,
        personalForm: {
          tel: "",
          email: "",
          school: "",
          pname: "",
          position: "",
          cname: ""
        },
        rules: {
          tel: [
            
            { min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur' }
          ]
        },
        
      formLabelWidth: "100px"
      };
    },
    
      
    
    
    methods: {
      resetForm(form) {
      this.$refs[form].resetFields();
      this.personalDialogFormVisible = false;
    },
    // 返回主页
    backToMain() {
      this.$router.push({ path: "/Home" });
    },
    backToLogin() {
      this.$router.push({ path: "/" });
    },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
       },
       handleOpen(key, keyPath) {
         console.log(key, keyPath);
      },
       handleClose(key, keyPath) {
         console.log(key, keyPath);
    }
    }
  }

</script>

<style lang="scss" scoped>
.top-bar {
  background: #646e77;
  color: white;
  a {
    color: white;
  }
  height: 60px;
}
.image {
  position: absolute;
  width: 100px;
  height: 40px;
  left: 10px;
  top: 10px;
  display: block;
}
.headText1 {
  position: relative;
  top: -8px;
}
.headText2 {
  position: relative;
  top: -5px;
}
#exit {
  position: relative;
  top: 15px;
  background-color: transparent;
  border: 0;
}
.menu {
  padding-left: 20%;
  padding-right: 20%;
}

.basic {
  position: absolute;
  width: 50%;

  top: 20%;
  //bottom: 20px;
  left: 20%;
  //right: 20%;
  padding-left: 5%;
  padding-right: 5%;
}
.button{
  background: transparent;
  color:transparent;
  position: absolute;
  margin-top: 500px;
  margin-bottom: 500px;
  margin-left: 45%;
  padding-left: 0%;
  padding-right: 0%;
  padding-left:-5px;
  padding-right: 6%;
}

.el-dialog {
  width: 500px;
  padding-right: 50px;
}
#title {
  font-size: 20px;
}
#content {
  font-size: 15px;
}

</style>
