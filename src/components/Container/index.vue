<template>
  <div class="container">
    <button @click="getImg">点击发送ajax请求</button>
    
    <!-- <ul class='smallContainer'>
      <li>
        <img src="../../images/China1/0489b3341b2a5ec7313bb704e32a51b4.jpeg" alt="">
      </li>
      <li>
        <img src="../../images/China1/2ee50e68eb48804fc60edfcea2318e6b.jpeg" alt="">
      </li>
      <li>
        <img src="../../images/China1/34dbac280e5256ac573c29a48474e880.jpeg" alt="">
      </li>
    </ul>
    <ul class='smallContainer'>
      <li>
        <img src="../../images/China1/0489b3341b2a5ec7313bb704e32a51b4.jpeg" alt="">
      </li>
      <li>
        <img src="../../images/China1/2ee50e68eb48804fc60edfcea2318e6b.jpeg" alt="">
      </li>
      <li>
        <img src="../../images/China1/34dbac280e5256ac573c29a48474e880.jpeg" alt="">
      </li>
    </ul>
    <ul class='smallContainer'>
      <li>
        <img src="../../images/China1/0489b3341b2a5ec7313bb704e32a51b4.jpeg" alt="">
      </li>
      <li>
        <img src="../../images/China1/2ee50e68eb48804fc60edfcea2318e6b.jpeg" alt="">
      </li>
      <li>
        <img src="../../images/China1/34dbac280e5256ac573c29a48474e880.jpeg" alt="">
      </li>
    </ul> -->
  
  </div>
  
</template>
  
<script>
  import {ref, nextTick} from 'vue'
  import axios from 'axios'
  import url from '../../../public/images/imgUrl'
  
  export default {
    name:'ContainerL',
    setup(){
      function getImg(){
        axios.get("images/imgUrl.json")
            .then(res=>{
              console.log(res.data[0]);
            })
      }

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
        getImg
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