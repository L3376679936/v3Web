<template>
  <div class="login-container">
    <el-form ref="formRef" :model="form" class="login-form" :rules="rules">
      <div class="title-container">
        <h3 class="title">{{ $t('login.title') }}</h3>
      </div>
      <!-- 用户名 -->
      <el-form-item prop="username">
        <svg-icon icon="user" class="svg-container"></svg-icon>
        <el-input v-model="form.username" />
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password" type="password">
        <svg-icon icon="password" class="svg-container"></svg-icon>
        <el-input v-model="form.password" :type="passwordType" :show-password="false" />
        <svg-icon :icon="passwordType === 'password' ? 'eye' : 'eye-open'" @click=changeType></svg-icon>
      </el-form-item>
      <el-form-item prop="verifyCode">
        <el-input style="width: 60%;float: left;" v-model="form.verifyCode" placeholder="请输入验证码" ></el-input>
        <!-- <span class="verifyCodeSpan" > -->
        <canvas style="display: inline-block; width: 35%; border-radius: 3px; background:#fff;height: 40px; margin-left: 4%;" id="canvas"
          @click="draw"></canvas>
        <!-- </span> -->

      </el-form-item>




      <!-- 提交 -->
      <el-button type="primary" size="large" class="login-button" @click="submitForm">{{ $t('login.btnTitle')
      }}</el-button>
    </el-form>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { login } from '@/api/login'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'


const store = useStore()
const formRef = ref(null)

let show_nums = ref('')
const yanzheng_arr = ref([])

const true_code = ref([])


const yzm = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };




const form = ref({
  username: 'admin',
  password: '123456',
  verifyCode: ''
})

// 切换密码框状态
const passwordType = ref('password')
const changeType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}


// 表单校验规则
const rules = ref({
  username: [{
    required: true,
    message: '请输入用户名',
    trigger: 'blur'
  }],
  password: [{
    required: true,
    message: '请输入密码',
    trigger: 'blur',
  }
  ],
  verifyCode: [{ validator: yzm, trigger: "blur" }],
})
// 登录校验
const submitForm = () => {
  if (!formRef) return
  // console.log(true_code.value.join(''),'iiiiiiiiiiiiiii')
  // console.log(form.verifyCode)
  console.log(form.value,'form')
  if (true_code.value.join('') == form.value.verifyCode) {
            let params = {
              account: form.value.username,
              password: form.value.password
            }
            // login(params).then(res=>{
            //   console.log(res,'res')
            // })
            store.dispatch('app/login',params)
          } else {
            ElMessage.error('验证码错误')
          }
}

const draw = (show_num) => {
  var canvas_width = document.querySelector("#canvas").clientWidth;
  var canvas_height = document.querySelector("#canvas").clientHeight;
  var canvas = document.getElementById("canvas"); //获取到canvas
  var context = canvas.getContext("2d"); //获取到canvas画图
  canvas.width = canvas_width;
  canvas.height = canvas_height;
  var sCode = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
  var aCode = sCode.split(",");
  var aLength = aCode.length; //获取到数组的长度
  //4个验证码数
  for (var i = 0; i <= 3; i++) {
    var j = Math.floor(Math.random() * aLength); //获取到随机的索引值
    var deg = (Math.random() * 20 * Math.PI) / 180; //产生0~30之间的随机弧度
    var txt = aCode[j]; //得到随机的一个内容
    show_num[i] = txt.toLowerCase();// 依次把取得的内容放到数组里面
    show_nums = show_num;
    // console.log(this.show_num,'this.show_num')
    var x = 10 + i * 12; //文字在canvas上的x坐标
    var y = 27 + Math.random() ; //文字在canvas上的y坐标
    context.font = "bold 36px 微软雅黑";
    context.translate(x, y);
    context.rotate(deg);
    context.fillStyle = randomColor();
    context.fillText(txt, 0, 4);

    context.rotate(-deg);
    context.translate(-5, -y);
  }
  //验证码上显示6条线条
  for (var i = 0; i <= 5; i++) {
    context.strokeStyle = randomColor();
    context.beginPath();
    context.moveTo(
      Math.random() * canvas_width,
      Math.random() * canvas_height
    );
    context.lineTo(
      Math.random() * canvas_width,
      Math.random() * canvas_height
    );
    context.stroke();
  }
  //验证码上显示31个小点
  for (var i = 0; i <= 30; i++) {
    context.strokeStyle = randomColor();
    context.beginPath();
    var x = Math.random() * canvas_width;
    var y = Math.random() * canvas_height;
    context.moveTo(x, y);
    context.lineTo(x + 1, y + 1);
    context.stroke();
  }

  //最后把取得的验证码数组存起来，方式不唯一


  // console.log(show_num,'show_num'
// console.log(true_code,'true_code')
  for(let i = 0;i<4;i++){
    console.log(show_num[i],'kkkkkk')
    true_code.value.push(show_num[i])
  }
  // console.log(show_nums,'lllllllllllllllll')
  // console.log(true_code,'true_code')
  // var num = show_num.join("");
  // let true_code = num
}

const randomColor = () => {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r + "," + g + "," + b + ")";
}

onMounted(() => {
  draw(yanzheng_arr);
});

</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  background: url(@/assets/images/login_bg.jpg);
  background-size: 100% 100%;

  .login-form {
    position: relative;
    width: 420px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 80px auto;
    overflow: hidden;

    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }

    .login-button {
      margin-top: 20px;
      width: 100%;
      box-sizing: border-box;
    }
  }

  .tips {
    font-size: 16px;
    line-height: 28px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    ::v-deep .lang-select {
      position: absolute;
      top: 4px;
      right: 0;
      background-color: white;
      font-size: 22px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .show-pwd {
    // position: absolute;
    // right: 10px;
    // top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}

.el-form-item--default {
  margin-top: 10px;
}















</style>
