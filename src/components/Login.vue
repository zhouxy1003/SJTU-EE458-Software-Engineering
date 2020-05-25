<template>
  <div>
    <el-card class="student_card">
      <img src="../assets/student_login2.png" class="image" />
      <h4>我是学生</h4>
      <el-button type="text" @click="studentDialogFormVisible = true">点击注册</el-button>
      <el-button type="text" @click="studentDialogFormVisible2 = true">点击登录</el-button>
      <el-dialog title="学生用户注册" :visible.sync="studentDialogFormVisible">
        <el-form ref="studentForm" :model="studentForm" :rules="studentRules">
          <el-form-item label="用户�?" prop="loginid" :label-width="formLabelWidth">
            <el-input v-model="studentForm.loginid" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
            <el-input v-model="studentForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
            <el-input v-model="studentForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="年级" prop="grade" :label-width="formLabelWidth">
            <el-select v-model="studentForm.grade" placeholder="请选择年级">
              <el-option label="本科" value="本科"></el-option>
              <el-option label="硕士" value="硕士"></el-option>
              <el-option label="博士" value="博士"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学校" prop="school" :label-width="formLabelWidth">
            <el-input v-model="studentForm.school" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="专业" prop="major" :label-width="formLabelWidth">
            <el-input v-model="studentForm.major" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm('studentForm')">�? �?</el-button>
          <el-button type="primary" @click="addStudent('studentForm')">�? �?</el-button>
        </div>
      </el-dialog>
      <el-dialog title="学生用户登录" :visible.sync="studentDialogFormVisible2">
        <el-form ref="studentForm2" :model="studentForm2" :rules="studentRules2">
          <el-form-item label="用户�?" prop="loginid" :label-width="formLabelWidth">
            <el-input v-model="studentForm2.loginid" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
            <el-input v-model="studentForm2.password" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm('studentForm2')">�? �?</el-button>
          <el-button type="primary" @click="loginStudent()">�? �?</el-button>
        </div>
      </el-dialog>
      <el-dialog title="请选择你的兴趣" :visible.sync="interestDialogFormVisible">
        <el-checkbox-group v-model="checkList">
          <el-checkbox
            v-for="interest in interestList"
            :label="interest.id"
            :key="interest.id"
          >{{interest.name}}</el-checkbox>
        </el-checkbox-group>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="interest()">�? �?</el-button>
        </div>
      </el-dialog>
    </el-card>

    <el-card class="company_card">
      <img src="../assets/company_login2.png" class="image" />
      <h4>我是企业</h4>
      <el-button type="text" @click="companyDialogFormVisible = true">点击注册</el-button>
      <el-button type="text" @click="companyDialogFormVisible2 = true">点击登录</el-button>
      <el-dialog title="企业用户注册" :visible.sync="companyDialogFormVisible">
        <el-form ref="companyForm" :model="companyForm" :rules="companyRules">
          <el-form-item label="用户�?" prop="loginid" :label-width="formLabelWidth">
            <el-input v-model="companyForm.loginid" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
            <el-input v-model="companyForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="企业�?" prop="name" :label-width="formLabelWidth">
            <el-input v-model="companyForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="tel" :label-width="formLabelWidth">
            <el-input v-model="companyForm.tel" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="address" :label-width="formLabelWidth">
            <el-input v-model="companyForm.address" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm('companyForm')">�? �?</el-button>
          <el-button type="primary" @click="addCompany('companyForm')">�? �?</el-button>
        </div>
      </el-dialog>
      <el-dialog title="企业用户登录" :visible.sync="companyDialogFormVisible2">
        <el-form ref="companyForm2" :model="companyForm2" :rules="companyRules2">
          <el-form-item label="用户�?" prop="loginid" :label-width="formLabelWidth">
            <el-input v-model="companyForm2.loginid" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
            <el-input v-model="companyForm2.password" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm('companyForm2')">�? �?</el-button>
          <el-button type="primary" @click="loginCompany()">�? �?</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      studentDialogFormVisible: false,
      companyDialogFormVisible: false,
      studentDialogFormVisible2: false,
      companyDialogFormVisible2: false,
      interestDialogFormVisible: false,
      studentForm: {
        loginid: "",
        password: "",
        name: "",
        grade: "",
        school: "",
        major: ""
      },
      studentRules: {
        loginid: [{ required: true, message: "请填写用户名", trigger: "blur" }],
        password: [{ required: true, message: "请填写密�?", trigger: "blur" }],
        name: [{ required: true, message: "请填写姓�?", trigger: "blur" }],
        grade: [{ required: true, message: "请选择年级", trigger: "change" }],
        school: [{ required: true, message: "请填写学�?", trigger: "blur" }],
        major: [{ required: true, message: "请填写专�?", trigger: "blur" }]
      },
      studentForm2: {
        loginid: "",
        password: ""
      },
      studentRules2: {
        loginid: [{ required: true, message: "请填写用户名", trigger: "blur" }],
        password: [{ required: true, message: "请填写密�?", trigger: "blur" }]
      },
      companyForm: {
        loginid: "",
        password: "",
        name: "",
        tel: "",
        address: ""
      },
      companyRules: {
        loginid: [{ required: true, message: "请填写用户名", trigger: "blur" }],
        password: [{ required: true, message: "请填写密�?", trigger: "blur" }],
        name: [{ required: true, message: "请填写姓�?", trigger: "blur" }],
        tel: [{ required: true, message: "请填写电�?", trigger: "blur" }],
        address: [{ required: true, message: "请填写地址", trigger: "blur" }]
      },
      companyForm2: {
        loginid: "",
        password: ""
      },
      companyRules2: {
        loginid: [{ required: true, message: "请填写用户名", trigger: "blur" }],
        password: [{ required: true, message: "请填写密�?", trigger: "blur" }]
      },
      interestList: [
        { name: "互联�?", id: 1 },
        { name: "电子", id: 2 },
        { name: "金融", id: 3 },
        { name: "销�?", id: 4 },
        { name: "人事", id: 5 },
        { name: "餐饮", id: 6 },
        { name: "旅游", id: 7 },
        { name: "健身", id: 8 },
        { name: "房产中介", id: 9 },
        { name: "家政", id: 10 },
        { name: "交通服�?", id: 11 },
        { name: "法律", id: 12 },
        { name: "编辑", id: 13 },
        { name: "医疗", id: 14 },
        { name: "服装", id: 15 },
        { name: "制药", id: 16 },
      ],
      checkList: [],
      formLabelWidth: "100px"
    };
  },
  methods: {
    addStudent(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$axios
            .get(this.HOME + "/api/add_student", {
              params: {
                sloginid: this.studentForm.loginid,
                spassword: this.studentForm.password,
                sname: this.studentForm.name,
                sgrade: this.studentForm.grade,
                sschool: this.studentForm.school,
                smajor: this.studentForm.major
              }
            })
            .then(response => {
              // var res = JSON.parse(response.bodyText);
              if (response.data.error_num === 0) {
                this.studentDialogFormVisible = false;
              } else {
                this.$message.error("新增学生用户失败，请重试");
                console.log(response.data.msg);
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      this.interestDialogFormVisible = true;
    },
    addCompany(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$axios
            .get(this.HOME + "/api/add_company", {
              params: {
                cloginid: this.companyForm.loginid,
                cpassword: this.companyForm.password,
                cname: this.companyForm.name,
                ctel: this.companyForm.tel,
                caddress: this.companyForm.address
              }
            })
            .then(response => {
              // var res = JSON.parse(response.bodyText);
              if (response.data.error_num === 0) {
                this.companyDialogFormVisible = false;
              } else {
                this.$message.error("新增企业用户失败，请重试");
                console.log(response.data.msg);
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    loginStudent() {
      this.$axios
        .get(this.HOME + "/api/student_login", {
          params: {
            sloginid: this.studentForm2.loginid,
            spassword: this.studentForm2.password
          }
        })
        .then(response => {
          // var res = JSON.parse(response.bodyText);
          if (response.data.error_num === 0) {
            this.Global.loginid = this.studentForm2.loginid;
            this.$router.push({
              path: "/Student/Home"
            });
          } else {
            this.$message.error("密码错误，请重试");
            console.log(response.data.msg);
          }
        });
      // this.Global.loginid = this.studentForm2.loginid;
      // this.$router.push({
      //   path: "/Student/Home"
      // });
    },
    loginCompany() {
      this.$axios
        .get(this.HOME + "/api/company_login", {
          params: {
            cloginid: this.companyForm2.loginid,
            cpassword: this.companyForm2.password
          }
        })
        .then(response => {
          // var res = JSON.parse(response.bodyText);
          if (response.data.error_num === 0) {
            this.Global.loginid = this.companyForm2.loginid;
            this.$router.push({
              path: "/Company/Enterprice"
            });
          } else {
            this.$message.error("密码错误，请重试");
            console.log(response.data.msg);
          }
        });
      // this.Global.loginid = this.companyForm2.loginid;
      // this.$router.push({
      //   path: "/Company/Enterprice"
      // });
    },
    resetForm(form) {
      this.$refs[form].resetFields();
      this.studentDialogFormVisible = false;
      this.companyDialogFormVisible = false;
      this.studentDialogFormVisible2 = false;
      this.companyDialogFormVisible2 = false;
    },
    interest() {
      console.log(this.checkList);
      this.$axios
        .get(this.HOME + "/api/get_init_interest", {
          params: {
            sloginid: this.studentForm.loginid,
            interest: this.checkList
          },
          paramsSerializer: params => {
            return this.$qs.stringify(params, { arrayFormat: "repeat" });
          }
        })
        .then(response => {
          // var res = JSON.parse(response.bodyText);
          if (response.data.error_num === 0) {
            this.interestDialogFormVisible = false;
          } else {
            this.$message.error("添加初始兴趣失败，请重试");
            console.log(response.data.msg);
          }
        });
    }
  }
};
</script>

<style>
.image {
  width: 100%;
  height: 255px;
  display: block;
}
.student_card {
  position: absolute;
  left: 200px;
  top: 80px;
  width: 400px;
  height: 400px;
}
.company_card {
  position: absolute;
  left: 700px;
  top: 80px;
  width: 400px;
  height: 400px;
}
.el-dialog {
  width: 500px;
  padding-right: 50px;
}
</style>
