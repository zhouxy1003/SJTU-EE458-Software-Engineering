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
            <h6>Welcome: 89757</h6>
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
      <!-- 表格内容 -->
      <el-card class="pos">
        <el-table :data="tableData" style="width: 100%" ref="multipleTable">
          <el-table-column prop="xname" label="宣讲会名称" width="200"></el-table-column>

          <el-table-column prop="date" label="举办日期" width="200"></el-table-column>

          <el-table-column label="报名学生" width="150">
            <template slot-scope="scope">
              <el-button size="mini" @click="showStudents(scope.$index, scope.row)">查看</el-button>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="280">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="showContent(scope.$index, scope.row)"
              >具体内容</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <!-- 删除提示框 -->

      <!-- <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
        <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="delVisible = false">取 消</el-button>

          <el-button type="primary" @click="deleteRow">确 定</el-button>
        </span>
      </el-dialog>-->

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
            <el-input v-model="contentForm.xname" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="宣讲会校区">
            <el-input v-model="contentForm.region" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="具体地址">
            <el-input v-model="contentForm.xaddress" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="宣讲会时间">
            <el-input v-model="contentForm.date" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="宣讲主题">
            <el-input v-model="contentForm.theme" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="现场活动">
            <el-input v-model="contentForm.activity" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动内容">
            <el-input v-model="contentForm.xcontent" auto-complete="off"></el-input>
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
  name: "pack",

  data() {
    return {
      contentForm: {
        id: "",
        xname: "",
        region: "",
        xaddress: "",
        date: "",
        theme: "",
        activity: "",
        xcontent: ""
      },
      contentVisible: false,
      xcontent: "",
      studentInfo: [],
      studentVisible: false,
      tableData: [
        {
          id: "0",
          xname: "宣传会名称1",
          region: "闵行校区",
          xaddress: "东下院105",
          date: "2020-5-30",
          theme: "人工智能",
          activity: "内推资格，面试直通车",
          xcontent: "邀请xxx为同学们讲述人工智能目前的应用领域及前景",
          time: "8:30",
          students: [
            {
              id: "0",
              sname: "张三",
              tel: "13800000000"
            },
            {
              id: "1",
              sname: "李四",
              tel: "13800000000"
            },
            {
              id: "2",
              sname: "王五",
              tel: "13800000000"
            }
          ]
        },
        {
          id: "1",
          xname: "宣传会名称2",
          region: "闵行校区",
          xaddress: "东下院105",
          date: "2020-5-30",
          theme: "人工智能",
          activity: "内推资格，面试直通车",
          xcontent: "邀请xxx为同学们讲述人工智能目前的应用领域及前景",
          time: "8:30",
          students: [
            {
              id: "0",
              sname: "张三",
              tel: "13800000000"
            },
            {
              id: "1",
              sname: "李四",
              tel: "13800000000"
            },
            {
              id: "2",
              sname: "王五",
              tel: "13800000000"
            }
          ]
        }
      ],
      packData: [
        //Id：'2019-03-01',
      ],

      //delVisible：false,//删除提示弹框的状态

      msg: "", //记录每一条的信息，便于取id

      delarr: [] //存放删除的数据

      // multipleSelection：[],//多选的数据
    };
  },
  methods: {
    // 获取数据,这里只简单展示数据，最好可以把当前页面，每页显示数据，搜索等参数传值到后台，因为删除会影响分页和数据
    showStudents(index, row) {
      this.studentInfo = row.students;
      this.studentVisible = true;
    },
    getPackData() {
      this.$axios
        .post("/api/selectPackPageMade.do")
        .then(res => {
          this.packData = res.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    showContent(index, row) {
      const data = this.tableData[index];
      const form = this.contentForm;
      for (let k in data) {
        if (data.k == form.k) {
          form[k] = data[k];
        }
      }
      this.contentVisible = true;
    },
    contentSubmit() {
      this.contentVisible = false;
      this.tableData.some(item => {
        if (item.id == this.contentForm.id) {
          for (let k in this.contentForm) {
            if (this.contentForm.k == item.k) {
              item[k] = this.contentForm[k];
            }
          }
          return true;
        }
      });
    },
    //单行删除

    // handleDelete(index, row) {
    //   this.idx = index;

    //   this.msg = row; //每一条数据的记录

    //   this.delarr.push(this.msg.PackingId); //把单行删除的每条数据的id添加进放删除数据的数组

    //   this.delVisible = true;
    // },

    //批量删除

    // delAll() {
    //   this.delVisible = true; //显示删除弹框

    //   const length = this.multipleSelection.length;

    //   for (let i = 0; i < length; i++) {
    //     this.delarr.push(this.multipleSelection[i].PackingId);
    //   }
    // },

    //操作多选

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 确定删除

    // deleteRow() {
    //   this.$axios
    //     .get("/api/delPackTotalMade.do", {
    //       params: {
    //         delarr: this.delarr
    //       }
    //     })
    //     .then(res => {
    //       if (res.data == "包装删除成功") {
    //         this.getPackData();

    //         this.$message.success("删除成功");
    //       }
    //     })
    //     .catch(error => {
    //       console.log(error);

    //       this.$message.error("包装删除失败");
    //     });

    //   this.delVisible = false; //关闭删除提示模态框
    // },
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
