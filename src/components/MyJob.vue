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
    <div v-if="jobList.length>0">
        <el-card class="searchResult" v-for="(job, index) in jobList" :key="index">
          <el-link type="primary">{{job.jname}}</el-link>
          <p>
            <span>{{job.salary}}</span>
            <el-divider direction="vertical"></el-divider>
            <span>{{job.jplace}}</span>
            <el-divider direction="vertical"></el-divider>
            <span>{{job.cname}}</span>
          </p>
        </el-card>
      </div>
  </el-container>
</template>

<script>
export default {
  name: "MyJob",
  data() {
    return {
      activeIndex: "/MyJob",
      jobList: [
        {
          jname: "C++研发实习生",
          salary: "300-400元/天",
          jplace: "北京",
          cname: "北京蓦然认知科技有限公司"
        },
        {
          jname: "后端研发实习生",
          salary: "250-300元/天",
          jplace: "杭州",
          cname: "杭州艾耕科技有限公司"
        },
        {
          jname: "阿里健康java实习生",
          salary: "250-300元/天",
          jplace: "北京",
          cname: "阿里健康"
        },
        {
          jname: "大数据开发实习生",
          salary: "150-200元/天",
          jplace: "上海",
          cname: "上海比孚信息科技有限公司"
        }
      ] // 推荐数据
    };
  },
  created() {
    this.getMyJob();
  },
  methods: {
    getMyJob() {
      this.$axios
        .get(this.HOME + "/api/get_my_job", {
          params: {
            sloginid: this.Global.loginid
          }
        })
        .then(response => {
          this.jobList = response.data;
        });
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

.searchResult {
  width: 50%;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20%;
  margin-right: 20%;
  padding-left: 5%;
  padding-right: 5%;
  font-size: 15px;
}
.el-link {
  font-size: 18px;
}
</style>