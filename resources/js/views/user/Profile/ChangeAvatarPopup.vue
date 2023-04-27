<template>
  <DxPopup
    ref="popup"
    :showCloseButton="true"
    :width="$devices.generic ? $screen.height * 0.6 : null"
    :height="$devices.generic ? $screen.height * 0.8 : null"
    :fullScreen="$devices.phone ? true : false"
    :show-title="true"
    @hiding="onHiding"
    :toolbarItems="[
      {
        toolbar: 'bottom',
        location: 'center',
        widget: 'dxButton',
        options: {
          icon: 'far fa-folder-upload',
          hint: $t('components.changeAvatar.buttons.choose'),
          onClick: showFileChooser,
        },
      },
      {
        toolbar: 'bottom',
        location: 'center',
        html: '|',
      },
      {
        toolbar: 'bottom',
        location: 'center',
        widget: 'dxButton',
        options: {
          icon: 'far fa-search-minus',
          hint: $t('components.changeAvatar.buttons.zoomOut'),
          onClick: zoomOut,
        },
      },
      {
        toolbar: 'bottom',
        location: 'center',
        widget: 'dxButton',
        options: {
          icon: 'far fa-search-plus',
          hint: $t('components.changeAvatar.buttons.zoomIn'),
          onClick: zoomIn,
        },
      },
      {
        toolbar: 'bottom',
        location: 'center',
        html: '|',
      },
      {
        toolbar: 'bottom',
        location: 'center',
        widget: 'dxButton',
        options: {
          icon: 'far fa-undo',
          hint: $t('components.changeAvatar.buttons.rotateLeft'),
          onClick: rotateLeft,
        },
      },
      {
        toolbar: 'bottom',
        location: 'center',
        widget: 'dxButton',
        options: {
          icon: 'far fa-redo',
          hint: $t('components.changeAvatar.buttons.rotateRight'),
          onClick: rotateRight,
        },
      },
      {
        toolbar: 'bottom',
        location: 'center',
        html: '|',
      },
      {
        toolbar: 'bottom',
        location: 'center',
        widget: 'dxButton',
        options: {
          icon: 'far fa-crop-alt',
          hint: $t('components.changeAvatar.buttons.crop'),
          onClick: onSubmit,
        },
      },
    ]"
  >
    <template #content>
      <DxScrollView>
        <div class="change-avatar">
          <VueCropper
            v-if="enabled"
            ref="cropper"
            :src="imgSrc"
            :aspectRatio="1 / 1"
          />
          <input ref="input" type="file" accept="images/*" @change="setImage" />
        </div>
      </DxScrollView>
    </template>
  </DxPopup>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";

export default {
  components: {
    VueCropper,
  },
  data() {
    return {
      enabled: false,
      imgSrc: null,
    };
  },
  computed: {
    ...mapGetters("Auth", ["avatar"]),
    popup() {
      return this.$refs.popup.instance;
    },
  },
  methods: {
    ...mapActions("User.profile", ["changeAvatar"]),
    show() {
      this.popup.option("title", this.$t("components.changeAvatar.title"));
      this.popup.option("toolbarItems[0].options.disabled", false);
      this.popup.show();
      this.enabled = true;
      this.imgSrc = this.avatar;
      this.$mf.pushPopupToHistoryState(() => this.popup.hide());
    },
    onSubmit() {
      this.$bus.emit("checkPin", () => {
        let cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
        this.changeAvatar(cropImg).then((isOk) => {
          if (isOk) this.popup.hide();
        });
      });
    },
    zoomIn() {
      this.$refs.cropper.relativeZoom(0.2);
    },
    zoomOut() {
      this.$refs.cropper.relativeZoom(-0.2);
    },
    rotateLeft() {
      this.$refs.cropper.rotate(-90);
    },
    rotateRight() {
      this.$refs.cropper.rotate(90);
    },
    setImage(e) {
      const file = e.target.files[0];
      if (file.type.indexOf("image/") === -1) {
        this.$toasted.error(this.$t("components.changeAvatar.error.imageType"));
        return;
      }
      if (typeof FileReader === "function") {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.imgSrc = event.target.result;
          this.$refs.cropper.replace(event.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        this.$toasted.error(
          this.$t("components.changeAvatar.error.fileReaderSupport")
        );
      }
    },
    showFileChooser() {
      this.$refs.input.click();
    },
    onHiding() {
      this.enabled = false;
      this.$mf.popRouteHistoryState();
    },
  },
};
</script>
<style lang="scss">
.change-avatar {
  input[type="file"] {
    display: none;
  }
}
</style>
