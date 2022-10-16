<template>
  <div class="upload-picture">
    <div class="d-flex justify-space-between">
      <div class="logo d-flex text-danger">
        <div>
          <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
        </div>
        <div class="pl-2">企業名</div>
      </div>
      <div class="language">
        <pulldown-component
          :items="languageList"
          item-text="name"
          item-value="value"
          placeholder="language"
          label="language"
          :value="language"
          @change="language = $event"
        />
      </div>
    </div>

    <div class="text-center">
      <div class="pt-8 pb-3">
        <a @click="isUpload = true" class="button-danger fs-16 py-1 px-8">
          もしくは、ファイルを選択する
        </a>
      </div>
    </div>

    <div class="upload-type" v-if="isUpload" v-click-outside="onOutside">
      <label>
        <div>
          <p
            @click="
              (option = 'image/png, image/jpeg'),
                (isUpload = false),
                stopCamera()
            "
          >
            photo
          </p>
          <p><v-icon>mdi-camera</v-icon></p>
        </div>
        <div>
          <p
            @click="
              (option = 'takePhoto'), (isUpload = false), initializeCamera()
            "
          >
            take photo
          </p>
          <p><v-icon>mdi-camera</v-icon></p>
        </div>
        <div>
          <p @click="(option = 'file'), (isUpload = false), stopCamera()">
            file
          </p>
          <p><v-icon>mdi-camera</v-icon></p>
        </div>
        <div v-if="option != 'takePhoto'">
          <input
            ref="uploadImage"
            class="invisible po-ab"
            type="file"
            :accept="option"
          />
        </div>
      </label>
    </div>

    <div>
      <div class="text-center">
        <video autoplay ref="video" style="display: none"></video>
        <canvas ref="videoCanvas"></canvas>
      </div>
      <div v-if="videoStream" class="d-flex justify-center py-10">
        <div class="screenshot" @click="onScreenshot">
          <v-icon>mdi-camera</v-icon>
        </div>
      </div>
      <div class="text-center" ref="screenshots"></div>
    </div>
  </div>
</template>

<script>
import PulldownComponent from "@/components/forms/PulldownComponent.vue";

export default {
  props: {
    idUpload: {
      type: String,
      default: "uploadImage",
    },
  },

  components: {
    PulldownComponent,
  },

  data() {
    return {
      isUpload: false,
      option: "",
      languageList: [
        { name: "Janpan", value: "ja" },
        { name: "Korean", value: "kr" },
        { name: "Việt Nam", value: "vi" },
      ],
      language: "ja",
      constraints: {
        video: {
          width: {
            min: 300,
            ideal: 1920,
            max: 320,
          },
          height: {
            min: 300,
            ideal: 1080,
            max: 320,
          },
        },
      },
      videoStream: null,
    };
  },

  methods: {
    loadFile(event) {
      const imageFile = event.target.files[0];
      alert(Math.round(imageFile.size / 1000) + "KB");
    },
    onOutside() {
      if (this.isUpload) {
        this.isUpload = false;
      }
    },

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
      this.stopCamera();
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

    stopCamera() {
      if (this.videoStream) {
        let tracks = this.$refs.video.srcObject.getTracks();

        tracks.forEach((track) => {
          track.stop();
          this.$refs.video.srcObject = null;
          this.videoStream = null;
        });
      }
    },
  },
};
</script>

<style lang="scss">
.upload-picture {
  width: 380px;
  margin: 16px auto;

  .logo {
    font-size: 30px;
  }

  .pulldown {
    width: 150px;
  }

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

  .upload-type {
    width: 200px;
    border-radius: 8px;
    background: rgb(219, 213, 213);
    position: fixed;
    bottom: 0;
    left: 50%;

    transform: translateX(-50%);
    div:not(:last-child) {
      border-bottom: 1px solid gray;
      cursor: pointer;
      padding: 4px 16px;
    }

    div {
      display: flex;
      justify-content: space-between;
    }

    animation: to-bottom 0.2s;
  }

  @keyframes to-bottom {
    0% {
      transform: translateY(100%);
      opacity: 0;
      left: 50%;

      transform: translateX(-50%);
    }
    100% {
      transform: translateY(0);
      opacity: 1;
      left: 50%;

      transform: translateX(-50%);
    }
  }
}
</style>
