<template>
  <div :class="this.size.w == 0 || this.size.h == 0 ? 'container' : ''">
    <slot></slot>
    <div
      ref="container"
      :class="this.size.w == 0 || this.size.h == 0 ? 'container' : ''"
    ></div>
  </div>
</template>

<script>
import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";

export default {
  name: "Renderer",
  provide() {
    return {
      parentObj: null, // avoid "injection not found" warning
    };
  },
  props: {
    size: {
      type: Object, // { w, h }
      // required: true,
      default() {
        return { w: 0, h: 0 };
      },
    },
    insetsize: {
      type: Object,
      required: true,
    },
    obj: { type: Object },
  },
  watch: {
    size() {
      this.$global.rendererSize = this.size;
      this.onWindowResize();
    },
  },
  data() {
    let curObj = this.obj;

    if (!curObj) {
      curObj = new THREE.WebGLRenderer({ antialias: true, alpha: this.alpha });
      curObj.outputEncoding = THREE.sRGBEncoding;
      curObj.setPixelRatio(window.devicePixelRatio);
    }
    curObj.autoClear = false;
    curObj.name = curObj.name || curObj.type;
    curObj.setSize(this.size.w, this.size.h);
    this.$global.rendererSize = this.size;
    this.$global.rendererDom = curObj.domElement;
    this.$global.renderer = curObj;


    const clock = new THREE.Clock();
    let rtTexture = new THREE.WebGLRenderTarget(
            this.insetsize.w,
            this.insetsize.h,
            {
              minFilter: THREE.LinearFilter,
              magFilter: THREE.NearestFilter,
              format: THREE.RGBFormat,
            }
          );

    let mouseDownTime = performance.now();
    let mouseUpTime = performance.now();
    let isClick = true;
    const stats = new Stats();
    let containerDom = null,
      RendererAnimation = true;

    return {
      curObj,
      clock,
      mouseDownTime,
      mouseUpTime,
      isClick,
      stats,
      containerDom,
      RendererAnimation,
      map: false,
      rtTexture
    };
  },
  beforeDestroy() {
      window.removeEventListener("resize", this.onWindowResize, false);
      window.removeEventListener("keydown", this.onKeyDown, false);
      window.removeEventListener("keyup", this.onKeyUp, false);
      this.curObj.domElement.removeEventListener("mousedown", this.onMouseDown, false);
      this.curObj.domElement.removeEventListener("mouseup", this.onMouseUp, false);
      this.curObj.domElement.removeEventListener("touchstart", this.onTouchStart, false);
      this.curObj.domElement.removeEventListener("touchend", this.onTouchEnd, false);
      this.curObj.domElement.removeEventListener("touchmove", this.onTouchMove, false);
    cancelAnimationFrame(this.RendererAnimation); //停止动画

    //this.$global.scene = null;
    // this.$global.rendererSize = null
  },
  destroyed() {
    // console.log("销毁后");
    this.curObj.dispose();
    this.curObj.forceContextLoss();
    this.curObj.content = null;
    this.curObj.domElement = null;
    this.curObj = null;
    this.rtTexture.dispose();
    this.rtTexture =  null;
    this.clock = null;
    this.mouseDownTime = null;
    this.mouseUpTime = null;
    this.isClick = null;
    this.stats = null;
    this.containerDom = null;
  },
  mounted() {
    window.addEventListener("resize", this.onWindowResize, false);
    window.addEventListener("keydown", this.onKeyDown, false);
    window.addEventListener("keyup", this.onKeyUp, false);
    this.curObj.domElement.addEventListener("pointerdown", this.onMouseDown, false);
    this.curObj.domElement.addEventListener("pointerup", this.onMouseUp, false);
    this.curObj.domElement.addEventListener("touchstart", this.onTouchStart, false);
    this.curObj.domElement.addEventListener("touchend", this.onTouchEnd, false);
    this.curObj.domElement.addEventListener("touchmove", this.onTouchMove, false);

    this.$refs.container.appendChild(this.curObj.domElement);
    // this.$refs.container.appendChild(this.stats.dom);

    this.containerDom = this.$refs.container;
    if (this.size.w == 0 || this.size.h == 0) {
      var time = setInterval(() => {
        this.onWindowResize();
        if (this.curObj.domElement.height > 0) {
          clearInterval(time);
          //  console.error("size or isAdapt 参数错误")
        }
      }, 1000);
    }
    this.animate();
  },
  methods: {
    animate() {
      this.RendererAnimation = requestAnimationFrame(this.animate);
      this.stats.update();
      if (this.$global.mixer) this.$global.mixer.update(this.clock.getDelta());

      this.curObj.setRenderTarget(null);
      this.curObj.clear();
      this.curObj.setViewport(
        0,
        0,
        this.$global.rendererSize.w,
        this.$global.rendererSize.h
      );
      this.curObj.render(this.$global.scene, this.$global.camera);

      if (this.$global.assistCamera) {
        this.curObj.setScissorTest(true);
        this.curObj.setScissor(
          this.$global.rendererSize.w - this.insetsize.w-100,
          this.$global.rendererSize.h - this.insetsize.h - 20,
          this.insetsize.w,
          this.insetsize.h
        );
        this.curObj.setViewport(
          this.$global.rendererSize.w - this.insetsize.w-100,
          this.$global.rendererSize.h - this.insetsize.h - 20,
          this.insetsize.w,
          this.insetsize.h
        );

        // if (!this.map) {
        //   this.curObj.render(this.$global.scene, this.$global.assistCamera,this.rtTexture);
        //   this.$global.mapscene.background = this.rtTexture.texture;
        //   this.map = true;
        // }
        this.curObj.setRenderTarget(null);
        if (this.map) {
          this.curObj.setScissorTest(false);
          this.curObj.setScissor(
            this.$global.rendererSize.w -  this.insetsize.w-100,
            this.$global.rendererSize.h - this.insetsize.h - 20,
            this.insetsize.w,
            this.insetsize.h
          );
          this.curObj.setViewport(
            this.$global.rendererSize.w -  this.insetsize.w-100,
            this.$global.rendererSize.h - this.insetsize.h - 20,
            this.insetsize.w,
            this.insetsize.h
          );
          this.curObj.render(
            this.$global.mapscene,
            this.$global.assistCamera
          );
        }
        this.curObj.setScissorTest(false);
      }

      this.curObj.clearDepth();
    },

    onWindowResize() {
      if (this.size.w == 0 || this.size.h == 0) {
        this.$global.rendererSize = {
          w: this.containerDom.getBoundingClientRect().width,
          h: this.containerDom.getBoundingClientRect().height,
        };
      }
      this.curObj.setSize(
        this.$global.rendererSize.w,
        this.$global.rendererSize.h
      );
      this.$global.camera.aspect =
        this.$global.rendererSize.w / this.$global.rendererSize.h;
      this.$global.camera.updateProjectionMatrix();
      if (this.$global.assistCamera) {
        this.$global.assistCamera.aspect = this.insetsize.w / this.insetsize.h;
        this.$global.assistCamera.updateProjectionMatrix();
      }
    },
    onKeyDown(event) {
      //console.log('onKeyDown',event)
      this.$bus.$emit("key-down", event);
    },
    onKeyUp(event) {
      this.$bus.$emit("key-up", event);
    },
    onMouseDown(event) {
      //console.log('onMouseDown',event)
      this.mouseDownTime = performance.now();

      setTimeout(() => {
        if (!this.isClick) {
          this.emitMouseDown(event);
        }
      }, 100);
    },
    onMouseUp(event) {
      //console.log('onMouseUp',event)
      this.mouseUpTime = performance.now();
      if (this.mouseUpTime - this.mouseDownTime > 200) {
        this.isClick = false;
      } else {
        this.isClick = true;
        this.$bus.$emit("mouse-click", event);
      }

      this.$bus.$emit("mouse-up");
    },
    emitMouseDown(event) {
      //console.log('emitMouseDown',event)
      this.$bus.$emit("mouse-down", event);
    },
    onTouchStart(event) {
      //console.log('onTouchStart',event)
      //this.$bus.$emit('touch-start', event)
      //console.log('onMouseDown',event)
      this.mouseDownTime = performance.now();

      setTimeout(() => {
        if (!this.isClick) {
          this.$bus.$emit("touch-start", event);
        }
      }, 200);
    },
    onTouchEnd(event) {
      this.mouseUpTime = performance.now();
      if (this.mouseUpTime - this.mouseDownTime > 100) {
        this.isClick = false;
      } else {
        this.isClick = true;
        this.$bus.$emit("mouse-click", event);
      }

      this.$bus.$emit("touch-end");
    },
    onTouchMove(event) {
      this.$bus.$emit("touch-move", event);
    },
  },
};
</script>
<style>
.container {
  min-width: 10px;
  min-height: 10px;
  width: 100%;
  height: 100%;
}
</style>
