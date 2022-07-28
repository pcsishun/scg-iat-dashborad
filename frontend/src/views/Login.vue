<template>
  <div class="login-page">
    <div class="login-title">
      <h4>Admin Login</h4>
    </div>
    <div class="login-container">
        <div class="username">
          <input placeholder="username" />
        </div>
        <div class="password">
          <input placeholder="password" type="password"/>
        </div>
    </div>
    <div class="error-desc" v-if="errorDesc !== ''">
      <h4>{{errorDesc}}</h4>
    </div>
    <div class="btn-login-container">
      <button class="btn-login">Login</button>
    </div>
  </div>
</template>

<script>
export default {
  components:{

  },
  data(){
    return{
      username: "",
      password: "",
      errorDesc: ""
    }
  },
  methods:{
    haddleAdminLogin(){
      if(this.username !== '' && this.password !== ''){
        this.$router.push("/configiat");
      }else{
        this.errorDesc = "invalid username or password"
      }
    }
  }
}
</script>

<style scoped>
.login-page{
  width: 80%;
  margin: auto;
  text-align: center;
}

.login-container{
  margin-top: 30px;
}

 

input {
  text-indent: 15px;
  width: 250px;
  margin-top: 15px;
  border-radius: 10px;
  border: 1px solid rgb(205, 205, 205);
  height: 40px;
}

.btn-login{
  color: white;
  width: 100px;
  height: 50px;
  font-weight: bold;
  margin-top: 40px;
  border: 1px solid rgb(55, 198, 245);
  background: rgb(55, 198, 245);
  border-radius: 30px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}
</style>