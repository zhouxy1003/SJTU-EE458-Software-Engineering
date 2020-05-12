<template>
  <el-container direction="vertical">
    <el-row class="top-bar">
      <el-col :span="3" :offset="2">
        <div class="pointer" @click="backToMain">
          <h4>校园招聘系统</h4>
        </div>
      </el-col>
    </el-row>

    <el-menu
      :default-active="$route.path"
      class="menu"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
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

    <el-card class="basic">
      <p id="title">
        基本资料
        <el-button type="text" icon="el-icon-edit" @click="basicDialogFormVisible = true"></el-button>
      </p>
      <p id="content">手机：{{basicForm.tel}}</p>
      <p id="content">邮箱：{{basicForm.email}}</p>
      <el-dialog title="基本资料" :visible.sync="basicDialogFormVisible">
        <el-form ref="basicForm" :model="basicForm">
          <el-form-item label="手机" :label-width="formLabelWidth">
            <el-input v-model="basicForm.tel" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="basicForm.email" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="basicDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="basicDialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>

    <el-card class="edu">
      <p id="title">
        教育信息
        <el-button type="text" icon="el-icon-edit" @click="eduDialogFormVisible = true"></el-button>
      </p>
      <p id="content">学校名称：{{eduForm.school}}</p>
      <p id="content">专业名称：{{eduForm.major}}</p>
      <p id="content">就读时间：{{eduForm.begin}} 至 {{eduForm.end}}</p>
      <p id="content">学历：{{eduForm.grade}}</p>
      <el-dialog title="教育信息" :visible.sync="eduDialogFormVisible">
        <el-form ref="eduForm" :model="eduForm">
          <el-form-item label="学校名称" :label-width="formLabelWidth">
            <el-input v-model="eduForm.school" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="专业名称" :label-width="formLabelWidth">
            <el-input v-model="eduForm.major" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="就读时间" :label-width="formLabelWidth">
            <el-date-picker
              v-model="eduForm.begin"
              type="month"
              placeholder="选择月"
              value-format="yyyy-MM"
            >></el-date-picker>
            <el-date-picker
              v-model="eduForm.end"
              type="month"
              placeholder="选择月"
              value-format="yyyy-MM"
            >></el-date-picker>
          </el-form-item>
          <el-form-item label="学历" :label-width="formLabelWidth">
            <el-select v-model="eduForm.grade" placeholder="请选择年级">
              <el-option label="本科" value="本科"></el-option>
              <el-option label="硕士" value="硕士"></el-option>
              <el-option label="博士" value="博士"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="eduDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="eduDialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>

    <el-card class="exp">
      <p id="title">
        实习经历
        <el-button type="text" icon="el-icon-edit" @click="expDialogFormVisible = true"></el-button>
      </p>
      <p id="content">公司名称：{{expForm.cname}}</p>
      <p id="content">公司行业：{{expForm.industry}}</p>
      <p id="content">职位名称：{{expForm.pname}}</p>
      <p id="content">工作地点：{{expForm.place}}</p>
      <p id="content">实习时间：{{expForm.begin}} 至 {{expForm.end}}</p>
      <p id="content">工作内容：{{expForm.detail}}</p>
      <el-dialog title="实习经历" :visible.sync="expDialogFormVisible">
        <el-form ref="expForm" :model="expForm">
          <el-form-item label="公司名称" :label-width="formLabelWidth">
            <el-input v-model="expForm.cname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="公司行业" :label-width="formLabelWidth">
            <el-input v-model="expForm.industry" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="职位名称" :label-width="formLabelWidth">
            <el-input v-model="expForm.pname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="工作地点" :label-width="formLabelWidth">
            <el-input v-model="expForm.place" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="实习时间" :label-width="formLabelWidth">
            <el-date-picker
              v-model="expForm.begin"
              type="month"
              placeholder="选择月"
              value-format="yyyy-MM"
            >></el-date-picker>
            <el-date-picker
              v-model="expForm.end"
              type="month"
              placeholder="选择月"
              value-format="yyyy-MM"
            >></el-date-picker>
          </el-form-item>
          <el-form-item label="工作内容" :label-width="formLabelWidth">
            <el-input v-model="expForm.detail" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="expDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="expDialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </el-container>
</template>

<script>
export default {
  name: "Resume",
  data() {
    return {
      activeIndex: "/Resume",
      basicDialogFormVisible: false,
      eduDialogFormVisible: false,
      expDialogFormVisible: false,
      skillDialogFormVisible: false,
      selfDialogFormVisible: false,
      basicForm: {
        tel: "",
        email: ""
      },
      eduForm: {
        school: "",
        major: "",
        begin: "",
        end: "",
        grade: ""
      },
      expForm: {
        cname: "",
        industry: "",
        pname: "",
        place: "",
        begin: "",
        detail:""
      },
      formLabelWidth: "100px"
    };
  },
  mounted() {},
  methods: {
    resetForm(form) {
      this.$refs[form].resetFields();
      this.basicDialogFormVisible = false;
      this.eduDialogFormVisible = false;
      this.expDialogFormVisible = false;
      this.skillDialogFormVisible = false;
      this.selfDialogFormVisible = false;
    },
    // 返回主页
    backToMain() {
      this.$router.push({ path: "/Home" });
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