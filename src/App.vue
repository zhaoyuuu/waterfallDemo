<template>
  <div class="appMain">
    <Header/>
    <Container/>
    <!-- <Axios/> -->
  </div>
</template>

<script>
import Header from './components/Header'
import Container from './components/Container'
// import Axios from './components/axios'


export default {
  name: 'App',
  components:{ Header, Container}
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
