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
            <h6>Welcome: 98757</h6>
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
       
       
      <el-submenu index="2" >
        <template slot="title"><i class="el-icon-location"></i>职位管理</template>
        <el-menu-item index="/Company/NewPos">发布职位</el-menu-item>
        <el-menu-item index="/Company/ManPos">管理职位</el-menu-item>
      </el-submenu>
      <el-submenu index="3" >
        
        <template slot="title">
          <i class="el-icon-menu"></i>宣讲会管理</template>
        
        <el-menu-item index="/Company/NewTalk">发布宣讲会</el-menu-item>
        <el-menu-item index="/Company/ManTalk">管理宣讲会</el-menu-item>
      </el-submenu>
       <el-menu-item index="/Company/ResSer" class="el-icon-document">简历库</el-menu-item>
      
      </el-menu>

      <el-card class="search">
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-input v-model="searchinput" placeholder="搜索一下" clearable @clear="clearInput"></el-input>
          </el-col>
          <el-col :span="3">
            <el-select v-model="value" @change="optionChange" filterable placeholder="请选择">
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
        </el-row>
        <el-table :data="searchData" style="width: 100%">
          <el-table-column prop="sname" label="姓名" width="180"></el-table-column>
          <el-table-column prop="stel" label="手机" width="180"></el-table-column>
          <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
          <el-table-column label="操作">
            <template v-slot="scope">
              <el-button type="primary" @click="showContent(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog title="简历内容" :visible.sync="contentVisible" width="50%">
          <h4>教育信息</h4>
          <p>学校名称：{{resumeContent.school}}</p>
          <p>专业名称：{{resumeContent.major}}</p>
          <p>就读时间：{{resumeContent.eduBegin}}</p>
          <p>年级：{{resumeContent.grade}}</p>
          <h4>实习经历</h4>
          <p>公司名称：{{resumeContent.cname}}</p>
          <p>公司行业：{{resumeContent.industry}}</p>
          <p>职位名称：{{resumeContent.pname}}</p>
          <p>工作地点：{{resumeContent.place}}</p>
          <p>实习时间：{{resumeContent.expBegin}}</p>
         
          <p>工作内容：{{resumeContent.detail}}</p>
          <h4>技能介绍</h4>
          <p>{{resumeContent.skill}}</p>
          <h4>自我介绍</h4>
          <p>{{resumeContent.self}}</p>
          <span slot="footer" class="dialog-footer">
            <el-button @click="contentVisible = false">关 闭</el-button>
            <el-button type="primary" @click="sendInvitation">发送邀请</el-button>
          </span>
        </el-dialog>
      </el-card>
      <!-- <el-button type="primary" icon="el-icon-edit" @click="companyDialogFormVisible = true"></el-button> -->
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "companyForm",
  data() {
    return {
      resumeContent: {},
      contentVisible: false,
      searchData: [],
      resData: [
        {
          id: "0",
          sname: "李四",
          stel: "13800000000",
          email: "123@qq.com",
          school: "上海交通大学",
          content: {
            school: "上海交通大学",
            major: "计算机科学与技",
            eduBegin: "2017.09",
            grade: "大三",
            cname: "字节跳动",
            industry: "互联网",
            pname: "前端实习生",
            place: "上海",
            expBegin: "2019.07--2019.08",
            detail: "参与前端ui设计",
            skill: "熟悉c++，熟悉css+javascript,了解python",
            self: "我是一个认真负责的人"
          }
        },
        {
          id: "1",
          sname: "张三",
          stel: "13800000000",
          email: "123@qq.com",
          school: "上海交通大学",
          content: {
            school: "上海交通大学",
            major: "计算机科学与技",
            eduBegin: "2017.09",
            grade: "大三",
            cname: "字节跳动",
            industry: "互联网",
            pname: "前端实习生",
            place: "上海",
            expBegin: "2019.07--2019.08",
            detail: "参与前端ui设计",
            skill: "熟悉c++，熟悉css+javascript,了解python",
            self: "我是一个认真负责的人"
          }
        },
        {
          id: "2",
          sname: "王五",
          stel: "13800000000",
          email: "123@qq.com",
          school: "上海交通大学",
          content: {
            school: "上海交通大学",
            major: "计算机科学与技",
            eduBegin: "2017.09",
            grade: "大三",
            cname: "字节跳动",
            industry: "互联网",
            pname: "前端实习生",
            place: "上海",
            expBegin: "2019.07--2019.08",
            detail: "参与前端ui设计",
            skill: "熟悉c++，熟悉css+javascript,了解python",
            self: "我是一个认真负责的人"
          }
        }
      ],
      activeIndex: "/Enterprice",
      companyDialogFormVisible: false,
      companyForm: {
        tel: "",
        email: "",
        school: "",
        cname: "",
        industry: "",
        place: ""
      },
      hotSearch: {
        first: "热门搜索1",
        second: "热门搜索2",
        third: "热门搜索3"
      },
      options: [
        {
          value: "sname",
          label: "姓名"
        },
        {
          value: "school",
          label: "学校"
        }
      ],
      value: "sname",
      searchinput: "",
      formLabelWidth: "100px"
    };
  },

  methods: {
    sendInvitation() {
      this.$message.success('邀请已发送')
      this.contentVisible = false
    },
    showContent(row) {
      this.contentVisible = true;
      this.resumeContent = row.content
      console.log(row);
    },
    optionChange() {
      console.log(this.value);
    },
    clearInput() {
      this.searchData = [];
    },
    search() {
      const res = this.resData.filter(item => {
        return item[this.value].includes(this.searchinput) == true;
      });
      // console.log(res);
      if (res.length > 0) {
        this.searchData = res;
      } else {
        this.$message.error("没有结果");
      }
    },
    resetForm(form) {
      this.$refs[form].resetFields();
      this.companyDialogFormVisible = false;
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
.image {
  position: absolute;
  width: 100px;
  height: 40px;
  left: 10px;
  top: 10px;
  display: block;
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
