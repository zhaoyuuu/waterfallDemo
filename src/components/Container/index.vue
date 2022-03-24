<template>
  <div class="container">
    <button @click="getImgUrl" class="moreButton">点击发送ajax请求</button>
    
    <ul class='smallContainer'>
      <li v-for="(img,index) in urlArrLeft" :key="index">
        <img :src="img" alt="">
      </li>
    </ul>
    <ul class='smallContainer'>
      <li v-for="(img,index) in urlArrCenter" :key="index">
        <img :src="img" alt="">
      </li>
    </ul>
    <ul class='smallContainer'>
      <li v-for="(img,index) in urlArrRight" :key="index">
        <img :src="img" alt="">
      </li>
    </ul>

  </div>
  
</template>
  
<script>
  import {ref, nextTick, reactive} from 'vue'
  import axios from 'axios'
  
  export default {
    name:'ContainerL',
    setup(){
      const urlArrLeft = reactive([])
      const urlArrCenter = reactive([])
      const urlArrRight = reactive([])
      // 得到图片的url
      function getImgUrl(){
        axios.get("images/imgUrl.json")
            .then(res=>{
              for(let i=0;i<6;i++){
                let item = res.data.imgUrl[i]
                let key = Object.keys(item)
                // console.log(item[key]); // 输出6条图片地址
                if(i<2){urlArrLeft.push(item[key])}
                else if(i<4){urlArrCenter.push(item[key])}
                else if(i<6){urlArrRight.push(item[key])}
              }
              // res.data.imgUrl.forEach(item=>{
              //   let key = Object.keys(item)
              //   // console.log(item[key]);// 输出多条图片地址
              //   urlArr.push(item[key])
              //   console.log(urlArr);
              // })
            })
      }

      // 监测窗口大小的改变
      let flag = ref(true)
      function reload(){
        console.log('窗口大小改变了');
        flag.value = false
        nextTick(()=>{
          flag.value = true
        })
      }
      window.addEventListener('resize', ()=>{
        reload()
      })

      return{
        flag, reload,
        getImgUrl,urlArrLeft,urlArrCenter,urlArrRight
      }
      // axios
      //   .get('/api' + '/t/act-for-nature')
      //   .then(response => (this.info = response))
      //   .catch(function (error) { // 请求失败处理
      //     console.log(error);
      // });
    }
  }
</script>
  
<style scoped lang='scss'>
  .container{
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    // 加载更多的按钮
    .moreButton{
      display: block;
      width: 140px;
      height: 40px;
      border-radius: 10px;
      cursor: pointer;
      background-color: coral;
      border: 1px solid #ccc;
      position: fixed;
      right: 50px;
      bottom: 50px;
      color: #ccc;
    }
    .smallContainer{
      flex: 0 1 auto;
      width: 32.5%;
      list-style: none;
      li{
        margin-bottom: 16px;
        img{
          width: 100%;
        }
      }
    }
  }
</style>