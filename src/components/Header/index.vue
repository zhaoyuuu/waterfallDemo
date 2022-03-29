<template>
  <div class='container'>
    <!-- 标题 -->
     <div class="title">
       <h2>Waterfall Flow Demo</h2>
     </div>
     <!-- 右边的查找部分 -->
     <div class="tagSearch">
       <input type="text" placeholder="tags...">
       <span class="searchButton icon-fangdajing iconfont"></span>
     </div>
     
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
  $textColor: #bfcbd9;
  .container{
    height: 80px;
    background-color: #304156;
    box-shadow: 0 5px 5px rgba($color: #000000, $alpha: .2);
    .title{
      padding-left: 20px;
      line-height: 80px;
      display: inline-block;
      color: $textColor;
    }
    .tagSearch{
      display: inline-block;
      float: right;
      line-height: 80px;
      padding-right: 30px;
      input{
        outline-style: none ;
        border: 2px solid $textColor;
        border-radius: 16px;
        width: 50px;
        height: 24px;
        padding-left: 10px;
        padding-right: 10px;
        font-size: 18px;
        
      }
      .searchButton{
        float: right;
        display: inline-block;
        line-height: 80px;
        font-size: 20px;
        padding-left: 6px;
        color: $textColor;
        cursor: pointer;
      }
    }
  }
</style>