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
      <el-card class="talk">
        <el-form
          :model="talkForm"
          :rules="rules"
          ref="talkForm"
          label-width="100px"
          class="demo-talkForm"
        >
          <el-form-item label="宣讲会名称" prop="sname">
              <el-input v-model="talkForm.sname"></el-input>
          </el-form-item>
          <!-- <el-col class="line" :span="2"></el-col> -->

          <el-form-item label="具体地址" prop="splace">
              <el-input type="textarea" v-model="talkForm.splace"></el-input>
          </el-form-item>
          <el-form-item label="宣讲会时间" required>
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="talkForm.sdate"
              style="width: 100%;"
              value-format="yyyy-MM"
            ></el-date-picker>
            <el-time-picker
              v-model="talkForm.sbegin"
              placeholder="开始时间"
              value-format="HH:mm"
              format="HH:mm"
            ></el-time-picker>
            <el-time-picker
              v-model="talkForm.send"
              placeholder="结束时间"
              value-format="HH:mm"
              format="HH:mm"
            ></el-time-picker>
          </el-form-item>

          <el-form-item label="宣讲会主题" prop="stheme">
            <el-input type="textarea" v-model="talkForm.stheme" placeholder="人工智能/金融经济/机械制造/船舶海洋"></el-input>
          </el-form-item>

          <el-form-item label="现场活动" prop="sactivity">
            <el-input type="textarea" v-model="talkForm.sactivity" placeholder="线下抽奖/内推资格/面试直通车"></el-input>
          </el-form-item>

          <el-form-item label="宣讲会内容" prop="scontent">
            <el-input type="textarea" v-model="talkForm.scontent"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addtalkForm()">立即创建</el-button>
            <el-button @click="resetForm('talkForm')">重置</el-button>
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
      talkForm: {
        sname: "",
        cname: "",
        splace: "",
        sdate: "",
        sbegin: "",
        send: "",
        stheme: "",
        sactivity: "",
        scontent: ""
      },
      rules: {
        sname: [
          { required: true, message: "请输入宣讲会名称", trigger: "blur" }
        ],
        splace: [
          { required: true, message: "请输入宣讲会地址", trigger: "blur" }
        ],
        sdate: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "blur"
          }
        ],
        sbegin: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "blur"
          }
        ],
        send: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "blur"
          }
        ],
        stheme: [
          {
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "blur"
          }
        ],
        sactivity: [
          { required: true, message: "请填写现场活动", trigger: "blur" }
        ],
        scontent: [
          { required: true, message: "请填写宣讲会内容", trigger: "blur" }
        ]
      },
      formLabelWidth: "100px"
    };
  },
  created() {
    this.showtalkForm();
  },
  methods: {
    addtalkForm() {
      this.$axios
        .get(this.HOME + "/api/add_seminar", {
          params: {
            sname: this.talkForm.sname,
            splace: this.talkForm.splace,
            sdate: this.talkForm.sdate,
            sbegin: this.talkForm.sbegin,
            send: this.talkForm.send,
            stheme: this.talkForm.stheme,
            sactivity: this.talkForm.sactivity,
            scontent: this.talkForm.scontent
          }
        })
        .then(responese => {
          if (responese.data.error_num === 0) {
            this.$router.push({ path: "/Company/ManTalk" });
          } else {
            this.$message.error("宣讲会发布失败，请重试");
            console.log(responese.data.msg);
          }
        });
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
.talk {
  width: 50%;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20%;
  margin-right: 20%;
  padding-left: 5%;
  padding-right: 5%;
}
.xaddress {
  position: relative;
  margin-top: 0px;
  //margin-bottom: 500px;
  left: -100px;
  padding-left: 100px;
  //padding-right: 0%;
  //padding-left:-5px;
  // padding-right: 6%;
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
