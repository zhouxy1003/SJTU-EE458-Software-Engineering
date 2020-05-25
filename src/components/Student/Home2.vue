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
      <el-col :span="1" :offset="12">
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

    <el-card class="search">
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-input v-model="searchinput" placeholder="搜索一下"></el-input>
        </el-col>
        <el-col :span="3">
          <el-select v-model="value" filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        </el-col>
      </el-row>
      <el-row type="flex" justify="start">
        <div id="hotSearch">
          <p>热门搜索：{{hotSearch.first}} {{hotSearch.second}} {{hotSearch.third}}</p>
        </div>
      </el-row>
    </el-card>

    <div class="banner">
      <el-carousel :interval="4000" type="card" height="200px" trigger="click">
        <el-carousel-item v-for="pic in bannerimgurls" :key="pic">
          <img :src="pic" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-main>
      <div class="recommend">
        <el-menu :default-active="$route.path" mode="horizontal" @select="handleSelect" router>
          <el-menu-item index="/Student/Home">推荐职位</el-menu-item>
          <el-menu-item index="/Student/Home2">推荐宣讲会</el-menu-item>
        </el-menu>
      </div>
      <div v-if="talkList.length>0">
        <el-card class="searchResult" v-for="(talk, index) in talkList" :key="index">
          <el-link type="primary" @click="talkDetail(talk.seminarid)">{{talk.sname}}</el-link>
          <p>
            <span>{{talk.cname}}</span>
            <el-divider direction="vertical"></el-divider>
            <span>{{talk.stime}}</span>
            <el-divider direction="vertical"></el-divider>
            <span>{{talk.splace}}</span>
          </p>
        </el-card>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "Home2",
  data() {
    return {
      options: [
        {
          value: "职位",
          label: "职位"
        },
        {
          value: "宣讲会",
          label: "宣讲会"
        }
      ],
      value: "宣讲会",
      searchinput: "",
      bannerimgurls: [
        require("../../assets/banner1.png"),
        require("../../assets/banner2.png"),
        require("../../assets/banner3.png"),
        require("../../assets/banner4.png")
      ],
      hotSearch: {
        first: "热门搜索1",
        second: "热门搜索2",
        third: "热门搜索3"
      },
      talkList: [
        {
          seminarid: "1",
          sname: "融合平台开发部宣讲会",
          cname: "上海华为无线网络产品线",
          stime: "2020年5月15日",
          splace: "上海交通大学东上院101"
        },
        {
          seminarid: "2",
          sname: "遇见未来技术讲座",
          cname: "华为上海研究所",
          stime: "2020年5月14日",
          splace: "上海交通大学东中院201"
        },
        {
          seminarid: "3",
          sname: "航天科工二院宣讲会",
          cname: "上海华为无线网络产品线",
          stime: "2020年4月23日",
          splace: "上海交通大学下院301"
        }
      ]
    };
  },
  created() {
    this.recommendTalk();
  },
  methods: {
    search() {
      if (this.value == "职位") {
        this.$router.push({
          path: "/Student/Search",
          query: { searchinput: this.searchinput }
        });
      } else if (this.value == "宣讲会") {
        this.$router.push({
          path: "/Student/Search2",
          query: { searchinput: this.searchinput }
        });
      }
    },
    recommendTalk() {
      this.$axios
        .get(this.HOME + "/api/get_recommend_talks", {
          params: {
            sloginid: this.Global.loginid
          }
        })
        .then(response => {
          if (response.data.error_num === 0) {
            this.talkList = response.data.data;
          } else {
            this.$message.error("推荐宣讲会信息失败");
            console.log(response.data.msg);
          }
        });
    },
    talkDetail(id) {
      this.$router.push({
        path: "/Student/TalkDetail",
        query: { seminarid: id }
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
.search {
  width: 60%;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 10%;
  margin-right: 10%;
}
#hotSearch {
  font-size: 15px;
  position: relative;
  left: 10%;
}
.banner {
  padding-left: 20%;
  padding-right: 20%;
  margin-top: 20px;
  margin-bottom: 20px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

img {
  width: 100%;
}

.recommend {
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
.el-card {
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20%;
  margin-right: 20%;
}
</style>
