<template>
  <div>
    <el-container direction="vertical">
    <el-row class="top-bar">
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
          <h6>Welcome: {{loginid}}</h6>
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
        router>   
      <el-submenu index="1" >
        <template slot="title"><i class="el-icon-setting"></i>资料完善</template>
        <el-menu-item index="/Enterprice">个人信息</el-menu-item>
        <el-menu-item index="/Company">公司信息</el-menu-item>
      </el-submenu> 
       
      <el-submenu index="2" >
        <template slot="title"><i class="el-icon-location"></i>职位管理</template>
        <el-menu-item index="/NewPos">发布职位</el-menu-item>
        <el-menu-item index="2-2">管理职位</el-menu-item>
      </el-submenu>
      <el-submenu index="3" >
        
        <template slot="title">
          <i class="el-icon-menu"></i>宣讲会管理</template>
        
        <el-menu-item index="/NewTalk">发布宣讲会</el-menu-item>
        <el-menu-item index="3-2">管理宣讲会</el-menu-item>
      </el-submenu>
      <el-submenu index="4" >
        <template slot="title" class="el-icon-document"><i class="el-icon-document"></i>简历管理</template>
        <el-menu-item index="4-1">简历收件箱</el-menu-item>
        <el-menu-item index="4-2">已处理简历</el-menu-item>
        <el-menu-item index="4-3">面试管理</el-menu-item>
        <el-submenu index="4-4">
          <template slot="title">简历库</template>
          <el-menu-item index="4-4-1">搜索简历</el-menu-item>
          <el-menu-item index="4-4-2">已邀请简历</el-menu-item>
        </el-submenu>
      </el-submenu>   

    </el-menu>
     <el-col class="line" :span="2">-</el-col>
    <el-form :model="talkForm" :rules="rules" ref="talkForm" label-width="100px" class="demo-talkForm">
      
      <el-form-item label="宣讲会名称" prop="name">
        <el-col :span="11">
        <el-input v-model="talkForm.name"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="宣讲会校区" prop="region">
        <el-col :span="11">
        <el-select v-model="talkForm.region" placeholder="请选择宣讲会校区">
          <el-option label="上海交通大学徐汇校区" value="徐汇校区"></el-option>
          <el-option label="上海交通大学闵行校区" value="闵行校区"></el-option>
        </el-select>
        </el-col>
        
        <el-col class="line" :span="2">-</el-col>
      
        <el-col :span="11">
      <el-form-item label="具体地址" prop="address" class="address">
          <el-input type="textarea" v-model="talkForm.address"></el-input>
        </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="宣讲会时间" required>
        <el-col :span="11">
          <el-form-item prop="date">
            <el-date-picker type="date" placeholder="选择日期" v-model="talkForm.date" style="width: 100%;" ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
             <el-time-picker
                is-range
                v-model="talkForm.time"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围"
                format="HH:mm">
              </el-time-picker>
           
            <!-- <el-time-picker
            v-model="talkForm.expBegin"
            type="time"
            placeholder="选择时间"
            value-format="HH:mm" 
            format="HH:mm"
            ></el-time-picker>
          <el-time-picker
            v-model="talkForm.expEnd"
            type="time"
            placeholder="选择时间"
            value-format="HH:mm"
            format="HH:mm"
          >></el-time-picker> -->
            <!-- <el-time-picker placeholder="选择时间" v-model="talkForm.date2" style="width: 100%;"></el-time-picker> -->
          </el-form-item>
        </el-col>
      </el-form-item>

       
      <!-- <el-form-item label="即时配送" prop="delivery">
        <el-switch v-model="talkForm.delivery"></el-switch>
      </el-form-item> -->
      <el-form-item label="宣讲主题" prop="type">
        <el-checkbox-group v-model="talkForm.type">
          <el-checkbox label="人工智能" name="type"></el-checkbox>
          <el-checkbox label="金融经济" name="type"></el-checkbox>
          <el-checkbox label="机械制造" name="type"></el-checkbox>
          <el-checkbox label="船舶海洋" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="现场活动" prop="activity">
        <el-checkbox-group v-model="talkForm.activity">
          <el-checkbox label="线下抽奖" name="activity"></el-checkbox>
          <el-checkbox label="内推资格" name="activity"></el-checkbox>
          <el-checkbox label="面试直通车" name="activity"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      
      <el-form-item label="活动内容" prop="context">
        <el-input type="textarea" v-model="talkForm.context"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('talkForm')">立即创建</el-button>
        <el-button @click="resetForm('talkForm')">重置</el-button>
      </el-form-item>
    </el-form>

  

      
     
   </el-container> 
  </div>
  
</template>

<script>
export default {
    data() {
      return {
       
        
        talkForm: {
          name: '',
          region: '',
          date: '',
          time:"__________",
         
          delivery: false,
          activity: [],
          type: [],
          expBegin: "__________",
          expEnd: "__________",
          
          context: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入宣讲会名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择宣讲会举办校区', trigger: 'change' }
          ],
          date: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          // activity: [
          //   { type: 'array', required: false,  trigger: 'change' }
          // ],
          context: [
            { required: true, message: '请填写活动内容', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请填写宣讲会具体举办地点', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
        // 返回主页
      backToMain() {
        this.$router.push({ path: "/Home" });
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
  }

    
    
    
    

</script>

<style lang="scss" scoped>
.top-bar {
  background: #446699;
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
.button{
  background: transparent;
  color:transparent;
  position: absolute;
  margin-top: 500px;
  margin-bottom: 500px;
  margin-left: 45%;
  padding-left: 0%;
  padding-right: 0%;
  padding-left:-5px;
  padding-right: 6%;
}
.address{
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
