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
      <el-card class="pos">
        <el-table :data="tableData" style="width: 900px">
          <el-table-column label="职位名称" width="180" prop="jname"></el-table-column>
          <el-table-column label="薪金" width="100" prop="salary"></el-table-column>
          <el-table-column label="城市" width="100" prop="jplace"></el-table-column>
          <el-table-column label="投递简历">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="showResumeList(scope.$index, scope.row)"
              >查看投递的简历</el-button>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, tableData)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="提示" :visible.sync="dialogFormVisible" width="40%">
          <el-form :model="editObj">
            <el-form-item label="职位名称">
              <el-input v-model="editObj.jname" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="工作城市">
              <el-input v-model="editObj.jplace" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="薪资">
              <el-input v-model="editObj.salary" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="职位描述">
              <el-input v-model="editObj.detail" type="textarea" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="任职要求">
              <el-input v-model="editObj.requirement" type="textarea" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog title="简历列表" :visible.sync="resumeListVisible" width="40%">
          <el-table :data="resumeData" style="width: 100%">
            <el-table-column prop="sname" label="姓名" width="100"></el-table-column>
            <el-table-column prop="school" label="学校" width="180"></el-table-column>
            <el-table-column prop="major" label="专业" width="180"></el-table-column>
            <el-table-column label="操作" width="100">
              <template v-slot="scope">
                <el-button type="primary" @click="showResumeContent(scope.row.content)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <span slot="footer" class="dialog-footer">
            <el-button @click="resumeListVisible = false">取 消</el-button>
            <el-button type="primary" @click="resumeListVisible = false">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog title="简历内容" :visible.sync="resumeContentVisible" width="40%">
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
            <el-button type="primary" @click="qualify()">通过</el-button>
            <el-button type="danger" @click="resumeContentVisible = false">不通过</el-button>
          </span>
        </el-dialog>
      </el-card>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      resumeContentVisible: false,
      resumeListVisible: false,
      dialogFormVisible: false,
      resumeContent: {},
      resumeData: [
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
        }
      ],
      editObj: {
        jobid: "",
        jname: "",
        jplace: "",
        salary: "",
        detail: "",
        requirement: ""
      },
      tableData: [
        {
          jname: "测试工程师",
          jplace: "上海",
          salary: "10000-15000元/月",
          detail: "完成公司项目、产品的所有相关测试工作",
          requirement: "相关专业本科以上学历，英语良好"
        },
        {
          jname: "后台开发工程师",
          jplace: "上海",
          salary: "面议",
          detail: "负责通用业务组件的开发和维护",
          requirement: "本科以上学历，计算机相关专业，熟悉分布式系统设计"
        }
      ],
      formLabelWidth: "600px"
    };
  },
  created() {
    // this.showManPosForm();
  },
  methods: {
    qualify() {
      this.$axios
        .get(this.HOME + "/api/interview", {
          params: {}
        })
        .then(response => {
          if (response.data.error_num === 0) {
            this.resumeContentVisible = false;
          } else {
            this.$message.error("通过简历失败");
            console.log(response.data.msg);
          }
        });
    },
    showResumeList(index, row) {
      this.resumeListVisible = true;
    },
    showResumeContent(data) {
      this.resumeContent = data;
      this.resumeContentVisible = true;
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
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.editObj.jname = row.jname;
      this.editObj.jplace = row.jplace;
      this.editObj.salary = row.salary;
      this.editObj.place = row.place;
      this.editObj.detail = row.detail;
      this.editObj.requirement = row.requirement;
    },
    handleDelete(index, rows) {
      rows.splice(index, 1);
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
  width: 60%;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 15%;
  margin-right: 15%;
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
