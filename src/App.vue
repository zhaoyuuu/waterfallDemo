<template>
  <div class="appMain">
    <Header/>
    <!-- 给Container组件添加key,每当key变化的时候Container组件就被重新渲染 -->
    <Container :key="ContainerKey" :countNum="count" :keyValue="ContainerKey" @reRender="reRender"/>
  </div>
</template>

<script>
import { ref} from 'vue'
import Pubsub from 'pubsub-js'
import Header from './components/Header'
import Container from './components/Container'
// import Axios from './components/axios'


export default {
  name: 'App',
  components:{ Header, Container},
  setup(){
    let ContainerKey = ref(0)
    // 自定义reRender函数接收参数
    function reRender(){
      // console.log(val);
      ContainerKey.value++
    }
    // 保存发送ajax请求的次数count（在父组件中！！）
    let count = ref(0)
    Pubsub.subscribe('currentCount',(msg,data)=>{
      count.value += data
      console.log('count值'+count.value);
    })
    // 子组件需要的时候交出去
    // provide('countNum', count.value)
    // Pubsub.publish('countNum',count.value)
    return{ContainerKey, reRender, count}
  }
}
</script>

<style lang='scss'>
  $htmlColor: #eff1f4;
  *{
    padding: 0;margin: 0;
  }
  div,
  span{
    box-sizing: border-box;
  }
  html{
    background-color: $htmlColor;
  }
</style>
