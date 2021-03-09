<template>
  <span>
    <span v-if="!isTreancribe" class="video" @click="start()">
      <slot name="start">开始录屏</slot>
    </span>
    <span v-else @click="stop()">
      <slot name="stop">结束录屏</slot>
    </span>
  </span>
</template>

<script>
export default {
  name: "canvasTreancribe",
  data() {
    return {
      chunks: new Set(),
      mediaStream: null,
      mediaRecord: null,
      isTreancribe: false
    };
  },
  mounted() {
    // this.Supportedformats();
  },
  methods: {
    Supportedformats() {
      var types = [
        "video/webm",
        "audio/webm",
        "video/webm ;codecs=vp8",
        "video/webm ;codecs=daala",
        "video/webm ;codecs=h264",
        "audio/webm ;codecs=opus",
        "video/mp4",
        "video/mpeg",
      ];

      for (var i in types) {
        console.log(
          "Is " +
            types[i] +
            " supported? " +
            (MediaRecorder.isTypeSupported(types[i]) ? "Maybe!" : "Nope :(")
        );
      }
    },
    start() {
      this.isTreancribe = true
      this.mediaStream = this.$global.rendererDom.captureStream(10); // 设置帧频率(FPS)
      this.mediaRecord = new MediaRecorder(this.mediaStream, {
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 2500000,
        mimeType: "video/webm ;codecs=vp8",
      });
      this.mediaRecord.start();
      this.mediaRecord.ondataavailable = (e) => {
        // 接收数据
        this.chunks.add(e.data);
        const videoBlob = new Blob(this.chunks, { type: "video/webm" });
        var videoUrl = window.URL.createObjectURL(videoBlob);
        var a = document.createElement("a");
        a.href = videoUrl;
        a.download = "record-canvas.webm";
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
      };
    },
    stop() {
      this.isTreancribe = false
      this.mediaRecord.stop(); // 结束录屏
    },
  },
};
</script>

<style scoped>
</style>