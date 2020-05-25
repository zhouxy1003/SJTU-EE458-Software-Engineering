<template>
  <div>
    <el-container direction="vertical">
      <el-row class="top-bar">
        <img src="../../assets/ijob.png" class="image" />
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
        router
      >
        <el-menu-item index="/Company/Enterprice" class="el-icon-setting">资料完善</el-menu-item>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>职位管理
          </template>
          <el-menu-item index="/Company/NewPos">发布职位</el-menu-item>
          <el-menu-item index="/Company/ManPos">管理职位</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-menu"></i>宣讲会管理
          </template>

          <el-menu-item index="/Company/NewTalk">发布宣讲会</el-menu-item>
          <el-menu-item index="/Company/ManTalk">管理宣讲会</el-menu-item>
        </el-submenu>
        <el-menu-item index="/Company/ResSer" class="el-icon-document">简历库</el-menu-item>
      </el-menu>
      <el-col class="line" :span="2">-</el-col>
      <el-card class="pos">
        <el-form
          :model="positionForm"
          :rules="rules"
          ref="positionForm"
          label-width="formLabelWidth"
          class="demo-positionForm"
        >
          <el-form-item label="职位名称" prop="jname">
            <el-col :span="11">
              <el-input v-model="positionForm.jname"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="薪资" prop="salary">
            <el-col :span="11">
              <el-input v-model="positionForm.salary"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="工作地点" prop="jplace">
            <el-col :span="11">
              <el-input v-model="positionForm.jplace"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="职位描述" prop="detail">
            <el-col :span="11">
              <el-input type="textarea" v-model="positionForm.detail"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="任职要求" prop="requirement">
            <el-col :span="11">
              <el-input type="textarea" v-model="positionForm.requirement"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="addpositionForm()">立即创建</el-button>
            <el-button @click="resetForm('positionForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      positionForm: {
        jname: "",
        salary: "",
        jplace: "",
        cname: "",
        detail: "",
        requirement: ""
      },
      rules: {
        jname: [
          { required: true, message: "请输入职位名称", trigger: "blur" }
        ],
        requirement: [
          { required: true, message: "请填写任职要求", trigger: "blur" }
        ],
        jplace: [
          { required: true, message: "请填写职位工作城市", trigger: "blur" }
        ],
        salary: [
          {
            required: true,
            message: "请填写薪资情况（每小时or每日or每月）",
            trigger: "blur"
          }
        ],
        detail: [
          { required: true, message: "请填写职位描述", trigger: "blur" }
        ]
      },
      formLabelWidth: "100px"
    };
  },
  created() {
    this.showpositionForm();
  },
  methods: {
    addpositionForm() {
      // this.$axios
      //   .get(this.HOME + "/api/add_job", {
      //     params: {
      //       companyid: this.Global.loginid,
      //       jname: this.positionForm.jname,
      //       jplace: this.positionForm.jplace,
      //       salary: this.positionForm.salary,
      //       jcontent: this.positionForm.detail,
      //       jrequirement: this.positionForm.requirement
      //     }
      //   })
      //   .then(responese => {
      //     if (responese.data.error_num === 0) {
      //       this.$router.push({ path: "/Company/ManPos" });
      //     } else {
      //       this.$message.error("职位发布失败，请重试");
      //       console.log(responese.data.msg);
      //     }
      //   });
      this.$router.push({ path: "/Company/ManPos" });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 返回主页
    backToMain() {
      this.$router.push({ path: "/Company/Enterprice" });
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
};
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
.button {
  background: transparent;
  color: transparent;
  position: absolute;
  margin-top: 500px;
  margin-bottom: 500px;
  margin-left: 45%;
  padding-left: 0%;
  padding-right: 0%;
  padding-left: -5px;
  padding-right: 6%;
}
.image {
  position: absolute;
  width: 100px;
  height: 40px;
  left: 10px;
  top: 10px;
  display: block;
}
.city {
  position: relative;
  margin-top: 0px;
  //margin-bottom: 500px;
  left: -100px;
  padding-left: 100px;
  //padding-right: 0%;
  //padding-left:-5px;
  // padding-right: 6%;
}
.pos {
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
