<template>
  <div>
    <el-container direction="vertical">
    <el-row class="top-bar">
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
        <el-menu-item index="4-1">简历收件箱</el-menu-item>
        <el-menu-item index="4-2">已处理简历</el-menu-item>
        <el-menu-item index="4-3">面试管理</el-menu-item>
        <el-submenu index="4-4">
          <template slot="title">简历库</template>
          <el-menu-item index="4-4-1">搜索简历</el-menu-item>
          <el-menu-item index="4-4-2">已邀请简历</el-menu-item>
        </el-submenu>
      </el-submenu>   

    </el-menu>

    <el-row class="tac">  
      
       
    
      
    </el-row>
    <!-- <el-button type="primary" icon="el-icon-edit" @click="companyDialogFormVisible = true"></el-button> -->

    <el-dialog title="公司基本资料" :visible.sync="companyDialogFormVisible">
      
        <el-form ref="companyForm" :model="companyForm">
          <el-form-item label="公司名称" :label-width="formLabelWidth">
            <el-input v-model="companyForm.cname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="行业领域" :label-width="formLabelWidth">
            <el-input v-model="companyForm.industry" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="公司地点" :label-width="formLabelWidth">
            <el-input v-model="companyForm.place" autocomplete="off"></el-input>
          </el-form-item>          
          <el-form-item label="公司规模" prop="scale" :label-width="formLabelWidth">
        <!-- <el-col :span="11"> -->
        <el-select v-model="companyForm.scale" placeholder="请选择公司规模">
          <el-option label="微型（X<10人）" value="微型"></el-option>
          <el-option label="小型（10≤X<100人）" value="小型"></el-option>
          <el-option label="中型（100≤X<300人）" value="中型"></el-option>
          <el-option label="大型（X≥300人）" value="大型"></el-option>
        

        </el-select>
        <!-- </el-col> -->
          </el-form-item>
         
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="companyDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="companyDialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
      
     <el-card class="basic">
      <p id="title">
        公司基本资料
      </p>
   
      
      <el-divider></el-divider>
      <p id="content">公司名称：{{companyForm.cname}}</p>
      <p id="content">行业领域：{{companyForm.industry}}</p>
      <p id="content">公司地点：{{companyForm.place}}</p>
      <p id="content">公司规模：{{companyForm.scale}}</p>
      
    </el-card>
  <el-row color:transparent class="button" >
    <el-col :span="1" :offset="0">
        <el-button   round   icon="el-icon-edit" @click="companyDialogFormVisible = true"></el-button> 
       </el-col>  
       </el-row>
</el-container> 
      </div>
  
</template>

<script>
export default {
    name: "companyForm",
    data() {
      return {
        activeIndex: '/Enterprice',
        companyDialogFormVisible: false,
        companyForm: {
          scale: "",
          email: "",
          school: "",
          cname: "",
          industry: "",
          place: "",
          scale: ''
        },
        rules: {
          
          scale: [
            { required: true, message: '请选择公司规模', trigger: 'change' }
          ],
        },
         created() {
          showcompanyForm();
        },
      formLabelWidth: "100px"
    };
    },
      
    
    
    methods: {
      addcompanyForm() {
      this.$axios
        .get(this.HOME + "/api/add_companyForm", {
          params: {
            //等待api接口
            sname: this.companyForm.cname,
            tel: this.companyForm.place,
            email: this.companyForm.scale,
            
            industry: this.companyForm.industry,
            
          }
        })
        .then(response => {
          // var res = JSON.parse(response.bodyText);
          if (response.data.error_num === 0) {
            this.resumeDialogFormVisible = false;
            showcompanyForm();
          } else {
            this.$message.error("公司资料加载失败，请重试");
            console.log(response.data.msg);
          }
        });
    },
    showcompanyForm() {
      this.$axios
        .get(this.HOME + "/api/show_companyForm", {
          params: {
            sloginid: this.Global.loginid
          }
        })
        .then(response => {
          // var res = JSON.parse(response.bodyText);
          if (response.data.error_num === 0) {
            this.companyForm.cname = companyForm.data.sname;
            this.companyForm.place = response.data.tel;
            this.companyForm.scale = response.data.email;
        
            this.companyForm.industry = response.data.industry;
            
            //this.$router.push("/Home");
          } else {
            this.$message.error("公司信息加载失败，请重试");
            console.log(response.data.msg);
          }
        });
    },
      resetForm(form) {
      this.$refs[form].resetFields();
      this.companyDialogFormVisible = false;
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
  background: #446699;
  color: white;
  a {
    color: white;
  }
  height: 60px;
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
