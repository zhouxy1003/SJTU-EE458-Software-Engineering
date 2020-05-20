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
      <el-menu-item index="/Student/Home">首页</el-menu-item>
      <el-menu-item index="/Student/Resume">简历管理</el-menu-item>
      <el-submenu index="3">
        <template slot="title">我的</template>
        <el-menu-item index="/Student/MyJob">我投递的职位</el-menu-item>
        <el-menu-item index="/Student/MyTalk">我报名的宣讲会</el-menu-item>
      </el-submenu>
    </el-menu>
    <div v-if="talkList.length>0">
      <el-card class="searchResult" v-for="(talk, index) in talkList" :key="index">
        <el-link type="primary">{{talk.title}}</el-link>
        <p>
          <span>{{talk.cname}}</span>
          <el-divider direction="vertical"></el-divider>
          <span>{{talk.time}}</span>
          <el-divider direction="vertical"></el-divider>
          <span>{{talk.addr}}</span>
        </p>
      </el-card>
    </div>
  </el-container>
</template>

<script>
export default {
  name: "MyTalk",
  data() {
    return {
      activeIndex: "/Student/MyTalk",
      talkList: [
        {
          title: "融合平台开发部宣讲会",
          cname: "上海华为无线网络产品线",
          time: "2020年5月15日",
          addr: "上海交通大学东上院101"
        },
        {
          title: "遇见未来技术讲座",
          cname: "华为上海研究所",
          time: "2020年5月14日",
          addr: "上海交通大学东中院201"
        },
        {
          title: "航天科工二院宣讲会",
          cname: "上海华为无线网络产品线",
          time: "2020年4月23日",
          addr: "上海交通大学下院301"
        }
      ]
    };
  },
  created() {
    this.getMyTalk();
  },
  methods: {
    getMyTalk() {
      this.$axios
        .get(this.HOME + "/api/get_my_talk", {
          params: {
            sloginid: this.Global.loginid
          }
        })
        .then(response => {
          this.talkList = response.data;
        });
    },
    // 返回主页
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