<template>
  <div id="nav">
    <transition name="bounce slide-fade">
      <div class="nav-change" v-show="show" draggable="false">
        <audio
          controls
          id="music"
          muted="muted"
          loop
          autoplay="autoplay"
          hidden
        >
          <source
            src="../../../public/static/BackgroundSound.mp3"
            type="audio/mp3"
          />
        </audio>
        <div class="room-change scroll-wrapper" ref="wrapper">
          <div class="scroll-content" ref="scrollcontent">
            <div class="flex">
              <div
                v-for="(room, i) in floorlist[currentFloor].roomList"
                :id="i"
                class="room"
                :class="i == roomindex ? 'room-active' : ''"
                :key="i"
                @click.stop="
                  navigation(room.cameraposition, room.camerarotation, i)
                "
              >
                <img class="room-img" src="static/timg.jpg" />
                <div class="room-name">{{ room.roomname }}</div>
                <div class="room-Mantle"></div>
              </div>
            </div>
          </div>
        </div>
        <!-- 楼层导航 -->
        <div class="floor-change flex">
          <!-- <div
            class="btn"
            :class="index == currentFloor ? 'btn-active' : ''"
            v-for="(floor, index) in floorlist"
            :key="index"
            @click="currenFloor(index)"
          >
            {{ floor.floorname }}
          </div> -->
        </div>
      </div>
    </transition>
    <transition name="bounce">
      <div class="right-icon cursor" v-show="show">
        <span @click="showMap">
          <img src="../../../public/static/img/SandTableMap.png" alt="" />
        </span>
        <span @click="control">
          <img src="../../../public/static/img/voice.png" alt="" />
        </span>
        <span @click="share = !share">
          <img src="../../../public/static/img/share.png" alt="" />
        </span>
        <span @click="camposition">
          <img src="../../../public/static/img/Visits.png" alt="" />
          <span class="like-conut">{{ 2400 }}</span>
        </span>
      </div>
    </transition>
    <div class="bottom-icon cursor">
      <span class="nav-control" @click="showNav">
        <img src="../../../public/static/img/MenuStorage.png" alt="" />
      </span>
      <span class="picture-scale" @click="CADshow = !CADshow">
        <img src="../../../public/static/img/RoomTypeDiagram.png" alt="" />
      </span>
      <span class="full-screen">
        <fullscreen>
          <img src="../../../public/static/img/FullScreen.png" alt="" />
        </fullscreen>
      </span>
      <span>
        <canvas-treancribe> </canvas-treancribe>
      </span>
    </div>
    <div class="share-layer cursor" v-show="share">
      <div class="left item-1">
        <div class="title">复制以下链接进行分享</div>
        <div class="copy-model">
          <input type="text" class="link-input" v-model="origin" />
          <span
            class="copy"
            v-clipboard:copy="origin"
            v-clipboard:success="copyLink"
            >复制</span
          >
        </div>
      </div>
      <div class="right item-1">
        <div id="qrcode1">
          <vue-qr :text="origin" :size="183"></vue-qr>
        </div>
        <div>扫描二维码分享</div>
      </div>
      <div class="close" @click="share = !share">
        <img src="../../../public/static/img/X.png" alt="" />
      </div>
      <div class="line"></div>
    </div>
    <transition name="popupCAD">
      <div class="popup-pic" v-show="CADshow">
        <div class="popup-Mantle">
          <div class="popup-img">
            <img :src="floorlist[currentFloor].CADimage" />
          </div>
          <span @click="CADshow = !CADshow" class="popup-close"> X </span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import VueQr from "vue-qr";
import BScroll from "@better-scroll/core";
import canvasTreancribe from "./canvasTreancribe";
import fullscreen from "./fullscreen.vue";
export default {
  name: "Nav",
  data() {
    return {
      isOff: true,
      share: false,
      roomindex: 0,
      show: true,
      origin: "",
      CADshow: false,
      currentFloor: 0,
      bs: Object,
      floorlist: [],
      camerposition: null,
      rotation: null,
      showmap: false,
    };
  },
  props: {
    floorArray: { type: Array },
  },
  created() {
    this.floorlist = this.floorArray;

    if (!sessionStorage.getItem("floor")) {
      sessionStorage.setItem("floor", this.floorIndex);
    } else {
      let floor = sessionStorage.getItem("floor");
      this.currentFloor = Number(floor);
    }
  },
  watch: {
    currentFloor() {
      if (this.bs.refresh) {
        this.bs.refresh();
      }
      this.$refs.scrollcontent.style.setProperty(
        "transform",
        "translateX(0px)"
      );
    },
  },
  updated() {
    if (this.bs.refresh) {
      this.bs.refresh();
    }
  },
  methods: {
    //点击区域导航
    /**该方法用来绘制圆角矩形
     *@param cameraposition:相机位置
     *@param camerarotation:相机角度
     **/
    navigation(cameraposition, camerarotation, i) {
      this.roomindex = i;
      // this.$emit("rommswitch", cameraposition, camerarotation);
      this.$global.camera.position.x = cameraposition.x;
      this.$global.camera.position.y = cameraposition.y;
      this.$global.camera.position.z = cameraposition.z;

      this.$global.camera.rotation.x = camerarotation.x;
      this.$global.camera.rotation.y = camerarotation.y;
      this.$global.camera.rotation.z = camerarotation.z;
    },
    currenFloor(index) {
      let floor = Number(sessionStorage.getItem("floor"));
      if (floor == index) {
        return false;
      }
      this.currentFloor = index;
      sessionStorage.setItem("floor", this.currentFloor);
      this.$emit("currentFloor", index);
      this.navigation(
        this.floorlist[index].roomList[0].cameraposition,
        this.floorlist[index].roomList[0].camerarotation,
        0
      );
      // location.reload();
    },
    showNav() {
      this.show = !this.show;
    },
    copyLink() {
      alert("你已经成功复制了链接" + this.origin);
      // this.$message.sucess(e)
    },
    audioAutoPlay() {
      let audio = document.getElementById("audio");
      audio.play();
      document.removeEventListener("touchstart", this.audioAutoPlay);
    },
    control() {
      var audio = document.getElementById("music");
      if (audio !== null) {
        // console.log(audio.paused)
        if (audio.paused) {
          audio.play();
        } else {
          audio.pause();
        }
      }
    },
    camposition() {
      // console.log(this.$global.camera)
      console.log("摄像机位置", this.$global.camera.position);
      console.log("角度", this.$global.camera.rotation);
      console.log("global",  this.$global);
    },
    showMap() {
      this.showmap = !this.showmap;
      this.$bus.$emit("showMap", this.showmap);
    },

    // changeOn(){
    //   let oAudio = document.querySelector("#audio");
    //   if(this.isOff){
    //     oAudio.play();//让音频文件开始播放
    //     }else{
    //       oAudio.pause();//让音频文件暂停播放
    //     }
    //    this.isOff = !this.isOff;
    // },
    // audioAutoPlay() {
    //   let audio = document.getElementById('audio');
    //   this.isOff = false;
    //   audio.play();
    //   // document.removeEventListener('touchstart',this.audioAutoPlay);
    // }
  },
  components: {
    VueQr,
    fullscreen,
    canvasTreancribe,
  },
  mounted() {
    this.$nextTick(() => {
      this.bs = new BScroll(this.$refs.wrapper, {
        startX: 0,
        click: true,
        scrollX: true, // 横向滚动
        scrollY: false, //  纵向滚动
        eventPassthrough: "vertical",
      });
    });

    this.origin = location.origin;
    setTimeout(() => {
      this.control();
    }, 1);
  },
};
</script>

<style scoped>
.scroll-wrapper {
  white-space: nowrap;
}

.scroll-content {
  min-width: 100%;
  display: inline-block;
}

.cursor {
  cursor: pointer;
}

.item-1 {
  flex: 1;
}
.item-2 {
  flex: 2;
}
.item-3 {
  flex: 3;
}
.item-4 {
  flex: 4;
}
.bottom-icon {
  position: absolute;
  bottom: 32px;
  right: 64px;
}
.bottom-icon span {
  margin-right: 31px;
  width: 32px;
  height: 32px;
}
.right-icon {
  position: absolute;
  right: 64px;
  width: 32px;
  top: 20px;
}
.right-icon span {
  display: block;
  width: 32px;
  height: 32px;
  margin-bottom: 24px;
}
.like-conut {
  font-size: 16px;
  font-family: Noto Sans S Chinese;
  font-weight: 400;
  color: #eff1ff;
}

/* 11 */
.nav-change {
  width: 100%;
  height: 150px;
  margin: 0 auto;
  /* background-color: rgba(0, 0, 0, 0.5); */
  position: absolute;
  bottom: 3.125rem;
  left: 0;
}
.floor-change {
  margin-top: 20px;
}
.btn {
  display: inline-block;

  color: white;
  cursor: pointer;
  width: 120px;
  height: 28px;
  background: rgba(10, 2, 4, 0.6);
  /* border: 1px solid #eff1ff; */
  border-radius: 14px;
  text-align: center;
  font-size: 20px;
  font-family: Noto Sans S Chinese;
  font-weight: 400;
  color: #999999;
  line-height: 26px;
  margin-left: 12px;
  margin-right: 12px;
}
.btn-active {
  color: #eff1ff !important;
}

.room-change {
  width: 100%;
  overflow: hidden;
}

.room {
  display: inline-block;
  min-width: 128px;
  height: 92px;
  position: relative;
  text-align: center;
  margin-left: 12px;
  margin-right: 12px;
}
.room-active {
  background-image: url("../../../public/static/img/boder.png");
}

.room-img {
  width: 116px;
  height: 80px;
  background: rgba(10, 2, 4, 0.4);
  border-radius: 4px;
  position: relative;
  top: 6px;
}
.room-name {
  position: absolute;
  bottom: 10px;
  text-align: center;
  font-size: 16px;
  font-family: Noto Sans S Chinese;
  font-weight: 400;
  color: #eff1ff;
  line-height: 26px;
  width: 100%;
}
.room-Mantle {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  /* background: #ff6900; */
  z-index: 2;
  cursor: pointer;
}
.flex {
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}
.share-layer {
  display: flex;
  width: 700px;
  height: 300px;
  position: absolute;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  margin: auto;
  /* padding: 40px 79px 39px 34px; */
  background: #ffffff;
}
.left {
  /* border-right: 1px solid #999999 ; */
  margin-top: 110px;
  margin-left: 34px;
  margin-bottom: 39px;
}
.right {
  margin-top: 59px;
  text-align: center;
  font-size: 20px;
  font-family: Noto Sans S Chinese;
  font-weight: 400;
  color: #333333;
}
.title {
  font-size: 20px;
  font-family: Noto Sans S Chinese;
  font-weight: 400;
  color: #333333;
  margin-bottom: 28px;
}
.copy-model {
  width: 290px;
  height: 42px;
  position: relative;
}
.link-input {
  background: none;
  outline: none;
  border: 1px solid #a0a0a0;
  width: 284px;
  height: 38px;
  font-size: 16px;
  font-family: Noto Sans S Chinese;
  font-weight: 400;
  color: #666666;
}
.copy {
  font-size: 18px;
  color: #ffffff;
  text-align: center;
  line-height: 41px;
  background: #ff6900;
  display: block;
  position: absolute;
  right: 0px;
  top: 0px;
  width: 84px;
  height: 41px;
}
.close {
  position: absolute;
  top: 21px;
  left: 658px;
  cursor: pointer;
}
.line {
  position: absolute;
  width: 1px;
  height: 221px;
  background: #999999;
  top: 40px;
  left: 376px;
}
.bounce-enter-active {
  animation: bounce-in 0.8s;
}
.bounce-leave-active {
  animation: bounce-in 0.8s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.popup-pic {
  width: 100%;
  height: 100vh;
  background-color: rgba(10, 2, 4, 0.4);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
.popup-Mantle {
  width: 100%;
  height: 100%;
  position: relative;
}
.popup-img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 500px;
  height: 500px;
}
.popup-img img {
  width: 100%;
  height: 100%;
}
.popup-close {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 30px;
  color: white;
  cursor: pointer;
}
.popupCAD-enter-active,
.popupCAD-leave-active {
  animation: bounce-in 0.8s;
  transition: opacity 0.5s;
}
.popupCAD-enter, .popupCAD-leave-to /* .fade-leave-active below version 2.1.8 */ {
  animation: bounce-in 1s reverse;
  opacity: 0.5;
}
@media all and (max-width: 999px) and (orientation: portrait) {
  .room {
    display: inline-block;
    min-width: 64px;
    height: 46px;
    position: relative;
    text-align: center;
    margin-left: 6px;
    margin-right: 6px;
  }
  .room-active {
    background-image: url("../../../public/static/img/boder.png");
    background-size: 64px 46px;
  }
  .room-img {
    width: 58px;
    height: 40px;
    border-radius: 4px;
    position: relative;
    top: 3px;
  }
  .room-name {
    position: absolute;
    bottom: 10px;
    text-align: center;
    font-size: 10px;
    font-family: Noto Sans S Chinese;
    font-weight: 400;
    color: #eff1ff;
    line-height: 18px;
    width: 100%;
  }
  /* 11 */
  .nav-change {
    width: 100%;
    height: 80px;
    margin: 0 auto;
    /* background-color: rgba(0, 0, 0, 0.5); */
    position: absolute;
    bottom: 1.25rem;
    left: 0;
  }
  .floor-change {
    width: 85%;
    margin-top: 20px;
  }
  .btn {
    display: inline-block;
    width: 60px;
    height: 14px;
    background: rgba(10, 2, 4, 0.6);
    /* border: 1px solid #eff1ff; */
    border-radius: 14px;
    text-align: center;
    font-size: 10px;
    font-family: Noto Sans S Chinese;
    font-weight: 400;
    color: #999999;
    line-height: 14px;
    margin-left: 5px;
    margin-right: 5px;
  }
  .room-change {
    width: 85%;
    /* margin: 0 auto; */
    overflow: hidden;
  }

  /* 图标 */
  .bottom-icon {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 32px;
  }
  .bottom-icon span {
    display: block;
    margin-right: 10px;
    padding-top: 10px;
    width: 32px;
    height: 32px;
  }
  .right-icon {
    position: absolute;
    right: 20px;
    width: 32px;
    top: 20px;
  }
  .right-icon span {
    display: block;
    width: 32px;
    height: 32px;
    margin-bottom: 10px;
  }

  .like-conut {
    font-size: 16px;
    font-family: Noto Sans S Chinese;
    font-weight: 400;
    color: #eff1ff;
  }
  /* 分享二维码 */
  .share-layer {
    display: flex;
    width: 350px;
    height: 150px;
    position: absolute;
    left: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;
    margin: auto;
    /* padding: 40px 79px 39px 34px; */
    background: #ffffff;
  }
  .left {
    /* border-right: 1px solid #999999 ; */
    margin-top: 55px;
    margin-left: 17px;
    margin-bottom: 20px;
  }
  .right {
    margin-top: 25px;
    text-align: center;
    font-size: 10px;
    font-family: Noto Sans S Chinese;
    font-weight: 400;
    color: #333333;
  }
  .right img {
    width: 100px;
  }
  .title {
    font-size: 10px;
    font-family: Noto Sans S Chinese;
    font-weight: 400;
    color: #333333;
    margin-bottom: 14px;
  }
  .copy-model {
    width: 145px;
    height: 21px;
    position: relative;
  }
  .link-input {
    background: none;
    outline: none;
    border: 1px solid #a0a0a0;
    width: 142px;
    height: 17px;
    font-size: 8px;
    font-family: Noto Sans S Chinese;
    font-weight: 400;
    color: #666666;
  }
  .copy {
    font-size: 9px;
    color: #ffffff;
    text-align: center;
    line-height: 20px;
    background: #ff6900;
    display: block;
    position: absolute;
    right: 0px;
    top: 2px;
    width: 42px;
    height: 21px;
  }
  .close {
    position: absolute;
    top: 8px;
    left: 322px;
    cursor: pointer;
  }
  .line {
    position: absolute;
    width: 1px;
    height: 110px;
    background: #999999;
    top: 20px;
    left: 185px;
  }
  .popup-pic {
    width: 100%;
    height: 100vh;
    background-color: rgba(10, 2, 4, 0.4);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }
  .popup-Mantle {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .popup-img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 250px;
    height: 250px;
  }
  .popup-img img {
    width: 100%;
    height: 100%;
  }
  .popup-close {
    position: absolute;
    top: 20px;
    right: 40px;
    font-size: 30px;
    color: white;
    cursor: pointer;
  }
}
@media all and (max-width: 999px) and (orientation: landscape) {
  .room {
    display: inline-block;
    min-width: 64px;
    height: 46px;
    position: relative;
    text-align: center;
    margin-left: 6px;
    margin-right: 6px;
  }
  .room-active {
    background-image: url("../../../public/static/img/boder.png");
    background-size: 64px 46px;
  }
  .room-img {
    width: 58px;
    height: 40px;
    border-radius: 4px;
    position: relative;
    top: 3px;
  }
  .room-name {
    position: absolute;
    bottom: 10px;
    text-align: center;
    font-size: 10px;
    font-family: Noto Sans S Chinese;
    font-weight: 400;
    color: #eff1ff;
    line-height: 18px;
    width: 100%;
  }
  /* 11 */
  .nav-change {
    width: 100%;
    height: 80px;
    margin: 0 auto;
    /* background-color: rgba(0, 0, 0, 0.5); */
    position: absolute;
    bottom: 1.25rem;
    left: 0;
  }
  .floor-change {
    margin-top: 20px;
  }
  .btn {
    display: inline-block;
    width: 60px;
    height: 14px;
    background: rgba(10, 2, 4, 0.6);
    /* border: 1px solid #eff1ff; */
    border-radius: 14px;
    text-align: center;
    font-size: 10px;
    font-family: Noto Sans S Chinese;
    font-weight: 400;
    color: #999999;
    line-height: 14px;
    margin-left: 5px;
    margin-right: 5px;
  }
  .room-change {
    width: 85%;
    /* margin: 0 auto; */
    overflow: hidden;
  }

  /* 图标 */
  .bottom-icon {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 32px;
  }
  .bottom-icon span {
    display: block;
    margin-right: 10px;
    padding-top: 10px;
    width: 32px;
    height: 32px;
  }
  .right-icon {
    position: absolute;
    right: 20px;
    width: 32px;
    top: 20px;
  }
  .right-icon span {
    display: block;
    width: 32px;
    height: 32px;
    margin-bottom: 10px;
  }

  .like-conut {
    font-size: 16px;
    font-family: Noto Sans S Chinese;
    font-weight: 400;
    color: #eff1ff;
  }
  /* 分享二维码 */
  .share-layer {
    display: flex;
    width: 350px;
    height: 150px;
    position: absolute;
    left: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;
    margin: auto;
    /* padding: 40px 79px 39px 34px; */
    background: rgb(255, 255, 255);
  }
  .left {
    /* border-right: 1px solid #999999 ; */
    margin-top: 55px;
    margin-left: 17px;
    margin-bottom: 20px;
  }
  .right {
    margin-top: 25px;
    text-align: center;
    font-size: 10px;
    font-family: Noto Sans S Chinese;
    font-weight: 400;
    color: #333333;
  }
  .right img {
    width: 100px;
  }
  .title {
    font-size: 10px;
    font-family: Noto Sans S Chinese;
    font-weight: 400;
    color: #333333;
    margin-bottom: 14px;
  }
  .copy-model {
    width: 145px;
    height: 21px;
    position: relative;
  }
  .link-input {
    background: none;
    outline: none;
    border: 1px solid #a0a0a0;
    width: 142px;
    height: 17px;
    font-size: 8px;
    font-family: Noto Sans S Chinese;
    font-weight: 400;
    color: #666666;
  }
  .copy {
    font-size: 9px;
    color: #ffffff;
    text-align: center;
    line-height: 20px;
    background: #ff6900;
    display: block;
    position: absolute;
    right: 0px;
    top: 2px;
    width: 42px;
    height: 21px;
  }
  .close {
    position: absolute;
    top: 8px;
    left: 322px;
    cursor: pointer;
  }
  .line {
    position: absolute;
    width: 1px;
    height: 110px;
    background: #999999;
    top: 20px;
    left: 185px;
  }
  .popup-pic {
    width: 100%;
    height: 100vh;
    background-color: rgba(10, 2, 4, 0.4);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }
  .popup-Mantle {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .popup-img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 250px;
    height: 250px;
  }
  .popup-img img {
    width: 100%;
    height: 100%;
  }
  .popup-close {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 30px;
    color: white;
    cursor: pointer;
  }
}
</style>
