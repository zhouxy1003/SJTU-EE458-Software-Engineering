<template>
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
          <h6>Welcome: {{this.Global.loginid}}</h6>
        </div>
      </el-col>
      <el-col :span="1" :offset="12">
        <el-button id="exit" type="primary" @click="backToLogin">退出登录</el-button>
      </el-col>
    </el-row>

    <el-menu
      :default-active="$route.path"
      class="menu"
      mode="horizontal"
      @select="handleSelect"
      router
    >
      <el-menu-item index="/Home">首页</el-menu-item>
      <el-menu-item index="/Resume">简历管理</el-menu-item>
      <el-submenu index="3">
        <template slot="title">我的</template>
        <el-menu-item index="/MyJob">我投递的职位</el-menu-item>
        <el-menu-item index="/MyTalk">我报名的宣讲会</el-menu-item>
      </el-submenu>
    </el-menu>
    <el-button
      id="editButton"
      type="text"
      icon="el-icon-edit"
      @click="resumeDialogFormVisible = true"
    >编辑简历</el-button>
    <el-dialog title="我的简历" :visible.sync="resumeDialogFormVisible">
      <el-form ref="resume" :model="resume">
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="resume.tel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="resume.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学校名称" :label-width="formLabelWidth">
          <el-input v-model="resume.school" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="专业名称" :label-width="formLabelWidth">
          <el-input v-model="resume.major" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="就读时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="resume.eduBegin"
            type="month"
            placeholder="选择月"
            value-format="yyyy-MM"
          >></el-date-picker>
          <el-date-picker
            v-model="resume.eduEnd"
            type="month"
            placeholder="选择月"
            value-format="yyyy-MM"
          >></el-date-picker>
        </el-form-item>
        <el-form-item label="年级" :label-width="formLabelWidth">
          <el-select v-model="resume.grade" placeholder="请选择年级">
            <el-option label="本科" value="本科"></el-option>
            <el-option label="硕士" value="硕士"></el-option>
            <el-option label="博士" value="博士"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公司名称" :label-width="formLabelWidth">
          <el-input v-model="resume.cname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司行业" :label-width="formLabelWidth">
          <el-input v-model="resume.industry" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="职位名称" :label-width="formLabelWidth">
          <el-input v-model="resume.pname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="工作地点" :label-width="formLabelWidth">
          <el-input v-model="resume.place" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="实习时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="resume.expBegin"
            type="month"
            placeholder="选择月"
            value-format="yyyy-MM"
          >></el-date-picker>
          <el-date-picker
            v-model="resume.expEnd"
            type="month"
            placeholder="选择月"
            value-format="yyyy-MM"
          >></el-date-picker>
        </el-form-item>
        <el-form-item label="工作内容" :label-width="formLabelWidth">
          <el-input v-model="resume.detail" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resumeDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addResume()">确 定</el-button>
      </div>
    </el-dialog>
    <el-card class="basic">
      <p id="title">基本资料</p>
      <el-divider></el-divider>
      <p id="content">姓名：{{resume.sname}}</p>
      <p id="content">手机：{{resume.tel}}</p>
      <p id="content">邮箱：{{resume.email}}</p>
    </el-card>

    <el-card class="edu">
      <p id="title">教育信息</p>
      <el-divider></el-divider>
      <p id="content">学校名称：{{resume.school}}</p>
      <p id="content">专业名称：{{resume.major}}</p>
      <p id="content">就读时间：{{resume.eduBegin}} 至 {{resume.eduEnd}}</p>
      <p id="content">年级：{{resume.grade}}</p>
    </el-card>

    <el-card class="exp">
      <p id="title">实习经历</p>
      <el-divider></el-divider>
      <p id="content">公司名称：{{resume.cname}}</p>
      <p id="content">公司行业：{{resume.industry}}</p>
      <p id="content">职位名称：{{resume.pname}}</p>
      <p id="content">工作地点：{{resume.place}}</p>
      <p id="content">实习时间：{{resume.expBegin}} 至 {{resume.expEnd}}</p>
      <p id="content">工作内容：{{resume.detail}}</p>
    </el-card>
    <el-card class="skill">
      <p id="title">技能介绍</p>
      <el-divider></el-divider>
      <p id="content">{{resume.skill}}</p>
    </el-card>
    <el-card class="self">
      <p id="title">自我介绍</p>
      <el-divider></el-divider>
      <p id="content">{{resume.self}}</p>
    </el-card>
  </el-container>
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
  created() {
    this.showResume();
  },
  methods: {
    addResume() {
      this.$axios
        .get(this.HOME + "/api/add_resume", {
          params: {
            studentid: this.Global.loginid,
            sname: this.resume.sname,
            tel: this.resume.tel,
            email: this.resume.email,
            sschool: this.resume.school,
            sgrade: this.resume.grade,
            smajor: this.resume.major,
            edubegin: this.resume.eduBegin,
            eduend: this.resume.eduEnd,
            cname: this.resume.cname,
            industry: this.resume.industry,
            pname: this.resume.pname,
            place: this.resume.place,
            expbegin: this.resume.expBegin,
            expend: this.resume.expEnd,
            detail: this.resume.detail,
            skillinfo: this.resume.skill,
            selfintro: this.resume.self
          }
        })
        .then(response => {
          // var res = JSON.parse(response.bodyText);
          if (response.data.error_num === 0) {
            this.resumeDialogFormVisible = false;
            this.showResume();
          } else {
            this.$message.error("简历添加失败，请重试");
            console.log(response.data.msg);
          }
        });
    },
    showResume() {
      this.$axios
        .get(this.HOME + "/api/show_resume", {
          params: {
            sloginid: this.Global.loginid
          }
        })
        .then(response => {
          // var res = JSON.parse(response.bodyText);
          if (response.data.error_num === 0) {
            this.resume.sname = response.data.sname;
            this.resume.tel = response.data.tel;
            this.resume.email = response.data.email;
            this.resume.school = response.data.sschool;
            this.resume.grade = response.data.sgrade;
            this.resume.major = response.data.smajor;
            this.resume.eduBegin = response.data.edubegin;
            this.resume.eduEnd = response.data.eduend;
            this.resume.cname = response.data.cname;
            this.resume.industry = response.data.industry;
            this.resume.pname = response.data.pname;
            this.resume.place = response.data.place;
            this.resume.expBegin = response.data.expBegin;
            this.resume.expEnd = response.data.expend;
            this.resume.detail = response.data.detail;
            this.resume.skill = response.data.skillinfo;
            this.resume.self = response.data.selfintro;
            //this.$router.push("/Home");
          } else {
            this.$message.error("简历加载失败，请重试");
            console.log(response.data.msg);
          }
        });
    },
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
};
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
#editButton {
  position: relative;
  top: 10px;
  font-size: 15px;
}
</style>