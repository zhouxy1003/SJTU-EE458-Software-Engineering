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
        <el-menu-item index="/Company/Enterprice">
          <i class="el-icon-setting"></i>资料完善
        </el-menu-item>

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
        <el-menu-item index="/Company/ResSer">
          <i class="el-icon-document"></i>简历库
        </el-menu-item>
      </el-menu>

      <el-card class="search">
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-input v-model="searchinput" placeholder="搜索一下" clearable @clear="clearInput"></el-input>
          </el-col>

          <el-col :span="3">
            <el-button type="primary" icon="el-icon-search" @click="search(searchinput)">搜索</el-button>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start"></el-row>
        <el-table :data="searchData" style="width: 100%">
          <el-table-column prop="sname" label="姓名" width="180"></el-table-column>
          <el-table-column prop="school" label="学校" width="180"></el-table-column>
          <el-table-column prop="major" label="专业" width="180"></el-table-column>
          <el-table-column label="操作">
            <template v-slot="scope">
              <el-button type="primary" @click="showContent(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog title="简历内容" :visible.sync="contentVisible" width="40%">
          <h4>个人信息</h4>
          <p>手机：{{resumeContent.stel}}</p>
          <p>邮箱：{{resumeContent.email}}</p>
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
            <el-button type="primary" @click="contentVisible = false">发送邀请</el-button>
          </span>
        </el-dialog>
      </el-card>
      <!-- <el-button type="primary" icon="el-icon-edit" @click="companyDialogFormVisible = true"></el-button> -->
    </el-container>
  </div>
</template>

<script>
export default {
  name: "companyForm",
  data() {
    return {
      resumeContent: {},
      contentVisible: false,
      searchData: [],
      resData: [
        {
          sname: "王鑫凯",
          school: "上海交通大学",
          major: "计算机科学与技术",
          content: {
            stel: "15201967357",
            email: "772918068@qq.com",
            school: "上海交通大学",
            major: "计算机科学与技术",
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
          sname: "李世杰",
          school: "上海交通大学",
          major: "船舶与海洋工程",
          content: {
            stel: "13923564684",
            email: "74369646805@qq.com",
            school: "上海交通大学",
            major: "船舶与海洋工程",
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
          sname: "陈源",
          school: "上海交通大学",
          major: "生物医学工程",
          content: {
            stel: "15201967357",
            email: "772918068@qq.com",
            school: "上海交通大学",
            major: "生物医学工程",
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
          sname: "卢浩文",
          school: "上海交通大学",
          major: "电气工程及其自动化",
          content: {
            stel: "15201967357",
            email: "772918068@qq.com",
            school: "上海交通大学",
            major: "电气工程及其自动化",
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
          sname: "高天云",
          school: "上海交通大学",
          major: "数学与应用数学",
          content: {
            stel: "15201967357",
            email: "772918068@qq.com",
            school: "上海交通大学",
            major: "数学与应用数学",
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
      value: "sname",
      searchinput: "",
      formLabelWidth: "100px"
    };
  },
  created() {
    this.searchData = this.resData;
  },
  methods: {
    showContent(row) {
      this.contentVisible = true;
      this.resumeContent = row.content;
      console.log(row);
    },
    optionChange() {
      console.log(this.value);
    },
    clearInput() {
      this.searchData = [];
    },
    search(str) {
      if (str) {
        this.searchData = this.resData.filter(function(person) {
          return Object.keys(person).some(function(key) {
            // 每一项数据的参数名
            return (
              String(person[key])
                .toLowerCase() // 字符串转换小写
                .indexOf(str) > -1 // 返回某个指定的字符串值在字符串中首次出现的位置
            );
          });
        });
      } else {
        this.searchData = this.resData;
      }
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
  margin-left: 20%;
  margin-right: 20%;
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
