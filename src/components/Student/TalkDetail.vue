<template>
  <el-container direction="vertical">
    <el-row class="top-bar">
      <el-col :span="3" :offset="2">
        <div class="headText1" @click="backToMain()">
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
        <el-button id="exit" type="primary" @click="backToLogin()">退出登录</el-button>
      </el-col>
    </el-row>

    <el-menu
      :default-active="$route.path"
      class="menu"
      mode="horizontal"
      @select="handleSelect"
      router
    >
      <el-menu-item index="/Student/Home">首页</el-menu-item>
      <el-menu-item index="/Student/Resume">简历管理</el-menu-item>
      <el-submenu index="3">
        <template slot="title">我的</template>
        <el-menu-item index="/Student/MyJob">我投递的职位</el-menu-item>
        <el-menu-item index="/Student/MyTalk">我报名的宣讲会</el-menu-item>
      </el-submenu>
    </el-menu>

    <el-card id="jobDetail">
      <p id="title">{{talkDetail.sname}}</p>
      <p id="content">举办单位：{{talkDetail.cname}}</p>
      <p id="content">宣讲会地点：{{talkDetail.splace}}</p>
      <p id="content">宣讲会时间：{{talkDetail.sdate}} {{talkDetail.sbegin}}-{{talkDetail.send}}</p>
      <p id="content">宣讲会主题：{{talkDetail.stheme}}</p>
      <p id="content">现场活动：{{talkDetail.sactivity}}</p>
      <el-divider></el-divider>
      <p id="content">宣讲会内容：</p>
      <p id="content">{{talkDetail.scontent}}</p>
      <el-button
        id="deliver"
        type="warning"
        icon="el-icon-message"
        :disabled="deliverButton"
        @click="deliver()"
      >{{buttonText}}</el-button>
    </el-card>
    <el-card id="companyInfo">
      <p id="title2">{{companyInfo.cname}}</p>
      <el-divider></el-divider>
      <p id="content2">行业：{{companyInfo.industry}}</p>
      <p id="content2">公司规模：{{companyInfo.scale}}</p>
      <p id="content2">公司地址：{{companyInfo.place}}</p>
      <p id="content2">注册时间：{{companyInfo.registerDate}}</p>
      <p id="content2">注册资本：{{companyInfo.registerCapital}}</p>
      <p id="content2">经营期限：{{companyInfo.timeLimit}}</p>
      <p id="content2">经营范围：{{companyInfo.business}}</p>
    </el-card>
  </el-container>
</template>

<script>
export default {
  name: "TalkDetail",
  data() {
    return {
      deliverButton: false,
      buttonText: "报名宣讲会",
      talkDetail: {
        seminarid: "1",
        sname: "融合平台开发部宣讲会",
        cname: "上海华为无线网络产品线",
        splace: "上海交通大学东上院101",
        sdate: "2020-05-15",
        sbegin: "10:30",
        send: "11:30",
        stheme: "人工智能",
        sactivity: "内推资格",
        scontent: "balabala"
      },
      companyInfo: {
        cname: "北京蓦然认知科技有限公司",
        industry: "IT",
        scale: "500人",
        place: "北京",
        registerDate: "2016年11月",
        registerCapital: "5000万人民币",
        timeLimit: "2016年11月01日-2046年10月31日",
        business:
          "从事汽车整车技术、汽车零部件技术、新能源技术、软件技术领域内的技术开发、技术转让、技术咨询、技术服务。"
      }
    };
  },
  created() {
    this.talkDetail.seminarid = this.$route.query.seminarid;
    this.showTalk(this.talkDetail.seminarid);
  },
  methods: {
    showTalk(id) {
      this.$axios
        .get(this.HOME + "/api/show_talk", {
          params: {
            sloginid: this.Global.loginid,
            seminarid: this.talkDetail.seminarid
          }
        })
        .then(response => {
          this.talkDetail.sname = response.data.sname;
          this.talkDetail.cname = response.data.cname;
          this.talkDetail.splace = response.data.splace;
          this.talkDetail.cname = response.data.cname;
          this.talkDetail.sdate = response.data.sdate;
          this.talkDetail.sbegin = response.data.sbegin;
          this.talkDetail.send = response.data.send;
          this.talkDetail.stheme = response.data.stheme;
          this.talkDetail.sactivity = response.data.sactivity;
          this.talkDetail.scontent = response.data.scontent;
        });
    },
    showCompany(id) {
      this.$axios
        .get(this.HOME + "/api/show_company", {
          params: {
            jobid: this.jobDetail.jobid
          }
        })
        .then(response => {
          this.companyInfo.cname = response.data.cname;
          this.companyInfo.industry = response.data.industry;
          this.companyInfo.scale = response.data.scale;
          this.companyInfo.place = response.data.caddress;
          this.companyInfo.registerDate = response.data.registerDate;
          this.companyInfo.registerCapital = response.data.registerCapital;
          this.companyInfo.timeLimit = response.data.timeLimit;
          this.companyInfo.business = response.data.business;
        });
    },
    deliver() {
      this.$axios
        .get(this.HOME + "/api/attend_talk", {
          params: {
            sloginid: this.Global.loginid,
            seminarid: this.talkDetail.seminarid
          }
        })
        .then(response => {
          if (response.data.error_num === 0) {
            this.deliverButton = true;
            this.buttonText = "已报名";
            this.$message("宣讲会报名成功");
          } else {
            this.$message.error("宣讲会报名失败，请重试");
            console.log(response.data.msg);
          }
        });
    },
    backToMain() {
      this.$router.push({ path: "/Student/Home" });
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
#jobDetail {
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20%;
  margin-right: 41%;
}
#companyInfo {
  position: absolute;
  top: 120px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 60%;
  margin-right: 20%;
}
#deliver {
  position: absolute;
  top: 185px;
  left: 600px;
}
#title {
  font-size: 25px;
}
#content {
  font-size: 15px;
}
#title2 {
  font-size: 15px;
}
#content2 {
  font-size: 12px;
}
</style>
