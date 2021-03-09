<template>
  <div id="modelXXXX">
    <Progress :modelTotal="modelList.length"></Progress>
    <div class="box">
      <renderer :insetsize="renderOptions.insetsize">
        <!-- <dat-gui :setup="uiSetup" :model="ui"></dat-gui> -->
        <scene>
          <OrbitControls
          minDistance="50"
          >
            <camera
              :position="cameraInt.position"
              :rotation="cameraInt.rotation"
            ></camera>
          </OrbitControls>
          <direction-light
            hex="#fff"
            :intensity="1"
            :position="ui.modeldata.lights[0].position"
            :rotation="{ x: 0, y: 0, z: 0 }"
          ></direction-light>
          <direction-light
              hex="#fff"
              :intensity="1"
              :position="ui.modeldata.lights[1].position"
              :rotation="{ x: 0, y: 0, z: 0 }"
            ></direction-light>

          <ambient-light hex="#edc873" :intensity="0.3"></ambient-light>
          <model-list
            :modelList="modelList"
            :modelOptions="Option.modelOptions"
          ></model-list>
            <texture-scene
           url="static/img/bg.jpg"
          ></texture-scene>
          <raycaster></raycaster>
        </scene>
      </renderer>
    </div>
    <div class="text">
      <div class="head1">斯里兰卡沉香佛珠/沉水级</div>
      <div class="head2">良心沉香·用心传香</div>
      <div class="head3">斯里兰卡</div>
      <div class="head3">软丝沉香</div>
      <div class="head3">沉香雕刻木艺雕刻高境界</div>
      <div class="head3">79g</div>
      <div class="head4">¥ 3600</div>
    </div>
    <div class="head5" @click="!showdata">
        <div class="btn"  @click="showdata=!showdata">立即购买</div>
    </div>
     <div class="head6" @click="!showContact">
        <div class="link"  @click="showContact=!showContact">联系我们</div>
      </div>
    <div class="cover" v-show="showdata">
      <div class="shop">
        <img class='shop-img' src="../../../public/static/img/shop.png" alt="" >
         <img  @click="showdata=!showdata" class="close" src="../../../public/static/img/close.png" alt="">
          <div class="shoptext">呀！这个宝贝正在上火箭</div>

      </div>

    </div>
    <div class="cover" v-show="showContact">
      <div class="shop">
        <img class='shop-img' src="../../../public/static/img/QRCode.jpg" alt="" >
        <img  @click="showContact=!showContact" class="close" src="../../../public/static/img/close.png" alt="">
        <div class="shoptext">如果您需要3D展示物品，请扫码联系</div>
      </div>

    </div>
  </div>
</template>
<script>
import * as gui from "./necklace-gui";
import Progress from "../../components/common/Progress";
import ModelList from "../../components/combine/ModelList";

export default {
  name: "model1show",
  data() {
    let uiSetup = gui.setupPanel;
    let ui = gui.getModel();

    return {
      showdata:false,
      showContact:false,
      previousModel: 3,
      ui,
      uiSetup,
      //   showMap: false,
      //   renderProcess: 0,
      renderOptions: {
        size: {
          w: window.innerWidth,
          h: window.innerHeight,
        },
        insetsize: {
          w: 200,
          h: 300,
        },
        alpha: true,
      },
      cameraInt: ui.modeldata.camera[0],
      //   Tipslist: ui.modeldata.Tipslist,
      //   audioList: ui.modeldata.audioList,
      //   landmarklist: ui.modeldata.landmarklist,
      modelList: ui.modeldata.modelList,
      //   telList: ui.modeldata.telList,
      //   overView: ui.modeldata.overView,
      //   SandMap: ui.modeldata.SandMap,
      Option: ui.modelOption,
    };
  },
  created() {

  },
  methods: {
  },
  components: {

    ModelList,
    Progress,
  },
};
</script>

<style >
body {
  margin: 0;
  /* overflow: hidden; */
}
#process {
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: absolute;
  /* background-image: url('../../public/1111437.jpg'); */
  /* opacity: 0.5; */
}
#process img {
  width: 100%;
  height: 100vh;
  /* opacity: 0.8; */
}
.process-icon {
  position: absolute;
  left: 35%;
  top: 35%;
}
.render-process {
  font-weight: 1000;
  color: rgb(239, 239, 247);
  font-size: 25px;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
.slide-fade-enter-active {
  transition: all 1s ease;
}
.slide-fade-leave-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
  color: rgb(0.5, 0.5, 0.5);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.box {
  width: 100%;
  height: 100vh;
}
@media screen and (max-width: 500px) {
    .text {
      width: 100%;
        position: absolute;
        top: 0;
    }
    .head6{
      bottom: 80px;
      right: 0px;
      position: absolute;
      line-height: 52px;
    }
    .head1{
      width: 100%;
      text-align: center;
      height: 52px;
      margin: 30px auto;
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #333333;
      line-height: 52px;
    /* margin-top: 200px; */
    }
     .head2 ,.head3, .head4 {
      display: none;
    }
    .head5{
    position: absolute;
    left: 43%;
    bottom: 70px;
    width: 100%;
    text-align: center;
    height: 52px;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
    line-height: 52px;
    }
    .btn {
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: linear-gradient(0deg, #c7c6c8, #ffffff);
    box-shadow: 0px 2px 9px 0px rgba(95, 116, 161, 0.6);
    border-radius: 6px;
    font-size: 15px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
    position: absolute;
    left: 0;
    cursor: pointer;
    }
.shop{
  position: absolute;
  background: #FFFFFF;
  width:90%;
  height: 70vh;
  border-radius: 16px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%)
}
.close{
  position: absolute;
  top: -50px;
  right: 0px;
}
.list{
  position: absolute;  
  z-index: 999;
  left: 45%;
  bottom:73px
}

}

@media screen and (min-width:500px) {
  .text {
    position: absolute;
    top: 0;
    right: 120px;
    text-align: right;
  }
.head6{
  bottom: 100px;
  right: 120px;
  position: fixed;
  line-height: 52px;
}
.head1 {
  text-align: right;
  height: 52px;
  font-size: 22px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #333333;
  line-height: 52px;
  margin-top: 200px;
}
.head2 {
  text-align: right;
  height:52px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #333333;
  line-height: 52px;
}
.head3 {
  text-align: right;
  height: 20px;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #333333;
  line-height: 20px;
}
.head4 {
  text-align: right;
  height: 52px;
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #333333;
  line-height: 52px;
}
  .head5{
    position: absolute;
    right: 120px;
    /* left: 43%; */
    bottom: 490px;
    width: 100%;
    text-align: center;
    height: 52px;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
    line-height: 52px;
    }
.btn {
  width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background: linear-gradient(0deg, #c7c6c8, #ffffff);
  box-shadow: 0px 2px 9px 0px rgba(95, 116, 161, 0.6);
  border-radius: 6px;
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #333333;
  position: absolute;
  right: 0;
  cursor: pointer;
}
.shop{
  position: absolute;
  /* width:1160px; */
  /* height: 710px; */
  background: #FFFFFF;
  width: 580px;
  height: 365px;
  border-radius: 16px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%)
  /* right: 10%; */
}
.close{
  position: absolute;
  top: 0;
  right: -50px;
}

}



.link {
  width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  text-decoration:underline;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #194699;
  position: absolute;
  right: 0;
  cursor: pointer;
}




</style>
