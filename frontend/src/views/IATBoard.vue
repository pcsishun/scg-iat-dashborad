<template>
  <div class="iat-board-container">
    <div class="title-iat-container">
      <div class="title-iat">
        {{runner}}
      </div>
    </div>
    <!-- <div class="time-out">
      {{timingCount}}
    </div> -->
    <div class="content-iat-container" v-if="isFinsh === false">
      <div class="set-content">
        <div class="set-text">
          {{isWord}}
        </div>
        <div class="set-sub-text">
          {{isSubWord}}
        </div>
      </div>
      <!-- <div class="set-pratice">
        <div class="show-content" >
          {{isPratice}}
        </div>
        <div class="show-conten-at">
          {{isPraticeTA}}
        </div>
      </div>

      <div class="set-test" >
        <div class="show-content" >
          {{isTest}}
        </div>
        <div class="show-conten-at">
          {{isTestTA}}
        </div>
      </div> -->
    </div>

    <div class="d-score-content" v-if="showResult === true">
      <div class="title-d-score">
        D-score: {{dScore}}
      </div>
      <div class="target-attibute">
        <div class="test-set">
          <div class="title-test">Target test</div>
          <div v-for="(data, index) in targetTest" :key="index">
            {{data}}
          </div>
          <div class="title-test">Attribute test</div>
          <div v-for="(data, index) in attributeTest" :key="index">
            {{data}}
          </div>
        </div>
        <div class="pratice-set">
          <div class="title-pratice">Target pratice</div>
          <div v-for="(data, index) in targetPratice" :key="index">
            {{data}}
          </div>
          <div class="title-test">Attribute pratice</div>
          <div v-for="(data, index) in attributePratice" :key="index">
            {{data}}
          </div>
        </div>
      </div>
    </div>

    <div class="footer-iat-container" v-if="isStart === true && isFinsh === false">
      <div v-if="switchType === false">
        <button class="btn-ok" @click="btnSelection('left',isWord + ' ' + isSubWord)">ไม่เห็นด้วย</button>
        <button class="btn-nope" @click="btnSelection('right',isWord + ' ' + isSubWord)">เห็นด้วย</button>
      </div>
      <div v-if="switchType === true">
        <button class="btn-ok" @click="btnSelection('right',isWord + ' ' + isSubWord)">เห็นด้วย</button>
        <button class="btn-nope" @click="btnSelection('left',isWord + ' ' + isSubWord)">ไม่เห็นด้วย</button>
      </div>
    </div>

    <div class="footer-iat-container-result" v-if="isFinsh === true && showResult === false">
      <button class="btn-nope" @click="btnCalResult">ดูผลลัพท์</button>
    </div>

    <div class="footer-iat-container-result" v-if="showResult === true">
      <button class="btn-nope" @click="haddleRecover">ทำใหม่</button>
    </div>

    <div class="footer-iat-container-start" v-if="isStart === false">
      <button class="btn-nope" @click="btnStart">เริ่มต้น</button>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import { settingAPI } from '../settingAPI';

const sendAPI = settingAPI();

export default {
  components:{

  },
  data(){
    return{
      runner: "",
      iatData:{},
      targetPratice:[],
      targetTest:[],
      attributePratice:[],
      attributeTest:[],
      isWord:"",
      isSubWord:"",
      timingCount: 10,
      switchType:false,
      isFinsh: false,
      // isPratice:"",
      // isTest:"",
      // isPraticeTA:"",
      // isTestTA:"",
      isStart: false,
      indexCount: 0,
      isRound: 10,
      setTime:0,
      dScore:0,
      showResult: false,
      isResult:[]
    }
  },
  methods:{

    async fetchIATData(){
      try{

        const selectionRunner = await axios.get(`${sendAPI}/iatselected`);
        this.runner = selectionRunner.data.runner
        const payload = {
          runner: selectionRunner.data.runner
        }
        
        const selectionIat = await axios.post(`${sendAPI}/useiat`,payload);

        this.iatData = selectionIat.data
        this.targetPratice = selectionIat.data.target_pratice
        this.targetTest = selectionIat.data.target_test
        this.attributePratice = selectionIat.data.attribute_pratice
        this.attributeTest = selectionIat.data.attribute_test

      }catch(err){

      }
    },
    btnSelection(evt, content){
      this.timingCount = 10;
      if(this.indexCount <= this.isRound){
        // console.log("D1")
        const timing =  performance.now();
        const caltiming = timing - this.setTime;

        this.isResult.push({
          typeCal: "D1",
          runnerName: this.runner,
          userSelect: evt,
          contentSelect: content,
          milliseconds: caltiming
        });

        const targetPraticeElement =  this.targetPratice[Math.floor(Math.random()*this.targetPratice.length)];
        this.isWord = targetPraticeElement;
       // const targetTestElement =  this.targetTest[Math.floor(Math.random()*this.targetTest.length)];
        

        // this.isPratice = targetPraticeElement;
        // this.isTest = targetTestElement; 

        this.setTime = performance.now();
        this.indexCount += 1

      }else if(this.indexCount <= this.isRound + this.isRound 
      && this.indexCount > this.isRound + this.isRound){
        // && this.indexCount > this.isRound + this.isRound
        // console.log("D2")
        const timing = performance.now();
        const caltiming = timing - this.setTime;

        this.isResult.push({
          typeCal: "D2",
          runnerName: this.runner,
          userSelect: evt,
          contentSelect: content,
          milliseconds: caltiming
        });

        // const attributePraticeElement = this.attributePratice[Math.floor(Math.random()*this.attributePratice.length)];
        const attributeTestElement = this.attributeTest[Math.floor(Math.random()*this.attributeTest.length)];
        this.isWord = attributeTestElement;


        // this.isPratice = attributePraticeElement;
        // this.isTest = attributeTestElement;

        this.setTime = performance.now();
        this.indexCount += 1

      }else if(this.indexCount <= this.isRound + this.isRound +  this.isRound ){
        // && this.indexCount > this.isRound + this.isRound +  this.isRound
        // console.log("D3")
        const timing = performance.now();
        const caltiming = timing - this.setTime;

        this.isResult.push({
          typeCal: "D3",
          runnerName: this.runner,
          userSelect: evt,
          contentSelect: content,
          milliseconds: caltiming
        });

        const targetPraticeElement = this.targetPratice[Math.floor(Math.random()*this.targetPratice.length)];
        const attributePraticeElement = this.attributePratice[Math.floor(Math.random()*this.attributePratice.length)];

        // const targetTestElement =  this.targetTest[Math.floor(Math.random()*this.targetTest.length)];
        // const attributeTestElement = this.attributeTest[Math.floor(Math.random()*this.attributeTest.length)];

        
        // this.isPratice = attributePraticeElement;
        // this.isPraticeTA = targetPraticeElement;

        // this.isTest = attributeTestElement;
        // this.isTestTA = targetTestElement;

        this.isWord = targetPraticeElement
        this.isSubWord = attributePraticeElement

        this.setTime = performance.now();
        this.indexCount += 1
      }else if(this.indexCount <= this.isRound + this.isRound + this.isRound + this.isRound ){
        if(this.indexCount === this.isRound + this.isRound + this.isRound + this.isRound){
          this.switchType = true
        }
        // console.log("D4")
        const timing = performance.now();
        const caltiming = timing - this.setTime;

        this.isResult.push({
          typeCal: "D4",
          runnerName: this.runner,
          userSelect: evt,
          contentSelect: content,
          milliseconds: caltiming
        });

        const targetTestElement =  this.targetTest[Math.floor(Math.random()*this.targetTest.length)];
        const attributeTestElement = this.attributeTest[Math.floor(Math.random()*this.attributeTest.length)];

        this.isWord = targetTestElement
        this.isSubWord = attributeTestElement

        this.setTime = performance.now();
        this.indexCount += 1
      }else if(this.indexCount <= this.isRound + this.isRound + this.isRound + this.isRound + this.isRound){
        // console.log("D5");
        this.isSubWord = "";
        const timing =  performance.now();
        const caltiming = timing - this.setTime;

        this.isResult.push({
          typeCal: "D5",
          runnerName: this.runner,
          userSelect: evt,
          contentSelect: content,
          milliseconds: caltiming
        });

        const targetPraticeElement =  this.targetPratice[Math.floor(Math.random()*this.targetPratice.length)];
        this.isWord = targetPraticeElement;
       // const targetTestElement =  this.targetTest[Math.floor(Math.random()*this.targetTest.length)];
        

        // this.isPratice = targetPraticeElement;
        // this.isTest = targetTestElement; 

        this.setTime = performance.now();
        this.indexCount += 1
      }else if(this.indexCount <= this.isRound + this.isRound + this.isRound + this.isRound + this.isRound + this.isRound){
        // console.log("D6");
        const timing =  performance.now();
        const caltiming = timing - this.setTime;

        this.isResult.push({
          typeCal: "D6",
          runnerName: this.runner,
          userSelect: evt,
          contentSelect: content,
          milliseconds: caltiming
        });

        const targetPraticeElement = this.targetPratice[Math.floor(Math.random()*this.targetPratice.length)];
        const attributePraticeElement = this.attributePratice[Math.floor(Math.random()*this.attributePratice.length)];

        this.isWord = targetPraticeElement
        this.isSubWord = attributePraticeElement

        this.setTime = performance.now();
        this.indexCount += 1
      }else if(this.indexCount <= this.isRound + this.isRound + this.isRound + this.isRound + this.isRound + this.isRound + this.isRound){
        console.log("D7");
    
        const timing =  performance.now();
        const caltiming = timing - this.setTime;

        this.isResult.push({
          typeCal: "D7",
          runnerName: this.runner,
          userSelect: evt,
          contentSelect: content,
          milliseconds: caltiming
        });

        const targetTestElement =  this.targetTest[Math.floor(Math.random()*this.targetTest.length)];
        const attributeTestElement = this.attributeTest[Math.floor(Math.random()*this.attributeTest.length)];

        this.isWord = targetTestElement
        this.isSubWord = attributeTestElement

        this.setTime = performance.now();
        this.indexCount += 1;
        if(this.indexCount > this.isRound + this.isRound + this.isRound + this.isRound + this.isRound + this.isRound + this.isRound){
          this.isFinsh = true;
        }
        
      }
      

    },
    btnStart(){

      // const timing =  performance.now();
      // this.setTime = timing;

      this.isStart = true;
      this.btnSelection();

      // const targetPraticeElement =  this.targetPratice[Math.floor(Math.random()*this.targetPratice.length)];
      // const targetTestElement =  this.targetTest[Math.floor(Math.random()*this.targetTest.length)];
      // const attributePraticeElement = this.attributePratice[Math.floor(Math.random()*this.attributePratice.length)];
      // const attributeTestElement = this.attributeTest[Math.floor(Math.random()*this.attributeTest.length)];

      // this.isTargetPratice = targetPraticeElement;
      // this.isTargetTest = targetTestElement; 
      // this.isAttributePratice = attributePraticeElement;
      // this.isAttributeTest = attributeTestElement;

      // this.isWord = targetTestElement; 
      // this.isSubWord = attributeTestElement;

      // this.setTime = performance.now();
      // this.indexCount += 1
    },
    async btnCalResult(){
      // console.log(this.isResult);
      const personalData = localStorage.getItem("user_sign_iat");
      const convertData = JSON.parse(personalData);
      // console.log(convertData);

      const payload = {
        firstname: convertData.firstname,
        lastname: convertData.lastname,
        phonenum: convertData.phonenum,
        gender: convertData.male ? "M" : "F",
        birthday: convertData.birthday,
        personalities: convertData.personalities,
        iatReply: this.isResult
      }

      try{
        const resultReplyBack  =  await axios.post(`${sendAPI}/analysis`, payload);
        this.dScore =  Math.round(resultReplyBack.data.Dscore * 100) / 100;
        this.showResult = true;
        
      }catch(err){
        console.log(err);
      }

    },
    haddleRecover(){
      this.$router.go()
    }

  },
  computed:{

  },
  mounted(){
    this.fetchIATData();
    // this.btnSelection();
  },
  updated(){
 
    // setTimeout(() => {
    //   if(this.timingCount > 0){
    //      this.timingCount = this.timingCount -1
    //   }
    // },1000);
  }
}
</script>

<style scoped>
.iat-board-container{
  width: 80%;
  margin: auto;
  margin-top: 50px;
}


.time-out{
  margin: auto;
  text-align: center;
  margin-top: 25px;
  font-weight: bold;
  font-size: 20px;
}

.content-iat-container{
  display: flex;
  justify-content: space-around;
  margin: auto;
  text-align: center;
}

.title-iat{
  margin: auto;
  text-align: center;
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 60px;
}

.footer-iat-container > div{
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
}

.d-score-content{
  margin: auto;
  text-align: center;
  
}

.title-d-score{
  font-weight: bold;
  font-size: 20px;
}

.target-attibute{
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
}

.title-test{
  text-align: center;
  font-weight: bold;
}
.title-pratice{
  text-align: center;
  font-weight: bold;
}

.footer-iat-container-result , .footer-iat-container-start{
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
}

.btn-ok{
  width: 100px;
  height: 40px;
  border-radius: 10px;
  color: white;
  border: 1px solid rgb(129, 125, 125);
  background: rgb(129, 125, 125);
  font-weight: bold;
}

.btn-nope{
  width: 100px;
  height: 40px;
  border-radius: 10px;
  color: white;
  border: 1px solid rgb(129, 125, 125);
  background: rgb(129, 125, 125);
  font-weight: bold;
}
</style>