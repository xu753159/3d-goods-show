<template>
  <div>
    <Progress :modelTotal="modelList.length"></Progress>
    <div class="box">
      <renderer :insetsize="renderOptions.insetsize">
        <!-- <dat-gui :setup="uiSetup" :model="ui"></dat-gui> -->
        <scene>
          <orbit-controls
          >
            <camera
              :position="cameraInt.position"
              :rotation="cameraInt.rotation"
            ></camera>
             <audio-listener></audio-listener>
          </orbit-controls>
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
          <!-- <ambient-light hex="#edc873" :intensity="0.3"></ambient-light> -->
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
      <div class="head1">芬达吉他（Fender）SQ子弾系列ST型</div>
      <div class="head2">子弹系列-逐梦之音</div>
      <div class="head3">精品细节，来自匠心精神</div>
      <div class="head3">39英寸</div>
      <div class="head4">¥ 1180</div>
      
    </div>
    <div class="head6" @click="showContact=!showContact">
        <div class="link">联系我们</div>
      </div>
     <div class="head5" @click="showdata=!showdata">
        <div class="btn">立即购买</div>
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
import * as gui from "./Guitar-gui"
import Progress from "../../components/common/Progress";
import ModelList from "../../components/combine/ModelList";


export default {
  name: "modelExhibition",
  data() {
    let uiSetup = gui.setupPanel;
    let ui = gui.getModel();

    return {
      showdata:false,
        showContact:false,
      ui,
      uiSetup,
      renderProcess: 0,
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
      modelList: ui.modeldata.modelList,
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

  beforeDestroy() {
  },
};
</script>

<style>
body {
  margin: 0;
  overflow: hidden;
}
#process {
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: absolute;
}
.box {
  width: 100%;
  height: 100vh;
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
.shop-img{
  width: 150px;
  height: 150px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -80%)
}

.cover{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background:rgba(0, 0,0, 0.5);
  /* opacity: 0.5; */
}
.close{
  position: absolute;
  top: 0;
  right: -50px;
}
.shoptext{
  width: 100%;
  position: absolute;
  bottom: 25%;
  text-align: center;
  font-size: 25px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #333333;
  line-height: 52px;
}
</style>
