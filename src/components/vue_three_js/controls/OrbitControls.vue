<template>
  <Object3D :rotation="{ y: Math.PI }">
    <slot></slot>
  </Object3D>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Object3D from "../components/Object3D";
import { Clock } from "three";

export default {
  name: "OrbitControls",
  mixins: [Object3D],
  components: { Object3D },

  data() {
    return {
      controls: null,
      timer: null,
      frame: null,
    };
  },
  props: {
    enableDamping: {
      //指定是否使用阻尼
      typeof: Boolean,
      default() {
        return true;
      },
    },
    dampingFactor: {
      //动态阻尼系数
      typeof: Number,
      default() {
        return 0.05;
      },
    },
    enableZoom: {
      //缩放
      typeof: Boolean,
      default() {
        return true;
      },
    },
    autoRotate: {
      //是否自动旋转
      typeof: Boolean,
      default() {
        return true;
      },
    },
    minDistance: {
      //相机距离原点的最近距离
      typeof: Number,
      default() {
        return 100;
      },
    },
    maxDistance: {
      //相机距离远点的最远距离
      typeof: Number,
      default() {
        return 1000;
      },
    },
    target: {
      //控制器的焦点，camera的轨道围绕它运行。
      typeof: Object,
      default() {
        return { x: 0, y: 100, z: 0 };
      },
    },
    enablePan: {
      // 禁用鼠标右键平移
      typeof: Boolean,
      default() {
        return false;
      },
    },
    panSpeed: {
      // camera 平移速度
      typeof: Number,
      defualt() {
        return 1;
      },
    },
  },
  mounted() {
    let domElement = this.$global.rendererDom; // fixme
    this.controls = new OrbitControls(this.$global.camera, domElement);
    this.controls.enableDamping = this.enableDamping; //指定是否使用阻尼
    this.controls.dampingFactor = this.dampingFactor; //动态阻尼系数
    this.controls.enableZoom = this.enableZoom; //缩放
    this.controls.autoRotate = this.autoRotate; //是否自动旋转

    this.controls.minDistance = this.minDistance; //相机距离原点的最近距离
    this.controls.maxDistance = this.maxDistance; //相机距离远点的最远距离
    let position = new THREE.Vector3()
    position.x = this.target.x
    position.y = this.target.y
    position.z = this.target.z
    this.controls.target =position;
    this.controls.enablePan = this.enablePan; // 禁用鼠标右键
    this.controls.panSpeed = this.panSpeed; // camera 平移速度
    this.timer = new Clock();
    this.frame = this.animate();
  },

  beforeDestroy() {
    if (this.frame) {
      cancelAnimationFrame(this.frame);
    }
    if (this.controls) {
      this.controls.dispose();
      this.controls = null;
    }
  },

  methods: {
    animate() {
      this.frame = requestAnimationFrame(this.animate);
      this.controls.update();
    },
  },
};
</script>
