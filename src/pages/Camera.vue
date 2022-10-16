<template>
  <div class="ma-auto">
    <div class="text-center">
      <video autoplay ref="video" style="display: none"></video>
      <canvas ref="videoCanvas"></canvas>
    </div>
    <div class="d-flex justify-center py-10">
      <div class="screenshot" @click="onScreenshot">
        <v-icon>mdi-camera</v-icon>
      </div>
    </div>
    <div class="text-center" ref="screenshots"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      constraints: {
        video: {
          width: {
            min: 300,
            ideal: 1920,
            max: 600,
          },
          height: {
            min: 200,
            ideal: 1080,
            max: 400,
          },
        },
      },
      videoStream: null,
    };
  },

  mounted() {
    // this.initializeCamera();
  },

  methods: {
    drawImge() {
      const videoCanvas = this.$refs.videoCanvas;
      const video = this.$refs.video;
      const ctx = videoCanvas.getContext("2d");

      videoCanvas.width = video.videoWidth;
      videoCanvas.height = video.videoHeight;

      ctx.drawImage(video, 0, 0, videoCanvas.width, videoCanvas.height);

      const width = video.videoWidth - 60;
      const height = video.videoHeight - 20;
      const paddingX = 30;
      const paddingY = 10;

      ctx.rect(paddingX, paddingY, width, height);
      ctx.setLineDash([20, 10]);
      ctx.lineWidth = "3";
      ctx.strokeStyle = "white";
      ctx.stroke();

      setTimeout(this.drawImge, 100);
    },

    onScreenshot() {
      const img = document.createElement("img");
      const canvas = document.createElement("canvas");
      const video = this.$refs.video;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);
      img.src = canvas.toDataURL("image/png");
      console.log(canvas.toDataURL("image/png"));
      this.$refs.screenshots.prepend(img);
    },

    async initializeCamera() {
      this.drawImge();
      this.constraints.video.facingMode = "environment";
      try {
        this.videoStream = await navigator.mediaDevices.getUserMedia(
          this.constraints
        );
        this.$refs.video.srcObject = this.videoStream;
      } catch {
        alert("Could not access the camera");
      }
    },
  },
};
</script>

<style lang="scss">
.screenshot {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  i {
    font-size: 33px;
  }
}
</style>
