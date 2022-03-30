<template>
  <div class='container'>
    <!-- 标题 -->
     <div class="title">
       <span>COSPLAY CENTER</span> 
     </div>
     <!-- 右边的github链接 -->
     <a href="http://www.baidu.com" target="_blank" class="githubLink icon-github iconfont"></a>
  </div>
</template>
  
<script>
  export default {
    name:'HeaderL',
    setup(){

    }
  }
</script>
  
<style scoped lang='scss'>
  .container{
    height: 80px;
    background-color: #111827;
    box-shadow: 0 5px 5px rgba($color: #fff, $alpha: .2);
    .title{
      padding-left: 20px;
      line-height: 80px;
      display: inline-block;
      span{
        // 文字颜色透明，露出底色
        color: transparent;
        font-size: 40px;
        font-weight: 700;
        // 去掉背景颜色
        background-clip: text;
        background-image: linear-gradient(to right, rgb(236, 72, 153), rgb(239, 68, 68), rgb(234, 179, 8));
      }
    }
    .githubLink{
      float: right;
      width: 120px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      font-size: 40px;
      color: #fff;
      text-decoration: none;
    }
  }
</style>