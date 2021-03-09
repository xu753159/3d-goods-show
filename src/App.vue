<template>
    <div id="app">
          <div class="list">
            <router-link to="/modelshow1" tag="div">
              <div class="icon1">
                <img src="../public/static/img/left.png" alt="">
              </div>
            </router-link>
            <router-link to="/modelshow2" tag="div">
              <div class="icon2">
                <img src="../public/static/img/right.png" alt="">
              </div>
            </router-link>
          </div>
          <router-view></router-view>
    </div>  
</template>

<script>
export default {
  name:'app'
}
</script>

<style>
#app{
  
}
.list{
  position: absolute;  
  z-index: 999;
  left: 47%;
  bottom:100px
}
.list img{
  width:21px;
  height:21px;
}
.icon1{
  position: absolute;
  left: 0px;
}
.icon2{
  position: absolute;
  left: 50px;
}

</style>