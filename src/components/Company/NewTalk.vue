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
     <el-col class="line" :span="2">-</el-col>
     <el-card class="talk">
    <el-form :model="talkForm" :rules="rules" ref="talkForm" label-width="100px" class="demo-talkForm">
      
      <el-form-item label="宣讲会名称" prop="xname">
        <el-col :span="9">
        <el-input v-model="talkForm.xname"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="宣讲会校区" prop="region">
          <el-col :span="9">
            <el-select v-model="talkForm.region" placeholder="请选择宣讲会校区">
              <el-option label="上海交通大学徐汇校区" value="徐汇校区"></el-option>
              <el-option label="上海交通大学闵行校区" value="闵行校区"></el-option>
            </el-select>
          </el-col>
      </el-form-item> 
        <!-- <el-col class="line" :span="2"></el-col> -->
      
      
          
      <el-form-item label="具体地址" prop="xaddress">
          <el-col :span="9"> 
            <el-input type="textarea" v-model="talkForm.xaddress"></el-input>
          </el-col>
      </el-form-item>
      <el-form-item label="宣讲会时间" required>
        <el-col :span="9">
          <el-form-item prop="date">
            <el-date-picker type="date" placeholder="选择日期" v-model="talkForm.date" style="width: 100%;" ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="9">
          <el-form-item prop="time">
             <el-time-picker
                is-range
                v-model="talkForm.time"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围"
                format="HH:mm">
              </el-time-picker>
           
          
          </el-form-item>
        </el-col>
      </el-form-item>

       
     
      <el-form-item label="宣讲主题" prop="theme">
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
      
      <el-form-item label="活动内容" prop="xcontext">
        <el-input type="textarea" v-model="talkForm.xcontext"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('talkForm')">立即创建</el-button>
        <el-button @click="resetForm('talkForm')">重置</el-button>
      </el-form-item>
    </el-form>

  

    </el-card>
     
   </el-container> 
  </div>
  
</template>

<script>
export default {
    data() {
      return {
       
        
        talkForm: {
          xname: '',
          region: '',
          date: '',
          time:"__________",
         
          delivery: false,
          activity: [],
          type: [],
          expBegin: "__________",
          expEnd: "__________",
          
          xcontext: ''
        },
        rules: {
          xname: [
            { required: true, message: '请输入宣讲会名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择宣讲会举办校区', trigger: 'change' }
          ],
          date: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          
          theme: [
            { type: 'theme', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          // activity: [
          //   { type: 'array', required: false,  trigger: 'change' }
          // ],
          xcontext: [
            { required: true, message: '请填写活动内容', trigger: 'blur' }
          ],
          xaddress: [
            { required: true, message: '请填写宣讲会具体举办地点', trigger: 'blur' }
          ]
        },
        formLabelWidth: "100px"
      };
    },
    created(){
      this.showtalkForm();
    },
    methods: {
      addtalkForm(){
        this.$axios
        .get(this.HOME+'/api/add_talkForm',{
          params:{
            xname:this.talkForm.xname,
            region:this.talkForm.region,
            xaddress:this.talkForm.xaddress,
            date:this.talkForm.date,
            time:this.talkForm.time,
            theme:this.talkForm.theme,
            activity:this.talkForm.activity,
            content:this.talkForm.xcontext,
            
          }
        })
        .then(responese =>{
          if(responese.data.error_num === 0){
            this.showtalkForm();
          }else{
            this.$message.error("职位发布失败，请重试")
            console.log(responese.data.msg);
          }
        });
      },
      showtalkForm(){
        this.$axios
        .get(this.HOME+'api/show_talkForm',{
          params:{
            //宣讲会id？？？不清楚
            talkid:this.Global.talkid
          }
        })
        .then(responese=>{
          if(responese.data.error_num === 0){
            
           
            this.talkForm.xname = responese.data.xname;
            this.talkForm.region = responese.data.region;
            this.talkForm.xaddress = responese.data.xaddress;
            this.talkForm.date = responese.data.date;
            this.talkForm.time = responese.data.time
            this.talkForm.theme = responese.data.theme;
            this.talkForm.activity = responese.data.activity;
            this.talkForm.xcontext =responese.data.xcontext;
            
          }
          else{
            this.$message.error("宣讲会加载失败，请重试")
            console.log(responese.data.msg)
          }

        });
      },

      // submitForm(formName) {
      //   this.$refs[formName].validate((valid) => {
      //     if (valid) {
      //       alert('submit!');
      //     } else {
      //       console.log('error submit!!');
      //       return false;
      //     }
        // });
      //},
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
}
  

    
    
    
    

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
.image {
  position: absolute;
  width: 100px;
  height: 40px;
  left: 10px;
  top: 10px;
  display: block;
}
.talk{
    width: 50%;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 20%;
    margin-right: 20%;
    padding-left: 5%;
    padding-right: 5%;
}
.xaddress{
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
