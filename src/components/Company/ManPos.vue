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
            <!-- <h6>Welcome: {{loginid}}</h6> -->
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

      <el-card class="pos">
        <!-- <el-form
          :model="ManPosForm"
          :rules="rules"
          ref="ManPosForm"
          label-width="formLabelWidth"
          class="demo-ManPosForm"
        >-->
        <el-table :data="tableData" style="width: 900px">
          <!-- <el-table-column type="selection" width="55"></el-table-column>
          -->
          <!-- <el-table-column
      label="建立日期"
      width="150">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
          </el-table-column>-->

          <el-table-column label="职位名称" width="180">
            <template slot-scope="scope">
              <!-- <div slot="reference" class="pname-wrapper"> -->
              <span size="medium">{{ scope.row.pname }}</span>
              <!-- </div> -->
            </template>
          </el-table-column>
          <el-table-column label="薪金" width="100" prop="money"></el-table-column>
          <el-table-column label="城市" width="100" prop="city"></el-table-column>
          <el-table-column label="投递简历">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="showResumeList(scope.$index, scope.row)"
              >查看投递简历</el-button>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- <el-button
          size="mini"
          type="primary"
              @click="handleClick(scope.$index, scope.row)">查看</el-button>-->
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">具体内容</el-button>
              <el-button size="mini" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          title="提示"
          :visible.sync="dialogFormVisible"
          width="30%"
          :before-close="handleClose"
        >
          <el-form :model="editObj">
            <el-form-item label="职位名称">
              <el-input v-model="editObj.pname" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="工作城市">
              <el-input v-model="editObj.city" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="薪资">
              <el-input v-model="editObj.money" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="工作内容">
              <el-input v-model="editObj.pcontext" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="任职要求">
              <el-input v-model="editObj.requirement" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="editFormSubmit(editObj.id)">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog title="简历列表" :visible.sync="resumeListVisible" width="50%">
          <el-table :data="resumeData" style="width: 100%">
            <el-table-column prop="sname" label="姓名" width="180"></el-table-column>
            <el-table-column prop="stel" label="电话" width="180"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
            <el-table-column label="操作" width="180">
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
        <el-dialog title="简历内容" :visible.sync="resumeContentVisible" width="30%">
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
          <p>工作内容：{{resumeContent.detail}}</p>
          <h4>技能介绍</h4>
          <p>{{resumeContent.skill}}</p>
          <h4>自我介绍</h4>
          <p>{{resumeContent.self}}</p>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="resumeContentVisible = false">通过</el-button>
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
      resumeContent:{},
      resumeData:{},
      editObj: {
        id: "",
        data: "",
        pname: "",
        city: "",
        money: "",
        address: "",
        pcontext: "",
        requirement: ""
      },
      tableData: [
        {
          id: "0",
          date: "2020-05-03",
          pname: "web前端开发实习生",
          city: "上海",
          money: "200/天",
          address: "上海市普陀区金沙江路 1517 弄",
          pcontext:
            "1.参与公司产品的前端开发工作（包括PC、以及移动端开发）；2.与产品经理沟通，完成设计交互的UI实现；",
          requirement:
            "本科及以上学历；熟练掌握HTML/CSS/XML/JSON，对HTTP协议足够熟悉；思路清晰，具备良好的沟通能力和理解能力",
          resume: [
            {
              id: "0",
              sname: "张三",
              stel: "13800000000",
              email: "123@qq.com",
              content:{
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
              sname: "李四",
              stel: "13800000000",
              email: "123@qq.com",
              content:{
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
          ]
        },
        {
          id: "1",
          date: "2020-05-02",
          pname: "c++开发实习生",
          city: "上海",
          money: "200/天",
          address: "上海市普陀区金沙江路 1517 弄",
          pcontext:
            "1.参与公司产品的前端开发工作（包括PC、以及移动端开发）；2.与产品经理沟通，完成设计交互的UI实现；",
          requirement:
            "本科及以上学历；熟练掌握HTML/CSS/XML/JSON，对HTTP协议足够熟悉；思路清晰，具备良好的沟通能力和理解能力",
          resume: [
            {
              id: "0",
              sname: "张三",
              stel: "13800000000",
              email: "123@qq.com",
              content:{
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
              sname: "李四",
              stel: "13800000000",
              email: "123@qq.com",
              content:{
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
          ]
        },
        {
          id: "2",
          date: "2020-05-03",
          pname: "算法实习生",
          city: "上海",
          money: "200/天",
          address: "上海市普陀区金沙江路 1519 弄",
          pcontext:
            "1.参与公司产品的前端开发工作（包括PC、以及移动端开发）；2.与产品经理沟通，完成设计交互的UI实现；",
          requirement:
            "本科及以上学历；熟练掌握HTML/CSS/XML/JSON，对HTTP协议足够熟悉；思路清晰，具备良好的沟通能力和理解能力",
          resume: [
            {
              id: "0",
              sname: "张三",
              stel: "13800000000",
              email: "123@qq.com",
              content:{
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
              sname: "李四",
              stel: "13800000000",
              email: "123@qq.com",
              content:{
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
          ]
        },
        {
          id: "3",
          date: "2020-05-04",
          pname: "机器学习算法实习生",
          city: "上海",
          money: "200/天",
          address: "上海市普陀区金沙江路 1516 弄",
          pcontext:
            "1.参与公司产品的前端开发工作（包括PC、以及移动端开发）；2.与产品经理沟通，完成设计交互的UI实现；",
          requirement:
            "本科及以上学历；熟练掌握HTML/CSS/XML/JSON，对HTTP协议足够熟悉；思路清晰，具备良好的沟通能力和理解能力",
          resume: [
            {
              id: "0",
              sname: "张三",
              stel: "13800000000",
              email: "123@qq.com",
              content:{
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
              sname: "李四",
              stel: "13800000000",
              email: "123@qq.com",
              content:{
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
          ]
        }
      ],
      formLabelWidth: "600px"
    };
  },
  created() {
    // this.showManPosForm();
  },
  methods: {
    //打开编辑页面
    handleEdit(index, row) {
      //调用该id用户的数据
      // this.$axios.get('....')
      console.log(index);
      console.log(row.id);
      this.editObj.id = row.id;
      this.editObj.pname = row.pname;
      this.editObj.city = row.city;
      this.editObj.money = row.money;
      this.editObj.pcontext = row.pcontext;
      this.editObj.requirement = row.requirement;
      // 记录索引
      //  this.listIndex=_index;
      //  记录数据
      //  this.editObj=row;
      //  显示弹窗
      this.dialogFormVisible = true;
    },
    //提交编辑信息
    editFormSubmit(id) {
      console.log(id);
      this.tableData.some(item => {
        if (item.id == id) {
          item.pname = this.editObj.pname;
          item.city = this.editObj.city;
          item.money = this.editObj.money;
          item.pcontext = this.editObj.pcontext;
          item.requirement = this.editObj.requirement;
          this.dialogFormVisible = false;
          return true;
        }
      });
    },
    editDo() {
      let _index = this.listIndex;
      //根据索引，赋值到list制定的数
      this.list[_index] = editObj;
      //关闭弹窗
      this.dialogFormVisible = false;
    },
    showResumeList(index, row) {
      this.resumeData = row.resume
      this.resumeListVisible = true;
      console.log(index);
      console.log(row);
    },
    showResumeContent(data) {
      this.resumeContent = data
      this.resumeContentVisible = true
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
  margin-right: 20%;
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
