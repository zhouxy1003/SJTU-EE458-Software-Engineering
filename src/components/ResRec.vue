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
        <el-menu-item index="4-1">简历收件箱</el-menu-item>
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
    <el-card>
        <p id="title">
            职位
            <!-- :{{positionForm}} -->
        </p>
        <!-- 需要将职位与学生简历建立联系 -->
        <p id ="content">学生简历:{{resume}}</p>
        <el-dropdown>
        <span class="el-dropdown-link">
            学生简历<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command='edit'>甲乙</el-dropdown-item>
            <el-dropdown-item>丙丁</el-dropdown-item>
            <el-dropdown-item>戊戌</el-dropdown-item>
            <el-dropdown-item >江江</el-dropdown-item>
            <el-dropdown-item divided>泽泽</el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>
    </el-card>






      <el-card class="basic">
      <p id="title">
        基本资料
      </p>
      <el-divider></el-divider>
      <p id="content">手机：{{resume.tel}}</p>
      <p id="content">邮箱：{{resume.email}}</p>
    </el-card>

    <el-card class="edu">
      <p id="title">
        教育信息
      </p>
      <el-divider></el-divider>
      <p id="content">学校名称：{{resume.school}}</p>
      <p id="content">专业名称：{{resume.major}}</p>
      <p id="content">就读时间：{{resume.eduBegin}} 至 {{resume.eduEnd}}</p>
      <p id="content">学历：{{resume.grade}}</p>
    </el-card>

    <el-card class="exp">
      <p id="title">
        实习经历
      </p>
      <el-divider></el-divider>
      <p id="content">公司名称：{{resume.cname}}</p>
      <p id="content">公司行业：{{resume.industry}}</p>
      <p id="content">职位名称：{{resume.pname}}</p>
      <p id="content">工作地点：{{resume.place}}</p>
      <p id="content">实习时间：{{resume.expBegin}} 至 {{resume.expEnd}}</p>
      <p id="content">工作内容：{{resume.detail}}</p>
    </el-card>
    <el-card class="skill">
      <p id="title">
        技能介绍
      </p>
      <el-divider></el-divider>
      <p id="content">我的技能：{{resume.skill}}</p>
    </el-card>

    <!-- 设置处理简历
    1.通过简历，安排面试
    2.简历不通过，发送数据至数据库并提醒学生 -->
     <!-- <div slot="footer" class="dialog-footer">
          <el-button @click="personalDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="personalDialogFormVisible = false">确 定</el-button>
    </div>
  <el-row color:transparent class="button" >
    <el-col :span="1" :offset="0">
        <el-button   round   icon="el-icon-edit" @click="personalDialogFormVisible = true"></el-button> 
       </el-col>  
       </el-row> -->
</el-container> 
      </div>
  
</template>

<script>
export default {
   name: "Resume",
  data() {
    return {
      activeIndex: "/Resume",
      resumeDialogFormVisible: false,
      resume: {
        sname: "",
        tel: "",
        email: "",
        school: "",
        major: "",
        eduBegin: "__________",
        eduEnd: "__________",
        grade: "",
        cname: "",
        industry: "",
        pname: "",
        place: "",
        expBegin: "__________",
        expEnd: "__________",
        detail: "",
        skill: "",
        self: ""
      },
        
      formLabelWidth: "100px"
      };
    },


//      created() {
//     showResume();
//   },
    
      
    
    
     methods: {
          handleCommand(command) {
        this.$message('click on item ' + command);
      },
    // addResume() {
    //   this.$axios
    //     .get(this.HOME + "/api/add_resume", {
    //       params: {
    //         studentid: this.Global.loginid,
    //         sname: this.resume.sname,
    //         tel: this.resume.tel,
    //         email: this.resume.email,
    //         sschool: this.resume.school,
    //         sgrade: this.resume.grade,
    //         smajor: this.resume.major,
    //         edubegin: this.resume.eduBegin,
    //         eduend: this.resume.eduEnd,
    //         cname: this.resume.cname,
    //         industry: this.resume.industry,
    //         pname: this.resume.pname,
    //         place: this.resume.place,
    //         expbegin: this.resume.expBegin,
    //         expend: this.resume.expEnd,
    //         detail: this.resume.detail,
    //         skillinfo: this.resume.skill,
    //         selfintro: this.resume.self
    //       }
    //     })
    //     .then(response => {
    //       // var res = JSON.parse(response.bodyText);
    //       if (response.data.error_num === 0) {
    //         this.resumeDialogFormVisible = false;
    //         showResume();
    //       } else {
    //         this.$message.error("简历加载失败，请重试");
    //         console.log(response.data.msg);
    //       }
    //     });
    // },
    // showResume() {
    //   this.$axios
    //     .get(this.HOME + "/api/show_resume", {
    //       params: {
    //         sloginid: this.Global.loginid
    //       }
    //     })
    //     .then(response => {
    //       // var res = JSON.parse(response.bodyText);
    //       if (response.data.error_num === 0) {
    //         this.resume.sname = response.data.sname;
    //         this.resume.tel = response.data.tel;
    //         this.resume.email = response.data.email;
    //         this.resume.school = response.data.sschool;
    //         this.resume.grade = response.data.sgrade;
    //         this.resume.major = response.data.smajor;
    //         this.resume.eduBegin = response.data.edubegin;
    //         this.resume.eduEnd = response.data.eduend;
    //         this.resume.cname = response.data.cname;
    //         this.resume.industry = response.data.industry;
    //         this.resume.pname = response.data.pname;
    //         this.resume.place = response.data.place;
    //         this.resume.expBegin = response.data.expBegin;
    //         this.resume.expEnd = response.data.expend;
    //         this.resume.detail = response.data.detail;
    //         this.resume.skill = response.data.skillinfo;
    //         this.resume.self = response.data.selfintro;
    //         //this.$router.push("/Home");
    //       } else {
    //         this.$message.error("简历加载失败，请重试");
    //         console.log(response.data.msg);
    //       }
    //     });
    //},
    resetForm(form) {
      this.$refs[form].resetFields();
      this.resumeDialogFormVisible = false;
    },
    // 返回主页
    backToMain() {
      this.$router.push({ path: "/Home" });
    },
    backToLogin() {
      this.Global.loginid = "";
      this.$router.push({ path: "/" });
    },
    handleSelect(key, keyPath) {
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
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
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
.basic {
  width: 50%;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20%;
  margin-right: 20%;
  padding-left: 5%;
  padding-right: 5%;
}
.edu {
  width: 50%;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20%;
  margin-right: 20%;
  padding-left: 5%;
  padding-right: 5%;
}
.exp {
  width: 50%;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20%;
  margin-right: 20%;
  padding-left: 5%;
  padding-right: 5%;
}
.skill {
  width: 50%;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20%;
  margin-right: 20%;
  padding-left: 5%;
  padding-right: 5%;
}
.self {
  width: 50%;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20%;
  margin-right: 20%;
  padding-left: 5%;
  padding-right: 5%;
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
