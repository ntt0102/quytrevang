<template>
  <DxPopup
    ref="popup"
    :showCloseButton="true"
    :fullScreen="$devices.phone ? true : false"
    :show-title="true"
    :title="$t('components.pickImage.title')"
    @hiding="onHiding"
  >
    <template #content>
      <DxScrollView>
        <FileManager @copiedUrl="onCopiedUrl" :clientPath="clientPath" />
      </DxScrollView>
    </template>
  </DxPopup>
</template>
<script>
import FileManager from "../../components/FileManager.vue";

export default {
  components: {
    FileManager,
  },
  data() {
    return { clientPath: "", callback: null, emitData: null };
  },
  computed: {
    popup() {
      return this.$refs.popup.instance;
    },
  },
  methods: {
    show({ clientPath, callback }) {
      this.clientPath = clientPath;
      this.callback = callback;
      this.popup.show();
      this.$mf.pushPopupToHistoryState(() => this.popup.hide());
    },
    onHiding() {
      if (typeof this.callback === "function") this.callback(this.emitData);
      this.$mf.popRouteHistoryState();
    },
    onCopiedUrl(copiedUrl) {
      this.emitData = copiedUrl;
      this.popup.hide();
    },
  },
};
</script>
<style>
</style>
