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
        <el-menu-item index="/Company/Enterprice" ><i class="el-icon-setting"></i>资料完善</el-menu-item>

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
        <el-menu-item index="/Company/ResSer" ><i class="el-icon-document"></i>简历库</el-menu-item>
      </el-menu>
      <el-row class="tac"></el-row>

      <el-dialog title="公司基本资料" :visible.sync="companyDialogFormVisible">
        <el-form ref="companyForm" :model="companyForm">
          <el-form-item label="公司名称" :label-width="formLabelWidth">
            <el-input v-model="companyForm.cname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="行业领域" :label-width="formLabelWidth">
            <el-input v-model="companyForm.industry" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="公司规模" prop="scale" :label-width="formLabelWidth">
            <el-select v-model="companyForm.scale" placeholder="请选择公司规模">
              <el-option label="微型（X<10人）" value="微型"></el-option>
              <el-option label="小型（10≤X<100人）" value="小型"></el-option>
              <el-option label="中型（100≤X<300人）" value="中型"></el-option>
              <el-option label="大型（X≤300人）" value="大型"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="公司地址" :label-width="formLabelWidth">
            <el-input v-model="companyForm.place" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="注册时间" :label-width="formLabelWidth">
            <el-date-picker v-model="companyForm.registerDate" type="date" placeholder="选择日期"  value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="注册资本" :label-width="formLabelWidth">
            <el-input v-model="companyForm.registerCapital" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="经营期限" :label-width="formLabelWidth">
            <el-date-picker v-model="companyForm.timebegin" type="date" placeholder="选择开始日期" value-format="yyyy-MM-dd"></el-date-picker>
            <el-date-picker v-model="companyForm.timeend" type="date" placeholder="选择结束日期" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="联系电话" prop="ctel" :label-width="formLabelWidth">
            <el-input v-model="companyForm.ctel" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="工作邮箱" :label-width="formLabelWidth">
            <el-input v-model="companyForm.cemail" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="经营范围" :label-width="formLabelWidth">
            <el-input v-model="companyForm.business" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="companyDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="companyDialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>

      <el-card class="basic">
        <p id="title">公司基本资料</p>

        <el-divider></el-divider>
        <p id="content">公司名称：{{companyForm.cname}}</p>
        <p id="content">行业领域：{{companyForm.industry}}</p>
        <p id="content">公司规模：{{companyForm.scale}}</p>
        <p id="content">公司地址：{{companyForm.place}}</p>
        <p id="content">注册时间：{{companyForm.registerDate}}</p>
        <p id="content">注册资本：{{companyForm.registerCapital}}</p>
        <p id="content">经营期限：{{companyForm.timebegin}} 至 {{companyForm.timeend}}</p>
        <p id="content">联系电话：{{companyForm.ctel}}</p>
        <p id="content">工作邮箱：{{companyForm.cemail}}</p>
        <p id="content">经营范围：{{companyForm.business}}</p>
      </el-card>
      <el-row color:transparent class="button">
        <el-col :span="1" :offset="0">
          <el-button round icon="el-icon-edit" @click="companyDialogFormVisible = true">编辑资料</el-button>
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "companyForm",
  data() {
    return {
      activeIndex: "/Company/Enterprice",
      companyDialogFormVisible: false,
      companyForm: {
        cname: "腾讯科技（上海）有限公司",
        industry: "软件和信息技术服务业",
        scale: "大型（X≤300人）",
        place: "上海市徐汇区漕河泾开发区腾云大楼",
        registerDate: "1998-11-11",
        registerCapital: "6500万",
        timebegin: "1998-11-11",
        timeend: "2028-11-11",
        cemail: "service@tencent.com",
        ctel: "83765566",
        business: "计算机软、硬件的设计、技术开发"
      },
      created() {
        //this.showcompanyForm();
      },
      formLabelWidth: "100px"
    };
  },

  methods: {
    addcompanyForm() {
      this.$axios
        .get(this.HOME + "/api/add_companyForm", {
          params: {
            cname: this.companyForm.cname,
            industry: this.companyForm.industry,
            scale: this.companyForm.scale,
            place: this.companyForm.place,
            registerDate: this.companyForm.registerDate,
            registerCapital: this.companyForm.registerCapital,
            timebegin: this.companyForm.timebegin,
            timeend: this.companyForm.timeend,
            business: this.companyForm.business,
            ctel: this.companyForm.ctel,
            cemail: this.companyForm.cemail
          }
        })
        .then(response => {
          // var res = JSON.parse(response.bodyText);
          if (response.data.error_num === 0) {
            this.companyDialogFormVisible = false;
            this.showcompanyForm();
          } else {
            this.$message.error("公司资料加载失败，请重试");
            console.log(response.data.msg);
          }
        });
    },
    showcompanyForm() {
      this.$axios
        .get(this.HOME + "/api/show_companyForm", {
          params: {
            sloginid: this.Global.loginid
          }
        })
        .then(response => {
          // var res = JSON.parse(response.bodyText);
          if (response.data.error_num === 0) {
            this.companyForm.cname = response.data.cname;
            this.companyForm.industry = response.data.industry;
            this.companyForm.scale = response.data.scale;
            this.companyForm.place = response.data.place;
            this.companyForm.registerDate = response.data.registerDate;
            this.companyForm.registerCapital = response.data.registerCapital;
            this.companyForm.timebegin = response.data.timebegin;
            this.companyForm.timeend = response.data.timeend;
            this.companyForm.business = response.data.business;
            this.companyForm.ctel = response.data.ctel;
            this.companyForm.cemail = response.data.cemail;
            //this.$router.push("/Home");
          } else {
            this.$message.error("公司信息加载失败，请重试");
            console.log(response.data.msg);
          }
        });
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
.image {
  position: absolute;
  width: 100px;
  height: 40px;
  left: 10px;
  top: 10px;
  display: block;
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
  width: 50%;
  margin-top: 40px;
  margin-bottom: 20px;
  margin-left: 20%;
  margin-right: 20%;
  padding-left: 5%;
  padding-right: 5%;
}
.button {
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 45%;
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
