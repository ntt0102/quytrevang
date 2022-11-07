<template>
  <div class="app">
    <RouterView :is-small="screenSize.Small" :is-large="screenSize.Large" />
    <DxLoadPanel
      :position="{ of: '.app' }"
      :visible="isSyncing"
      :show-pane="false"
      height="200"
      width="200"
      maxHeight="200"
      maxWidth="200"
      :wrapperAttr="{ class: 'load-panel' }"
      indicatorSrc="../images/android-chrome-reverse-512x512.svg"
      shading-color="rgba(0,0,0,0.4)"
    />
    <Chatbot data-v-step="1" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { locale, loadMessages } from "devextreme/localization";
import viMessages from "./locales/devextreme/vi.json";
const Chatbot = () =>
  import(/* webpackPrefetch: true */ "./components/Chatbot.vue");

export default {
  components: {
    Chatbot,
  },
  name: "app",
  data() {
    return {
      screenSize: this.$mf.getScreenSize(),
    };
  },
  created() {
    loadMessages(viMessages);
    locale(this.$i18n.locale);
    window.addEventListener("resize", this.resizeEventHandler);
    window.addEventListener("popstate", this.popRouteHistoryState);
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeEventHandler);
    window.removeEventListener("popstate", this.popRouteHistoryState);
  },
  computed: {
    ...mapGetters(["isSyncing"]),
  },
  methods: {
    async resizeEventHandler(e) {
      this.screenSize = this.$mf.getScreenSize();
    },
    popRouteHistoryState(e) {
      if (this.$routeHistoryState.length > 0) {
        if (
          !this.$routeHistoryState[this.$routeHistoryState.length - 1]
            .poppedFlag
        ) {
          this.$routeHistoryState[
            this.$routeHistoryState.length - 1
          ].poppedFlag = true;
          this.$routeHistoryState[
            this.$routeHistoryState.length - 1
          ].callback();
        } else this.$routeHistoryState.pop();
      }
    },
  },
};
</script>

<style lang="scss">
@import "../sass/variables.scss";
html,
body {
  margin: 0px;
  min-height: 100%;
  height: 100%;
  min-width: 336px;
}

* {
  box-sizing: border-box;
}

.app {
  background-color: darken($base-bg, 5);
  overflow-y: hidden;
  height: 100%;
  width: 100%;
}
.load-panel .dx-loadindicator {
  width: 120px;
  height: 120px;
}
</style>
