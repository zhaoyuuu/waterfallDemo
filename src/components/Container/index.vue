<template>
  <div class="container">
    <h2>{{keyValue}}</h2>
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
  import { reactive, ref, onBeforeUnmount } from 'vue'
  import PubSub from 'pubsub-js'
  import axios from 'axios'
  
  export default {
    name:'ContainerL',
    props: ['keyValue','countNum'],
    setup(props,context){
      // 销毁的时候
      onBeforeUnmount(()=>{
        console.log('Container销毁了');
      })
      // 子组件重新渲染上去的时候向父组件请求count的值,并执行count次ajax请求
      let count = ref(0)
      console.log('子组件收到count的值'+props.countNum);
      for(let i=0;i<props.countNum;i++){
        getImgUrl()
      }

      const urlArrLeft = reactive([])
      const urlArrCenter = reactive([])
      const urlArrRight = reactive([])
      // 得到图片的url
      function getImgUrl(){
        PubSub.publish('currentCount', 1)
        count.value++
        console.log('getImgUrl被调用了');
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
          })
      }
      
      // 监测窗口大小的改变
      let flag = ref(false)
      var timer
      // reload函数
      function reload(){
        flag.value = true
        // 立马清空图片
        urlArrLeft.length = 0
        urlArrCenter.length = 0
        urlArrRight.length = 0
        // 检测到窗口大小的改变之后要做的事
        console.log('窗口大小改变了');
        // 清除所有定时器
        clearTimeout(timer)
        // 设置一个定时器
        timer = setTimeout(()=>{
          if(flag.value===true){
            context.emit('reRender', 1)
            // 还原flag的值
            flag.value = false
          }
        }, 2000)
      }
      // window监视
      window.addEventListener('resize', ()=>{
        reload()
      })

      return{
        reload,getImgUrl,urlArrLeft,flag,
        urlArrCenter,urlArrRight
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