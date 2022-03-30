<template>
  <div class="appMain">
    <Header/>
    <Container/>
  </div>
</template>

<script>
import { ref, watch} from 'vue'
import Header from './components/Header'
import Container from './components/Container'

export default {
  name: 'App',
  components:{ Header, Container},
  setup(){
    let ContainerKey = ref(0)
    // 监视ContainerKey值的变化
    watch(ContainerKey,(newValue,oldValue)=>{
      console.log('ContainerKey变了',newValue,oldValue);
    })
    let count = ref(0)
    return{ContainerKey, count}
  }
}
</script>

<style lang='scss'>
  $htmlColor: #111827;
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
