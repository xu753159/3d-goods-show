<template>
  <div></div>
</template>
<script>
import * as THREE from "three";
export default {
  name: "Raycaster",
  // mixins:[Object3D],
  mounted() {
      // this.$global.rendererDom.addEventListener("click", this.raycaster, true);
      this.$bus.$on("mouse-click", this.raycaster);
  },
    beforeDestroy() {
      this.$bus.$off("mouse-click", this.raycaster);
    },
    methods: {
    raycaster(event) {
      // 取消事件的默认动作。
      event.preventDefault();
      // 声明 raycaster 和 mouse 变量
      var raycaster = new THREE.Raycaster();
      var mouse = new THREE.Vector2();
       var X = event.offsetX;
      var Y = event.offsetY;
      // 通过鼠标点击位置,计算出 raycaster 所需点的位置,以屏幕为中心点,范围 -1 到 1
      mouse.x = (X / this.$global.rendererSize.w) * 2 - 1;
      mouse.y = -(Y/ this.$global.rendererSize.h) * 2 + 1;
      //通过鼠标点击的位置(二维坐标)和当前相机的矩阵计算出射线位置
      raycaster.setFromCamera(mouse, this.$global.camera);
      // 获取与射线相交的对象数组，其中的元素按照距离排序，越近的越靠前
      var intersects = raycaster.intersectObjects(
        this.$global.scene.children,
        true
      );
      for (var i = 0; i < intersects.length; i++) {
        // console.log(intersects)
        if (intersects[i].object.onRaycaster) {
          intersects[i].object.onRaycaster();
          break
        }
      }
      //返回 射线 所穿透 物体的集合
      // this.$emit("cameraposition", intersects);
    },
  },
};
</script>

