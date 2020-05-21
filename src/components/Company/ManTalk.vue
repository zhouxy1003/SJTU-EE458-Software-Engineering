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
        <el-menu-item index="/Company/Enterprice" class="el-icon-setting">资料完善</el-menu-item>

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
        <el-menu-item index="/Company/ResSer" class="el-icon-document">简历库</el-menu-item>
      </el-menu>
      <!-- 表格内容 -->
      <el-card class="pos">
        <el-table :data="tableData" style="width: 100%" ref="multipleTable">
          <el-table-column prop="sname" label="宣讲会名称" width="200"></el-table-column>
          <el-table-column prop="sdate" label="举办日期" width="200"></el-table-column>

          <el-table-column label="报名学生" width="150">
            <template slot-scope="scope">
              <el-button size="mini" @click="showStudents(scope.$index, scope.row)">查看</el-button>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="280">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, tableData)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <el-dialog title="报名学生" :visible.sync="studentVisible" width="30%">
        <el-table :data="studentInfo" style="width: 100%">
          <el-table-column prop="sname" label="姓名" width="180"></el-table-column>
          <el-table-column prop="tel" label="电话" width="180"></el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="studentVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="宣讲内容" :visible.sync="contentVisible" width="50%">
        <el-form :model="contentForm">
          <el-form-item label="宣讲会名称">
            <el-input v-model="contentForm.sname" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="具体地址">
            <el-input v-model="contentForm.splace" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="宣讲会时间">
            <el-date-picker
              type="date"
              v-model="contentForm.sdate"
              style="width: 100%;"
              value-format="yyyy-MM"
            ></el-date-picker>
            <el-time-picker
              v-model="contentForm.sbegin"
              value-format="HH:mm"
              format="HH:mm"
            ></el-time-picker>
            <el-time-picker
              v-model="contentForm.send"
              value-format="HH:mm"
              format="HH:mm"
            ></el-time-picker>
          </el-form-item>
          <el-form-item label="宣讲主题">
            <el-input v-model="contentForm.stheme" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="现场活动">
            <el-input v-model="contentForm.sactivity" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动内容">
            <el-input v-model="contentForm.scontent" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="contentSubmit">确 定</el-button>
          <el-button @click="contentVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "ManTalk",

  data() {
    return {
      contentForm: {
        seminarid: "",
        sname: "",
        splace: "",
        sdate: "",
        stheme: "",
        sactivity: "",
        scontent: "",
        sbegin: "",
        send: ""
      },
      contentVisible: false,
      xcontent: "",
      studentInfo: [
        {
          sname: "张三",
          tel: "13800000000"
        }
      ],
      studentVisible: false,
      tableData: [
        {
          seminarid: "0",
          sname: "宣传会名称1",
          splace: "闵行校区东下院105",
          sdate: "2020-5-30",
          stheme: "人工智能",
          sactivity: "内推资格，面试直通车",
          scontent: "邀请xxx为同学们讲述人工智能目前的应用领域及前景",
          sbegin: "08:30",
          send: "10:30"
        }
      ]
    };
  },
  methods: {
    // 获取数据,这里只简单展示数据，最好可以把当前页面，每页显示数据，搜索等参数传值到后台，因为删除会影响分页和数据
    showStudents(index, row) {
      this.studentVisible = true;
    },
    handleEdit(index, row) {
      this.contentVisible = true;
      this.contentForm.sname = row.sname;
      this.contentForm.splace = row.splace;
      this.contentForm.sdate = row.sdate;
      this.contentForm.stheme = row.stheme;
      this.contentForm.sactivity = row.sactivity;
      this.contentForm.scontent = row.scontent;
      this.contentForm.sbegin = row.sbegin;
      this.contentForm.send = row.send;
    },
    handleDelete(index, rows) {
      rows.splice(index, 1);
    },
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
.pos {
  width: 65%;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 13%;
  margin-right: 20%;
  padding-left: 5%;
  padding-right: 5%;
}
.talk {
  width: 50%;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20%;
  margin-right: 20%;
  padding-left: 5%;
  padding-right: 5%;
}
.xaddress {
  position: relative;
  margin-top: 0px;
  //margin-bottom: 500px;
  left: -100px;
  padding-left: 100px;
  //padding-right: 0%;
  //padding-left:-5px;
  // padding-right: 6%;
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
