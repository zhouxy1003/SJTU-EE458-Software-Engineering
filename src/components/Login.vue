<template>
  <div>
    <el-card class="student_card">
      <img src="../assets/student_login.png" class="image" />
      <h4>我是学生</h4>
      <el-button type="text" @click="studentDialogFormVisible = true">点击注册</el-button>
      <el-dialog title="学生用户注册" :visible.sync="studentDialogFormVisible">
        <el-form :model="studentForm">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="studentForm.loginid" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="studentForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="studentForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="年级" :label-width="formLabelWidth">
            <el-select v-model="studentForm.grade" placeholder="请选择年级">
              <el-option label="本科" value="1"></el-option>
              <el-option label="硕士" value="2"></el-option>
              <el-option label="博士" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学校" :label-width="formLabelWidth">
            <el-input v-model="studentForm.school" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="专业" :label-width="formLabelWidth">
            <el-input v-model="studentForm.major" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="studentDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="studentDialogFormVisible = false; addStudent('studentForm')">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>

    <el-card class="company_card">
      <img src="../assets/company_login.png" class="image" />
      <h4>我是企业</h4>
      <el-button type="text" @click="companyDialogFormVisible = true">点击注册</el-button>
      <el-dialog title="企业用户注册" :visible.sync="companyDialogFormVisible">
        <el-form :model="companyForm">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="companyForm.loginid" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="companyForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="企业名" :label-width="formLabelWidth">
            <el-input v-model="companyForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth">
            <el-input v-model="companyForm.tel" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-input v-model="companyForm.address" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="companyDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="companyDialogFormVisible = false; addCompany('companyForm')">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      studentDialogFormVisible: false,
      companyDialogFormVisible: false,
      studentForm: {
        loginid: "",
        password: "",
        name: "",
        grade: [],
        school: "",
        major: ""
      },
      companyForm: {
        loginid: "",
        password: "",
        name: "",
        tel: "",
        address: ""
      },
      formLabelWidth: "100px"
    };
  },
  methods: {
    addStudent(form) {
      this.$http
        .get("http://127.0.0.1:8000/api/add_student?sloginid=" + form.loginid
         + "&spassword=" + form.password + "&sname=" + form.name
         + "&sgrade" + form.grade + "&sschool" + form.school + "&smajor" + form.major)
        .then(response => {
          var res = JSON.parse(response.bodyText);
          if (res.error_num === 0) {
            this.$router.push("/Home");
          } else {
            this.$message.error("新增学生用户失败，请重试");
            console.log(res["msg"]);
          }
        });
      //this.$router.push("/Home");
    },
    addCompany(form) {
      this.$http
        .get("http://127.0.0.1:8000/api/add_company?cloginid=" + form.loginid
         + "&cpassword=" + form.password + "&cname=" + form.name
         + "&ctel" + form.tel + "&caddress" + form.address)
        .then(response => {
          var res = JSON.parse(response.bodyText);
          if (res.error_num === 0) {
            this.$router.push("/Home");
          } else {
            this.$message.error("新增企业用户失败，请重试");
            console.log(res["msg"]);
          }
        });
      //this.$router.push("/Home");
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
