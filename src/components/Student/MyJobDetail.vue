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
      <p id="title">{{jobDetail.jname}}</p>
      <p id="content">薪资：{{jobDetail.salary}}</p>
      <p id="content">工作地点：{{jobDetail.jplace}}</p>
      <el-divider></el-divider>
      <p id="content">职位描述：</p>
      <p id="content">{{jobDetail.detail}}</p>
      <el-divider></el-divider>
      <p id="content">任职要求：</p>
      <p id="content">{{jobDetail.requirement}}</p>
      <el-button id="deliver" type="warning" icon="el-icon-message" disabled>已投递</el-button>
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
    <el-card id="timeline">
      <p id="content">投递进度：</p>
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.timestamp"
        >{{activity.content}}</el-timeline-item>
      </el-timeline>
    </el-card>
  </el-container>
</template>

<script>
export default {
  name: "JobDetail",
  data() {
    return {
      jobDetail: {
        jobid: "1",
        jname: "C++研发实习生",
        salary: "300-400元/天",
        jplace: "北京",
        cname: "北京蓦然认知科技有限公司",
        detail:
          "负责组织和协调成立项目组，确定项目组成员及小组职能，有效识别项目立项输入信息是否完备，并组织和评估项目立项的必要性",
        requirement:
          "本科及以上学历，项目管理，电子工程，软件工程、汽车工程等相关专业"
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
      },
      activities: [
        {
          content: "您的简历已投递给对方",
          timestamp: "2020-01-01"
        }
      ]
    };
  },
  created() {
    this.jobDetail.jobid = this.$route.query.jobid;
    this.showJob(this.jobDetail.jobid);
  },
  methods: {
    showJob(id) {
      this.$axios
        .get(this.HOME + "/api/show_job", {
          params: {
            sloginid: this.Global.loginid,
            jobid: this.jobDetail.jobid
          }
        })
        .then(response => {
          this.jobDetail.jname = response.data.jname;
          this.jobDetail.salary = response.data.salary;
          this.jobDetail.jplace = response.data.jplace;
          this.jobDetail.cname = response.data.cname;
          this.jobDetail.detail = response.data.jcontent;
          this.jobDetail.requirement = response.data.jrequirement;
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
          this.companyInfo.place = response.data.place;
          this.companyInfo.registerDate = response.data.registerDate;
          this.companyInfo.registerCapital = response.data.registerCapital;
          this.companyInfo.timeLimit = response.data.timeLimit;
          this.companyInfo.business = response.data.business;
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
#timeline {
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20%;
  margin-right: 41%;
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
