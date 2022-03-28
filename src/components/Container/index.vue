<template>
  <div>

    <div class="container" id="box">
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
    <!-- 骨架屏 -->
    <div class="skeletonBox" v-if="isSkeletonShow">
      <ul class="skeleton">
        <li class="skeletonItem">
          <span class="iconfont icon-singer"></span>
          <span class="iconfont icon-funny"></span>
        </li>
        <li class="skeletonItem">
          <span class="iconfont icon-singer"></span>
          <span class="iconfont icon-funny-kol"></span>
        </li>
        <li class="skeletonItem">
          <span class="iconfont icon-singer"></span>
          <span class="iconfont icon-Live_Change_Funny"></span>
        </li>
        <li class="skeletonItem">
          <span class="iconfont icon-singer"></span>
          <span class="iconfont icon-funny"></span>
        </li>
        <li class="skeletonItem">
          <span class="iconfont icon-singer"></span>
          <span class="iconfont icon-funny-kol"></span>
        </li>
        <li class="skeletonItem">
          <span class="iconfont icon-singer"></span>
          <span class="iconfont icon-Live_Change_Funny"></span>
        </li>
      </ul>
    </div>
    <!-- loading效果 -->
    <div class="loading animate__animated animate__flash" v-show="isLoadingShow">
      <span class="iconfont icon-loading"> Loading...</span>
    </div>
  </div>
  
</template>
  
<script>
  import { reactive, ref, onBeforeUnmount } from 'vue'
  import PubSub from 'pubsub-js'
  import axios from 'axios'
  import 'animate.css';
  
  export default {
    name:'ContainerL',
    props: ['keyValue','countNum'],
    setup(props,context){
      let count = ref(0)
      // 销毁的时候
      onBeforeUnmount(()=>{
        console.log('Container销毁了');
      })
      

      // 骨架屏是否显示 isSkeletonShow
      let isSkeletonShow = ref(false)
      // 骨架屏显示的函数，只能起作用一次
      let skeletonFlag = ref(true)
      function skeletonShow(){
        if(skeletonFlag.value){
          isSkeletonShow.value = true
          skeletonFlag.value = false
        }
      }
      // loading是否显示
      let isLoadingShow = ref(false)
      function loadingShow(){
        isLoadingShow.value = true
      }
      // 一上来请求一次图片（有骨架屏效果），以后都只有loading效果
      // 注意getImgUrl这个函数必须写在skeleton和isLoadingShow定义后面
      getImgUrl()
      // 子组件重新渲染上去的时候向父组件请求count的值,并执行count次ajax请求
      console.log('子组件收到count的值'+props.countNum);
      for(let i=0;i<props.countNum;i++){
        getImgUrl()
      }

      const urlArrLeft = reactive([])
      const urlArrCenter = reactive([])
      const urlArrRight = reactive([])
      // 得到图片的url
      function getImgUrl(){
        // 点击请求之后立马加载一个骨架屏效果
        skeletonShow()
        loadingShow()
        // 给App组件传递参数
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
            isSkeletonShow.value = false
            isLoadingShow.value = false
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
        }, 500)
      }
      // window监视
      window.addEventListener('resize', ()=>{
        reload()
      })

      return{
        reload,getImgUrl,urlArrLeft,flag,
        urlArrCenter,urlArrRight,isSkeletonShow,
        isLoadingShow
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
    // loading
    .loading{
      .icon-loading{
        padding-left: 100px;
        padding-bottom: 30px;
        font-size: 30px;
      }
    }
  .skeletonBox{
    // 骨架屏
    .skeleton{
      list-style: none;
      padding: 20px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .skeletonItem{
        background-color: #fff;
        width: 26%;
        margin-bottom: 20px;
        height: 400px;
        box-shadow: 0 0 10px rgba($color: #000000, $alpha: .4);
        position: relative;
        .icon-singer{
          display: inline-block;
          font-size: 120px;
          color: #ccc;
          position: absolute;
          left: 50%;top: 35%;
          transform: translate(-50%,-50%);
        }
        .icon-funny-kol,
        .icon-funny,
        .icon-Live_Change_Funny{
          display: inline-block;
          font-size: 30px;
          position: absolute;
          left: 20px;
          bottom: 20px;
          color: rgb(175, 172, 172);
        }
      }
    }
  }
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