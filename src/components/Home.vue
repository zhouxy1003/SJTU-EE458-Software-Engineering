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
      :default-active="activeIndex"
      class="menu"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">简历管理</el-menu-item>
      <el-submenu index="3">
        <template slot="title">我的</template>
        <el-menu-item index="3-1">我投递的职位</el-menu-item>
        <el-menu-item index="3-2">我报名的宣讲会</el-menu-item>
      </el-submenu>
    </el-menu>

    <el-card class="search">
      <el-row type="flex" justify="center">
        <el-col :span="15">
          <el-input v-model="searchinput" placeholder="搜索一下"></el-input>
        </el-col>
        <el-col :span="2">
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
        <p>热门搜索：AAA BBB CCC</p>
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
        <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">推荐职位</el-menu-item>
          <el-menu-item index="2">推荐宣讲会</el-menu-item>
        </el-menu>
      </div>
      <div>
        <el-card id="firstCard"></el-card>
        <el-card></el-card>
        <el-card></el-card>
        <el-card></el-card>
        <el-card></el-card>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      activeIndex: "1",
      options: [
        {
          value: "职位",
          label: "职位"
        },
        {
          value: "公司",
          label: "公司"
        }
      ],
      value: "职位",
      seachinput: "",
      currentDate: "xxx",
      activeName: "first",
      bannerimgurls: [
        require("../assets/banner1.png"),
        require("../assets/banner2.png"),
        require("../assets/banner3.png"),
        require("../assets/banner4.png")
      ],
      firmInfoListData: null,
      JDlistData: null,
      name: "",
      msg: "Welcome to Your Vue.js App",
      input: "",
      auth: null
    };
  },
  methods: {
    // 返回主页
    backToMain() {
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
}
.menu {
  padding-left: 10%;
  padding-right: 10%;
}
.search {
  width: 80%;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 10%;
  margin-right: 10%;
}

.banner {
  padding-left: 10%;
  padding-right: 10%;
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
  padding-left: 10%;
  padding-right: 10%;
}

.el-footer {
  text-align: left;
  font-size: 12px;
  background: #446699;
  color: white;
}

.el-card {
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 10%;
  margin-right: 10%;
}
</style>
