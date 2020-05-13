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
        <el-menu-item index="3-1">我投递的职位</el-menu-item>
        <el-menu-item index="3-2">我报名的宣讲会</el-menu-item>
      </el-submenu>
    </el-menu>

    <el-button type="text" icon="el-icon-edit" @click="resumeDialogFormVisible = true"></el-button>
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
          <el-form-item label="学历" :label-width="formLabelWidth">
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
          <el-button type="primary" @click="resumeDialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
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
        detail:""
      },
      formLabelWidth: "100px"
    };
  },
  mounted() {},
  methods: {
    resetForm(form) {
      this.$refs[form].resetFields();
      this.resumeDialogFormVisible = false;
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