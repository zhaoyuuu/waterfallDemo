<template>
  <div>

    <div class="container animate__animated animate__fadeInDown" id="box" v-if="renderFlag">
      <h2>{{keyValue}}</h2>
      
      <ul class='smallContainer' ref="leftRef">
        <li v-for="(img,index) in urlArrLeft" :key="index">
          <img :src="img" alt="">
          <div class="detail">
            <span class="leftDetail">{{img.slice(41)}}</span>
            <span class="rightLink"><a :href="img" target="_blank" class="iconfont icon-Open" title="点开图片"></a></span>
          </div>
        </li>
      </ul>
      <ul class='smallContainer' ref="centerRef">
        <li v-for="(img,index) in urlArrCenter" :key="index">
          <img :src="img" alt="">
          <div class="detail">
            <span class="leftDetail">{{img.slice(41)}}</span>
            <span class="rightLink"><a :href="img" target="_blank" class="iconfont icon-Open" title="点开图片"></a></span>
          </div>
        </li>
      </ul>
      <ul class='smallContainer' ref="rightRef">
        <li v-for="(img,index) in urlArrRight" :key="index">
          <img :src="img" alt="">
          <div class="detail">
            <span class="leftDetail">{{img.slice(41)}}</span>
            <span class="rightLink"><a :href="img" target="_blank" class="iconfont icon-Open" title="点开图片"></a></span>
          </div>
        </li>
      </ul>

      <!-- loading效果 -->
      <div class="loading" v-show="isLoadingShow">
        <span class="iconfont icon-loading"> Loading...</span>
      </div>
    
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
  </div>
  
</template>
  
<script>
  import { reactive, ref, onMounted} from 'vue'
  import axios from 'axios'
  import 'animate.css';
  
  export default {
    name:'ContainerL',
    props: ['keyValue','countNum'],
    setup(){
      // 请求地址的page值
      let page = ref(1)

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
      // 准备好三列放照片的槽
      const urlArrLeft = reactive([])
      const urlArrCenter = reactive([])
      const urlArrRight = reactive([])
      firstGetImgUrl()

      // 第一次得到图片的url
      function firstGetImgUrl(){
        // 点击请求之后立马加载一个骨架屏效果
        skeletonShow()
        loadingShow()
        axios.get(`http://api.isoyu.com/api/picture/index?page=${page.value}`)
          .then(res=>{
            for(let i=0;i<18;i++){
              if(i<6){urlArrLeft.push(res.data.data[i].cover)}
              else if(i<12){urlArrCenter.push(res.data.data[i].cover)}
              else {urlArrRight.push(res.data.data[i].cover)}
            }
            isSkeletonShow.value = false
            isLoadingShow.value = false
            page.value += 18
          })
      }
      // 以后获取图片url
      let leftRef = ref(null)
      let centerRef = ref(null)
      function getImgUrl(){
        // 点击请求之后立马加载一个骨架屏效果
        skeletonShow()
        loadingShow()
        // 给App组件传递参数
        // PubSub.publish('currentCount', 1)
        // count.value++
        if(page.value<=160){
          axios.get(`http://api.isoyu.com/api/picture/index?page=${page.value}`)
            .then(res=>{
              for(let i=0;i<18;i++){
                if(i<6){urlArrLeft.push(res.data.data[i].cover)}
                else if(i<12){urlArrCenter.push(res.data.data[i].cover)}
                else {urlArrRight.push(res.data.data[i].cover)}
              }
              isSkeletonShow.value = false
              isLoadingShow.value = false
              page.value += 18
            })
        } else {
          alert('暂时只有这么多图片哦~')
        }
      }
      // container是否渲染？renderFlag
      let renderFlag = ref(true)
      // 监测窗口大小的改变
      let flag = ref(false)
      var timer
      // reload函数
      function reload(){
        renderFlag.value = false
        flag.value = true
        // 检测到窗口大小的改变之后要做的事
        console.log('窗口大小改变了');
        // 清除所有定时器
        clearTimeout(timer)
        // 设置一个定时器
        timer = setTimeout(()=>{
          if(flag.value===true){
            // 还原flag的值
            flag.value = false
            renderFlag.value = true
          }
        }, 500)
      }
      // window监视
      window.addEventListener('resize', ()=>{
        reload()
      })

      // 监测页面是否滚动到底部
      onMounted(()=>{
        function scrollBottom () { 
          let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          let clientHeight = document.documentElement.clientHeight;
          let scrollHeight = document.documentElement.scrollHeight;
          if (scrollTop + clientHeight >= scrollHeight -2) {
            console.log("滚动到底部了")
            getImgUrl()
          }
        }
        window.addEventListener('scroll',scrollBottom)
      })
      

      return{
        reload,getImgUrl,urlArrLeft,flag,
        urlArrCenter,urlArrRight,isSkeletonShow,
        isLoadingShow,firstGetImgUrl,leftRef,
        centerRef,renderFlag
      }
    }
  }
</script>
  
<style scoped lang='scss'>
    
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
    position: relative;
    // loading
    .loading{
      position: absolute;
      bottom: 20px;
      .icon-loading{
        padding-left: 100px;
        padding-bottom: 30px;
        font-size: 30px;
      }
    }

    
    // 加载更多的按钮
    .moreButton{
      display: block;
      padding-left: 14px;
      padding-right: 14px;
      height: 40px;
      border-radius: 10px;
      cursor: pointer;
      background-color: #ccc;
      border: none;
      position: fixed;
      right: 50px;
      bottom: 50px;
      z-index: 999;
      font-size: 20px;
    }
    .smallContainer{
      flex: 0 1 auto;
      width: 32%;
      height: min-content;
      list-style: none;
      li{
        margin-bottom: 16px;
        box-sizing: border-box;
        position: relative;
        height: auto;
        img{
          display: inline-block;
          width: 100%;
          height: 100%;
          &:hover{
          box-shadow: 0 0 14px rgba($color: #000000, $alpha: 1);
          }
        }
        .detail{
          position: absolute;
          left: 0;bottom: 4px;right: 0;
          display: flex;
          line-height: 50px;
          width: 100%;
          height: 50px;
          background-color: rgba($color: #fff, $alpha: 0.4);
          
          .leftDetail{
            display: inline-block;
            height: 100%;
            width: 80%;
            box-sizing: border-box;
            padding-left: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;// 强制不换行
            color: #29313b;
          }
          .rightLink{
            height: 100%;
            width: 34px;
            float:right;
            text-align: center;
            .icon-Open{
              color: #29313b;
            }
          }
        }
      }
    }
  }
</style>