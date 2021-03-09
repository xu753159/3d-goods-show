<template>

  <div id="progress-module" v-show="progressvisible">
    <transition>
      <div class="progress">
        <div class="progress-font">
          模型加载进度{{ modelLoad }}/{{ modelTotal }}
          <div class="progress-icon">
            <fulfilling-bouncing-circle-spinner
              :animation-duration="3000"
              :size="50"
              color="#7690e9"
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

import { FulfillingBouncingCircleSpinner } from "epic-spinners";
export default {
  components: {
    FulfillingBouncingCircleSpinner,
  },
  props: {
    modelTotal: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  data() {
    return {
      progressvisible: true,
      modelLoad: 0,
    };
  },
  mounted() {
    this.$bus.$on("modelloaded", (data) => {
    
      this.modelLoad = data;     
      if (data == this.modelTotal) {
        this.progressvisible = false;
      }
    });
  },
  beforeDestroy(){
    this.$bus.$off('modelloaded')
  }
};

</script>

<style>
#progress-module {
  width: 100%;
  height: 100%;
  position: absolute;
  /* background-color:rgba(0,0,0,0.3); */
  background-size: 100% 100%;
  
}
.progress {
  width: 100%;
  position: absolute;
  top: 50%;
}
.progress-font {
  width: 100%;
  font-size: 20px;
  color: #7690e9;
  position: absolute;
  margin-top: 10px;
  text-align: center;
}
.progress-icon {
  display: inline-block;
  position: relative;
  top: 15px;
  left: 5px;
}
#progress-module img {
  width: 100%;
  height: 100%;
}
</style>